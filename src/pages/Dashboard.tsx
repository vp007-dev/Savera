import { useState, useCallback } from "react";
// 1. Import useNavigate
import { useNavigate } from "react-router-dom"; 
import MobileLayout from "@/components/app/MobileLayout";
import OverviewCards from "@/components/app/OverviewCards";
import ConsumptionBreakdown from "@/components/app/ConsumptionBreakdown";
import TrendChart from "@/components/app/TrendChart";
import RecommendationsList from "@/components/app/RecommendationsList";
import PullToRefresh from "@/components/app/PullToRefresh";
import { usePullToRefresh } from "@/hooks/use-pull-to-refresh";
import { useSwipeNavigation } from "@/hooks/use-swipe-navigation";
import { Bell, Leaf } from "lucide-react";
import { toast } from "sonner";

const routes = ["/dashboard", "/challenges", "/impact", "/settings"];

const Dashboard = () => {
  // 2. Initialize the hook
  const navigate = useNavigate(); 
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = useCallback(async () => {
    // Simulate data refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshKey(prev => prev + 1);
    toast.success("Data refreshed!", { duration: 2000 });
  }, []);

  const { isRefreshing, pullDistance, onTouchStart, onTouchMove, onTouchEnd } = usePullToRefresh({
    onRefresh: handleRefresh,
  });

  const { onTouchStart: swipeStart, onTouchEnd: swipeEnd } = useSwipeNavigation({
    routes,
    currentPath: "/dashboard",
  });

  const handleTouchStart = (e: React.TouchEvent) => {
    onTouchStart(e);
    swipeStart(e);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    onTouchEnd();
    swipeEnd(e);
  };

  return (
    <MobileLayout currentPath="/dashboard">
      <div 
        className="space-y-4"
        onTouchStart={handleTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <PullToRefresh isRefreshing={isRefreshing} pullDistance={pullDistance} />
        
        {/* Mobile Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <Leaf className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">EcoDash</span>
            </div>
            <p className="text-xs text-muted-foreground">Hi Rajesh! Dec 2025</p>
          </div>

          {/* 3. Add the onClick handler here */}
          <button 
            onClick={() => navigate("/alerts")}
            className="relative p-2.5 rounded-xl bg-card border border-border active:scale-95 transition-transform"
          >
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary" />
          </button>
        </div>
        
        {/* Overview Cards */}
        <OverviewCards key={`overview-${refreshKey}`} />
        
        {/* Consumption Breakdown */}
        <ConsumptionBreakdown key={`consumption-${refreshKey}`} />
        
        {/* Trend Chart */}
        <TrendChart key={`trend-${refreshKey}`} />
        
        {/* Recommendations */}
        <RecommendationsList key={`recommendations-${refreshKey}`} />
      </div>
    </MobileLayout>
  );
};

export default Dashboard;