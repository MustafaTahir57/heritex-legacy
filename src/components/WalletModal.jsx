import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Wallet } from "lucide-react";
import { useEffect } from "react";
import { useConnectors, useConnect , useConnection } from "wagmi";
import { useSwitchChain } from "wagmi";

const WalletModal = ({ isOpen, onClose }) => {
  const connectors = useConnectors(); // all supported connections like injected , metamask
  const allowedWallets = ["metaMaskSDK", "walletConnect"];
  const connect = useConnect();
  const {chainId , isConnected} = useConnection();
  const switchChain = useSwitchChain()

  console.log("chaindId", chainId)

  useEffect(() => {
    if (isConnected && chainId !== 8453) {
      switchChain.mutate(
        { chainId: 8453 },
        {
          onSuccess: () => console.log("Switched to Mainnet"),
          onError: (err) => console.error("Chain switch failed", err),
        }
      );
    }
  }, [chainId, isConnected]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md glass-card border-border/50 bg-background/95 backdrop-blur-xl">
        <DialogHeader className="text-center pb-2">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
            <Wallet className="w-7 h-7 text-primary-foreground" />
          </div>
          <DialogTitle className="text-2xl font-display font-bold gradient-text">
            Connect Wallet
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Choose your preferred wallet to connect to Heritex
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-3 py-4">
          {connectors
            .filter((wallet) => allowedWallets.includes(wallet?.id))
            .map((wallet) => (
              <button
                key={wallet.id}
                className="group relative flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-secondary/30 hover:bg-secondary/60 hover:border-primary/50 transition-all duration-300"
                onClick={() => {
                  connect.mutate({ connector: wallet }); // connect in v3
                  onClose();
                }}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-background/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {/* wallet icon logic */}
                  {wallet.id === "metaMaskSDK" ? (
                    <span>
                      {" "}
                      <svg viewBox="0 0 40 40" className="w-10 h-10">
                        {" "}
                        <path
                          fill="#E17726"
                          d="M36.8 3.5L22.1 14.4l2.7-6.4L36.8 3.5z"
                        />{" "}
                        <path
                          fill="#E27625"
                          d="M3.2 3.5l14.5 11 -2.5-6.5L3.2 3.5zM31.5 28.1l-3.9 6 8.3 2.3 2.4-8.1-6.8-.2zM1.7 28.3l2.4 8.1 8.3-2.3-3.9-6-6.8.2z"
                        />{" "}
                        <path
                          fill="#E27625"
                          d="M12 17.8l-2.3 3.5 8.2.4-.3-8.8L12 17.8zM28 17.8l-5.8-5 -.2 9 8.2-.4L28 17.8zM12.4 34.1l5-2.4-4.3-3.4-.7 5.8zM22.6 31.7l5 2.4-.7-5.8-4.3 3.4z"
                        />{" "}
                        <path
                          fill="#D5BFB2"
                          d="M27.6 34.1l-5-2.4.4 3.3 0 1.4 4.6-2.3zM12.4 34.1l4.6 2.3 0-1.4.4-3.3-5 2.4z"
                        />{" "}
                        <path
                          fill="#233447"
                          d="M17.1 26.3l-4.1-1.2 2.9-1.3 1.2 2.5zM22.9 26.3l1.2-2.5 2.9 1.3-4.1 1.2z"
                        />{" "}
                        <path
                          fill="#CC6228"
                          d="M12.4 34.1l.7-6-4.6.1 3.9 5.9zM26.9 28.1l.7 6 3.9-5.9-4.6-.1zM30.2 21.3l-8.2.4.8 4.6 1.2-2.5 2.9 1.3 3.3-3.8zM13 25.1l2.9-1.3 1.2 2.5.8-4.6-8.2-.4 3.3 3.8z"
                        />{" "}
                        <path
                          fill="#E27525"
                          d="M9.7 21.3l3.4 6.7-.1-3.3-3.3-3.4zM27 24.7l-.1 3.3 3.4-6.7-3.3 3.4zM17.9 21.7l-.8 4.6 1 5.1.2-6.7-.4-3zM22.1 21.7l-.4 3-.1 6.7 1-5.1-.5-4.6z"
                        />{" "}
                        <path
                          fill="#F5841F"
                          d="M22.9 26.3l-1 5.1.7.5 4.3-3.4.1-3.3-4.1 1.1zM13 25.1l.1 3.3 4.3 3.4.7-.5-1-5.1-4.1-1.1z"
                        />{" "}
                        <path
                          fill="#C0AC9D"
                          d="M23 36.4l0-1.4-.4-.3h-5.2l-.4.3 0 1.4-4.6-2.3 1.6 1.3 3.3 2.3h5.4l3.3-2.3 1.6-1.3-4.6 2.3z"
                        />{" "}
                        <path
                          fill="#161616"
                          d="M22.6 31.7l-.7-.5h-3.8l-.7.5-.4 3.3.4-.3h5.2l.4.3-.4-3.3z"
                        />{" "}
                        <path
                          fill="#763E1A"
                          d="M37.5 15.1l1.2-6.1-1.9-5.5-14.2 10.5 5.5 4.6 7.8 2.3 1.7-2-.7-.5 1.2-1.1-.9-.7 1.2-.9-.8-.6zM1.3 9l1.2 6.1-.8.6 1.2.9-.9.7 1.2 1.1-.7.5 1.7 2 7.8-2.3 5.5-4.6L3.2 3.5 1.3 9z"
                        />{" "}
                        <path
                          fill="#F5841F"
                          d="M35.9 20.9l-7.8-2.3 2.4 3.5-3.4 6.7 4.5-.1h6.7l-2.4-7.8zM11.9 18.6l-7.8 2.3-2.4 7.9h6.7l4.5.1-3.4-6.7 2.4-3.6zM22.1 21.7l.5-8.7 2.2-6h-9.7l2.2 6 .5 8.7.2 3 0 6.6h3.8l0-6.6.3-3z"
                        />{" "}
                      </svg>{" "}
                    </span>
                  ) : (
                    <svg viewBox="0 0 40 40" className="w-10 h-10">
                      {" "}
                      <rect
                        width="40"
                        height="40"
                        rx="10"
                        fill="#3B99FC"
                      />{" "}
                      <path
                        d="M12.5 15.5c4.1-4 10.9-4 15 0l.5.5c.2.2.2.5 0 .7l-1.7 1.7c-.1.1-.3.1-.4 0l-.7-.7c-2.9-2.8-7.5-2.8-10.4 0l-.7.7c-.1.1-.3.1-.4 0l-1.7-1.7c-.2-.2-.2-.5 0-.7l.5-.5zm18.5 3.4l1.5 1.5c.2.2.2.5 0 .7l-6.8 6.7c-.2.2-.5.2-.7 0l-4.8-4.7c0 0-.1-.1-.2-.1s-.1 0-.2.1l-4.8 4.7c-.2.2-.5.2-.7 0L7.5 21.1c-.2-.2-.2-.5 0-.7l1.5-1.5c.2-.2.5-.2.7 0l4.8 4.7c0 0 .1.1.2.1s.1 0 .2-.1l4.8-4.7c.2-.2.5-.2.7 0l4.8 4.7c0 0 .1.1.2.1s.1 0 .2-.1l4.8-4.7c.2-.2.5-.2.7 0z"
                        fill="#fff"
                      />{" "}
                    </svg>
                  )}
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">
                      {wallet.name}
                    </span>
                    {wallet.id === "metaMaskSDK" && (
                      <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary/20 text-primary">
                        Popular
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg
                    className="w-4 h-4 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </button>
            ))}
        </div>

        <div className="pt-2 border-t border-border/50">
          <p className="text-xs text-center text-muted-foreground">
            By connecting, you agree to Heritex's
            <span className="text-primary hover:underline cursor-pointer">
              Terms of Service
            </span>
            and
            <span className="text-primary hover:underline cursor-pointer">
              Privacy Policy
            </span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletModal;
