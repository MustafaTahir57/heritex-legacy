import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import WalletModal from "@/components/WalletModal";
import { 
  Wallet, 
  Menu, 
  X, 
  LayoutDashboard, 
  FileCode2, 
  Coins, 
  Users, 
  Timer 
} from "lucide-react";
import { useConnection , useConnections , useDisconnect } from "wagmi";
import { truncateAddress } from "../../lib/utils";

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/deploy", label: "Deploy Contract", icon: FileCode2 },
  { href: "/assets", label: "Assets", icon: Coins },
  { href: "/beneficiaries", label: "Beneficiaries", icon: Users },
  { href: "/claim", label: "Claim", icon: Timer },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const location = useLocation();
  const {chainId , address , isConnected} = useConnection();
  const connections = useConnections();  // Array of all available connections
  const { disconnect } = useDisconnect();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <span className="font-display font-bold text-primary-foreground text-lg">H</span>
            </div>
            <span className="font-display font-bold text-xl gradient-text">Heritex</span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`nav-link flex items-center gap-2 text-sm font-medium ${isActive ? "text-primary" : ""}`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Button variant="gradient" className="gap-2" onClick={() => isConnected? disconnect({ connector: connections[0].connector }) : setIsWalletModalOpen(true)}>
              <Wallet className="w-4 h-4"/>
              {isConnected ? truncateAddress(address) : "Connect Wallet"}
            </Button>
          </div>

          <button className="lg:hidden p-2 text-foreground" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden glass-card border-t border-border/50 animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {link.label}
                </Link>
              );
            })}
            <Button variant="gradient" className="gap-2" onClick={() => isConnected? disconnect({ connector: connections[0].connector }) : setIsWalletModalOpen(true)}>
              <Wallet className="w-4 h-4"/>
              {isConnected ? truncateAddress(address) : "Connect Wallet"}
            </Button>
          </div>
        </div>
      )}

      <WalletModal isOpen={isWalletModalOpen} onClose={() => setIsWalletModalOpen(false)} />
    </nav>
  );
};

export default Navbar;
