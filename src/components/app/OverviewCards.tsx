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
    <div className="space-y-3 lg:space-y-4">
      {/* All 4 cards in a responsive grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        {cards.map((card, index) => (
          <div 
            key={card.title}
            className={`p-4 lg:p-5 rounded-3xl border bento-card ${card.colorClass} active:scale-[0.98] hover:scale-[1.02] transition-transform duration-150`}
          >
            <div className="flex items-center gap-2 mb-2 lg:mb-3">
              <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-xl ${card.iconBg} flex items-center justify-center`}>
                <card.icon className={`w-4 h-4 lg:w-5 lg:h-5 ${card.iconColor}`} />
              </div>
              {index < 2 ? (
                <span className={`text-[10px] lg:text-xs font-semibold px-1.5 py-0.5 rounded-full ${
                  card.changeType === 'positive' 
                    ? 'bg-success/20 text-success' 
                    : 'bg-destructive/20 text-destructive'
                }`}>
                  {card.change}
                </span>
              ) : (
                <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
              )}
            </div>
            
            <p className="text-xl lg:text-2xl font-bold text-foreground">
              <AnimatedValue value={card.numValue} prefix={card.prefix} />
            </p>
            <p className="text-xs lg:text-sm text-muted-foreground">{card.title}</p>
            
            {/* Bottom info */}
            <div className="mt-2 pt-2 border-t border-border/50">
              {card.units && card.waste && (
                <p className="text-[10px] lg:text-xs text-muted-foreground">
                  {card.units} • <span className="text-destructive">{card.waste} waste</span>
                </p>
              )}
              {card.projected && (
                <p className="text-[10px] lg:text-xs text-success">{card.projected}</p>
              )}
              {card.action && (
                <p className="text-[10px] lg:text-xs text-primary font-medium">{card.action} →</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

OverviewCards.displayName = "OverviewCards";

export default OverviewCards;
