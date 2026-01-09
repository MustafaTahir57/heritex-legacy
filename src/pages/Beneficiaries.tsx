import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Users, 
  Plus,
  Trash2,
  Edit3,
  User,
  Wallet,
  Percent,
  AlertCircle
} from "lucide-react";

const initialBeneficiaries = [
  { id: 1, name: "Alice Smith", address: "0x1234...5678", share: 40 },
  { id: 2, name: "Bob Johnson", address: "0x8765...4321", share: 35 },
  { id: 3, name: "Carol Williams", address: "0x9876...1234", share: 25 },
];

const Beneficiaries = () => {
  const [beneficiaries, setBeneficiaries] = useState(initialBeneficiaries);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newBeneficiary, setNewBeneficiary] = useState({ name: "", address: "", share: "" });

  const totalShare = beneficiaries.reduce((acc, b) => acc + b.share, 0);

  const handleRemove = (id: number) => {
    setBeneficiaries(beneficiaries.filter(b => b.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                Beneficiary Management
              </h1>
              <p className="text-muted-foreground">
                Add and manage beneficiaries for your inheritance contract.
              </p>
            </div>
            <Button
              variant="gradient"
              className="gap-2 mt-4 md:mt-0"
              onClick={() => setShowAddForm(true)}
            >
              <Plus className="w-4 h-4" />
              Add Beneficiary
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="stat-card">
              <div className="flex items-center justify-between">
                <div className="feature-icon">
                  <Users className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="mt-4">
                <div className="font-display text-2xl font-bold text-foreground">
                  {beneficiaries.length}
                </div>
                <div className="text-sm text-muted-foreground">Total Beneficiaries</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="flex items-center justify-between">
                <div className="feature-icon">
                  <Percent className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="mt-4">
                <div className={`font-display text-2xl font-bold ${totalShare === 100 ? 'text-emerald-success' : 'text-amber-warning'}`}>
                  {totalShare}%
                </div>
                <div className="text-sm text-muted-foreground">Total Allocated</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="flex items-center justify-between">
                <div className="feature-icon">
                  <Wallet className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="mt-4">
                <div className="font-display text-2xl font-bold text-foreground">
                  {100 - totalShare}%
                </div>
                <div className="text-sm text-muted-foreground">Unallocated</div>
              </div>
            </div>
          </div>

          {/* Allocation Warning */}
          {totalShare !== 100 && (
            <div className="mb-6 p-4 rounded-xl bg-amber-warning/10 border border-amber-warning/20 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-warning flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-foreground">Allocation Incomplete</h4>
                <p className="text-sm text-muted-foreground">
                  Your beneficiary shares don't add up to 100%. Please adjust allocations to ensure proper asset distribution.
                </p>
              </div>
            </div>
          )}

          {/* Beneficiaries List */}
          <div className="glass-card overflow-hidden">
            <div className="p-6 border-b border-border">
              <h2 className="font-display text-xl font-semibold text-foreground">
                Your Beneficiaries
              </h2>
            </div>
            <div className="divide-y divide-border">
              {beneficiaries.map((beneficiary) => (
                <div
                  key={beneficiary.id}
                  className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-secondary/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{beneficiary.name}</h3>
                      <p className="text-sm text-muted-foreground font-mono">{beneficiary.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-display text-xl font-bold text-foreground">
                        {beneficiary.share}%
                      </div>
                      <div className="text-xs text-muted-foreground">Share</div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="hover:text-primary">
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:text-destructive"
                        onClick={() => handleRemove(beneficiary.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {beneficiaries.length === 0 && (
                <div className="p-12 text-center">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">No Beneficiaries Yet</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Add beneficiaries to designate who will receive your assets.
                  </p>
                  <Button variant="gradient" onClick={() => setShowAddForm(true)}>
                    Add Your First Beneficiary
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Distribution Preview */}
          {beneficiaries.length > 0 && (
            <div className="mt-6 glass-card p-6">
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                Distribution Preview
              </h3>
              <div className="h-4 rounded-full bg-secondary overflow-hidden flex">
                {beneficiaries.map((beneficiary, index) => {
                  const colors = [
                    "from-primary to-cyan-glow",
                    "from-accent to-purple-accent",
                    "from-emerald-success to-teal-400",
                    "from-amber-warning to-orange-400",
                  ];
                  return (
                    <div
                      key={beneficiary.id}
                      className={`h-full bg-gradient-to-r ${colors[index % colors.length]}`}
                      style={{ width: `${beneficiary.share}%` }}
                      title={`${beneficiary.name}: ${beneficiary.share}%`}
                    />
                  );
                })}
              </div>
              <div className="flex flex-wrap gap-4 mt-4">
                {beneficiaries.map((beneficiary, index) => {
                  const colors = ["bg-primary", "bg-accent", "bg-emerald-success", "bg-amber-warning"];
                  return (
                    <div key={beneficiary.id} className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${colors[index % colors.length]}`} />
                      <span className="text-sm text-muted-foreground">
                        {beneficiary.name} ({beneficiary.share}%)
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Add Beneficiary Modal */}
        {showAddForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in">
            <div className="glass-card p-8 max-w-md w-full animate-scale-in">
              <h3 className="font-display text-xl font-semibold text-foreground mb-6">
                Add Beneficiary
              </h3>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-foreground mb-2 block">
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter beneficiary name"
                    value={newBeneficiary.name}
                    onChange={(e) => setNewBeneficiary({ ...newBeneficiary, name: e.target.value })}
                    className="bg-secondary border-border"
                  />
                </div>

                <div>
                  <Label htmlFor="address" className="text-foreground mb-2 block">
                    Wallet Address
                  </Label>
                  <Input
                    id="address"
                    placeholder="0x..."
                    value={newBeneficiary.address}
                    onChange={(e) => setNewBeneficiary({ ...newBeneficiary, address: e.target.value })}
                    className="bg-secondary border-border font-mono"
                  />
                </div>

                <div>
                  <Label htmlFor="share" className="text-foreground mb-2 block">
                    Share Percentage
                  </Label>
                  <Input
                    id="share"
                    type="number"
                    placeholder="e.g., 25"
                    value={newBeneficiary.share}
                    onChange={(e) => setNewBeneficiary({ ...newBeneficiary, share: e.target.value })}
                    className="bg-secondary border-border"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Available: {100 - totalShare}%
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </Button>
                <Button variant="gradient" className="flex-1">
                  Add Beneficiary
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

export default Beneficiaries;
