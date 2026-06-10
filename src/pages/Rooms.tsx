import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ROOMS_DATA, Room } from '../data/rooms';
import { useModal } from '../hooks/useModal';
import Tilt from '../components/Tilt';
import Footer from '../sections/Footer';
import { Users, LayoutGrid, BedDouble, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Rooms() {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Suite' | 'Villa'>('All');
  const [visibleRooms, setVisibleRooms] = useState<Room[]>(ROOMS_DATA);
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { openModal } = useModal();

  // Load animation headers
  useEffect(() => {
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

  // Filtering cards logic with GSAP transition
  const handleFilterChange = (filter: 'All' | 'Suite' | 'Villa') => {
    if (filter === activeFilter) return;

    const cards = gridRef.current?.querySelectorAll('.grid-card-wrap');
    if (!cards || cards.length === 0) {
      setActiveFilter(filter);
      applyFilter(filter);
      return;
    }

    // Fade out
    gsap.to(cards, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      stagger: 0.04,
      ease: 'power2.in',
      onComplete: () => {
        setActiveFilter(filter);
        applyFilter(filter);
      }
    });
  };

  const applyFilter = (filter: 'All' | 'Suite' | 'Villa') => {
    let filtered: Room[];
    if (filter === 'All') {
      filtered = ROOMS_DATA;
    } else if (filter === 'Suite') {
      // Includes both standard suites and the crowning Penthouses
      filtered = ROOMS_DATA.filter(r => r.type === 'Suite' || r.type === 'Penthouse');
    } else {
      // Includes Villas and Studio retreats
      filtered = ROOMS_DATA.filter(r => r.type === 'Villa' || r.type === 'Studio');
    }
    setVisibleRooms(filtered);

    // Fade back in
    setTimeout(() => {
      const cards = gridRef.current?.querySelectorAll('.grid-card-wrap');
      if (cards) {
        gsap.fromTo(cards,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power2.out' }
        );
      }
    }, 50);
  };

  // Entrance triggers on scroll for initial load of grid
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const ctx = gsap.context(() => {
      const cards = grid.querySelectorAll('.grid-card-wrap');
      gsap.fromTo(cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, grid);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#FAF9F6]">
      
      {/* 1. Hero Cover Header (60vh) */}
      <div
        ref={heroRef}
        className="relative w-full h-[60vh] bg-cover bg-center flex items-center justify-center select-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=1600')` // REPLACE: luxury room
        }}
      >
        <div className="absolute inset-0 bg-[#111009]/60" />

        <div className="relative z-10 text-center px-4">
          <h1
            ref={headingRef}
            className="font-display text-[48px] md:text-[80px] text-white font-light flex justify-center gap-3 overflow-hidden leading-tight pb-3"
          >
            {"Our Spaces".split(" ").map((word, idx) => (
              <span key={idx} className="overflow-hidden inline-block pr-1 leading-none">
                <span className="clip-word inline-block origin-bottom">{word}</span>
              </span>
            ))}
          </h1>
          <p className="font-sans text-[13px] md:text-[15px] text-white/70 tracking-wide mt-4 uppercase">
            Six distinct sanctuaries. One standard of excellence.
          </p>
        </div>
      </div>

      {/* 2. Main Content & Filter grid */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-20 z-10 relative bg-[#FAF9F6]">
        
        {/* Filter bar selector tabs */}
        <div className="flex justify-center items-center gap-8 md:gap-12 mb-16 border-b border-[#B8975A]/15 pb-4 select-none">
          {(['All', 'Suite', 'Villa'] as const).map((tab) => {
            const isActive = activeFilter === tab;
            const labelMap = { All: 'All Spaces', Suite: 'Suites & Penthouses', Villa: 'Villas & Retreats' };
            return (
              <button
                key={tab}
                onClick={() => handleFilterChange(tab)}
                className="font-sans text-[11px] uppercase tracking-[0.2em] relative py-2 text-[#6B6560] hover:text-[#B8975A] transition-colors duration-250 cursor-pointer"
              >
                <span>{labelMap[tab]}</span>
                {/* Gold indicator rule active */}
                {isActive && (
                  <span className="absolute bottom-[-17px] left-0 w-full h-[2px] bg-[#B8975A] z-10 animate-fade-in" />
                )}
              </button>
            );
          })}
        </div>

        {/* Six room cards grid responsive flow */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 select-none"
        >
          {visibleRooms.map((room) => (
            <div
              key={room.id}
              className="grid-card-wrap flex flex-col group cursor-pointer"
              onClick={() => openModal(room.name)}
            >
              <Tilt max={5} className="w-full bg-white flex flex-col shadow-md rounded-[2px] hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                
                {/* Image Section top */}
                <div className="relative w-full h-[280px] overflow-hidden bg-[#111009]">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover transition-transform duration-[800ms] group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="font-sans text-[9px] uppercase tracking-[0.15em] bg-[#111009]/80 backdrop-blur-md text-[#B8975A] border border-[#B8975A]/25 px-2.5 py-1.5 rounded-[1px] font-semibold">
                      {room.type}
                    </span>
                  </div>
                </div>

                {/* Content Section details */}
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between gap-6">
                  <div>
                    <h3 className="font-display text-[24px] text-[#1A1814] group-hover:text-[#B8975A] transition-colors duration-250 leading-tight">
                      {room.name}
                    </h3>
                    <p className="font-sans text-[13px] text-[#6B6560] leading-relaxed mt-3 line-clamp-2">
                      {room.description}
                    </p>
                  </div>

                  {/* Icon specifications layout summary */}
                  <div className="flex items-center justify-between border-t border-b border-[#B8975A]/10 py-3.5 select-none">
                    <div className="flex items-center gap-1.5 text-[#6B6560]">
                      <Users size={14} className="text-[#B8975A]/70" />
                      <span className="font-sans text-[10px] uppercase tracking-wider">{room.specs.guests}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-[#6B6560]">
                      <LayoutGrid size={13} className="text-[#B8975A]/70" />
                      <span className="font-sans text-[10px] uppercase tracking-wider">{room.specs.size}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-[#6B6560]">
                      <BedDouble size={14} className="text-[#B8975A]/70" />
                      <span className="font-sans text-[10px] uppercase tracking-wider">{room.specs.bed}</span>
                    </div>
                  </div>

                  {/* Pricing footer details selection links */}
                  <div className="flex justify-between items-center select-none">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] font-sans tracking-wide text-[#6B6560]/60 uppercase">From</span>
                      <span className="font-display text-[22px] text-[#B8975A] font-medium leading-none">
                        {room.price.split(' ')[0]} {room.price.split(' ')[1]}
                      </span>
                    </div>
                    
                    <span className="inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-widest text-[#B8975A] hover:text-[#D4B07A] transition-colors duration-200">
                      Reserve
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1.5 duration-250" />
                    </span>
                  </div>

                </div>

              </Tilt>
            </div>
          ))}
        </div>

      </div>

      <Footer />
    </div>
  );
}
