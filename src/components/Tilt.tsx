import React, { useRef, useEffect } from 'react';

interface TiltProps {
  children: React.ReactNode;
  max?: number;
  className?: string;
  id?: string;
}

export default function Tilt({ children, max = 6, className = '', id }: TiltProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const el = containerRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = (e.clientX - left) / width; // 0 to 1
      const y = (e.clientY - top) / height; // 0 to 1
      
      const tiltX = (max / 2 - x * max).toFixed(2);
      const tiltY = (y * max - max / 2).toFixed(2);

      el.style.transform = `perspective(1000px) rotateX(${tiltY}deg) rotateY(${tiltX}deg) scale3d(1.02, 1.02, 1.02)`;
      
      const glare = glareRef.current;
      if (glare) {
        glare.style.opacity = '0.12';
        const angle = Math.atan2(e.clientY - top - height / 2, e.clientX - left - width / 2) * (180 / Math.PI);
        glare.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
        glare.style.background = `linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 100%)`;
        glare.style.top = `${y * 100}%`;
        glare.style.left = `${x * 100}%`;
      }
    };

    const handleMouseLeave = () => {
      el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      const glare = glareRef.current;
      if (glare) {
        glare.style.opacity = '0';
      }
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [max]);

  return (
    <div
      ref={containerRef}
      className={`relative transition-transform duration-300 ease-out overflow-hidden ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
      id={id}
    >
      <div
        ref={glareRef}
        className="absolute w-[150%] h-[150%] pointer-events-none opacity-0 transition-opacity duration-300 rounded-full"
        style={{
          mixBlendMode: 'overlay',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      />
      {children}
    </div>
  );
}
