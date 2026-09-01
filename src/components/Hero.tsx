import React, { useState } from 'react';
import { Calendar, Users, ChevronDown, ArrowRight } from 'lucide-react';
import { SUITES_DATA } from '../data/suitesData';

interface HeroProps {
  onExploreSpaces: () => void;
  onOpenBookingWithDetails: (details: { suiteId?: string; checkIn?: string; checkOut?: string; guests?: number }) => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreSpaces, onOpenBookingWithDetails }) => {
  const [checkIn, setCheckIn] = useState('2026-09-01');
  const [checkOut, setCheckOut] = useState('2026-09-04');
  const [guests, setGuests] = useState(2);
  const [selectedSuiteId, setSelectedSuiteId] = useState(SUITES_DATA[0].id);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenBookingWithDetails({
      suiteId: selectedSuiteId,
      checkIn,
      checkOut,
      guests,
    });
  };

  return (
    <section id="hero" className="relative pt-[140px] md:pt-[170px] pb-[80px] md:pb-[120px] bg-[#FAF9F6] overflow-hidden">
      {/* Decorative architectural background element (Video loop) */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
        <video
          src="/videos/balcony_rain.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover filter grayscale contrast-125"
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-[5vw] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center space-x-3 bg-[#EDE5D7]/50 border border-[#E8E1D6] px-4 py-1.5" style={{ borderRadius: '2px' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8975A]" />
              <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#513431]">
                BOUTIQUE HOSPITALITY &amp; SERVICED SUITES
              </span>
            </div>

            <h1
              className="text-[#1C1C1C] font-normal leading-[0.95] tracking-[-0.02em]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(52px, 5.8vw, 92px)',
              }}
            >
              A Sanctuary of <br />
              <span className="gold-italic font-normal">Quiet Luxury</span> &amp; Calm.
            </h1>

            <p className="text-[#77736E] text-[16px] md:text-[18px] max-w-xl font-light leading-[1.7]">
              Zavari Haus redefines luxury serviced apartments with an editorial aesthetic, 
              bespoke personal butler service, and natural architectural finishes in the city's finest enclave.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <button
                onClick={onExploreSpaces}
                className="bg-[#B8975A] text-[#1C1C1C] hover:bg-[#513431] hover:text-[#B8975A] transition-all duration-300 text-[13px] font-semibold tracking-[0.18em] uppercase px-8 py-4 flex items-center gap-3 shadow-[0_10px_25px_rgba(28,28,28,0.08)]"
                style={{ borderRadius: '2px' }}
              >
                <span>EXPLORE SPACES</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => onOpenBookingWithDetails({})}
                className="bg-transparent border border-[#B8975A] text-[#B8975A] hover:bg-[#EDE5D7]/40 transition-all duration-300 text-[13px] font-medium tracking-[0.18em] uppercase px-8 py-4"
                style={{ borderRadius: '2px' }}
              >
                RESERVE SUITE
              </button>
            </div>
          </div>

          {/* Right Editorial Card / Imagery */}
          <div className="lg:col-span-5 relative">
            <div
              className="relative bg-[#FDFBF7] p-3 border border-[#E8E1D6] shadow-[0_20px_45px_rgba(28,28,28,0.10)]"
              style={{ borderRadius: '2px' }}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src="/images/suites/r1/sig_bed.jpg"
                  alt="Zavari Haus Signature Suite"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
                
                {/* Image Label from Design System */}
                <div
                  className="absolute top-[20px] left-[20px] bg-[#513431] text-[#B8975A] px-[18px] py-[11px] text-[11px] font-semibold tracking-[0.16em] uppercase shadow-md"
                  style={{ borderRadius: '2px' }}
                >
                  FEATURED RESIDENCE
                </div>
              </div>

              <div className="p-6 pt-5 bg-[#FDFBF7] flex justify-between items-end border-t border-[#E8E1D6]">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#77736E]">
                    SIGNATURE COLLECTION
                  </p>
                  <h3 className="text-[26px] font-normal text-[#1C1C1C]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    The Skyview Signature Suite
                  </h3>
                </div>

                <div className="text-right">
                  <span className="block text-[10px] tracking-[0.15em] uppercase text-[#AAA39A]">RATE</span>
                  <span className="text-[23px] font-medium text-[#B8975A]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    PKR 6,500
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Reservation & Inquiry Floating Bar */}
        <div className="mt-16 bg-[#FDFBF7] border border-[#E8E1D6] p-6 shadow-[0_12px_30px_rgba(28,28,28,0.08)]" style={{ borderRadius: '2px' }}>
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-6 items-end">
            
            {/* Select Suite */}
            <div className="lg:col-span-4 space-y-1.5">
              <label className="block text-[11px] font-medium tracking-[0.12em] uppercase text-[#AAA39A]">
                SELECT SUITE
              </label>
              <div className="relative border-b border-[#E8E1D6]">
                <select
                  value={selectedSuiteId}
                  onChange={(e) => setSelectedSuiteId(e.target.value)}
                  className="w-full bg-transparent py-2 pr-8 text-[15px] text-[#1C1C1C] focus:outline-none cursor-pointer appearance-none font-sans"
                >
                  {SUITES_DATA.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title} ({s.badge})
                    </option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-1 top-3 text-[#B8975A] pointer-events-none" />
              </div>
            </div>

            {/* Check-in */}
            <div className="lg:col-span-3 space-y-1.5">
              <label className="block text-[11px] font-medium tracking-[0.12em] uppercase text-[#AAA39A]">
                CHECK-IN
              </label>
              <div className="relative border-b border-[#E8E1D6]">
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-transparent py-2 text-[15px] text-[#1C1C1C] focus:outline-none font-sans"
                />
              </div>
            </div>

            {/* Check-out */}
            <div className="lg:col-span-3 space-y-1.5">
              <label className="block text-[11px] font-medium tracking-[0.12em] uppercase text-[#AAA39A]">
                CHECK-OUT
              </label>
              <div className="relative border-b border-[#E8E1D6]">
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-transparent py-2 text-[15px] text-[#1C1C1C] focus:outline-none font-sans"
                />
              </div>
            </div>

            {/* CTA */}
            <div className="lg:col-span-2">
              <button
                type="submit"
                className="w-full h-[50px] bg-[#B8975A] text-[#1C1C1C] hover:bg-[#513431] hover:text-[#B8975A] transition-all duration-300 text-[12px] font-semibold tracking-[0.18em] uppercase flex items-center justify-center gap-2"
                style={{ borderRadius: '2px' }}
              >
                <span>CHECK</span>
                <ArrowRight size={14} />
              </button>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
};
