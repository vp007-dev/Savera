import { memo } from "react";
import { Leaf, Droplets, Zap, TreeDeciduous, IndianRupee } from "lucide-react";
import { useScrollFade, useParallax } from "@/hooks/use-parallax";

const stats = [
  {
    icon: IndianRupee,
    value: "₹15K+",
    label: "Annual Savings",
    color: "gradient-primary"
  },
  {
    icon: Zap,
    value: "35%",
    label: "Energy Reduction",
    color: "gradient-energy"
  },
  {
    icon: Droplets,
    value: "8,000L",
    label: "Water Saved",
    color: "gradient-water"
  },
  {
    icon: TreeDeciduous,
    value: "30",
    label: "Trees Equivalent",
    color: "bg-success"
  }
];

const StatCard = memo(({ stat, index }: { stat: typeof stats[0]; index: number }) => (
  <div 
    className="relative p-5 rounded-2xl glass-strong text-center overflow-hidden"
    style={{ 
      animationDelay: `${index * 50}ms`,
      animation: 'fade-in 0.2s ease-out forwards'
    }}
  >
    <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
    <p className="text-2xl font-bold text-foreground mb-0.5">
      {stat.value}
    </p>
    <p className="text-xs text-muted-foreground">
      {stat.label}
    </p>
  </div>
));

StatCard.displayName = "StatCard";

const Impact = memo(() => {
  const { opacity, translateY, elementRef } = useScrollFade();
  const { offset, elementRef: parallaxRef } = useParallax(0.12);

  return (
    <section className="py-16 px-4 bg-background relative overflow-hidden" id="impact">
      {/* Parallax decorative elements */}
      <div 
        ref={parallaxRef}
        className="absolute left-0 bottom-0 w-40 h-40 rounded-full bg-water/10 blur-3xl pointer-events-none"
        style={{ transform: `translateY(${-offset}px)` }}
      />
      <div 
        className="absolute right-0 top-1/4 w-32 h-32 rounded-full bg-energy/10 blur-2xl pointer-events-none"
        style={{ transform: `translateY(${offset * 0.5}px)` }}
      />
      
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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 text-success text-xs font-medium mb-3">
            <Leaf className="w-3.5 h-3.5" />
            Environmental Impact
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Your Impact Matters
          </h2>
          <p className="text-sm text-muted-foreground">
            Every household contributes to a sustainable future
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-6">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>
        
        <div className="p-4 rounded-2xl glass-strong text-center">
          <p className="text-sm text-foreground mb-2">
            If 10M households join, we prevent
          </p>
          <p className="text-xl font-bold text-primary mb-1">18M tons CO₂/year</p>
          <p className="text-xs text-muted-foreground">
            & return ₹156 billion to families
          </p>
        </div>
      </div>
    </section>
  );
});

Impact.displayName = "Impact";

export default Impact;
