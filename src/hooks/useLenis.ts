import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let lenisInstance: Lenis | null = null;

export function useLenis() {
  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    if (!lenisInstance && typeof window !== 'undefined') {
      lenisInstance = new Lenis({
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        // "Lenis: disable lerp on mobile"
        lerp: isMobile ? 1.0 : 0.1,
        syncTouch: true,
      });

      // Synchronize Lenis with GSAP's scroll trigger updates
      lenisInstance.on('scroll', ScrollTrigger.update);

      // Synchronize Lenis with GSAP's ticker
      const tickHandler = (time: number) => {
        lenisInstance?.raf(time * 1000);
      };

      gsap.ticker.add(tickHandler);

      // Clean up ref mapping
      (lenisInstance as any)._tickerHandler = tickHandler;
    }

    return () => {
      // In a SPA, we preserve the instance across soft routing.
    };
  }, []);

  return lenisInstance;
}

export function getLenis() {
  return lenisInstance;
}
