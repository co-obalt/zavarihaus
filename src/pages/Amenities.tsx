import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '../sections/Footer';

gsap.registerPlugin(ScrollTrigger);

const AMENITIES_DATA = [
  {
    category: "01 / RESTORATION",
    title: "Infinity Pool & Spa",
    subtitle: "Water and sky meet at the edge of your private world.",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=800", // REPLACE: luxury pool spa layout
    bullets: [
      "Heated to 32°C year-round",
      "Hydrotherapy jet systems",
      "Adjacent private cabana suite"
    ]
  },
  {
    category: "02 / GASTRONOMY",
    title: "Private Chef & Dining",
    subtitle: "Cuisine curated to your preference. Served on your terms.",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800", // REPLACE: private chef preparation dish
    bullets: [
      "Michelin-trained culinary team",
      "Custom tasting menus on request",
      "Farm-to-table sourcing"
    ]
  },
  {
    category: "03 / ENERGY",
    title: "Fitness & Wellness Center",
    subtitle: "A body in motion. A mind at rest.",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=800", // REPLACE: gym fitness zone
    bullets: [
      "Equipment by Technogym",
      "Daily yoga & meditation sessions",
      "Recovery suite with cryotherapy"
    ]
  },
  {
    category: "04 / FREEDOM",
    title: "Concierge & Transport",
    subtitle: "Every request anticipated before you make it.",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800", // REPLACE: concierge chauffeur electric car
    bullets: [
      "24/7 personal concierge",
      "Electric vehicle fleet",
      "Private airport protocol"
    ]
  }
];

export default function Amenities() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // 1. Initial Hero load animation
    const headingWords = headingRef.current?.querySelectorAll('.clip-word');
    if (headingWords) {
      gsap.fromTo(headingWords,
        { clipPath: 'inset(0 0 100% 0)', y: 35 },
        {
          clipPath: 'inset(0 0 0% 0)',
          y: 0,
          stagger: 0.12,
          duration: 1,
          ease: 'power4.out',
        }
      );
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const blocks = container.querySelectorAll('.amenity-block');
      blocks.forEach((block) => {
        const imgWrap = block.querySelector('.amenity-img-wrap');
        const img = block.querySelector('.amenity-img');
        const textContent = block.querySelector('.amenity-text-content');

        if (imgWrap && img) {
          // Clip-path swipe wipe for entering images
          gsap.fromTo(imgWrap,
            { clipPath: 'inset(0 100% 0 0)' },
            {
              clipPath: 'inset(0 0% 0 0)',
              duration: 1.1,
              ease: 'power3.inOut',
              scrollTrigger: {
                trigger: block,
                start: 'top 75%'
              }
            }
          );

          // Subtle image scale during scroll swipe
          gsap.fromTo(img,
            { scale: 1.15 },
            {
              scale: 1,
              duration: 1.3,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: block,
                start: 'top 75%'
              }
            }
          );
        }

        if (textContent) {
          gsap.fromTo(textContent,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: block,
                start: 'top 75%',
              }
            }
          );
        }
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#FAF9F6]">
      
      {/* 1. Hero Cover Header (60vh) */}
      <div
        className="relative w-full h-[60vh] bg-cover bg-center flex items-center justify-center select-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=1600')` // REPLACE: wellness layout
        }}
      >
        <div className="absolute inset-0 bg-[#111009]/60" />

        <div className="relative z-10 text-center px-4">
          <h1
            ref={headingRef}
            className="font-display text-[48px] md:text-[80px] text-white font-light flex justify-center gap-3 overflow-hidden leading-tight pb-3"
          >
            {"The Experience".split(" ").map((word, idx) => (
              <span key={idx} className="overflow-hidden inline-block pr-1 leading-none">
                <span className="clip-word inline-block origin-bottom">{word}</span>
              </span>
            ))}
          </h1>
          <p className="font-sans text-[13px] md:text-[15px] text-white/70 tracking-wide mt-4 uppercase">
            Every detail considered. Every comfort engineered.
          </p>
        </div>
      </div>

      {/* 2. Alternating Block Sections Stack */}
      <div ref={containerRef} className="w-full flex flex-col pt-10 relative bg-[#FAF9F6] z-10 pr-0 pl-0">
        {AMENITIES_DATA.map((amenity, index) => {
          const isOdd = index % 2 !== 0;
          return (
            <section
              key={index}
              className={`amenity-block w-full min-h-[90vh] lg:min-h-screen flex flex-col ${
                isOdd ? 'lg:flex-row-reverse' : 'lg:flex-row'
              } items-center bg-[#FAF9F6]`}
            >
              {/* Photo Panel column (takes 55% width) */}
              <div
                className="amenity-img-wrap w-full lg:w-[55%] h-[400px] lg:h-screen overflow-hidden relative"
                style={{ clipPath: 'inset(0 100% 0 0)' }}
              >
                <img
                  src={amenity.image}
                  alt={amenity.title}
                  className="amenity-img w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {/* Visual shade overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111009]/15 to-transparent pointer-events-none" />
              </div>

              {/* Text side columns panel (takes 45% width) */}
              <div className="w-full lg:w-[45%] h-full flex flex-col justify-center px-8 md:px-[64px] py-16">
                <div className="amenity-text-content max-w-[450px]">
                  
                  {/* Category marker bar */}
                  <span className="font-mono text-[10px] md:text-[11px] text-[#B8975A] tracking-[0.25em] font-bold">
                    {amenity.category}
                  </span>

                  {/* Primary Header */}
                  <h2 className="font-display text-[36px] md:text-[52px] text-[#1A1814] font-light leading-tight mt-4 select-text">
                    {amenity.title}
                  </h2>

                  {/* Subtitle statement */}
                  <p className="font-sans text-[14px] md:text-[15px] italic text-[#6B6560] leading-relaxed mt-4 mb-8 select-text">
                    {amenity.subtitle}
                  </p>

                  {/* Specifications custom list details */}
                  <ul className="flex flex-col gap-4 select-none">
                    {amenity.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-3 text-[#1A1814]/85">
                        {/* Custom gold accent vertical indicator lines */}
                        <span className="text-[#B8975A] font-bold">—</span>
                        <span className="font-sans text-[13px] md:text-[14px] text-[#6B6560]">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>

                </div>
              </div>

            </section>
          );
        })}
      </div>

      <Footer />
    </div>
  );
}
