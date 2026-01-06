import { memo, useMemo } from "react";
import { 
  Thermometer, 
  Wrench, 
  Timer, 
  ShowerHead, 
  CheckCircle,
  ChevronRight
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const recommendations = [
  {
    id: 1,
    icon: Thermometer,
    title: "Set AC to 26°C",
    description: "Each degree saves 6% energy",
    savings: "₹300/mo",
    type: "electricity",
    tag: "Quick Win",
    tagColor: "bg-success/20 text-success",
    completed: false
  },
  {
    id: 2,
    icon: Wrench,
    title: "Fix Toilet Leak",
    description: "Wasting 200L daily",
    savings: "₹400/mo",
    type: "water",
    tag: "High Impact",
    tagColor: "bg-primary/20 text-primary",
    completed: false
  },
  {
    id: 3,
    icon: Timer,
    title: "Water Heater Timer",
    description: "Turn off 11PM-6AM",
    savings: "₹400/mo",
    type: "electricity",
    tag: "Completed",
    tagColor: "bg-muted text-muted-foreground",
    completed: true
  },
  {
    id: 4,
    icon: ShowerHead,
    title: "Shorter Showers",
    description: "7 min instead of 12",
    savings: "₹300/mo",
    type: "water",
    tag: "Quick Win",
    tagColor: "bg-success/20 text-success",
    completed: false
  }
];

const RecommendationsList = memo(() => {
  const progress = useMemo(() => {
    const completed = recommendations.filter(r => r.completed).length;
    return (completed / recommendations.length) * 100;
  }, []);

  return (
    <div className="p-4 rounded-3xl bento-card">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">Recommendations</h3>
          <p className="text-xs text-muted-foreground">₹1,400/mo potential savings</p>
        </div>
        <span className="text-xs text-primary font-medium">See all</span>
      </div>
      
      {/* Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-muted-foreground">Progress</span>
          <span className="text-xs font-medium text-foreground">1/4 done</span>
        </div>
        <Progress value={progress} className="h-1.5" />
      </div>
      
      {/* List */}
      <div className="space-y-2">
        {recommendations.map((rec) => (
          <div 
            key={rec.id}
            className={`flex items-center gap-3 p-3 rounded-2xl border transition-all duration-150 active:scale-[0.98] ${
              rec.completed 
                ? 'bg-success/5 border-success/20' 
                : 'bg-card border-border hover:border-primary/30'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
              rec.type === 'electricity' ? 'bg-energy/20' : 'bg-water/20'
            }`}>
              {rec.completed ? (
                <CheckCircle className="w-5 h-5 text-success" />
              ) : (
                <rec.icon className={`w-5 h-5 ${
                  rec.type === 'electricity' ? 'text-energy' : 'text-water'
                }`} />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className={`text-sm font-medium ${rec.completed ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                  {rec.title}
                </h4>
              </div>
              <p className="text-xs text-muted-foreground truncate">{rec.description}</p>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-primary">{rec.savings}</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

RecommendationsList.displayName = "RecommendationsList";

export default RecommendationsList;
