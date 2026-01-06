import { memo } from "react";
import { Zap, Droplets, TrendingDown, AlertTriangle, ChevronRight } from "lucide-react";
import { useCountUp } from "@/hooks/use-count-up";

const AnimatedValue = memo(({ value, prefix = "" }: { value: number; prefix?: string }) => {
  const { count, ref } = useCountUp(value, 800);
  return <span ref={ref}>{prefix}{count.toLocaleString('en-IN')}</span>;
});
AnimatedValue.displayName = "AnimatedValue";

const OverviewCards = memo(() => {
  const cards = [
    {
      title: "Electricity",
      numValue: 4500,
      prefix: "₹",
      change: "-12%",
      changeType: "positive" as const,
      icon: Zap,
      units: "450 units",
      waste: "35%",
      colorClass: "card-energy",
      iconBg: "bg-energy/20",
      iconColor: "text-energy"
    },
    {
      title: "Water",
      numValue: 2000,
      prefix: "₹",
      change: "-8%",
      changeType: "positive" as const,
      icon: Droplets,
      units: "18,000L",
      waste: "45%",
      colorClass: "card-water",
      iconBg: "bg-water/20",
      iconColor: "text-water"
    },
    {
      title: "Total Savings",
      numValue: 1300,
      prefix: "₹",
      change: "+18%",
      changeType: "positive" as const,
      icon: TrendingDown,
      subtitle: "This month",
      projected: "₹15,600/year",
      colorClass: "card-success",
      iconBg: "bg-success/20",
      iconColor: "text-success"
    },
    {
      title: "Waste Alert",
      numValue: 2475,
      prefix: "₹",
      change: "Preventable",
      changeType: "warning" as const,
      icon: AlertTriangle,
      subtitle: "Monthly waste",
      action: "See tips",
      colorClass: "card-accent",
      iconBg: "bg-destructive/20",
      iconColor: "text-destructive"
    }
  ];

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        {cards.slice(0, 2).map((card) => (
          <div 
            key={card.title}
            className={`p-4 rounded-3xl border bento-card ${card.colorClass} active:scale-[0.98] transition-transform duration-150`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-8 h-8 rounded-xl ${card.iconBg} flex items-center justify-center`}>
                <card.icon className={`w-4 h-4 ${card.iconColor}`} />
              </div>
              <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                card.changeType === 'positive' 
                  ? 'bg-success/20 text-success' 
                  : 'bg-destructive/20 text-destructive'
              }`}>
                {card.change}
              </span>
            </div>
            
            <p className="text-xl font-bold text-foreground">
              <AnimatedValue value={card.numValue} prefix={card.prefix} />
            </p>
            <p className="text-xs text-muted-foreground">{card.title}</p>
            
            <div className="mt-2 pt-2 border-t border-border/50">
              <p className="text-[10px] text-muted-foreground">
                {card.units} • <span className="text-destructive">{card.waste} waste</span>
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
        {cards.slice(2).map((card) => (
          <div 
            key={card.title}
            className={`flex-shrink-0 w-[160px] p-4 rounded-3xl border bento-card ${card.colorClass} snap-start active:scale-[0.98] transition-transform duration-150`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`w-8 h-8 rounded-xl ${card.iconBg} flex items-center justify-center`}>
                <card.icon className={`w-4 h-4 ${card.iconColor}`} />
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
            
            <p className="text-lg font-bold text-foreground">
              <AnimatedValue value={card.numValue} prefix={card.prefix} />
            </p>
            <p className="text-xs text-muted-foreground">{card.title}</p>
            
            {card.projected && (
              <p className="text-[10px] text-success mt-1">{card.projected}</p>
            )}
            {card.action && (
              <p className="text-[10px] text-primary font-medium mt-1">{card.action} →</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
});

OverviewCards.displayName = "OverviewCards";

export default OverviewCards;
