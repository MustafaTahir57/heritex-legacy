import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px] animate-pulse-slow delay-1000" />
      
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 animate-fade-in">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Decentralized & Secure</span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up">
            <span className="text-foreground">Secure Your</span>
            <br />
            <span className="gradient-text">Crypto Legacy</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Heritex enables you to deploy smart contracts for crypto inheritance. 
            Register assets, add beneficiaries, and set inactivity timers to ensure 
            your digital wealth reaches your loved ones.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Link to="/deploy">
              <Button size="xl" variant="gradient" className="w-full sm:w-auto group">
                Deploy Contract
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Button size="xl" variant="outline" className="w-full sm:w-auto">
              Learn More
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-8 mt-20 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="text-center">
              <div className="font-display text-3xl md:text-4xl font-bold gradient-text">$50M+</div>
              <div className="text-sm text-muted-foreground mt-1">Assets Secured</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl md:text-4xl font-bold gradient-text">2,500+</div>
              <div className="text-sm text-muted-foreground mt-1">Active Contracts</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl md:text-4xl font-bold gradient-text">100%</div>
              <div className="text-sm text-muted-foreground mt-1">On-Chain</div>
            </div>
          </div>
        </div>

        <div className="absolute top-1/3 left-10 w-16 h-16 glass-card rounded-2xl flex items-center justify-center animate-float hidden lg:flex">
          <Zap className="w-8 h-8 text-primary" />
        </div>
        <div className="absolute bottom-1/3 right-10 w-20 h-20 glass-card rounded-2xl flex items-center justify-center animate-float hidden lg:flex" style={{ animationDelay: '1s' }}>
          <Shield className="w-10 h-10 text-accent" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
