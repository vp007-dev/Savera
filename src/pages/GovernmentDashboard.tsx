import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Building, 
  MapPin, 
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Bell,
  Send,
  Users,
  Zap,
  Droplets,
  ArrowLeft,
  Clock,
  BarChart3,
  Target,
  Leaf
} from "lucide-react";
import { AreaChart, Area, XAxis, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const GovernmentDashboard = () => {
  const navigate = useNavigate();
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const regions = [
    { name: "Koramangala", usage: 85, trend: -5 },
    { name: "HSR Layout", usage: 92, trend: +3 },
    { name: "Whitefield", usage: 78, trend: -8 },
    { name: "Indiranagar", usage: 88, trend: 0 },
    { name: "Marathahalli", usage: 95, trend: +7 },
  ];

  const peakDemandData = [
    { hour: "6AM", demand: 45 },
    { hour: "9AM", demand: 72 },
    { hour: "12PM", demand: 85 },
    { hour: "3PM", demand: 92 },
    { hour: "6PM", demand: 98 },
    { hour: "9PM", demand: 75 },
    { hour: "12AM", demand: 40 },
  ];

  const activeAlerts = [
    { id: 1, type: "warning", message: "High demand expected 5-8 PM today", region: "All Regions", time: "1h ago" },
    { id: 2, type: "info", message: "Water conservation advisory active", region: "South Bangalore", time: "3h ago" },
    { id: 3, type: "emergency", message: "Power grid maintenance scheduled", region: "Whitefield", time: "5h ago" },
  ];

  const impactMetrics = {
    households: 45000,
    energySaved: 2500000,
    waterSaved: 180000000,
    co2Reduced: 1800,
  };

  const handleSendNotification = () => {
    toast({
      title: "Notification sent",
      description: "Public notification has been broadcast to all users",
    });
    setShowNotificationModal(false);
    setNotificationMessage("");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="p-4 lg:px-8 flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate("/")}
            className="w-10 h-10 rounded-xl glass flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
          </button>
          <div>
            <h1 className="text-lg lg:text-2xl font-bold text-foreground">BESCOM Admin</h1>
            <p className="text-xs lg:text-sm text-muted-foreground">Utility Dashboard</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            size="sm" 
            onClick={() => setShowNotificationModal(true)}
            className="rounded-xl text-xs lg:text-sm"
          >
            <Send className="w-3.5 h-3.5 mr-1.5" />
            Alert
          </Button>
        </div>
      </div>

      <div className="p-4 lg:p-8 space-y-4 lg:space-y-6 max-w-7xl mx-auto">
        {/* Impact Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          <div className="glass rounded-2xl p-4 lg:p-6">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 lg:w-5 lg:h-5 text-primary" />
              <span className="text-xs lg:text-sm text-muted-foreground">Active Users</span>
            </div>
            <p className="text-xl lg:text-3xl font-bold text-foreground">{(impactMetrics.households / 1000).toFixed(0)}K</p>
            <p className="text-xs lg:text-sm text-success">+12% this month</p>
          </div>
          <div className="glass rounded-2xl p-4 lg:p-6">
            <div className="flex items-center gap-2 mb-2">
              <Leaf className="w-4 h-4 lg:w-5 lg:h-5 text-success" />
              <span className="text-xs lg:text-sm text-muted-foreground">CO₂ Reduced</span>
            </div>
            <p className="text-xl lg:text-3xl font-bold text-foreground">{impactMetrics.co2Reduced} tons</p>
            <p className="text-xs lg:text-sm text-success">This year</p>
          </div>
          <div className="glass rounded-2xl p-4 lg:p-6 hidden lg:block">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-energy-foreground" />
              <span className="text-sm text-muted-foreground">Energy Saved</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{(impactMetrics.energySaved / 1000000).toFixed(1)}M</p>
            <p className="text-sm text-muted-foreground">kWh total</p>
          </div>
          <div className="glass rounded-2xl p-4 lg:p-6 hidden lg:block">
            <div className="flex items-center gap-2 mb-2">
              <Droplets className="w-5 h-5 text-water-foreground" />
              <span className="text-sm text-muted-foreground">Water Saved</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{(impactMetrics.waterSaved / 1000000).toFixed(0)}M</p>
            <p className="text-sm text-muted-foreground">liters total</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {/* Regional Usage */}
          <div className="glass rounded-2xl p-4 lg:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 lg:w-5 lg:h-5 text-primary" />
                <h3 className="text-sm lg:text-base font-semibold text-foreground">Regional Usage Trends</h3>
              </div>
              <span className="text-xs lg:text-sm text-muted-foreground">% of capacity</span>
            </div>
            <div className="space-y-3">
              {regions.map((region) => (
                <div key={region.name} className="flex items-center gap-3">
                  <span className="text-xs lg:text-sm text-foreground w-24 lg:w-32 truncate">{region.name}</span>
                  <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${
                        region.usage > 90 ? 'bg-destructive' : 
                        region.usage > 80 ? 'bg-accent-foreground' : 'bg-primary'
                      }`}
                      style={{ width: `${region.usage}%` }}
                    />
                  </div>
                  <div className={`flex items-center gap-0.5 text-xs lg:text-sm font-medium w-12 justify-end ${
                    region.trend > 0 ? 'text-destructive' : 
                    region.trend < 0 ? 'text-success' : 'text-muted-foreground'
                  }`}>
                    {region.trend > 0 ? <TrendingUp className="w-3 h-3" /> : 
                     region.trend < 0 ? <TrendingDown className="w-3 h-3" /> : null}
                    {region.trend > 0 ? '+' : ''}{region.trend}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Peak Demand */}
          <div className="glass rounded-2xl p-4 lg:p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-4 h-4 lg:w-5 lg:h-5 text-energy-foreground" />
              <h3 className="text-sm lg:text-base font-semibold text-foreground">Today's Peak Demand</h3>
            </div>
            <div className="h-32 lg:h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={peakDemandData}>
                  <XAxis dataKey="hour" tick={{ fontSize: 9 }} tickLine={false} axisLine={false} />
                  <Bar dataKey="demand" fill="hsl(45 85% 65%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-between mt-2 text-xs lg:text-sm">
              <span className="text-muted-foreground">Current: <span className="text-foreground font-medium">85%</span></span>
              <span className="text-destructive font-medium">Peak expected: 6 PM (98%)</span>
            </div>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {/* Active Alerts */}
          <div className="glass rounded-2xl p-4 lg:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 lg:w-5 lg:h-5 text-destructive" />
                <h3 className="text-sm lg:text-base font-semibold text-foreground">Active Alerts</h3>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-destructive/10 text-destructive text-xs lg:text-sm font-medium">
                {activeAlerts.length} active
              </span>
            </div>
            <div className="space-y-2">
              {activeAlerts.map((alert) => (
                <div 
                  key={alert.id}
                  className={`flex items-start gap-3 p-3 lg:p-4 rounded-xl ${
                    alert.type === "emergency" ? 'bg-destructive/10 border border-destructive/20' :
                    alert.type === "warning" ? 'bg-accent' : 'bg-muted/30'
                  }`}
                >
                  <AlertTriangle className={`w-4 h-4 lg:w-5 lg:h-5 shrink-0 mt-0.5 ${
                    alert.type === "emergency" ? 'text-destructive' :
                    alert.type === "warning" ? 'text-accent-foreground' : 'text-muted-foreground'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs lg:text-sm text-foreground">{alert.message}</p>
                    <div className="flex items-center gap-2 mt-1 text-[10px] lg:text-xs text-muted-foreground">
                      <span>{alert.region}</span>
                      <span>•</span>
                      <span>{alert.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Impact Metrics - Mobile visible */}
          <div className="glass rounded-2xl p-4 lg:p-6">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-4 h-4 lg:w-5 lg:h-5 text-primary" />
              <h3 className="text-sm lg:text-base font-semibold text-foreground">Platform Impact</h3>
            </div>
            <div className="grid grid-cols-2 gap-3 lg:gap-4">
              <div className="p-3 lg:p-4 rounded-xl bg-energy/10">
                <Zap className="w-4 h-4 lg:w-5 lg:h-5 text-energy-foreground mb-1" />
                <p className="text-lg lg:text-2xl font-bold text-foreground">
                  {(impactMetrics.energySaved / 1000000).toFixed(1)}M
                </p>
                <p className="text-[10px] lg:text-sm text-muted-foreground">kWh saved</p>
              </div>
              <div className="p-3 lg:p-4 rounded-xl bg-water/10">
                <Droplets className="w-4 h-4 lg:w-5 lg:h-5 text-water-foreground mb-1" />
                <p className="text-lg lg:text-2xl font-bold text-foreground">
                  {(impactMetrics.waterSaved / 1000000).toFixed(0)}M
                </p>
                <p className="text-[10px] lg:text-sm text-muted-foreground">liters saved</p>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="p-3 lg:p-4 rounded-xl bg-muted/50 border border-border">
          <p className="text-[10px] lg:text-xs text-muted-foreground text-center">
            ⚠️ <strong>Decision support & communication only.</strong> This dashboard provides insights and enables public communication. Actual grid control requires authorized SCADA systems.
          </p>
        </div>
      </div>

      {/* Notification Modal */}
      {showNotificationModal && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-end lg:items-center justify-center p-4">
          <div className="glass rounded-2xl p-6 w-full max-w-sm lg:max-w-md animate-slide-up">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Send className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg lg:text-xl font-semibold text-foreground">Send Public Alert</h3>
                <p className="text-xs lg:text-sm text-muted-foreground">Broadcast to all users</p>
              </div>
            </div>
            <Textarea
              placeholder="Type your notification message..."
              value={notificationMessage}
              onChange={(e) => setNotificationMessage(e.target.value)}
              className="mb-4 min-h-[100px] lg:min-h-[120px] rounded-xl"
            />
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => setShowNotificationModal(false)}
                className="flex-1 rounded-xl lg:h-12"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSendNotification}
                className="flex-1 rounded-xl lg:h-12"
              >
                Send Alert
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GovernmentDashboard;
