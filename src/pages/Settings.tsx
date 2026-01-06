import MobileLayout from "@/components/app/MobileLayout";
import { User, Bell, Shield, Moon, Sun, Monitor, HelpCircle, LogOut, ChevronRight, Leaf, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/hooks/use-theme";
import { Switch } from "@/components/ui/switch";

const Settings = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const themeOptions = [
    { value: 'light' as const, label: 'Light', icon: Sun },
    { value: 'dark' as const, label: 'Dark', icon: Moon },
    { value: 'system' as const, label: 'System', icon: Monitor },
  ];
  
  const menuItems = [
    { icon: User, label: "Profile", description: "Rajesh Sharma", action: () => navigate("/family") },
    { icon: Bell, label: "Notifications", description: "Enabled", action: () => navigate("/alerts") },
    { icon: Shield, label: "Privacy", description: "Data & security", action: () => {} },
    { icon: HelpCircle, label: "Help & Support", description: "FAQ & contact", action: () => navigate("/help") },
  ];

  return (
    <MobileLayout currentPath="/settings">
      <div className="space-y-4">
        {/* Header */}
        <div>
          <h1 className="text-xl font-bold text-foreground">Profile</h1>
          <p className="text-xs text-muted-foreground">Account settings</p>
        </div>
        
        {/* User Card */}
        <div className="p-4 rounded-3xl bento-card">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center glow-primary">
              <span className="text-xl font-bold text-primary">RS</span>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-foreground">Rajesh Sharma</h2>
              <p className="text-sm text-muted-foreground">Bangalore, India</p>
              <div className="flex items-center gap-1.5 mt-1">
                <Leaf className="w-3 h-3 text-primary" />
                <span className="text-xs text-primary font-medium">Pro Member</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <div className="p-2 rounded-2xl bg-success/10">
              <p className="text-lg font-bold text-foreground">₹3K</p>
              <p className="text-[10px] text-muted-foreground">Saved</p>
            </div>
            <div className="p-2 rounded-2xl bg-primary/10">
              <p className="text-lg font-bold text-foreground">96</p>
              <p className="text-[10px] text-muted-foreground">Points</p>
            </div>
            <div className="p-2 rounded-2xl bg-water/10">
              <p className="text-lg font-bold text-foreground">3</p>
              <p className="text-[10px] text-muted-foreground">Badges</p>
            </div>
          </div>
        </div>

        {/* Theme Selector */}
        <div className="p-4 rounded-3xl bento-card">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-2xl bg-muted/50 flex items-center justify-center">
              {theme === 'dark' ? (
                <Moon className="w-5 h-5 text-muted-foreground" />
              ) : theme === 'light' ? (
                <Sun className="w-5 h-5 text-muted-foreground" />
              ) : (
                <Monitor className="w-5 h-5 text-muted-foreground" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Appearance</p>
              <p className="text-xs text-muted-foreground">Choose your theme</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            {themeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setTheme(option.value)}
                className={`relative flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-150 active:scale-95 ${
                  theme === option.value
                    ? 'bg-primary/10 border-2 border-primary glow-primary'
                    : 'bg-muted/30 border-2 border-transparent hover:border-border'
                }`}
              >
                <option.icon className={`w-5 h-5 ${
                  theme === option.value ? 'text-primary' : 'text-muted-foreground'
                }`} />
                <span className={`text-xs font-medium ${
                  theme === option.value ? 'text-primary' : 'text-muted-foreground'
                }`}>
                  {option.label}
                </span>
                {theme === option.value && (
                  <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-primary-foreground" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
        
        {/* Menu */}
        <div className="p-2 rounded-3xl bento-card">
          {menuItems.map((item, index) => (
            <button
              key={item.label}
              onClick={item.action}
              className={`w-full flex items-center gap-3 p-3 rounded-2xl active:bg-muted/50 transition-colors duration-150 ${
                index < menuItems.length - 1 ? 'border-b border-border/50' : ''
              }`}
            >
              <div className="w-10 h-10 rounded-2xl bg-muted/50 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          ))}
        </div>
        
        {/* Logout */}
        <button
          onClick={() => navigate("/")}
          className="w-full flex items-center gap-3 p-4 rounded-3xl bento-card border border-destructive/20 active:bg-destructive/5 transition-colors duration-150"
        >
          <div className="w-10 h-10 rounded-2xl bg-destructive/10 flex items-center justify-center">
            <LogOut className="w-5 h-5 text-destructive" />
          </div>
          <span className="text-sm font-medium text-destructive">Exit Demo</span>
        </button>
      </div>
    </MobileLayout>
  );
};

export default Settings;
