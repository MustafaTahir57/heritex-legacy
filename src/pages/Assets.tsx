import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  Coins, 
  Wallet, 
  Plus,
  ExternalLink,
  Image,
  CircleDollarSign,
  Check
} from "lucide-react";

const registeredAssets = [
  { type: "ETH", name: "Ethereum", amount: "5.2 ETH", value: "$12,480", icon: "Ξ", color: "from-blue-500 to-purple-500" },
  { type: "ERC20", name: "USDC", amount: "2,500 USDC", value: "$2,500", icon: "$", color: "from-blue-400 to-cyan-400" },
  { type: "ERC20", name: "LINK", amount: "150 LINK", value: "$2,250", icon: "◆", color: "from-blue-600 to-blue-400" },
  { type: "NFT", name: "Bored Ape #1234", amount: "1 NFT", value: "~15 ETH", icon: "🖼", color: "from-amber-500 to-orange-500" },
];

const supportedAssets = [
  { name: "Ethereum (ETH)", icon: CircleDollarSign, type: "Native" },
  { name: "ERC-20 Tokens", icon: Coins, type: "Tokens" },
  { name: "NFTs (ERC-721)", icon: Image, type: "Collectibles" },
];

const Assets = () => {
  const [selectedTab, setSelectedTab] = useState<"registered" | "add">("registered");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                Asset Management
              </h1>
              <p className="text-muted-foreground">
                Register and manage your crypto assets for inheritance.
              </p>
            </div>
            <Button variant="gradient" className="gap-2 mt-4 md:mt-0">
              <Wallet className="w-4 h-4" />
              Connect Wallet
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8">
            <button
              onClick={() => setSelectedTab("registered")}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                selectedTab === "registered"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              Registered Assets
            </button>
            <button
              onClick={() => setSelectedTab("add")}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                selectedTab === "add"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              Add New Asset
            </button>
          </div>

          {selectedTab === "registered" && (
            <>
              {/* Total Value */}
              <div className="glass-card p-6 mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm mb-1">Total Registered Value</p>
                    <h2 className="font-display text-3xl font-bold gradient-text">$32,230</h2>
                  </div>
                  <div className="feature-icon">
                    <Coins className="w-7 h-7 text-primary" />
                  </div>
                </div>
              </div>

              {/* Assets Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {registeredAssets.map((asset, index) => (
                  <div key={index} className="glass-card-hover p-6 group">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${asset.color} flex items-center justify-center mb-4 text-2xl font-bold text-white`}>
                      {asset.icon}
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">{asset.name}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                        {asset.type}
                      </span>
                    </div>
                    <p className="text-lg font-medium text-foreground">{asset.amount}</p>
                    <p className="text-sm text-muted-foreground">{asset.value}</p>
                    <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                      <span className="text-xs text-emerald-success flex items-center gap-1">
                        <Check className="w-3 h-3" /> Registered
                      </span>
                      <button className="text-xs text-primary hover:underline flex items-center gap-1">
                        View <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Add Asset Card */}
                <button
                  onClick={() => setSelectedTab("add")}
                  className="glass-card border-dashed border-2 border-border hover:border-primary/50 p-6 flex flex-col items-center justify-center gap-4 transition-all group min-h-[200px]"
                >
                  <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <Plus className="w-7 h-7 text-muted-foreground group-hover:text-primary" />
                  </div>
                  <span className="text-muted-foreground group-hover:text-foreground font-medium">
                    Register New Asset
                  </span>
                </button>
              </div>
            </>
          )}

          {selectedTab === "add" && (
            <div className="max-w-2xl mx-auto">
              {/* Supported Assets */}
              <div className="glass-card p-6 mb-6">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                  Supported Asset Types
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {supportedAssets.map((asset, index) => {
                    const Icon = asset.icon;
                    return (
                      <div key={index} className="p-4 rounded-xl bg-secondary/50 text-center">
                        <Icon className="w-8 h-8 text-primary mx-auto mb-2" />
                        <p className="font-medium text-foreground text-sm">{asset.name}</p>
                        <p className="text-xs text-muted-foreground">{asset.type}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Connect Wallet CTA */}
              <div className="glass-card p-8 text-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-6">
                  <Wallet className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  Connect Your Wallet
                </h3>
                <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto">
                  Connect your wallet to view and register your crypto assets. 
                  We support MetaMask, WalletConnect, and more.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button variant="gradient" className="gap-2">
                    <Wallet className="w-4 h-4" />
                    Connect MetaMask
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <ExternalLink className="w-4 h-4" />
                    WalletConnect
                  </Button>
                </div>
              </div>

              {/* Info Box */}
              <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
                <h4 className="text-sm font-semibold text-foreground mb-2">How Asset Registration Works</h4>
                <ol className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-medium">1.</span>
                    Connect your wallet containing the assets you want to register.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-medium">2.</span>
                    Select the assets and approve them for your inheritance contract.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-medium">3.</span>
                    Assets remain in your wallet until claimed by beneficiaries.
                  </li>
                </ol>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Assets;
