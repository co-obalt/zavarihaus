import React, { useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 4000);
  };

  return (
    <footer className="bg-[#FAF9F6] border-t border-[#E8E1D6] text-[#1C1C1C] pt-20 pb-12">
      <div className="max-w-[1400px] mx-auto px-[5vw]">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#E8E1D6]">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Zavari Haus Logo"
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="flex flex-col">
                <span
                  className="text-[#B8975A] font-medium tracking-[0.24em] text-[20px] uppercase"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Z A V A R I &nbsp; H A U S
                </span>
                <span
                  className="text-[#B8975A]/80 tracking-[0.3em] text-[9.5px] uppercase font-light mt-0.5"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  APARTMENT &amp; SUITES
                </span>
              </div>
            </div>

            <p className="text-[#77736E] text-[15px] max-w-sm font-light leading-[1.7]">
              An editorial sanctuary of quiet luxury, bespoke butler hospitality, and refined architectural living in the city center.
            </p>

            <button
              onClick={onOpenBooking}
              className="inline-flex items-center space-x-2 bg-transparent border border-[#B8975A] text-[#B8975A] hover:bg-[#B8975A] hover:text-[#1C1C1C] transition-colors text-[12px] font-medium tracking-[0.18em] uppercase px-6 py-3"
              style={{ borderRadius: '2px' }}
            >
              <span>RESERVE RESIDENCE</span>
              <ArrowUpRight size={14} />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#AAA39A]">
              NAVIGATION
            </h4>
            <ul className="space-y-2.5 text-[14px] text-[#77736E]">
              <li>
                <button onClick={() => onNavigate('spaces')} className="hover:text-[#B8975A] transition-colors">
                  Featured Spaces
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('experience')} className="hover:text-[#B8975A] transition-colors">
                  Boutique Experience
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('gallery')} className="hover:text-[#B8975A] transition-colors">
                  Architectural Gallery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('location')} className="hover:text-[#B8975A] transition-colors">
                  Location &amp; Landmarks
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('reviews')} className="hover:text-[#B8975A] transition-colors">
                  Guest Reflections
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-[#B8975A] transition-colors">
                  Information &amp; FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Editorial Newsletter Subscription */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#AAA39A]">
              EDITORIAL GAZETTE
            </h4>
            <p className="text-[#77736E] text-[14px] font-light">
              Receive private invitations to seasonal residence releases and bespoke culinary events.
            </p>

            {subscribed ? (
              <div className="p-3 bg-[#EDE5D7] border border-[#E8E1D6] text-[#513431] text-[13px] flex items-center gap-2" style={{ borderRadius: '2px' }}>
                <Check size={16} className="text-[#B8975A]" />
                <span>You are subscribed to the Gazette.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative border-b border-[#E8E1D6]">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent py-2.5 pr-10 text-[14px] text-[#1C1C1C] focus:outline-none focus:border-[#B8975A]"
                  />
                  <button
                    type="submit"
                    className="absolute right-0 top-2.5 text-[#B8975A] hover:text-[#513431] transition-colors"
                    aria-label="Subscribe"
                  >
                    <ArrowUpRight size={18} />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-[12px] text-[#77736E] gap-4">
          <p>© {new Date().getFullYear()} Zavari Haus — Apartment &amp; Suites. All rights reserved.</p>
          <div className="flex space-x-6 text-[11px] tracking-[0.1em] uppercase">
            <span className="hover:text-[#B8975A] cursor-pointer">PRIVACY POLICY</span>
            <span className="hover:text-[#B8975A] cursor-pointer">TERMS OF RESIDENCE</span>
            <span className="hover:text-[#B8975A] cursor-pointer">DISCREET CONCIERGE</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
