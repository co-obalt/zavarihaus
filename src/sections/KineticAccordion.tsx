import React, { useEffect, useRef, useState } from 'react';
import { FEATURE_WORDS } from '../data/featureWords';
import { Shield, Heart, Sparkles, Compass } from 'lucide-react';

// Helper to get custom vector luxury icons corresponding to each feature
const getFeatureIcon = (id: string, className?: string) => {
  switch (id) {
    case 'privacy':
      return <Shield className={className} size={20} strokeWidth={1.2} />;
    case 'comfort':
      return <Heart className={className} size={20} strokeWidth={1.2} />;
    case 'service':
      return <Sparkles className={className} size={20} strokeWidth={1.2} />;
    case 'experience':
      return <Compass className={className} size={20} strokeWidth={1.2} />;
    default:
      return <Shield className={className} size={20} strokeWidth={1.2} />;
  }
};

export default function KineticAccordion() {
  const [activeIndex, setActiveIndex] = useState(0);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
    };
  }, []);

  const activateItem = (index: number) => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }

    hoverTimerRef.current = setTimeout(() => {
      setActiveIndex(index);
    }, 120);
  };

  const clearHoverIntent = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#FDFBF7] py-20 md:py-[104px] flex flex-col justify-center items-center z-10 select-none border-t border-[#E6DFD3]/40">
      <div className="w-full max-w-[1040px] px-6 md:px-10 flex flex-col gap-8">
        
        {/* Section Aesthetic Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E6DFD3]/40 pb-7 gap-4">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#B8975A]">
              Distinctive Philosophy
            </span>
            <h2 className="font-display text-[34px] md:text-[42px] text-[#1A1814] font-light leading-none mt-2">
              Our Core Pillars
            </h2>
          </div>
          <p className="font-sans text-[12px] text-[#6B6560] max-w-[320px] leading-relaxed font-light">
            Every layer of Zavari Haus is meticulously engineered, balancing structural confidentiality with somatic luxury for an absolute sanctuary.
          </p>
        </div>

        {/* Interactive Hover Accordion List */}
        <div className="w-full flex flex-col">
          {FEATURE_WORDS.map((item, index) => {
            const isActive = activeIndex === index;
            const itemNumber = index + 1 < 10 ? `0${index + 1}` : index + 1;

            return (
              <div
                key={item.id}
                className="border-b border-[#E6DFD3]/65 last:border-b-0 group transition-all duration-500 hover:bg-[#FAF9F6]/40 px-2 md:px-4"
                onMouseEnter={() => activateItem(index)}
                onMouseLeave={clearHoverIntent}
                onClick={() => setActiveIndex(index)}
              >
                {/* Accordion Row Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 py-5 md:py-7 cursor-pointer">
                  {/* Left block: Number // uppercase Title [pronunciation] */}
                  <div className="flex items-baseline gap-3 md:gap-5 flex-wrap">
                    <span className="font-mono text-[11px] md:text-[13px] text-[#B8975A] font-medium tracking-wider">
                      {itemNumber} //
                    </span>
                    <h3 className="font-display text-[20px] md:text-[26px] uppercase tracking-[0.06em] text-[#1A1814] font-light transition-all duration-400 group-hover:text-[#B8975A]">
                      {item.word}
                    </h3>
                    <span className="font-mono text-[10px] md:text-[11px] text-[#6B6560]/50 lowercase tracking-wider font-light">
                      {item.pronunciation}
                    </span>
                  </div>

                  {/* Right block: Subtitle + Circle Icon Badge */}
                  <div className="flex items-center gap-5 md:gap-8 justify-between md:justify-end w-full md:w-auto">
                    <span className="font-display italic text-[12px] md:text-[14px] text-[#6B6560] font-light tracking-wide transition-opacity duration-300">
                      {item.subtitle}
                    </span>
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500 shrink-0 ${
                        isActive
                          ? 'bg-[#B8975A] text-[#FDFBF7] border border-[#B8975A] scale-110 shadow-sm'
                          : 'border border-[#E6DFD3] text-[#6B6560] group-hover:border-[#B8975A] group-hover:text-[#B8975A]'
                      }`}
                    >
                      {getFeatureIcon(item.id)}
                    </div>
                  </div>
                </div>

                {/* Animated Collapsible Details Container */}
                <div
                  className="w-full overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    maxHeight: isActive ? '260px' : '0px',
                    opacity: isActive ? 1 : 0,
                    pointerEvents: isActive ? 'auto' : 'none',
                  }}
                >
                  <div className="border-t border-[#E6DFD3]/40 w-full pt-5 pb-7">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 pl-2 md:pl-6">
                      {/* Left: Beautiful high-end Description */}
                      <div className="md:col-span-7 flex flex-col justify-center">
                        <p className="font-display font-light text-[15px] md:text-[17px] text-[#1A1814] leading-[1.55] tracking-wide">
                          {item.description}
                        </p>
                      </div>

                      {/* Middle: Thin vertical line divider */}
                      <div className="hidden md:flex md:col-span-1 justify-center items-stretch">
                        <div className="w-[1px] bg-[#E6DFD3] h-full min-h-[120px]" />
                      </div>

                      {/* Right: Specifications report list */}
                      <div className="md:col-span-4 flex flex-col justify-start">
                        <h4 className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#B8975A] font-bold mb-3">
                          Specification Report:
                        </h4>
                        <ul className="flex flex-col gap-2.5">
                          {item.details.map((detail, dIdx) => (
                            <li
                              key={dIdx}
                              className="font-sans text-[11px] md:text-[12px] text-[#6B6560] flex items-start gap-2.5 leading-relaxed"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#B8975A] shrink-0 mt-[6px]"></span>
                              <span className="font-light">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
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
