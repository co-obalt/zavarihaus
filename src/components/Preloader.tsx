import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import logo from '../../logo.png';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    // Disable body scroll while preloading
    document.body.style.overflow = 'hidden';

    const progressValue = { val: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to('#preloader-container', {
          opacity: 0,
          duration: 0.4,
          ease: 'power2.out',
          onComplete: () => {
            document.body.style.overflow = '';
            onComplete();
          }
        });
      }
    });

    // Animate percentage and progress bar concurrently
    tl.to(progressValue, {
      val: 100,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: () => {
        setPercentage(Math.floor(progressValue.val));
      }
    }, 0);

    tl.to('#preloader-bar-fill', {
      width: '100%',
      duration: 1.8,
      ease: 'power2.inOut'
    }, 0);

    return () => {
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <div
      id="preloader-container"
      className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-[#111009]"
    >
      <div className="flex flex-col items-center gap-4">
        {/* Above bar: Label */}
        <div className="flex items-center justify-center">
          <img src={logo} alt="Zavari Haus" className="h-10 w-auto object-contain opacity-80" />
        </div>

        {/* Progress track */}
        <div className="relative w-[240px] h-[2px] bg-white/10">
          <div
            id="preloader-bar-fill"
            className="absolute left-0 top-0 h-full bg-[#B8975A]"
            style={{ width: '0%' }}
          />
        </div>

        {/* Below bar: Counter */}
        <div className="text-[11px] font-mono tracking-[0.2em] text-white/50">
          {percentage}%
        </div>
      </div>
    </div>
  );
}
