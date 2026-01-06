import { useState } from "react";
import MobileLayout from "@/components/app/MobileLayout";
import { 
  Plug, 
  Power,
  Clock,
  Zap,
  Plus,
  Settings,
  ChevronRight,
  Thermometer,
  Lightbulb,
  Fan,
  Tv
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface Device {
  id: string;
  name: string;
  type: "ac" | "light" | "plug" | "fan" | "tv";
  room: string;
  isOn: boolean;
  power: number;
  schedule?: { on: string; off: string };
}

const SmartDevices = () => {
  const [devices, setDevices] = useState<Device[]>([
    { id: "1", name: "Living Room AC", type: "ac", room: "Living Room", isOn: true, power: 1200, schedule: { on: "06:00", off: "22:00" } },
    { id: "2", name: "Bedroom Light", type: "light", room: "Bedroom", isOn: false, power: 12 },
    { id: "3", name: "Kitchen Plug", type: "plug", room: "Kitchen", isOn: true, power: 450 },
    { id: "4", name: "Study Fan", type: "fan", room: "Study", isOn: true, power: 75, schedule: { on: "09:00", off: "18:00" } },
    { id: "5", name: "Living Room TV", type: "tv", room: "Living Room", isOn: false, power: 120 },
  ]);

  const [showScheduleModal, setShowScheduleModal] = useState<string | null>(null);
  const [automationRules] = useState([
    { id: "1", name: "Night Mode", description: "Turn off all lights at 11 PM", active: true },
    { id: "2", name: "Morning Routine", description: "Turn on AC at 6 AM", active: true },
    { id: "3", name: "Away Mode", description: "Reduce AC when no one home", active: false },
  ]);

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "ac": return Thermometer;
      case "light": return Lightbulb;
      case "fan": return Fan;
      case "tv": return Tv;
      default: return Plug;
    }
  };

  const toggleDevice = (id: string) => {
    setDevices(prev => prev.map(d => 
      d.id === id ? { ...d, isOn: !d.isOn } : d
    ));
    const device = devices.find(d => d.id === id);
    toast({
      title: device?.isOn ? "Device turned off" : "Device turned on",
      description: device?.name,
    });
  };

  const totalPower = devices.filter(d => d.isOn).reduce((sum, d) => sum + d.power, 0);
  const activeDevices = devices.filter(d => d.isOn).length;

  return (
    <MobileLayout currentPath="/devices">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">Smart Devices</h1>
            <p className="text-xs text-muted-foreground">
              {activeDevices} active • {totalPower}W in use
            </p>
          </div>
          <button className="w-10 h-10 rounded-xl glass flex items-center justify-center">
            <Plus className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Power Summary */}
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Current Power Draw</p>
              <p className="text-2xl font-bold text-foreground">{totalPower.toLocaleString()}W</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-energy/20 flex items-center justify-center">
              <Zap className="w-6 h-6 text-energy-foreground" />
            </div>
          </div>
          <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-energy rounded-full transition-all"
              style={{ width: `${Math.min((totalPower / 3000) * 100, 100)}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {((totalPower / 3000) * 100).toFixed(0)}% of typical household load
          </p>
        </div>

        {/* Device List */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">Your Devices</h3>
          {devices.map((device) => {
            const Icon = getDeviceIcon(device.type);
            return (
              <div 
                key={device.id}
                className={`glass rounded-2xl p-4 transition-all ${
                  device.isOn ? 'ring-2 ring-primary/30' : 'opacity-70'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    device.isOn ? 'bg-primary/10' : 'bg-muted'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      device.isOn ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{device.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {device.room} • {device.isOn ? `${device.power}W` : 'Off'}
                    </p>
                  </div>
                  <Switch
                    checked={device.isOn}
                    onCheckedChange={() => toggleDevice(device.id)}
                  />
                </div>

                {device.schedule && (
                  <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Schedule: {device.schedule.on} - {device.schedule.off}</span>
                    </div>
                    <button 
                      onClick={() => setShowScheduleModal(device.id)}
                      className="text-xs text-primary font-medium"
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Automation Rules */}
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">Automation Rules</h3>
            <button className="text-xs text-primary font-medium">+ Add Rule</button>
          </div>
          <div className="space-y-3">
            {automationRules.map((rule) => (
              <div 
                key={rule.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-muted/30"
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  rule.active ? 'bg-primary/10' : 'bg-muted'
                }`}>
                  <Settings className={`w-4 h-4 ${
                    rule.active ? 'text-primary' : 'text-muted-foreground'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{rule.name}</p>
                  <p className="text-xs text-muted-foreground">{rule.description}</p>
                </div>
                <Switch checked={rule.active} />
              </div>
            ))}
          </div>
        </div>

        {/* Note */}
        <div className="p-3 rounded-xl bg-muted/50 border border-border">
          <p className="text-[10px] text-muted-foreground text-center">
            🔌 Connect your smart home devices to enable automated control. Currently showing visual simulation.
          </p>
        </div>
      </div>
    </MobileLayout>
  );
};

export default SmartDevices;
