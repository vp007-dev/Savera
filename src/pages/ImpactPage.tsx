import { useState, useCallback } from "react";
import MobileLayout from "@/components/app/MobileLayout";
import ImpactTracker from "@/components/app/ImpactTracker";
import PullToRefresh from "@/components/app/PullToRefresh";
import { usePullToRefresh } from "@/hooks/use-pull-to-refresh";
import { useSwipeNavigation } from "@/hooks/use-swipe-navigation";
import { Globe } from "lucide-react";
import { toast } from "sonner";

const routes = ["/dashboard", "/challenges", "/impact", "/settings"];

const ImpactPage = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = useCallback(async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshKey(prev => prev + 1);
    toast.success("Impact data updated!", { duration: 2000 });
  }, []);

  const { isRefreshing, pullDistance, onTouchStart, onTouchMove, onTouchEnd } = usePullToRefresh({
    onRefresh: handleRefresh,
  });

  const { onTouchStart: swipeStart, onTouchEnd: swipeEnd } = useSwipeNavigation({
    routes,
    currentPath: "/impact",
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
    <MobileLayout currentPath="/impact">
      <div 
        className="space-y-4"
        onTouchStart={handleTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <PullToRefresh isRefreshing={isRefreshing} pullDistance={pullDistance} />
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">Your Impact</h1>
            <p className="text-xs text-muted-foreground">Environmental contribution</p>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-success/20">
            <Globe className="w-4 h-4 text-success" />
            <span className="text-sm font-semibold text-success">A Grade</span>
          </div>
        </div>
        
        <ImpactTracker key={`impact-${refreshKey}`} />
      </div>
    </MobileLayout>
  );
};

export default ImpactPage;
