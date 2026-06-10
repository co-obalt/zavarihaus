import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ROOMS_DATA } from '../data/rooms';
import { useModal } from '../hooks/useModal';
import Tilt from '../components/Tilt';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedSpaces() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { openModal } = useModal();

  useEffect(() => {
    const scroller = scrollContainerRef.current;
    const section = sectionRef.current;
    if (!scroller || !section) return;

    const ctx = gsap.context(() => {
      // Direct negative translate based on total scrollable width
      const scrollWidth = scroller.scrollWidth;
      const xVal = -(scrollWidth - window.innerWidth);

      const pinTimeline = gsap.to(scroller, {
        x: xVal,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${scrollWidth}`,
          invalidateOnRefresh: true,
        },
      });

      // Cards fade-up as they become visible (horizontal trigger)
      const cards = scroller.querySelectorAll('.featured-card');
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0.2, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              containerAnimation: pinTimeline,
              start: 'left 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full h-screen bg-[#FAF9F6] overflow-hidden flex items-center z-10 select-none"
    >
      <div
        ref={scrollContainerRef}
        className="flex h-full items-center pl-8 md:pl-[96px] gap-10 md:gap-12 pr-[128px]"
        style={{ willChange: 'transform' }}
      >
        {/* Left scrollable information panel */}
        <div className="w-[240px] shrink-0 flex flex-col justify-center h-full py-8 pr-5">
          <h2 className="font-display text-[40px] md:text-[46px] text-[#1A1814] leading-[1.05] font-light">
            Featured
            <br />
            <span className="italic font-normal text-[#B8975A]">Spaces</span>
          </h2>
          <p className="font-sans text-[12px] text-[#6B6560] tracking-wide mt-5 leading-relaxed max-w-[220px]">
            Impeccably detailed sanctuaries engineered for uninterrupted solitude.
          </p>
          <div className="mt-7">
            <Link
              to="/rooms"
              className="inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.2em] text-[#B8975A] font-medium hover:text-[#D4B07A] transition-colors duration-250 hover:underline underline-offset-4"
            >
              Explore All Spaces
            </Link>
          </div>
        </div>

        {ROOMS_DATA.map((room) => (
          <div
            key={room.id}
            className="featured-card w-[300px] h-[420px] shrink-0 flex flex-col shadow-lg hover:shadow-xl transition-all duration-400 group relative z-10 cursor-pointer"
            onClick={() => openModal(room.name)}
          >
            <Tilt className="w-full h-full rounded-[2px] bg-white flex flex-col overflow-hidden">
              {/* Card Top: Image */}
              <div className="relative w-full h-[58%] overflow-hidden bg-[#111009]">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 z-10">
                  <span className="font-sans text-[9px] uppercase tracking-[0.15em] bg-[#111009]/80 backdrop-blur-md text-[#B8975A] border border-[#B8975A]/40 px-3 py-1.5 rounded-[2px] font-medium">
                    {room.type}
                  </span>
                </div>
              </div>

              {/* Card Bottom: Content */}
              <div className="w-full h-[42%] bg-[#FDFBF7] p-5 flex flex-col justify-between relative">
                <div>
                  <h3 className="font-display text-[19px] text-[#1A1814] leading-tight font-medium group-hover:text-[#B8975A] transition-colors duration-250">
                    {room.name}
                  </h3>
                  <p className="font-sans text-[11px] text-[#6B6560] tracking-wide mt-2">
                    {room.id.includes('suite') ? 'Bahria Town, Lahore' : room.id.includes('penthouse') ? 'Gulberg, Lahore' : 'DHA, Lahore'}
                  </p>
                </div>

                <div className="flex justify-between items-end">
                  <div className="flex flex-col gap-1">
                    <span className="font-sans text-[10px] text-[#6B6560]/70 uppercase tracking-widest leading-none">
                      Rate
                    </span>
                    <span className="font-display text-[17px] text-[#B8975A] font-medium leading-none">
                      {room.price.split(' ')[0]} {room.price.split(' ')[1]}
                    </span>
                  </div>

                  {/* Interactive hover circle with arrow */}
                  <div className="w-9 h-9 border border-[#B8975A]/25 rounded-full flex items-center justify-center text-[#B8975A] group-hover:bg-[#B8975A] group-hover:text-[#111009] group-hover:border-[#B8975A] transition-all duration-400 group-hover:rotate-45">
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </div>
            </Tilt>
          </div>
        ))}
      </div>
    </div>
  );
}
