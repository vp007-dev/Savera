import { useState, useEffect } from "react";
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
import { alertStore, GovernmentAlert } from "@/lib/alertStore";

interface Alert {
  id: string;
  type: "outage" | "conservation" | "emergency" | "info";
  title: string;
  description: string;
  time: string;
  location?: string;
  read: boolean;
  resource?: "electricity" | "water";
  isGovernment?: boolean;
}

const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
};

const Alerts = () => {
  const [governmentAlerts, setGovernmentAlerts] = useState<GovernmentAlert[]>([]);
  
  // Subscribe to real-time government alerts
  useEffect(() => {
    const unsubscribe = alertStore.subscribe((alerts) => {
      setGovernmentAlerts(alerts);
    });
    return unsubscribe;
  }, []);

  const staticAlerts: Alert[] = [
    {
      id: "static-1",
      type: "outage",
      title: "Power Outage Reported",
      description: "BESCOM reports power outage in nearby areas. Estimated restoration: 4 PM today.",
      time: "5 hours ago",
      location: "HSR Layout",
      read: true,
      resource: "electricity",
    },
    {
      id: "static-2",
      type: "conservation",
      title: "Heat Wave Advisory",
      description: "High temperatures expected this week. Reduce AC usage during peak hours (2-6 PM) to prevent grid overload.",
      time: "1 day ago",
      read: true,
    },
  ];

  // Combine government alerts with static alerts
  const allAlerts: Alert[] = [
    ...governmentAlerts.map(ga => ({
      id: ga.id,
      type: ga.type,
      title: ga.title,
      description: ga.message,
      time: formatTimeAgo(ga.timestamp),
      read: ga.read,
      isGovernment: true,
    })),
    ...staticAlerts,
  ];

  const [preferences, setPreferences] = useState({
    outages: true,
    conservation: true,
    emergency: true,
    locationBased: true,
  });

  const markAsRead = (id: string, isGovernment?: boolean) => {
    if (isGovernment) {
      alertStore.markAsRead(id);
    }
  };

  const unreadCount = allAlerts.filter(a => !a.read).length;

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
            { label: "All", count: allAlerts.length },
            { label: "Emergency", count: allAlerts.filter(a => a.type === "emergency").length },
            { label: "Outages", count: allAlerts.filter(a => a.type === "outage").length },
            { label: "Conservation", count: allAlerts.filter(a => a.type === "conservation").length },
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
          {allAlerts.length === 0 ? (
            <div className="glass rounded-2xl p-8 text-center">
              <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No alerts yet</p>
              <p className="text-xs text-muted-foreground mt-1">Government alerts will appear here instantly</p>
            </div>
          ) : (
            allAlerts.map((alert) => {
              const style = getAlertStyle(alert.type);
              const Icon = style.icon;
              
              return (
                <div 
                  key={alert.id}
                  onClick={() => markAsRead(alert.id, alert.isGovernment)}
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
                      {alert.isGovernment && (
                        <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[9px] font-medium">
                          Gov Alert
                        </span>
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
          })
          )}
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
