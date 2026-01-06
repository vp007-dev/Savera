import { Leaf, TreeDeciduous, Droplets, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const ImpactTracker = () => {
  const stats = [
    { icon: Zap, label: "Energy Saved", value: "90 units", subtext: "0.18 tons CO₂", color: "bg-energy/20", textColor: "text-energy-foreground" },
    { icon: Droplets, label: "Water Saved", value: "3,600L", subtext: "20% reduction", color: "bg-water/20", textColor: "text-water-foreground" },
    { icon: TreeDeciduous, label: "Trees Equivalent", value: "3 trees", subtext: "This month", color: "bg-success/20", textColor: "text-success" },
    { icon: Leaf, label: "Money Saved", value: "₹1,300", subtext: "₹15.6K/year", color: "bg-primary/20", textColor: "text-primary" },
  ];

  const carbonFootprint = {
    previous: 3.2,
    current: 1.8,
    target: 1.5,
    progress: 70
  };

  return (
    <div className="space-y-4">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat) => (
          <div 
            key={stat.label}
            className="p-4 rounded-2xl glass text-center"
          >
            <div className={`w-10 h-10 mx-auto rounded-xl ${stat.color} flex items-center justify-center mb-2`}>
              <stat.icon className={`w-5 h-5 ${stat.textColor}`} />
            </div>
            <p className="text-xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
            <p className="text-[10px] text-primary mt-1">{stat.subtext}</p>
          </div>
        ))}
      </div>
      
      {/* Carbon Footprint */}
      <div className="p-4 rounded-2xl glass">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <Leaf className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Carbon Footprint</h3>
            <p className="text-xs text-muted-foreground">Your sustainability journey</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">Progress to target</span>
              <span className="font-medium text-foreground">{carbonFootprint.progress}%</span>
            </div>
            <Progress value={carbonFootprint.progress} className="h-2.5" />
          </div>
          
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 rounded-lg bg-destructive/10">
              <p className="text-sm font-bold text-destructive">{carbonFootprint.previous}</p>
              <p className="text-[10px] text-muted-foreground">Previous</p>
            </div>
            <div className="p-2 rounded-lg bg-primary/10">
              <p className="text-sm font-bold text-primary">{carbonFootprint.current}</p>
              <p className="text-[10px] text-muted-foreground">Current</p>
            </div>
            <div className="p-2 rounded-lg bg-success/10">
              <p className="text-sm font-bold text-success">{carbonFootprint.target}</p>
              <p className="text-[10px] text-muted-foreground">Target</p>
            </div>
          </div>
          
          <p className="text-xs text-center text-muted-foreground">
            tons CO₂/year • You're <span className="text-primary font-medium">below average!</span>
          </p>
        </div>
      </div>
      
      {/* Annual Projection */}
      <div className="p-4 rounded-2xl glass-strong">
        <h3 className="text-sm font-semibold text-foreground mb-3">Annual Projection</h3>
        <div className="grid grid-cols-4 gap-2">
          <div className="p-2 rounded-lg bg-primary/10 text-center">
            <p className="text-lg font-bold text-primary">1.8</p>
            <p className="text-[10px] text-muted-foreground">tons CO₂</p>
          </div>
          <div className="p-2 rounded-lg bg-water/10 text-center">
            <p className="text-lg font-bold text-water">43K</p>
            <p className="text-[10px] text-muted-foreground">liters</p>
          </div>
          <div className="p-2 rounded-lg bg-success/10 text-center">
            <p className="text-lg font-bold text-success">₹15K</p>
            <p className="text-[10px] text-muted-foreground">saved</p>
          </div>
          <div className="p-2 rounded-lg bg-accent text-center">
            <p className="text-lg font-bold text-accent-foreground">30</p>
            <p className="text-[10px] text-muted-foreground">trees</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactTracker;
