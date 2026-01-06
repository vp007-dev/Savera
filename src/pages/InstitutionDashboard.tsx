import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Building2, 
  Zap, 
  Droplets, 
  TrendingDown,
  TrendingUp,
  Calendar,
  FileText,
  AlertTriangle,
  Settings,
  ArrowLeft,
  Clock,
  Leaf
} from "lucide-react";
import { AreaChart, Area, XAxis, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Button } from "@/components/ui/button";

const InstitutionDashboard = () => {
  const navigate = useNavigate();
  const [activeBuilding, setActiveBuilding] = useState("main");

  const buildings = [
    { id: "main", name: "Main Building", floors: 5 },
    { id: "annex", name: "Annex", floors: 3 },
    { id: "cafeteria", name: "Cafeteria", floors: 1 },
  ];

  const consumptionData = [
    { month: "Jul", electricity: 12500, water: 45000 },
    { month: "Aug", electricity: 13200, water: 48000 },
    { month: "Sep", electricity: 11800, water: 42000 },
    { month: "Oct", electricity: 10500, water: 38000 },
    { month: "Nov", electricity: 9800, water: 35000 },
    { month: "Dec", electricity: 9200, water: 32000 },
  ];

  const automationSchedule = [
    { time: "06:00", action: "AC Pre-cool", status: "scheduled" },
    { time: "08:00", action: "Lights On (Auto)", status: "completed" },
    { time: "12:00", action: "HVAC Setback", status: "scheduled" },
    { time: "18:00", action: "Lights Off (Motion)", status: "scheduled" },
    { time: "22:00", action: "Night Mode", status: "scheduled" },
  ];

  const wasteEstimation = {
    electricity: { waste: 15, potential: 18500 },
    water: { waste: 12, potential: 8400 },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate("/")}
            className="w-10 h-10 rounded-xl glass flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-foreground">Green Valley School</h1>
            <p className="text-xs text-muted-foreground">Institution Dashboard</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Building2 className="w-4 h-4 text-primary" />
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Building Selector */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {buildings.map((building) => (
            <button
              key={building.id}
              onClick={() => setActiveBuilding(building.id)}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                activeBuilding === building.id 
                  ? 'bg-primary text-primary-foreground' 
                  : 'glass text-muted-foreground'
              }`}
            >
              {building.name}
            </button>
          ))}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="glass rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-energy-foreground" />
              <span className="text-xs text-muted-foreground">Electricity</span>
            </div>
            <p className="text-xl font-bold text-foreground">9,200 kWh</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingDown className="w-3 h-3 text-success" />
              <span className="text-xs text-success">-12% vs last month</span>
            </div>
          </div>
          <div className="glass rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Droplets className="w-4 h-4 text-water-foreground" />
              <span className="text-xs text-muted-foreground">Water</span>
            </div>
            <p className="text-xl font-bold text-foreground">32,000 L</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingDown className="w-3 h-3 text-success" />
              <span className="text-xs text-success">-8% vs last month</span>
            </div>
          </div>
        </div>

        {/* Consumption Trend */}
        <div className="glass rounded-2xl p-4">
          <h3 className="text-sm font-semibold text-foreground mb-4">6-Month Consumption Trend</h3>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={consumptionData}>
                <XAxis dataKey="month" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                <Area 
                  type="monotone" 
                  dataKey="electricity" 
                  stroke="hsl(45 85% 65%)" 
                  fill="hsl(45 85% 65% / 0.2)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Waste Estimation */}
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <h3 className="text-sm font-semibold text-foreground">Waste Estimation</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-xl bg-energy/10">
              <p className="text-xs text-muted-foreground mb-1">Electricity Waste</p>
              <p className="text-lg font-bold text-foreground">{wasteEstimation.electricity.waste}%</p>
              <p className="text-xs text-energy-foreground">
                ₹{wasteEstimation.electricity.potential.toLocaleString()}/year potential
              </p>
            </div>
            <div className="p-3 rounded-xl bg-water/10">
              <p className="text-xs text-muted-foreground mb-1">Water Waste</p>
              <p className="text-lg font-bold text-foreground">{wasteEstimation.water.waste}%</p>
              <p className="text-xs text-water-foreground">
                ₹{wasteEstimation.water.potential.toLocaleString()}/year potential
              </p>
            </div>
          </div>
        </div>

        {/* Automation Calendar */}
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Today's Automation</h3>
            </div>
            <span className="text-xs text-muted-foreground">Dec 15</span>
          </div>
          <div className="space-y-2">
            {automationSchedule.map((item, index) => (
              <div 
                key={index}
                className={`flex items-center gap-3 p-2 rounded-lg ${
                  item.status === "completed" ? 'bg-success/10' : 'bg-muted/30'
                }`}
              >
                <div className="flex items-center gap-2 min-w-[60px]">
                  <Clock className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs font-mono text-muted-foreground">{item.time}</span>
                </div>
                <span className="text-xs text-foreground flex-1">{item.action}</span>
                {item.status === "completed" && (
                  <div className="w-4 h-4 rounded-full bg-success flex items-center justify-center">
                    <Leaf className="w-2.5 h-2.5 text-success-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sustainability Report */}
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-foreground">Sustainability Report</h3>
              <p className="text-xs text-muted-foreground">December 2024 summary available</p>
            </div>
            <Button size="sm" variant="outline" className="rounded-xl">
              Preview
            </Button>
          </div>
        </div>

        {/* Note */}
        <div className="p-3 rounded-xl bg-muted/50 border border-border">
          <p className="text-[10px] text-muted-foreground text-center">
            📊 This dashboard is for decision support & monitoring only. Actual control requires integration with building management systems.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InstitutionDashboard;
