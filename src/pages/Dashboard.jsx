import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  Coins, 
  Users, 
  Timer, 
  FileCode2, 
  ArrowUpRight, 
  Plus,
  Activity
} from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { label: "Total Assets", value: "12.5 ETH", icon: Coins, change: "+2.4%" },
  { label: "Beneficiaries", value: "4", icon: Users, change: "" },
  { label: "Days Until Claim", value: "127", icon: Timer, change: "" },
  { label: "Active Contracts", value: "2", icon: FileCode2, change: "" },
];

const recentContracts = [
  { name: "Family Trust", assets: "8.2 ETH", beneficiaries: 3, status: "Active", lastActivity: "2 days ago" },
  { name: "Personal Vault", assets: "4.3 ETH", beneficiaries: 1, status: "Active", lastActivity: "5 hours ago" },
];

const assetDistribution = [
  { asset: "ETH", amount: "8.5", percentage: 68 },
  { asset: "USDC", amount: "2,500", percentage: 20 },
  { asset: "NFTs", amount: "3", percentage: 12 },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                Dashboard
              </h1>
              <p className="text-muted-foreground">
                Manage your inheritance contracts and monitor your assets.
              </p>
            </div>
            <div className="flex gap-3 mt-4 md:mt-0">
              <Link to="/deploy">
                <Button variant="gradient" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Deploy Contract
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="stat-card">
                  <div className="flex items-start justify-between">
                    <div className="feature-icon">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    {stat.change && (
                      <span className="text-xs text-emerald-success font-medium bg-emerald-success/10 px-2 py-1 rounded-full">
                        {stat.change}
                      </span>
                    )}
                  </div>
                  <div className="mt-4">
                    <div className="font-display text-2xl font-bold text-foreground">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Contracts List */}
            <div className="lg:col-span-2 glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Your Contracts
                </h2>
                <Link to="/deploy" className="text-sm text-primary hover:underline flex items-center gap-1">
                  View All <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="space-y-4">
                {recentContracts.map((contract, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <FileCode2 className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{contract.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {contract.beneficiaries} beneficiaries • {contract.lastActivity}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-foreground">{contract.assets}</div>
                      <div className="text-xs text-emerald-success">{contract.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Asset Distribution */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Asset Distribution
                </h2>
                <Activity className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="space-y-4">
                {assetDistribution.map((asset, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">{asset.asset}</span>
                      <span className="text-sm text-muted-foreground">{asset.amount}</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                        style={{ width: `${asset.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="mt-8 pt-6 border-t border-border">
                <h3 className="text-sm font-semibold text-foreground mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Link to="/assets">
                    <Button variant="outline" size="sm" className="w-full gap-2">
                      <Coins className="w-4 h-4" />
                      Add Asset
                    </Button>
                  </Link>
                  <Link to="/beneficiaries">
                    <Button variant="outline" size="sm" className="w-full gap-2">
                      <Users className="w-4 h-4" />
                      Add Beneficiary
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="mt-6 glass-card p-6">
            <h2 className="font-display text-xl font-semibold text-foreground mb-6">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {[
                { action: "Timer Reset", contract: "Family Trust", time: "2 days ago", type: "timer" },
                { action: "Asset Registered", contract: "Personal Vault", time: "5 hours ago", type: "asset" },
                { action: "Beneficiary Added", contract: "Family Trust", time: "1 week ago", type: "beneficiary" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'timer' ? 'bg-amber-warning' : 
                    activity.type === 'asset' ? 'bg-emerald-success' : 'bg-primary'
                  }`} />
                  <div className="flex-1">
                    <span className="text-foreground font-medium">{activity.action}</span>
                    <span className="text-muted-foreground"> on </span>
                    <span className="text-primary">{activity.contract}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
