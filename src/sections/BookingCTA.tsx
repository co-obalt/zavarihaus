import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useModal } from '../hooks/useModal';
import { useContent } from '../content/ContentContext';

gsap.registerPlugin(ScrollTrigger);

export default function BookingCTA() {
  const { home } = useContent();
  const cta = home.bookingCta;
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { openModal } = useModal();

  const [dateIn, setDateIn] = useState('');
  const [dateOut, setDateOut] = useState('');
  const [guests, setGuests] = useState('2');

  const headingText = cta.heading;
  const words = headingText.split(" ");

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 1. Cinematic Background Parallax: translate yPercent on scroll
      gsap.fromTo(bgRef.current,
        { yPercent: -15 },
        {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      );

      // 2. Word-by-word clip-path slide reveal
      const headingWords = headingRef.current?.querySelectorAll('.clip-word');
      if (headingWords && headingWords.length > 0) {
        gsap.fromTo(headingWords,
          { clipPath: 'inset(0 0 100% 0)', y: 35 },
          {
            clipPath: 'inset(0 0 0% 0)',
            y: 0,
            stagger: 0.12,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 80%',
            }
          }
        );
      }

      // 3. Subtext Fade In
      gsap.fromTo(subtextRef.current,
        { opacity: 0, y: 15 },
        {
          opacity: 0.65,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: subtextRef.current,
            start: 'top 82%',
          }
        }
      );

      // 4. Glassmorphic Card slide up entrance
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
          }
        }
      );

      // 5. Magnetic button pull within 90px card boundaries
      const btn = buttonRef.current;
      if (btn) {
        const pullRadius = 90;
        const pullFactor = 35; // max translate of 35px

        const handleMouseMove = (e: MouseEvent) => {
          const r = btn.getBoundingClientRect();
          const mx = r.left + r.width / 2;
          const my = r.top + r.height / 2;
          const dx = e.clientX - mx;
          const dy = e.clientY - my;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < pullRadius) {
            const pullStrength = (pullRadius - distance) / pullRadius;
            gsap.to(btn, {
              x: (dx / distance) * pullFactor * pullStrength,
              y: (dy / distance) * pullFactor * pullStrength,
              duration: 0.3,
              ease: 'power2.out'
            });
          } else {
            revertBtnPhysics();
          }
        };

        const revertBtnPhysics = () => {
          gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: 'power2.out'
          });
        };

        window.addEventListener('mousemove', handleMouseMove);
        btn.addEventListener('mouseleave', revertBtnPhysics);

        return () => {
          window.removeEventListener('mousemove', handleMouseMove);
          if (btn) btn.removeEventListener('mouseleave', revertBtnPhysics);
        };
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openModal();
  };

  return (
    <div
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center py-24 md:py-28 pb-32 md:pb-40 z-10"
    >
      {/* Parallax Background Layer */}
      <div
        ref={bgRef}
        className="absolute inset-[0_-10%] h-[130%] bg-cover bg-center select-none"
        style={{
          backgroundImage: `url('${cta.backgroundImage}')`,
        }}
      />
      
      {/* Multi-layered Cinematic dark gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#141210]/20 via-[#141210]/65 to-[#141210]/100 z-0 pointer-events-none" />

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-[1100px] px-6 md:px-12 flex flex-col items-center justify-between h-full gap-10">
        
        {/* UPPER: Heading & Subheading */}
        <div className="text-center pt-10">
          <h2
            ref={headingRef}
            className="font-display text-[clamp(34px,4.8vw,72px)] text-white font-light flex flex-wrap justify-center leading-[0.95] mb-4 max-w-[980px] mx-auto"
          >
            {words.map((word, idx) => (
              <span key={idx} className="overflow-hidden inline-block mr-2 md:mr-3 leading-none pb-2">
                <span className="clip-word inline-block origin-bottom">
                  {word}
                </span>
              </span>
            ))}
          </h2>
          <p
            ref={subtextRef}
            className="font-sans text-[16px] md:text-[18px] text-white/65 font-light"
          >
            {cta.subtext}
          </p>
        </div>

        {/* LOWER: Glassmorphic Booking Grid Box */}
        <div
          ref={cardRef}
          className="booking-card-glass w-full max-w-[720px] p-6 md:p-10 mb-6 md:mb-10 flex flex-col relative z-20"
        >
          <span className="font-sans text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-[#B8975A] font-medium mb-6">
            {cta.eyebrow}
          </span>

          <form onSubmit={handleBookingSubmit} className="flex flex-col gap-8 w-full">
            {/* Grid Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Check In Date */}
              <div className="flex flex-col relative">
                <label className="font-sans text-[9px] uppercase tracking-[0.2em] text-[#1A1814]/50 mb-1">
                  Check-In
                </label>
                <input
                  type="date"
                  required
                  value={dateIn}
                  onChange={(e) => setDateIn(e.target.value)}
                  className="bg-transparent border-b border-[#B8975A]/30 text-[#1A1814] font-sans text-[14px] py-2 outline-none focus:border-[#B8975A] transition-colors duration-300 cursor-pointer"
                />
              </div>

              {/* Check Out Date */}
              <div className="flex flex-col relative">
                <label className="font-sans text-[9px] uppercase tracking-[0.2em] text-[#1A1814]/50 mb-1">
                  Check-Out
                </label>
                <input
                  type="date"
                  required
                  value={dateOut}
                  onChange={(e) => setDateOut(e.target.value)}
                  className="bg-transparent border-b border-[#B8975A]/30 text-[#1A1814] font-sans text-[14px] py-2 outline-none focus:border-[#B8975A] transition-colors duration-300 cursor-pointer"
                />
              </div>

              {/* Number of Guests */}
              <div className="flex flex-col relative">
                <label className="font-sans text-[9px] uppercase tracking-[0.2em] text-[#1A1814]/50 mb-1">
                  Guests
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="bg-transparent border-b border-[#B8975A]/30 text-[#1A1814] font-sans text-[14px] py-2.5 outline-none focus:border-[#B8975A] transition-colors duration-300 cursor-pointer appearance-none bg-white"
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5">5 Guests</option>
                  <option value="6">6+ Guests</option>
                </select>
              </div>

            </div>

            {/* Click Button trigger */}
            <button
              ref={buttonRef}
              type="submit"
              className="w-full h-14 bg-[#B8975A] text-[#111009] font-sans text-[11px] uppercase tracking-[0.25em] font-semibold flex items-center justify-center overflow-hidden rounded-[2px] transition-colors duration-300 relative group cursor-pointer z-10"
            >
              {/* Shimmer overlay sweep */}
              <span className="absolute inset-0 w-1/2 h-full bg-white/20 -translate-x-[150%] group-hover:translate-x-[250%] transition-transform duration-[800ms] -skew-x-[30deg] ease-out pointer-events-none" />
              <span className="relative z-10">{cta.buttonLabel}</span>
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}
