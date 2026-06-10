import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ROOMS_DATA } from '../data/rooms';
import Footer from '../sections/Footer';
import { ShieldCheck, Sparkles, Compass, Clock, CheckCircle } from 'lucide-react';

export default function Booking() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    property: '',
    checkIn: '',
    checkOut: '',
    requests: ''
  });
  const [success, setSuccess] = useState(false);

  // Load title word sweep
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

  const calculateNights = () => {
    if (!formData.checkIn || !formData.checkOut) return 0;
    const start = new Date(formData.checkIn);
    const end = new Date(formData.checkOut);
    const diff = end.getTime() - start.getTime();
    if (diff <= 0) return 0;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const getPriceEstimate = () => {
    const nights = calculateNights();
    if (nights <= 0 || !formData.property) return 0;
    const room = ROOMS_DATA.find(r => r.name === formData.property);
    return (room?.rawPrice || 0) * nights;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
  };

  const nightsTotal = calculateNights();
  const costEstimate = getPriceEstimate();

  return (
    <div className="relative min-h-screen bg-[#FAF9F6] pt-[120px]">
      
      {/* 1. Header Area panel */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 text-center mb-16 select-none flex flex-col items-center">
        <h1
          ref={headingRef}
          className="font-display text-[56px] md:text-[80px] text-[#1A1814] font-light tracking-tight flex justify-center gap-4 overflow-hidden leading-tight pb-3"
        >
          {"Reserve".split(" ").map((word, idx) => (
            <span key={idx} className="overflow-hidden inline-block pr-1 leading-none">
              <span className="clip-word inline-block origin-bottom">{word}</span>
            </span>
          ))}
        </h1>
        <div className="w-[80px] h-[1px] bg-[#B8975A] mt-6" />
      </div>

      {/* 2. Main Dual Panel Content section */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 pb-24 relative bg-[#FAF9F6] z-10 flex flex-col lg:flex-row gap-16 select-text">
        
        {/* Left Form side columns panel (60%) */}
        <div className="w-full lg:w-[60%]">
          {success ? (
            <div className="booking-card-glass p-8 md:p-12 text-center flex flex-col items-center gap-6 shadow-xl border border-[#B8975A]/25 rounded-[2px]">
              <CheckCircle size={56} className="text-[#B8975A]" />
              <h2 className="font-display text-[32px] text-[#B8975A] leading-tight font-medium">
                Inquiry Logged Successfully
              </h2>
              <p className="font-sans text-[14px] text-[#6B6560] leading-relaxed max-w-[480px]">
                Thank you for choosing Zavari Haus. A personal representative is validating space entries for <strong className="text-[#1A1814]">{formData.property}</strong> and check dates of <strong className="text-[#1A1814]">{formData.checkIn}</strong> to <strong className="text-[#1A1814]">{formData.checkOut}</strong> . Our confirmation dispatcher will send booking sheets details shortly via email in minutes.
              </p>
              <button
                onClick={() => {
                  setFormData({ name: '', email: '', phone: '', property: '', checkIn: '', checkOut: '', requests: '' });
                  setSuccess(false);
                }}
                className="mt-4 border border-[#B8975A] text-[#B8975A] hover:bg-[#B8975A] hover:text-[#111009] px-6 py-2.5 font-sans uppercase text-[11px] tracking-widest transition-all duration-300 rounded-[2px] cursor-pointer"
              >
                Book Another Sanctuary
              </button>
            </div>
          ) : (
            <div className="booking-card-glass p-6 md:p-10 shadow-lg border border-[#B8975A]/15 rounded-[2px] bg-white">
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#B8975A] font-bold mb-4 block">
                Booking Inquiries Sheets
              </span>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Full name input */}
                <div>
                  <label className="text-[9px] font-sans uppercase tracking-widest text-[#1A1814]/50 mb-1 block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Maryam Abbasi"
                    className="w-full border-b border-[#B8975A]/20 pb-2 bg-transparent font-sans text-[14px] text-[#1A1814] outline-none focus:border-[#B8975A] transition-colors duration-300"
                  />
                </div>

                {/* Grid row email/phones */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[9px] font-sans uppercase tracking-widest text-[#1A1814]/50 mb-1 block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="maryam@example.com"
                      className="w-full border-b border-[#B8975A]/20 pb-2 bg-transparent font-sans text-[14px] text-[#1A1814] outline-none focus:border-[#B8975A] transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-sans uppercase tracking-widest text-[#1A1814]/50 mb-1 block">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+92 300 1234567"
                      className="w-full border-b border-[#B8975A]/20 pb-2 bg-transparent font-sans text-[14px] text-[#1A1814] outline-none focus:border-[#B8975A] transition-colors duration-300"
                    />
                  </div>
                </div>

                {/* Sanctuary Dropdown options */}
                <div>
                  <label className="text-[9px] font-sans uppercase tracking-widest text-[#1A1814]/50 mb-1 block">
                    Select Sanctuary
                  </label>
                  <select
                    required
                    value={formData.property}
                    onChange={(e) => setFormData({ ...formData, property: e.target.value })}
                    className="w-full border-b border-[#B8975A]/20 pb-2 bg-transparent font-sans text-[14px] text-[#1A1814] outline-none focus:border-[#B8975A] transition-colors duration-300 cursor-pointer appearance-none bg-white"
                  >
                    <option value="">Select a property...</option>
                    <option value="Suite No. 1">Suite No. 1</option>
                    <option value="Suite No. 2">Suite No. 2</option>
                    <option value="Suite No. 3">Suite No. 3</option>
                    <option value="The Penthouse">The Penthouse</option>
                    <option value="Studio Retreat">Studio Retreat</option>
                    <option value="Villa Retreat">Villa Retreat</option>
                  </select>
                </div>

                {/* Dates Selector checking inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[9px] font-sans uppercase tracking-widest text-[#1A1814]/50 mb-1 block">
                      Check-In Date
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.checkIn}
                      onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                      className="w-full border-b border-[#B8975A]/20 pb-2 bg-transparent font-sans text-[14px] text-[#1A1814] outline-none focus:border-[#B8975A] transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-sans uppercase tracking-widest text-[#1A1814]/50 mb-1 block">
                      Check-Out Date
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.checkOut}
                      onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                      className="w-full border-b border-[#B8975A]/20 pb-2 bg-transparent font-sans text-[14px] text-[#1A1814] outline-none focus:border-[#B8975A] transition-colors duration-300"
                    />
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label className="text-[9px] font-sans uppercase tracking-widest text-[#1A1814]/50 mb-1 block">
                    Special Requests
                  </label>
                  <textarea
                    rows={4}
                    value={formData.requests}
                    onChange={(e) => setFormData({ ...formData, requests: e.target.value })}
                    placeholder="Dietary preferences, specific butler requests, early keys checkins..."
                    className="w-full border-b border-[#B8975A]/20 pb-2 bg-transparent font-sans text-[14px] text-[#1A1814] outline-none focus:border-[#B8975A] transition-colors duration-300 resize-none height-[100px]"
                  />
                </div>

                {/* SUMMARY PANEL FOOTER SECTION */}
                {formData.property && formData.checkIn && formData.checkOut && (
                  <div className="bg-[#FAF9F6] border border-[#B8975A]/15 p-5 mt-4 rounded-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 select-none animate-fade-in">
                    <div>
                      <span className="text-[10px] tracking-widest font-mono text-[#B8975A] uppercase block">Sanctuary Estimate</span>
                      <strong className="text-[18px] font-display text-[#1A1814] block mt-1 tracking-tight">
                        {formData.property}
                      </strong>
                      <span className="font-sans text-[12px] text-[#6B6560] block mt-0.5">
                        {formData.checkIn} to {formData.checkOut}
                      </span>
                    </div>

                    <div className="text-left md:text-right flex flex-col gap-0.5">
                      <span className="text-[10px] tracking-widest font-mono text-[#6B6560]/75 uppercase">
                        Total Nights: {nightsTotal}
                      </span>
                      <strong className="text-[22px] font-display text-[#B8975A] leading-none">
                        PKR {costEstimate.toLocaleString()}
                      </strong>
                      <span className="text-[10px] text-[#6B6560]/50 tracking-wide font-sans">
                        Tax and service charges included
                      </span>
                    </div>
                  </div>
                )}

                {/* Submit button trigger */}
                <button
                  type="submit"
                  className="w-full h-[52px] bg-[#B8975A] text-[#111009] font-sans text-[11px] uppercase tracking-[0.2em] font-semibold flex items-center justify-center overflow-hidden rounded-[2px] mt-4 relative group cursor-pointer"
                >
                  <span className="absolute inset-0 w-1/2 h-full bg-white/20 -skew-x-[30deg] -translate-x-[150%] group-hover:translate-x-[250%] transition-transform duration-700 ease-out" />
                  Confirm Reservation
                </button>

              </form>
            </div>
          )}
        </div>

        {/* Right Side Sticky info columns (40%) */}
        <div className="w-full lg:w-[40%] flex flex-col gap-10 select-none">
          
          {/* Trustpoints block */}
          <div className="border border-[#B8975A]/15 bg-white p-8 rounded-[2px] flex flex-col gap-6">
            <h3 className="font-display text-[32px] text-[#1A1814] font-light leading-tight">
              Why Zavari Haus?
            </h3>
            
            <div className="flex flex-col gap-5">
              
              {/* Trust 1 */}
              <div className="flex gap-4 items-start">
                <Sparkles className="text-[#B8975A] mt-0.5 shrink-0" size={18} />
                <span className="font-sans text-[14px] text-[#1A1814] font-medium leading-relaxed">
                  Instant Confirmation Checkups
                </span>
              </div>

              {/* Trust 2 */}
              <div className="flex gap-4 items-start">
                <ShieldCheck className="text-[#B8975A] mt-0.5 shrink-0" size={18} />
                <span className="font-sans text-[14px] text-[#1A1814] font-medium leading-relaxed">
                  Free Cancellation (Up to 7 days prior)
                </span>
              </div>

              {/* Trust 3 */}
              <div className="flex gap-4 items-start">
                <Compass className="text-[#B8975A] mt-0.5 shrink-0" size={18} />
                <span className="font-sans text-[14px] text-[#1A1814] font-medium leading-relaxed">
                  24/7 Personal Concierge Assigned
                </span>
              </div>

              {/* Trust 4 */}
              <div className="flex gap-4 items-start">
                <Clock className="text-[#B8975A] mt-0.5 shrink-0" size={18} />
                <span className="font-sans text-[14px] text-[#1A1814] font-medium leading-relaxed">
                  100% Secure Cryptographic Reservation
                </span>
              </div>

            </div>
          </div>

          {/* Sovereign Hospitality Pillars Note */}
          <div className="bg-white border border-[#B8975A]/20 p-8 rounded-[2px]">
            <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-[#B8975A] font-extrabold mb-3.5 block">
              Sovereign Hospitality Pillars
            </span>
            <h4 className="font-display text-[22px] text-[#1A1814] font-light leading-snug mb-3">
              Unrivaled Architectural Peace
            </h4>
            <p className="font-sans text-[13px] text-[#6B6560] leading-relaxed font-light">
              Zavari Haus properties operate on an uncompromised sensory baseline: pure HEPA active air flow, advanced sound shield technology (-45Db solitude index), and custom circadian room warming. Every aspect coordinates for perfect physical rest.
            </p>
          </div>

        </div>

      </div>

      <Footer />
    </div>
  );
}
