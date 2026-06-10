import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

export default function TransitionWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef(location.pathname);

  useEffect(() => {
    if (location.pathname !== locationRef.current) {
      const activePath = location.pathname;
      locationRef.current = activePath;

      const tl = gsap.timeline({
        onComplete: () => {
          setDisplayChildren(children);
          window.scrollTo(0, 0);

          // Incoming page slides/clips in from bottom
          gsap.fromTo(
            containerRef.current,
            { clipPath: 'inset(100% 0 0% 0)' },
            { clipPath: 'inset(0% 0 0% 0)', duration: 0.5, ease: 'power3.out' }
          );
        }
      });

      // Thin gold line sweeping left to right during transition
      tl.fromTo(
        lineRef.current,
        { left: '0%', width: '0%', opacity: 1 },
        { width: '100%', duration: 0.4, ease: 'power2.inOut' }
      )
      // Outgoing page clips up
      .fromTo(
        containerRef.current,
        { clipPath: 'inset(0% 0 0% 0)' },
        { clipPath: 'inset(0% 0 100% 0)', duration: 0.45, ease: 'power3.in' },
        0
      )
      // Sweep indicator relocates to right
      .to(lineRef.current, {
        left: '100%',
        width: '0%',
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in'
      });
    } else {
      // Just keep in sync if initial load or same page navigation
      setDisplayChildren(children);
    }
  }, [location.pathname, children]);

  return (
    <>
      {/* Sweeping Indicator */}
      <div
        ref={lineRef}
        className="fixed top-0 left-0 h-[3px] bg-[#B8975A] z-[999] pointer-events-none"
        style={{ width: '0%', left: '0%', opacity: 0 }}
      />
      {/* Viewport Transition Container */}
      <div
        ref={containerRef}
        style={{ clipPath: 'inset(0% 0 0% 0)' }}
        className="relative min-h-screen"
      >
        {displayChildren}
      </div>
    </>
  );
}
