import { useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface UseSwipeNavigationOptions {
  routes: string[];
  currentPath: string;
  threshold?: number;
}

export const useSwipeNavigation = ({ routes, currentPath, threshold = 50 }: UseSwipeNavigationOptions) => {
  const navigate = useNavigate();
  const startX = useRef(0);
  const startY = useRef(0);
  const isSwiping = useRef(false);

  const currentIndex = routes.findIndex(route => route === currentPath);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
    isSwiping.current = true;
  }, []);

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!isSwiping.current) return;
    isSwiping.current = false;

    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    
    const deltaX = endX - startX.current;
    const deltaY = endY - startY.current;

    // Only swipe if horizontal movement is greater than vertical
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > threshold) {
      if (deltaX > 0 && currentIndex > 0) {
        // Swipe right - go to previous
        navigate(routes[currentIndex - 1]);
      } else if (deltaX < 0 && currentIndex < routes.length - 1) {
        // Swipe left - go to next
        navigate(routes[currentIndex + 1]);
      }
    }
  }, [currentIndex, navigate, routes, threshold]);

  return {
    onTouchStart,
    onTouchEnd,
    currentIndex,
  };
};
