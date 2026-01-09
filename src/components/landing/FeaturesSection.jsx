import { FileCode2, Coins, Users, Timer, Shield, Zap } from "lucide-react";

const features = [
  { icon: FileCode2, title: "Deploy Smart Contracts", description: "Launch your personalized inheritance contract with customizable parameters and full on-chain transparency." },
  { icon: Coins, title: "Register Assets", description: "Securely register ETH, ERC-20 tokens, and NFTs to your inheritance contract with multi-asset support." },
  { icon: Users, title: "Add Beneficiaries", description: "Designate multiple beneficiaries with custom share percentages for flexible distribution." },
  { icon: Timer, title: "Inactivity Timer", description: "Set customizable inactivity thresholds that trigger automatic asset distribution to beneficiaries." },
  { icon: Shield, title: "Secure Distribution", description: "Smart contract-enforced distribution ensures assets reach beneficiaries without intermediaries." },
  { icon: Zap, title: "Instant Claims", description: "Beneficiaries can claim their share instantly once the inactivity threshold is reached." },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-foreground">Why Choose </span>
            <span className="gradient-text">Heritex?</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A complete decentralized solution for securing your crypto inheritance, 
            built with security and simplicity in mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="glass-card-hover p-8 group" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="feature-icon mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
