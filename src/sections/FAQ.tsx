import React, { useEffect, useRef, useState } from 'react';
import { FAQ_DATA } from '../data/faq';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Staggered slide-up item entrances on viewport enter
      const faqItems = container.querySelectorAll('.faq-item');
      gsap.fromTo(faqItems,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#FAF9F6] py-[140px] px-8 md:px-[80px] flex justify-center z-10 select-none"
    >
      <div className="max-w-[1100px] w-full grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16">
        
        {/* Left Side: Header details */}
        <div className="flex flex-col select-text">
          <h2 className="font-display text-[48px] md:text-[64px] text-[#1A1814] font-light leading-[1.1] mb-4">
            Frequently Asked
            <br />
            <span className="italic font-normal text-[#B8975A]">Questions.</span>
          </h2>
          <p className="font-sans text-[14px] text-[#6B6560] leading-relaxed max-w-[280px] mt-2">
            Everything you need to know before you arrive.
          </p>
        </div>

        {/* Right Side: Expanding accordion entries */}
        <div className="flex flex-col gap-0 border-t border-[#B8975A]/20">
          {FAQ_DATA.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.id}
                className="faq-item border-b border-[#B8975A]/20 flex flex-col relative py-6 cursor-pointer group"
                onClick={() => toggleItem(index)}
              >
                {/* Active absolute gold accent bar at the left */}
                <div
                  className="absolute left-0 top-0 w-[2px] bg-[#B8975A] transition-all duration-300"
                  style={{
                    height: isOpen ? '100%' : '0%'
                  }}
                />

                {/* Question Line click trigger */}
                <div className="flex justify-between items-center pl-4 pr-1.5 transition-colors duration-250 select-none">
                  <h3
                    className="font-sans text-[15px] font-medium leading-relaxed group-hover:text-[#B8975A] transition-colors duration-250"
                    style={{
                      color: isOpen ? 'var(--gold)' : 'var(--text)'
                    }}
                  >
                    {faq.question}
                  </h3>
                  
                  {/* Rotating Gold Accent toggler indicator plus inside */}
                  <div
                    className="w-8 h-8 rounded-full border border-[#B8975A]/20 flex items-center justify-center text-[#B8975A] shrink-0 transition-transform duration-500"
                    style={{
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      backgroundColor: isOpen ? 'var(--gold)' : 'transparent',
                      color: isOpen ? '#FAF9F6' : 'var(--gold)'
                    }}
                  >
                    <span className="text-[18px] leading-none select-none font-medium">+</span>
                  </div>
                </div>

                {/* Hidden content expanding accordion details */}
                <div
                  className="overflow-hidden transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] pl-4"
                  style={{
                    maxHeight: isOpen ? '240px' : '0px',
                    opacity: isOpen ? 1 : 0
                  }}
                >
                  <div className="font-sans text-[14px] text-[#6B6560] leading-relaxed pt-4 pb-2 pr-[40px]">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
