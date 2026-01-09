import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  FileCode2, 
  Timer, 
  Shield, 
  AlertCircle,
  Check,
  Loader2
} from "lucide-react";

const thresholdOptions = [
  { days: 30, label: "30 Days" },
  { days: 90, label: "90 Days" },
  { days: 180, label: "180 Days" },
  { days: 365, label: "1 Year" },
];

const Deploy = () => {
  const [contractName, setContractName] = useState("");
  const [selectedThreshold, setSelectedThreshold] = useState(90);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-2xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
              <FileCode2 className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Smart Contract Deployment</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Deploy Your Inheritance Contract
            </h1>
            <p className="text-muted-foreground">
              Create a new smart contract to manage your crypto inheritance. 
              Set your preferences and deploy to the blockchain.
            </p>
          </div>

          {/* Form */}
          <div className="max-w-xl mx-auto">
            <div className="glass-card p-8">
              {/* Contract Name */}
              <div className="mb-8">
                <Label htmlFor="contractName" className="text-foreground font-medium mb-2 block">
                  Contract Name / Alias
                </Label>
                <Input
                  id="contractName"
                  placeholder="e.g., Family Trust, Personal Vault"
                  value={contractName}
                  onChange={(e) => setContractName(e.target.value)}
                  className="bg-secondary border-border focus:border-primary"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Choose a memorable name for easy identification.
                </p>
              </div>

              {/* Inactivity Threshold */}
              <div className="mb-8">
                <Label className="text-foreground font-medium mb-4 block">
                  Inactivity Threshold
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  {thresholdOptions.map((option) => (
                    <button
                      key={option.days}
                      onClick={() => setSelectedThreshold(option.days)}
                      className={`p-4 rounded-xl border transition-all duration-200 ${
                        selectedThreshold === option.days
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-secondary hover:border-primary/50"
                      }`}
                    >
                      <Timer className={`w-5 h-5 mx-auto mb-2 ${
                        selectedThreshold === option.days ? "text-primary" : "text-muted-foreground"
                      }`} />
                      <span className="font-medium">{option.label}</span>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Assets will be claimable by beneficiaries after {selectedThreshold} days of inactivity.
                </p>
              </div>

              {/* Security Info */}
              <div className="bg-secondary/50 rounded-xl p-4 mb-8">
                <div className="flex gap-3">
                  <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-1">Security Note</h4>
                    <p className="text-xs text-muted-foreground">
                      Your contract will be deployed on-chain with full transparency. 
                      You retain full control and can reset the timer at any time.
                    </p>
                  </div>
                </div>
              </div>

              {/* Deploy Button */}
              <Button
                variant="gradient"
                size="lg"
                className="w-full"
                onClick={() => setShowModal(true)}
                disabled={!contractName.trim()}
              >
                Deploy Contract
              </Button>
            </div>

            {/* Steps Guide */}
            <div className="mt-8 glass-card p-6">
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                Next Steps After Deployment
              </h3>
              <div className="space-y-3">
                {[
                  "Register your crypto assets (ETH, tokens, NFTs)",
                  "Add beneficiaries with their wallet addresses",
                  "Set distribution percentages for each beneficiary",
                  "Stay active to keep your timer reset"
                ].map((step, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs text-primary font-medium">{index + 1}</span>
                    </div>
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Confirmation Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in">
            <div className="glass-card p-8 max-w-md w-full animate-scale-in">
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  Confirm Deployment
                </h3>
                <p className="text-sm text-muted-foreground">
                  You are about to deploy a new inheritance contract with the following details:
                </p>
              </div>

              <div className="bg-secondary rounded-xl p-4 mb-6 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm">Contract Name</span>
                  <span className="text-foreground font-medium text-sm">{contractName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm">Inactivity Threshold</span>
                  <span className="text-foreground font-medium text-sm">{selectedThreshold} Days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm">Estimated Gas</span>
                  <span className="text-foreground font-medium text-sm">~0.005 ETH</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="gradient"
                  className="flex-1"
                  onClick={() => setShowModal(false)}
                >
                  Confirm & Deploy
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Deploy;
