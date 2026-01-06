import { useState } from "react";
import MobileLayout from "@/components/app/MobileLayout";
import { 
  Bell, 
  AlertTriangle,
  Zap,
  Droplets,
  Info,
  MapPin,
  Clock,
  CheckCircle2,
  ChevronRight,
  Settings,
  WifiOff
} from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface Alert {
  id: string;
  type: "outage" | "conservation" | "emergency" | "info";
  title: string;
  description: string;
  time: string;
  location?: string;
  read: boolean;
  resource?: "electricity" | "water";
}

const Alerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      type: "emergency",
      title: "Water Supply Disruption",
      description: "Scheduled maintenance will affect water supply in your area from 10 AM to 2 PM tomorrow.",
      time: "2 hours ago",
      location: "Koramangala, Bangalore",
      read: false,
      resource: "water",
    },
    {
      id: "2",
      type: "outage",
      title: "Power Outage Reported",
      description: "BESCOM reports power outage in nearby areas. Estimated restoration: 4 PM today.",
      time: "5 hours ago",
      location: "HSR Layout",
      read: false,
      resource: "electricity",
    },
    {
      id: "3",
      type: "conservation",
      title: "Heat Wave Advisory",
      description: "High temperatures expected this week. Reduce AC usage during peak hours (2-6 PM) to prevent grid overload.",
      time: "1 day ago",
      read: true,
    },
    {
      id: "4",
      type: "info",
      title: "Water Conservation Week",
      description: "Join the city-wide water conservation initiative. Reduce usage by 10% and earn bonus points!",
      time: "2 days ago",
      read: true,
      resource: "water",
    },
    {
      id: "5",
      type: "conservation",
      title: "Peak Demand Alert",
      description: "High electricity demand expected between 6-9 PM. Consider shifting heavy appliance use to off-peak hours.",
      time: "3 days ago",
      read: true,
      resource: "electricity",
    },
  ]);

  const [preferences, setPreferences] = useState({
    outages: true,
    conservation: true,
    emergency: true,
    locationBased: true,
  });

  const markAsRead = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, read: true } : a));
  };

  const unreadCount = alerts.filter(a => !a.read).length;

  const getAlertStyle = (type: string) => {
    switch (type) {
      case "emergency":
        return { bg: "bg-destructive/10", border: "border-destructive/30", icon: AlertTriangle, color: "text-destructive" };
      case "outage":
        return { bg: "bg-accent", border: "border-accent-foreground/20", icon: WifiOff, color: "text-accent-foreground" };
      case "conservation":
        return { bg: "bg-primary/10", border: "border-primary/30", icon: Info, color: "text-primary" };
      default:
        return { bg: "bg-muted", border: "border-border", icon: Bell, color: "text-muted-foreground" };
    }
  };

  return (
    <MobileLayout currentPath="/alerts">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">Alerts</h1>
            <p className="text-xs text-muted-foreground">
              {unreadCount > 0 ? `${unreadCount} unread notifications` : "All caught up!"}
            </p>
          </div>
          <div className="relative">
            <div className="w-10 h-10 rounded-xl glass flex items-center justify-center">
              <Settings className="w-5 h-5 text-muted-foreground" />
            </div>
            {unreadCount > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive flex items-center justify-center">
                <span className="text-[10px] font-bold text-destructive-foreground">{unreadCount}</span>
              </div>
            )}
          </div>
        </div>

        {/* Quick Filters */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {[
            { label: "All", count: alerts.length },
            { label: "Emergency", count: alerts.filter(a => a.type === "emergency").length },
            { label: "Outages", count: alerts.filter(a => a.type === "outage").length },
            { label: "Conservation", count: alerts.filter(a => a.type === "conservation").length },
          ].map((filter, i) => (
            <button
              key={filter.label}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                i === 0 ? 'bg-primary text-primary-foreground' : 'glass text-muted-foreground'
              }`}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>

        {/* Alerts List */}
        <div className="space-y-3">
          {alerts.map((alert) => {
            const style = getAlertStyle(alert.type);
            const Icon = style.icon;
            
            return (
              <div 
                key={alert.id}
                onClick={() => markAsRead(alert.id)}
                className={`glass rounded-2xl p-4 transition-all active:scale-[0.99] cursor-pointer ${
                  !alert.read ? 'ring-2 ring-primary/30' : 'opacity-80'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl ${style.bg} flex items-center justify-center shrink-0`}>
                    <Icon className={`w-5 h-5 ${style.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-foreground">{alert.title}</h3>
                      {!alert.read && (
                        <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                      {alert.description}
                    </p>
                    <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {alert.time}
                      </div>
                      {alert.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {alert.location}
                        </div>
                      )}
                      {alert.resource && (
                        <div className="flex items-center gap-1">
                          {alert.resource === "electricity" 
                            ? <Zap className="w-3 h-3 text-energy-foreground" />
                            : <Droplets className="w-3 h-3 text-water-foreground" />
                          }
                        </div>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Preferences */}
        <div className="glass rounded-2xl p-4">
          <h3 className="text-sm font-semibold text-foreground mb-4">Alert Preferences</h3>
          <div className="space-y-4">
            {[
              { key: "outages", label: "Utility Outages", desc: "Power and water disruptions" },
              { key: "conservation", label: "Conservation Advisories", desc: "Tips and peak demand alerts" },
              { key: "emergency", label: "Emergency Alerts", desc: "Critical notifications" },
              { key: "locationBased", label: "Location-based Alerts", desc: "Alerts for your area" },
            ].map((pref) => (
              <div key={pref.key} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{pref.label}</p>
                  <p className="text-xs text-muted-foreground">{pref.desc}</p>
                </div>
                <Switch
                  checked={preferences[pref.key as keyof typeof preferences]}
                  onCheckedChange={(checked) => 
                    setPreferences(prev => ({ ...prev, [pref.key]: checked }))
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* Offline Notice */}
        <div className="glass rounded-xl p-3 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
          <p className="text-xs text-muted-foreground">
            Emergency alerts are cached for offline access. You'll receive critical notifications even without internet.
          </p>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Alerts;
