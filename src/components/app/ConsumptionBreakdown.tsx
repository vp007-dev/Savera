import { useState, memo, useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Zap, Droplets } from "lucide-react";

const electricityData = [
  { name: "AC", value: 40, cost: 1800, color: "hsl(25, 95%, 53%)" },
  { name: "Water Heater", value: 18, cost: 810, color: "hsl(0, 72%, 51%)" },
  { name: "Fridge", value: 12, cost: 540, color: "hsl(195, 100%, 50%)" },
  { name: "Lights/Fans", value: 15, cost: 675, color: "hsl(145, 63%, 49%)" },
  { name: "TV/Other", value: 15, cost: 675, color: "hsl(280, 65%, 60%)" },
];

const waterData = [
  { name: "Shower/Bath", value: 35, cost: 700, liters: 6300, color: "hsl(195, 100%, 50%)" },
  { name: "Toilet", value: 30, cost: 600, liters: 5400, color: "hsl(195, 80%, 60%)" },
  { name: "Washing", value: 20, cost: 400, liters: 3600, color: "hsl(195, 60%, 70%)" },
  { name: "Kitchen", value: 10, cost: 200, liters: 1800, color: "hsl(195, 40%, 75%)" },
  { name: "Leaks", value: 5, cost: 100, liters: 900, color: "hsl(0, 72%, 51%)" },
];

const ConsumptionBreakdown = memo(() => {
  const [activeTab, setActiveTab] = useState<'electricity' | 'water'>('electricity');
  
  const { data, total, Icon } = useMemo(() => ({
    data: activeTab === 'electricity' ? electricityData : waterData,
    total: activeTab === 'electricity' ? 4500 : 2000,
    Icon: activeTab === 'electricity' ? Zap : Droplets
  }), [activeTab]);

  return (
    <div className="p-4 lg:p-6 rounded-3xl bento-card h-full">
      {/* Tab Switcher */}
      <div className="flex items-center gap-2 p-1 bg-muted/50 rounded-2xl mb-4 lg:mb-6 max-w-md">
        <button
          onClick={() => setActiveTab('electricity')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm lg:text-base font-medium transition-all duration-150 ${
            activeTab === 'electricity' 
              ? 'bg-card shadow-md text-foreground' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Zap className="w-4 h-4" />
          Electricity
        </button>
        <button
          onClick={() => setActiveTab('water')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm lg:text-base font-medium transition-all duration-150 ${
            activeTab === 'water' 
              ? 'bg-card shadow-md text-foreground' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Droplets className="w-4 h-4" />
          Water
        </button>
      </div>
      
      {/* Chart with center label */}
      <div className="relative h-48 lg:h-56">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-muted-foreground mb-1" />
          <p className="text-2xl lg:text-3xl font-bold text-foreground">₹{total.toLocaleString()}</p>
          <p className="text-xs lg:text-sm text-muted-foreground">This month</p>
        </div>
      </div>
      
      {/* Legend - scrollable list */}
      <div className="mt-4 lg:mt-6 space-y-2">
        {data.map((item) => (
          <div 
            key={item.name}
            className="flex items-center justify-between p-2.5 lg:p-3 rounded-2xl bg-muted/30 hover:bg-muted/50 active:bg-muted/50 transition-colors duration-150 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm lg:text-base text-foreground">{item.name}</span>
            </div>
            <div className="text-right">
              <p className="text-sm lg:text-base font-semibold text-foreground">₹{item.cost}</p>
              <p className="text-[10px] lg:text-xs text-muted-foreground">{item.value}%</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Alert */}
      <div className={`mt-4 lg:mt-6 p-3 lg:p-4 rounded-2xl ${activeTab === 'electricity' ? 'bg-energy/10 border border-energy/20' : 'bg-destructive/10 border border-destructive/20'}`}>
        <p className="text-xs lg:text-sm text-foreground">
          {activeTab === 'electricity' 
            ? "💡 AC uses 40% of your electricity. Set to 26°C to save ₹300/month."
            : "🚿 Possible toilet leak detected. Fix to save ₹400/month."
          }
        </p>
      </div>
    </div>
  );
});

ConsumptionBreakdown.displayName = "ConsumptionBreakdown";

export default ConsumptionBreakdown;
