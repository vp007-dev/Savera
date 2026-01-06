import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Home, 
  BarChart3, 
  Trophy, 
  Leaf, 
  User
} from "lucide-react";

const navItems = [
  { icon: Home, label: "Home", path: "/dashboard" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
  { icon: Trophy, label: "Challenges", path: "/challenges" },
  { icon: Leaf, label: "Impact", path: "/impact" },
  { icon: User, label: "Profile", path: "/settings" },
];

interface MobileLayoutProps {
  children: React.ReactNode;
  currentPath: string;
}

const MobileLayout = memo(({ children, currentPath }: MobileLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Main Content - with bottom padding for nav */}
      <main className="flex-1 overflow-y-auto pb-20">
        <div className="p-4 pb-6">
          {children}
        </div>
      </main>
      
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-t border-border safe-area-bottom">
        <div className="flex items-center justify-around py-2 px-2">
          {navItems.map((item) => {
            const isActive = currentPath === item.path || 
              (item.path === "/dashboard" && currentPath === "/app") ||
              (item.path === "/analytics" && currentPath === "/recommendations");
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`
                  flex flex-col items-center justify-center gap-1 py-2 px-4 rounded-2xl min-w-[64px]
                  transition-all duration-150 active:scale-95
                  ${isActive 
                    ? 'text-primary' 
                    : 'text-muted-foreground'
                  }
                `}
              >
                <div className={`p-1.5 rounded-xl transition-colors duration-150 ${isActive ? 'bg-primary/10 glow-primary' : ''}`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
});

MobileLayout.displayName = "MobileLayout";

export default MobileLayout;
