import React, { useEffect, useRef, useState } from 'react';
import { TESTIMONIALS_DATA } from '../data/testimonials';
import { gsap } from 'gsap';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonialContainerRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);

  // Auto-advance loop
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHoveredRef.current) {
        handleNext();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleNext = () => {
    transitionTestimonial((activeIndex + 1) % TESTIMONIALS_DATA.length);
  };

  const transitionTestimonial = (targetIdx: number) => {
    if (targetIdx === activeIndex) return;

    const container = testimonialContainerRef.current;
    if (!container) {
      setActiveIndex(targetIdx);
      return;
    }

    // exit animation: current x: 0 -> -80, opacity: 1 -> 0
    gsap.timeline({
      onComplete: () => {
        setActiveIndex(targetIdx);
        // enter animation: next x: 80 -> 0, opacity: 0 -> 1
        gsap.fromTo(container,
          { x: 80, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
        );
      }
    })
    .to(container, {
      x: -80,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in'
    });
  };

  return (
    <div
      className="relative w-full bg-[#F5F2EC] py-[140px] px-8 md:px-[80px] flex flex-col items-center z-10 select-none"
      onMouseEnter={() => { isHoveredRef.current = true; }}
      onMouseLeave={() => { isHoveredRef.current = false; }}
    >
      <div className="max-w-[900px] w-full flex flex-col items-center">
        {/* Decorative Quote Icon Label */}
        <span className="font-display text-[72px] text-[#B8975A]/25 leading-none font-semibold mb-4 select-none">
          “
        </span>

        {/* Dynamic Slideway Testimonial Container */}
        <div
          ref={testimonialContainerRef}
          className="w-full flex flex-col items-center text-center min-h-[220px]"
        >
          {/* Quote sentence */}
          <blockquote className="font-display text-[26px] md:text-[32px] italic text-[#1A1814] font-light leading-relaxed max-w-[750px]">
            {TESTIMONIALS_DATA[activeIndex].quote}
          </blockquote>

          {/* Author descriptor details */}
          <cite className="not-italic block mt-10">
            <span className="font-sans text-[12px] md:text-[13px] text-[#B8975A] tracking-[0.2em] font-medium uppercase">
              {TESTIMONIALS_DATA[activeIndex].author}
            </span>
            <span className="text-[#6B6560]/40 mx-2">—</span>
            <span className="font-sans text-[11px] text-[#6B6560]/75 uppercase tracking-widest">
              {TESTIMONIALS_DATA[activeIndex].location}
            </span>
            <div className="font-sans text-[10px] text-[#6B6560]/50 tracking-[0.1em] mt-1 uppercase">
              Stayed in {TESTIMONIALS_DATA[activeIndex].roomName}
            </div>
          </cite>
        </div>

        {/* Dynamic navigation dots */}
        <div className="flex gap-4 mt-12 items-center justify-center">
          {TESTIMONIALS_DATA.map((dot, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={dot.id}
                onClick={() => transitionTestimonial(idx)}
                className="focus:outline-none cursor-pointer h-2"
                aria-label={`Slide to testimonial ${idx + 1}`}
              >
                <div
                  className="h-2 rounded-full border border-[#B8975A] transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    width: isActive ? '32px' : '8px',
                    backgroundColor: isActive ? 'var(--gold)' : 'transparent',
                    opacity: isActive ? 1 : 0.4
                  }}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
