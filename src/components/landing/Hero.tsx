import { memo } from "react";
import { ArrowRight, Droplets, Zap, Leaf, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface HeroProps {
  onGetStarted: () => void;
}

const Hero = memo(({ onGetStarted }: HeroProps) => {
  const navigate = useNavigate();
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-24 safe-area-top">
      {/* Background gradient - Eco-Cyber */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 cyber-grid opacity-30" />
      
      {/* Floating decorative elements with glow */}
      <div className="absolute top-20 left-4 w-16 h-16 rounded-full bg-primary/20 animate-float blur-xl" />
      <div className="absolute bottom-40 right-4 w-24 h-24 rounded-full bg-water/20 animate-float blur-xl" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/3 right-8 w-12 h-12 rounded-full bg-energy/20 animate-float blur-xl" style={{ animationDelay: '0.5s' }} />
      
      <div className="container relative z-10 max-w-lg mx-auto">
        <div className="text-center space-y-6 animate-fade-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-border text-xs font-medium">
            <Leaf className="w-3.5 h-3.5 text-primary" />
            <span className="text-foreground/80">Microsoft Imagine Cup 2026</span>
          </div>
          
          {/* Headline - optimized for mobile */}
          <h1 className="text-3xl font-bold tracking-tight leading-tight">
            <span className="text-foreground">Save Money.</span>
            <br />
            <span className="text-primary">Save Resources.</span>
            <br />
            <span className="text-foreground">Save the Planet.</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-base text-muted-foreground max-w-sm mx-auto leading-relaxed">
            AI-powered analysis of your electricity & water bills. Save ₹15,000+ annually.
          </p>
          
          {/* Stats - Bento style cards */}
          <div className="flex justify-center gap-3 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
            <div className="flex-shrink-0 flex items-center gap-2 px-3 py-2.5 rounded-2xl bento-card snap-start">
              <div className="w-8 h-8 rounded-xl bg-energy/20 flex items-center justify-center">
                <Zap className="w-4 h-4 text-energy" />
              </div>
              <div className="text-left">
                <p className="text-lg font-bold text-foreground">35%</p>
                <p className="text-[10px] text-muted-foreground">Electricity Wasted</p>
              </div>
            </div>
            
            <div className="flex-shrink-0 flex items-center gap-2 px-3 py-2.5 rounded-2xl bento-card snap-start">
              <div className="w-8 h-8 rounded-xl bg-water/20 flex items-center justify-center">
                <Droplets className="w-4 h-4 text-water" />
              </div>
              <div className="text-left">
                <p className="text-lg font-bold text-foreground">45%</p>
                <p className="text-[10px] text-muted-foreground">Water Wasted</p>
              </div>
            </div>
            
            <div className="flex-shrink-0 flex items-center gap-2 px-3 py-2.5 rounded-2xl bento-card snap-start">
              <div className="w-8 h-8 rounded-xl bg-primary/20 flex items-center justify-center">
                <TrendingDown className="w-4 h-4 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-lg font-bold text-foreground">₹30K</p>
                <p className="text-[10px] text-muted-foreground">Annual Waste</p>
              </div>
            </div>
          </div>
          
          {/* CTA Buttons - stacked on mobile */}
          <div className="flex flex-col gap-3 pt-2">
            <Button 
              size="lg" 
              onClick={onGetStarted}
              className="w-full py-6 text-base font-semibold rounded-2xl gradient-primary text-primary-foreground shadow-lg glow-primary active:scale-[0.98] transition-transform duration-150 touch-target"
            >
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate("/dashboard")}
              className="w-full py-6 text-base font-semibold rounded-2xl bg-card border-border active:bg-muted/50 transition-colors duration-150 touch-target"
            >
              View Demo
            </Button>
          </div>
          
          {/* Trust badge */}
          <p className="text-xs text-muted-foreground pt-2">
            🇮🇳 Built for Indian households • Free to start
          </p>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";

export default Hero;
