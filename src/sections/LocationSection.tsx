import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const LANDMARKS = [
  { name: "Lahore Airport", distance: "28 km" },
  { name: "Bahria Grand Mosque", distance: "1.2 km" },
  { name: "Packages Mall", distance: "6.4 km" },
  { name: "Lahore Ring Road", distance: "3.1 km" },
  { name: "DHA Phase 6", distance: "8.7 km" }
];

export default function LocationSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Landmark rows entering slide and reveal
      const rows = container.querySelectorAll('.landmark-row');
      gsap.fromTo(rows,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.1,
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

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#FAF9F6] py-[120px] px-8 md:px-[80px] z-10 flex justify-center overflow-hidden"
    >
      <div className="max-w-[1200px] w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Map Iframe wrapper */}
        <div className="relative group overflow-hidden shadow-xl rounded-[2px] border border-[#B8975A]/15 h-[480px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3406.9580661264367!2d74.18364607560517!3d31.360136374287663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzHCsDIxJzM2LjUiTiA3NMKwMTEnMTAuNCJF!5e0!3m2!1sen!2s!4v1780941194729!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Zavari Haus Location Map"
            className="w-full h-full grayscale hover:grayscale-0 transition-all duration-[800ms] ease-in-out"
          />
          {/* Accent border framing decoration */}
          <div className="absolute inset-0 border border-[#B8975A]/20 pointer-events-none group-hover:border-[#B8975A]/60 transition-colors duration-[600ms]" />
        </div>

        {/* Right Side: Location details and landmark ratings */}
        <div className="flex flex-col justify-center select-text">
          <span className="font-sans text-[11px] tracking-[0.25em] text-[#B8975A] font-bold uppercase">
            The Confluence
          </span>
          <h2 className="font-display text-[48px] md:text-[56px] text-[#1A1814] font-light leading-tight mt-3 mb-6">
            Find Us
          </h2>
          
          <div className="flex gap-3 items-start mb-10 pb-6 border-b border-[#B8975A]/15">
            <MapPin className="text-[#B8975A] shrink-0 mt-1" size={18} />
            <div>
              <p className="font-sans text-[15px] font-medium text-[#1A1814]">
                Zavari Haus Address
              </p>
              <p className="font-sans text-[14px] text-[#6B6560] leading-relaxed mt-1">
                Bahria Town, Lahore, Punjab, Pakistan
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-5 select-none">
            <h4 className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#1A1814]/50 font-bold mb-1">
              PROXIMITY & ACCESSIBILITY
            </h4>
            
            {LANDMARKS.map((landmark, idx) => (
              <div
                key={idx}
                className="landmark-row flex justify-between items-center py-2.5 border-b border-[#B8975A]/10 last:border-0 hover:bg-[#B8975A]/5 px-2 rounded-sm transition-colors duration-200"
              >
                {/* Name line */}
                <div className="flex items-center gap-3">
                  <span className="w-4 h-[1px] bg-[#B8975A]" />
                  <span className="font-sans text-[14px] text-[#1A1814]">
                    {landmark.name}
                  </span>
                </div>

                {/* Distance Badge border tag */}
                <span className="font-mono text-[10px] text-[#B8975A] border border-[#B8975A]/30 px-2.5 py-1 rounded-[2px] leading-none select-none">
                  {landmark.distance}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
