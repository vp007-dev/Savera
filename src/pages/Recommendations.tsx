import { useState } from "react";
import MobileLayout from "@/components/app/MobileLayout";
import { 
  Sparkles, 
  Clock, 
  Zap,
  Droplets,
  Check,
  Bell,
  Settings2,
  ChevronRight,
  TrendingDown,
  Lightbulb
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface Recommendation {
  id: string;
  title: string;
  description: string;
  savings: number;
  type: "electricity" | "water" | "both";
  effort: "quick" | "medium" | "long";
  icon: string;
  completed: boolean;
  reminded: boolean;
}

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([
    {
      id: "1",
      title: "Set AC to 24°C",
      description: "Each degree lower increases energy use by 3-4%. Optimize for comfort and savings.",
      savings: 420,
      type: "electricity",
      effort: "quick",
      icon: "❄️",
      completed: false,
      reminded: false,
    },
    {
      id: "2",
      title: "Fix leaky faucet",
      description: "A dripping faucet wastes up to 20 liters per day. Quick fix, big impact.",
      savings: 150,
      type: "water",
      effort: "quick",
      icon: "🔧",
      completed: false,
      reminded: false,
    },
    {
      id: "3",
      title: "Run full laundry loads",
      description: "Half loads use 50% more water and energy per item. Wait for full loads.",
      savings: 280,
      type: "both",
      effort: "quick",
      icon: "🧺",
      completed: true,
      reminded: false,
    },
    {
      id: "4",
      title: "Install LED bulbs",
      description: "LEDs use 75% less energy and last 25x longer than incandescent bulbs.",
      savings: 350,
      type: "electricity",
      effort: "medium",
      icon: "💡",
      completed: false,
      reminded: false,
    },
    {
      id: "5",
      title: "Install low-flow showerhead",
      description: "Reduce water use by 40% without noticing a difference in pressure.",
      savings: 380,
      type: "water",
      effort: "medium",
      icon: "🚿",
      completed: false,
      reminded: false,
    },
  ]);

  const [filter, setFilter] = useState<"all" | "quick" | "medium" | "long">("all");

  const handleComplete = (id: string) => {
    setRecommendations(prev => 
      prev.map(r => r.id === id ? { ...r, completed: !r.completed } : r)
    );
    toast({
      title: "Great job! 🎉",
      description: "Action marked as complete. Keep saving!",
    });
  };

  const handleRemind = (id: string) => {
    setRecommendations(prev => 
      prev.map(r => r.id === id ? { ...r, reminded: true } : r)
    );
    toast({
      title: "Reminder set",
      description: "We'll remind you about this action tomorrow.",
    });
  };

  const handleAutomate = (id: string) => {
    toast({
      title: "Automation available",
      description: "Connect smart devices to automate this action.",
    });
  };

  const filteredRecs = filter === "all" 
    ? recommendations 
    : recommendations.filter(r => r.effort === filter);

  const totalPotentialSavings = recommendations
    .filter(r => !r.completed)
    .reduce((sum, r) => sum + r.savings, 0);

  const completedCount = recommendations.filter(r => r.completed).length;

  const effortLabels = {
    quick: { label: "Quick Win", color: "bg-success/10 text-success", time: "< 5 min" },
    medium: { label: "Medium Effort", color: "bg-secondary/20 text-secondary-foreground", time: "1-2 hours" },
    long: { label: "Long-term", color: "bg-accent text-accent-foreground", time: "Weeks" },
  };

  return (
    <MobileLayout currentPath="/recommendations">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">AI Recommendations</h1>
            <p className="text-xs text-muted-foreground">Personalized actions to save more</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
        </div>

        {/* Summary */}
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-muted-foreground">Potential Monthly Savings</p>
              <p className="text-2xl font-bold text-primary">₹{totalPotentialSavings.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Completed</p>
              <p className="text-lg font-bold text-foreground">{completedCount}/{recommendations.length}</p>
            </div>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${(completedCount / recommendations.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {[
            { value: "all", label: "All" },
            { value: "quick", label: "Quick Wins" },
            { value: "medium", label: "Medium" },
            { value: "long", label: "Long-term" },
          ].map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value as any)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                filter === f.value 
                  ? 'bg-primary text-primary-foreground' 
                  : 'glass text-muted-foreground'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Recommendations List */}
        <div className="space-y-3">
          {filteredRecs.map((rec) => (
            <div 
              key={rec.id}
              className={`glass rounded-2xl p-4 transition-all ${
                rec.completed ? 'opacity-60' : ''
              }`}
            >
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl">{rec.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className={`text-sm font-semibold ${
                      rec.completed ? 'line-through text-muted-foreground' : 'text-foreground'
                    }`}>
                      {rec.title}
                    </h3>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                      effortLabels[rec.effort].color
                    }`}>
                      {effortLabels[rec.effort].label}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {rec.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {rec.type === "electricity" && <Zap className="w-3.5 h-3.5 text-energy-foreground" />}
                    {rec.type === "water" && <Droplets className="w-3.5 h-3.5 text-water-foreground" />}
                    {rec.type === "both" && (
                      <>
                        <Zap className="w-3.5 h-3.5 text-energy-foreground" />
                        <Droplets className="w-3.5 h-3.5 text-water-foreground" />
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {effortLabels[rec.effort].time}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-primary">
                  <TrendingDown className="w-4 h-4" />
                  <span className="text-sm font-semibold">₹{rec.savings}/mo</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={rec.completed ? "outline" : "default"}
                  onClick={() => handleComplete(rec.id)}
                  className="flex-1 h-9 rounded-xl text-xs"
                >
                  <Check className="w-3.5 h-3.5 mr-1.5" />
                  {rec.completed ? "Undo" : "Done"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleRemind(rec.id)}
                  disabled={rec.reminded}
                  className="h-9 rounded-xl text-xs px-3"
                >
                  <Bell className="w-3.5 h-3.5" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleAutomate(rec.id)}
                  className="h-9 rounded-xl text-xs px-3"
                >
                  <Settings2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* AI Tip */}
        <div className="glass rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Lightbulb className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground mb-1">AI Insight</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Based on your usage patterns, focusing on <span className="text-primary font-medium">AC optimization</span> could save you the most this summer. Your AC accounts for 42% of electricity use.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Recommendations;
