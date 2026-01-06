import { RefreshCw } from "lucide-react";

interface PullToRefreshProps {
  isRefreshing: boolean;
  pullDistance: number;
  threshold?: number;
}

const PullToRefresh = ({ isRefreshing, pullDistance, threshold = 80 }: PullToRefreshProps) => {
  const progress = Math.min(pullDistance / threshold, 1);
  const shouldShow = pullDistance > 10 || isRefreshing;

  if (!shouldShow) return null;

  return (
    <div 
      className="flex items-center justify-center transition-all duration-200"
      style={{ 
        height: isRefreshing ? threshold : pullDistance,
        opacity: progress 
      }}
    >
      <div 
        className={`w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center ${
          isRefreshing ? 'animate-spin' : ''
        }`}
        style={{ 
          transform: isRefreshing ? 'none' : `rotate(${progress * 360}deg)` 
        }}
      >
        <RefreshCw className="w-4 h-4 text-primary" />
      </div>
    </div>
  );
};

export default PullToRefresh;
