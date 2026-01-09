import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  Timer, 
  AlertCircle,
  Clock,
  CheckCircle2,
  RefreshCw,
  Coins,
  Users,
  Shield
} from "lucide-react";

const Claim = () => {
  const daysRemaining = 127;
  const totalDays = 180;
  const progress = ((totalDays - daysRemaining) / totalDays) * 100;
  const lastActivity = "January 7, 2024 at 3:45 PM";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
              <Timer className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Inactivity Timer</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Timer & Asset Claim
            </h1>
            <p className="text-muted-foreground">
              Monitor your inactivity timer and manage asset claims.
            </p>
          </div>

          {/* Timer Card */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="glass-card p-8 text-center">
              {/* Countdown Display */}
              <div className="relative w-48 h-48 mx-auto mb-8">
                {/* Background Circle */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="hsl(var(--secondary))"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${(progress / 100) * 283} 283`}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(var(--primary))" />
                      <stop offset="100%" stopColor="hsl(var(--accent))" />
                    </linearGradient>
                  </defs>
                </svg>
                {/* Center Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-display text-5xl font-bold gradient-text">{daysRemaining}</span>
                  <span className="text-muted-foreground text-sm">days remaining</span>
                </div>
              </div>

              <h2 className="font-display text-xl font-semibold text-foreground mb-2">
                Timer Status: Active
              </h2>
              <p className="text-muted-foreground text-sm mb-6">
                Your inheritance timer will trigger after {totalDays} days of inactivity.
              </p>

              {/* Last Activity */}
              <div className="bg-secondary rounded-xl p-4 mb-6">
                <div className="flex items-center justify-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Last Activity:</span>
                  <span className="text-foreground font-medium">{lastActivity}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="gradient" className="gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Reset Timer Now
                </Button>
                <Button variant="outline" className="gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Configure Alerts
                </Button>
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* For Asset Owners */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="feature-icon">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  For Asset Owners
                </h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-success flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    Timer resets automatically when you interact with the contract
                  </span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-success flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    Set up email or push notifications for timer warnings
                  </span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-success flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    Manually reset timer anytime with one transaction
                  </span>
                </li>
              </ul>
            </div>

            {/* For Beneficiaries */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="feature-icon">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  For Beneficiaries
                </h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-success flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    Claim button becomes active when timer expires
                  </span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-success flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    Assets are distributed based on your designated share
                  </span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-success flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    One-click claim process, no intermediaries needed
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Claim Section */}
          <div className="max-w-2xl mx-auto">
            <div className="glass-card p-8 text-center border-2 border-dashed border-border">
              <Coins className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                Claim Assets
              </h3>
              <p className="text-muted-foreground text-sm mb-6">
                This button will become active when the inactivity threshold is reached.
                Beneficiaries can then claim their designated share of assets.
              </p>
              <Button variant="outline" size="lg" disabled className="opacity-50 cursor-not-allowed">
                Claim Not Available Yet
              </Button>
              <p className="text-xs text-muted-foreground mt-4">
                {daysRemaining} days remaining until claim eligibility
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="max-w-2xl mx-auto mt-8">
            <h3 className="font-display text-lg font-semibold text-foreground mb-4">
              What Happens When Timer Expires?
            </h3>
            <div className="space-y-4">
              {[
                { step: 1, title: "Timer Reaches Zero", description: "After the set inactivity period with no activity, the timer expires." },
                { step: 2, title: "Claim Period Begins", description: "Beneficiaries receive notification and can begin claiming assets." },
                { step: 3, title: "Asset Distribution", description: "Each beneficiary claims their designated share directly to their wallet." },
                { step: 4, title: "Process Complete", description: "All assets are securely transferred according to your distribution plan." },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-medium text-primary">{item.step}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
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

export default Claim;
