import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useConnection, useChains } from "wagmi";
import { toHexChainID } from "@/lib/utils";
import { getWalletTokenBalances } from "@/services/getAllTokenBalances";
import {
  Coins,
  Wallet,
  Check,
  Search,
  ArrowUpDown,
  Shield,
  Loader2,
  AlertCircle,
} from "lucide-react";

const Assets = () => {
  const [allAssets, setallAssets] = useState([]);
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { chainId, address, isConnected } = useConnection();

  useEffect(() => {
    if (!isConnected) return;

    const fetchTokenBalances = async () => {
      setIsLoading(true);
      try {
        const hexChainID = toHexChainID(chainId);
        const balances = await getWalletTokenBalances(address, hexChainID);
        setallAssets(balances.result);
      } catch (error) {
        console.error("Failed to fetch token balances:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTokenBalances();
  }, [address, isConnected, chainId]);

  const toggleAssetSelection = (tokenAddress) => {
    setSelectedAssets((prev) =>
      prev.includes(tokenAddress)
        ? prev.filter((addr) => addr !== tokenAddress)
        : [...prev, tokenAddress]
    );
  };

  const selectAllAssets = () => {
    if (selectedAssets.length === allAssets.length) {
      setSelectedAssets([]);
    } else {
      setSelectedAssets(allAssets.map((asset) => asset.token_address));
    }
  };

  const filteredAssets = allAssets.filter(
    (asset) =>
      asset.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.symbol?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalSelectedValue = selectedAssets.reduce((acc, tokenAddr) => {
    const asset = allAssets.find((a) => a.token_address === tokenAddr);
    return acc + (asset?.usd_value || 0);
  }, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              Register Your Assets
            </h1>
            <p className="text-muted-foreground">
              Select the assets you want to include in your inheritance plan.
            </p>
          </div>

          {!isConnected ? (
            /* Not Connected State */
            <div className="glass-card p-12 text-center max-w-xl mx-auto">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-6">
                <Wallet className="w-10 h-10 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                Connect Your Wallet
              </h3>
              <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto">
                Connect your wallet to view and register your crypto assets for
                inheritance.
              </p>
            </div>
          ) : isLoading ? (
            /* Loading State */
            <div className="glass-card p-12 text-center">
              <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Loading your assets...</p>
            </div>
          ) : allAssets.length === 0 ? (
            /* No Assets State */
            <div className="glass-card p-12 text-center max-w-xl mx-auto">
              <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                No Assets Found
              </h3>
              <p className="text-muted-foreground text-sm">
                We couldn't find any tokens in your connected wallet.
              </p>
            </div>
          ) : (
            <>
              {/* Stats Bar */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="glass-card p-5">
                  <p className="text-muted-foreground text-sm mb-1">
                    Total Assets
                  </p>
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    {allAssets.length}
                  </h2>
                </div>
                <div className="glass-card p-5">
                  <p className="text-muted-foreground text-sm mb-1">Selected</p>
                  <h2 className="font-display text-2xl font-bold gradient-text">
                    {selectedAssets.length}
                  </h2>
                </div>
                <div className="glass-card p-5">
                  <p className="text-muted-foreground text-sm mb-1">
                    Selected Value
                  </p>
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    ${totalSelectedValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </h2>
                </div>
              </div>

              {/* Search & Actions Bar */}
              <div className="glass-card p-4 mb-6">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  {/* Search */}
                  <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search tokens..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary border border-border focus:border-primary/50 focus:outline-none text-foreground placeholder:text-muted-foreground transition-colors"
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={selectAllAssets}
                      className="gap-2"
                    >
                      <Check className="w-4 h-4" />
                      {selectedAssets.length === allAssets.length
                        ? "Deselect All"
                        : "Select All"}
                    </Button>
                    <Button
                      variant="gradient"
                      size="sm"
                      disabled={selectedAssets.length === 0}
                      className="gap-2"
                    >
                      <Shield className="w-4 h-4" />
                      Register {selectedAssets.length > 0 && `(${selectedAssets.length})`}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Token List Table */}
              <div className="glass-card overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 p-4 bg-secondary/50 border-b border-border text-sm font-medium text-muted-foreground">
                  <div className="col-span-1 flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={selectedAssets.length === allAssets.length && allAssets.length > 0}
                      onChange={selectAllAssets}
                      className="w-4 h-4 rounded border-border accent-primary cursor-pointer"
                    />
                  </div>
                  <div className="col-span-5 md:col-span-4 flex items-center gap-1">
                    Token <ArrowUpDown className="w-3 h-3" />
                  </div>
                  <div className="col-span-3 md:col-span-3 text-right">Balance</div>
                  <div className="hidden md:block col-span-2 text-right">Value</div>
                  <div className="col-span-3 md:col-span-2 text-center">Status</div>
                </div>

                {/* Token Rows */}
                <div className="divide-y divide-border">
                  {filteredAssets.map((asset, index) => {
                    const isSelected = selectedAssets.includes(asset.token_address);
                    const balance = asset.balance_formatted
                      ? parseFloat(asset.balance_formatted).toFixed(4)
                      : "0";
                    const usdValue = asset.usd_value
                      ? `$${asset.usd_value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                      : "-";

                    return (
                      <div
                        key={asset.token_address || index}
                        onClick={() => toggleAssetSelection(asset.token_address)}
                        className={`grid grid-cols-12 gap-4 p-4 cursor-pointer transition-all hover:bg-secondary/30 ${
                          isSelected ? "bg-primary/5 border-l-2 border-l-primary" : ""
                        }`}
                      >
                        {/* Checkbox */}
                        <div className="col-span-1 flex items-center justify-center">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => {}}
                            className="w-4 h-4 rounded border-border accent-primary cursor-pointer"
                          />
                        </div>

                        {/* Token Info */}
                        <div className="col-span-5 md:col-span-4 flex items-center gap-3">
                          {asset.logo ? (
                            <img
                              src={asset.logo}
                              alt={asset.symbol}
                              className="w-10 h-10 rounded-full bg-secondary"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                              <Coins className="w-5 h-5 text-primary" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="font-medium text-foreground truncate">
                              {asset.name || "Unknown Token"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {asset.symbol || "???"}
                            </p>
                          </div>
                        </div>

                        {/* Balance */}
                        <div className="col-span-3 md:col-span-3 flex items-center justify-end">
                          <span className="text-foreground font-medium text-sm">
                            {balance}
                          </span>
                        </div>

                        {/* USD Value */}
                        <div className="hidden md:flex col-span-2 items-center justify-end">
                          <span className="text-muted-foreground text-sm">
                            {usdValue}
                          </span>
                        </div>

                        {/* Status */}
                        <div className="col-span-3 md:col-span-2 flex items-center justify-center">
                          {isSelected ? (
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                              <Check className="w-3 h-3" /> Selected
                            </span>
                          ) : (
                            <span className="text-xs text-muted-foreground">
                              Not selected
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Empty Search State */}
                {filteredAssets.length === 0 && searchQuery && (
                  <div className="p-12 text-center">
                    <p className="text-muted-foreground">
                      No tokens found matching "{searchQuery}"
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom Action Bar */}
              {selectedAssets.length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-xl border-t border-border z-40">
                  <div className="container mx-auto flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {selectedAssets.length} asset{selectedAssets.length > 1 ? "s" : ""} selected
                      </p>
                      <p className="font-display text-lg font-bold text-foreground">
                        ${totalSelectedValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>
                    <Button variant="gradient" size="lg" className="gap-2">
                      <Shield className="w-5 h-5" />
                      Register Selected Assets
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Assets;
