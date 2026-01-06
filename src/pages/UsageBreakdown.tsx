import { useState } from "react";
import MobileLayout from "@/components/app/MobileLayout";
import { 
  Zap, 
  Droplets, 
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Info
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const UsageBreakdown = () => {
  const [activeTab, setActiveTab] = useState<"electricity" | "water">("electricity");

  const electricityData = [
    { name: "Air Conditioning", value: 42, cost: 1193, icon: "❄️", trend: "+8%", warning: true },
    { name: "Refrigerator", value: 18, cost: 511, icon: "🧊", trend: "-2%", warning: false },
    { name: "Water Heater", value: 15, cost: 426, icon: "🔥", trend: "+3%", warning: false },
    { name: "Lighting", value: 12, cost: 341, icon: "💡", trend: "-5%", warning: false },
    { name: "Other Appliances", value: 13, cost: 369, icon: "🔌", trend: "0%", warning: false },
  ];

  const waterData = [
    { name: "Shower/Bath", value: 35, cost: 438, liters: 5250, icon: "🚿", trend: "+5%", warning: false },
    { name: "Toilet", value: 25, cost: 313, liters: 3750, icon: "🚽", trend: "0%", warning: false },
    { name: "Washing Machine", value: 20, cost: 250, liters: 3000, icon: "🧺", trend: "+12%", warning: true },
    { name: "Kitchen Sink", value: 12, cost: 150, liters: 1800, icon: "🚰", trend: "-3%", warning: false },
    { name: "Garden/Other", value: 8, cost: 100, liters: 1200, icon: "🌿", trend: "+2%", warning: false },
  ];

  const data = activeTab === "electricity" ? electricityData : waterData;
  const totalCost = data.reduce((sum, item) => sum + item.cost, 0);
  const colors = ["#4ade80", "#60a5fa", "#a78bfa", "#fbbf24", "#f472b6"];

  const comparison = {
    electricity: { average: 320, yours: 285, percentile: 35 },
    water: { average: 18000, yours: 15000, percentile: 28 },
  };

  const currentComparison = comparison[activeTab];

  return (
    <MobileLayout currentPath="/breakdown">
      <div className="space-y-4">
        {/* Header */}
        <div>
          <h1 className="text-xl font-bold text-foreground">Usage Breakdown</h1>
          <p className="text-xs text-muted-foreground">See where your resources go</p>
        </div>

        {/* Tabs */}
        <div className="glass rounded-xl p-1 flex">
          <button
            onClick={() => setActiveTab("electricity")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === "electricity" 
                ? 'bg-energy/20 text-energy-foreground' 
                : 'text-muted-foreground'
            }`}
          >
            <Zap className="w-4 h-4" />
            Electricity
          </button>
          <button
            onClick={() => setActiveTab("water")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === "water" 
                ? 'bg-water/20 text-water-foreground' 
                : 'text-muted-foreground'
            }`}
          >
            <Droplets className="w-4 h-4" />
            Water
          </button>
        </div>

        {/* Chart */}
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-muted-foreground">Total Monthly</p>
              <p className="text-2xl font-bold text-foreground">₹{totalCost.toLocaleString()}</p>
            </div>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              activeTab === "electricity" ? "bg-energy/20" : "bg-water/20"
            }`}>
              {activeTab === "electricity" 
                ? <Zap className="w-5 h-5 text-energy-foreground" />
                : <Droplets className="w-5 h-5 text-water-foreground" />
              }
            </div>
          </div>

          <div className="h-48 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {data.map((_, index) => (
                    <Cell key={index} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">
                  {activeTab === "electricity" ? "285" : "15K"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {activeTab === "electricity" ? "kWh" : "Liters"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Breakdown List */}
        <div className="glass rounded-2xl p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">
            {activeTab === "electricity" ? "Appliance" : "Fixture"} Breakdown
          </h3>
          <div className="space-y-3">
            {data.map((item, index) => (
              <div 
                key={item.name}
                className={`flex items-center gap-3 p-3 rounded-xl ${
                  item.warning ? 'bg-destructive/5 border border-destructive/20' : 'bg-muted/30'
                }`}
              >
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: colors[index] }}
                />
                <span className="text-xl">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                    {item.warning && (
                      <AlertTriangle className="w-3.5 h-3.5 text-destructive shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {item.value}% • ₹{item.cost}
                    {activeTab === "water" && ` • ${(item as any).liters?.toLocaleString()}L`}
                  </p>
                </div>
                <div className={`flex items-center gap-0.5 text-xs font-medium ${
                  item.trend.startsWith('+') ? 'text-destructive' : 
                  item.trend.startsWith('-') ? 'text-success' : 'text-muted-foreground'
                }`}>
                  {item.trend.startsWith('+') ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : item.trend.startsWith('-') ? (
                    <TrendingDown className="w-3 h-3" />
                  ) : null}
                  {item.trend}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison */}
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-foreground">vs Similar Households</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Your usage</span>
              <span className="text-sm font-medium text-foreground">
                {activeTab === "electricity" ? `${currentComparison.yours} kWh` : `${(currentComparison.yours / 1000).toFixed(0)}K L`}
              </span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden relative">
              <div 
                className="absolute left-0 top-0 h-full bg-primary rounded-full transition-all"
                style={{ width: `${currentComparison.percentile}%` }}
              />
              <div 
                className="absolute top-0 h-full w-0.5 bg-muted-foreground/50"
                style={{ left: '50%' }}
              />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-success font-medium">
                Top {currentComparison.percentile}%
              </span>
              <span className="text-muted-foreground">
                Average: {activeTab === "electricity" ? `${currentComparison.average} kWh` : `${(currentComparison.average / 1000).toFixed(0)}K L`}
              </span>
            </div>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-success/5 border border-success/20">
            <p className="text-xs text-muted-foreground">
              🎉 You're using <span className="text-success font-medium">
                {activeTab === "electricity" 
                  ? `${currentComparison.average - currentComparison.yours} kWh`
                  : `${((currentComparison.average - currentComparison.yours) / 1000).toFixed(0)}K liters`
                }
              </span> less than average households in your area!
            </p>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default UsageBreakdown;
