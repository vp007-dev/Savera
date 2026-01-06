import { useEffect, useState, useCallback, useRef } from "react";

export const useParallax = (speed: number = 0.5) => {
  const [offset, setOffset] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const ticking = useRef(false);

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(() => {
        if (elementRef.current) {
          const rect = elementRef.current.getBoundingClientRect();
          const scrolled = window.scrollY;
          const elementTop = rect.top + scrolled;
          const relativeScroll = scrolled - elementTop + window.innerHeight;
          setOffset(relativeScroll * speed);
        }
        ticking.current = false;
      });
      ticking.current = true;
    }
  }, [speed]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return { offset, elementRef };
};

export const useScrollFade = () => {
  const [opacity, setOpacity] = useState(0);
  const [translateY, setTranslateY] = useState(30);
  const elementRef = useRef<HTMLDivElement>(null);
  const ticking = useRef(false);

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(() => {
        if (elementRef.current) {
          const rect = elementRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const elementVisible = 150;
          
          if (rect.top < windowHeight - elementVisible) {
            const progress = Math.min(1, (windowHeight - rect.top) / (windowHeight * 0.4));
            setOpacity(progress);
            setTranslateY(30 * (1 - progress));
          }
        }
        ticking.current = false;
      });
      ticking.current = true;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return { opacity, translateY, elementRef };
};
