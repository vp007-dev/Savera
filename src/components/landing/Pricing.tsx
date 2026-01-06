import { memo } from "react";
import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollFade } from "@/hooks/use-parallax";

interface PricingProps {
  onGetStarted: () => void;
}

const plans = [
  {
    name: "Free",
    price: "₹0",
    description: "Get started",
    features: ["2 bills/month", "Basic breakdown", "Top 3 tips"],
    popular: false
  },
  {
    name: "Pro",
    price: "₹99",
    description: "For families",
    features: ["Unlimited bills", "Full breakdown", "All features", "Gamification"],
    popular: true
  },
  {
    name: "Family+",
    price: "₹199",
    description: "Power users",
    features: ["Everything in Pro", "Predictions", "Multi-property", "API access"],
    popular: false
  }
];

const PlanCard = memo(({ plan, index, onGetStarted }: { 
  plan: typeof plans[0]; 
  index: number;
  onGetStarted: () => void;
}) => (
  <div 
    className={`relative p-4 rounded-2xl ${
      plan.popular 
        ? 'glass-strong border-2 border-primary/30' 
        : 'glass'
    }`}
    style={{ 
      animationDelay: `${index * 60}ms`,
      animation: 'fade-in 0.2s ease-out forwards'
    }}
  >
    {plan.popular && (
      <div className="absolute -top-2.5 right-4 px-2.5 py-0.5 rounded-full gradient-primary flex items-center gap-1 text-primary-foreground text-[10px] font-semibold">
        <Star className="w-2.5 h-2.5" />
        Popular
      </div>
    )}
    
    <div className="flex items-center justify-between mb-3">
      <div>
        <h3 className="text-base font-semibold text-foreground">
          {plan.name}
        </h3>
        <p className="text-xs text-muted-foreground">{plan.description}</p>
      </div>
      <div className="text-right">
        <span className="text-2xl font-bold text-foreground">{plan.price}</span>
        <span className="text-xs text-muted-foreground">/mo</span>
      </div>
    </div>
    
    <div className="flex flex-wrap gap-2 mb-3">
      {plan.features.map((feature) => (
        <span 
          key={feature} 
          className="inline-flex items-center gap-1 text-xs text-foreground/80 bg-muted/50 px-2 py-1 rounded-full"
        >
          <Check className="w-3 h-3 text-primary" />
          {feature}
        </span>
      ))}
    </div>
    
    <Button 
      onClick={onGetStarted}
      className={`w-full py-5 rounded-xl font-medium touch-target ${
        plan.popular 
          ? 'gradient-primary text-primary-foreground' 
          : 'bg-card border border-border'
      }`}
      variant={plan.popular ? "default" : "outline"}
    >
      Get Started
    </Button>
  </div>
));

PlanCard.displayName = "PlanCard";

const Pricing = memo(({ onGetStarted }: PricingProps) => {
  const { opacity, translateY, elementRef } = useScrollFade();

  return (
    <section className="py-16 px-4 bg-muted/30 relative overflow-hidden" id="pricing">
      <div 
        ref={elementRef}
        className="container max-w-lg mx-auto relative z-10"
        style={{ 
          opacity, 
          transform: `translateY(${translateY}px)`,
          transition: 'opacity 0.1s ease-out, transform 0.1s ease-out'
        }}
      >
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Simple Pricing
          </h2>
          <p className="text-sm text-muted-foreground">
            Save 15x your subscription cost
          </p>
        </div>
        
        <div className="space-y-3">
          {plans.map((plan, index) => (
            <PlanCard 
              key={plan.name} 
              plan={plan} 
              index={index} 
              onGetStarted={onGetStarted} 
            />
          ))}
        </div>
        
        <p className="text-center text-xs text-muted-foreground mt-6">
          100% money-back guarantee if you don't save ₹500 in first month
        </p>
      </div>
    </section>
  );
});

Pricing.displayName = "Pricing";

export default Pricing;
