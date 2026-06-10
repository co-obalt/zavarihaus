import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getLenis } from '../hooks/useLenis';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll window to top instantly
    window.scrollTo(0, 0);

    // Reset Lenis smooth scroll position immediately to prevent visual jumps
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }

    // Give a short delay for the DOM to mount/render on the new page, then recalculate ScrollTriggers
    const timer = setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
