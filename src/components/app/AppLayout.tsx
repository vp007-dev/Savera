import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Home, 
  BarChart3, 
  Lightbulb, 
  Trophy, 
  Leaf, 
  Settings,
  Menu,
  X,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { icon: Home, label: "Dashboard", path: "/dashboard" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
  { icon: Lightbulb, label: "Recommendations", path: "/recommendations" },
  { icon: Trophy, label: "Challenges", path: "/challenges" },
  { icon: Leaf, label: "Impact", path: "/impact" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

interface AppLayoutProps {
  children: React.ReactNode;
  currentPath: string;
}

const AppLayout = ({ children, currentPath }: AppLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 p-4 bg-card border-r border-border
        transform transition-transform duration-300 ease-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
                <Leaf className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground"><Savera></Savera></span>
            </div>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted/50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 space-y-1">
            {navItems.map((item) => {
              const isActive = currentPath === item.path || 
                (item.path === "/dashboard" && currentPath === "/app");
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                    transition-all duration-200
                    ${isActive 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                    }
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>
          
          {/* User Section */}
          <div className="pt-4 border-t border-border">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-sm font-semibold text-primary">RS</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">Rajesh Sharma</p>
                <p className="text-xs text-muted-foreground">Bangalore</p>
              </div>
            </div>
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="w-full mt-2 justify-start text-muted-foreground hover:text-destructive"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Exit Demo
            </Button>
          </div>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-30 p-4 bg-card/80 backdrop-blur-xl border-b border-border">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-muted/50"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <Leaf className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-foreground">Savera</span>
            </div>
            <div className="w-9" /> {/* Spacer for centering */}
          </div>
        </header>
        
        {/* Page Content */}
        <div className="p-4 lg:p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AppLayout;