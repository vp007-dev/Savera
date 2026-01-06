import { memo } from "react";
import { 
  Zap, 
  Droplets, 
  Brain, 
  Trophy, 
  Leaf, 
  Smartphone,
  TrendingUp,
  Users
} from "lucide-react";
import { useScrollFade } from "@/hooks/use-parallax";

const features = [
  {
    icon: Brain,
    title: "AI Bill Analysis",
    description: "Upload bills, AI extracts & analyzes consumption automatically.",
    color: "bg-primary/10",
    iconColor: "text-primary"
  },
  {
    icon: Zap,
    title: "Electricity Breakdown",
    description: "See AC, fridge, heater costs with 85-90% accuracy.",
    color: "bg-energy/20",
    iconColor: "text-energy-foreground"
  },
  {
    icon: Droplets,
    title: "Water Breakdown",
    description: "First-of-its-kind fixture-level water tracking.",
    color: "bg-water/20",
    iconColor: "text-water-foreground"
  },
  {
    icon: TrendingUp,
    title: "Smart Recommendations",
    description: "Personalized tips ranked by effort-to-savings ratio.",
    color: "bg-secondary/20",
    iconColor: "text-secondary"
  },
  {
    icon: Trophy,
    title: "Family Gamification",
    description: "Challenges, leaderboards, and badges for everyone.",
    color: "bg-accent",
    iconColor: "text-accent-foreground"
  },
  {
    icon: Leaf,
    title: "Environmental Impact",
    description: "Track CO₂, water saved, and trees equivalent.",
    color: "bg-success/20",
    iconColor: "text-success"
  },
  {
    icon: Smartphone,
    title: "Smart Device Control",
    description: "Connect AC, heater, lights for passive savings.",
    color: "bg-chart-3/20",
    iconColor: "text-chart-3"
  },
  {
    icon: Users,
    title: "Government Ready",
    description: "Built for utility APIs, subsidies & compliance.",
    color: "bg-chart-4/20",
    iconColor: "text-chart-4"
  }
];

const FeatureCard = memo(({ feature, index }: { feature: typeof features[0]; index: number }) => (
  <div 
    className="p-4 rounded-2xl glass active:scale-[0.98] transition-transform duration-150"
    style={{ 
      animationDelay: `${index * 40}ms`,
      animation: 'fade-in 0.2s ease-out forwards'
    }}
  >
    <div className={`w-10 h-10 rounded-xl ${feature.color} flex items-center justify-center mb-3`}>
      <feature.icon className={`w-5 h-5 ${feature.iconColor}`} />
    </div>
    <h3 className="text-sm font-semibold text-foreground mb-1">
      {feature.title}
    </h3>
    <p className="text-xs text-muted-foreground leading-relaxed">
      {feature.description}
    </p>
  </div>
));

FeatureCard.displayName = "FeatureCard";

const Features = memo(() => {
  const { opacity, translateY, elementRef } = useScrollFade();

  return (
    <section className="py-16 px-4 bg-background" id="features">
      <div 
        ref={elementRef}
        className="container max-w-lg mx-auto"
        style={{ 
          opacity, 
          transform: `translateY(${translateY}px)`,
          transition: 'opacity 0.1s ease-out, transform 0.1s ease-out'
        }}
      >
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Everything You Need
          </h2>
          <p className="text-sm text-muted-foreground">
            Complete resource intelligence platform
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
});

Features.displayName = "Features";

export default Features;
