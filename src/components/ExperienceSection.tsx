import React from 'react';
import { EXPERIENCES_DATA } from '../data/hospitalityData';
import { Sparkles, Utensils, Shield, HeartHandshake, Coffee, Key } from 'lucide-react';

interface ExperienceSectionProps {
  onOpenBooking: () => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="experience" className="py-[100px] md:py-[140px] bg-[#FAF9F6] border-t border-[#E8E1D6]">
      <div className="max-w-[1400px] mx-auto px-[5vw]">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#B8975A]">
            UNCOMPROMISING HOSPITALITY
          </span>
          <h2
            className="text-[#1C1C1C] font-normal leading-[0.95]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(44px, 5vw, 76px)',
            }}
          >
            Boutique <span className="gold-italic font-normal">Services</span>
          </h2>
          <p className="text-[#77736E] text-[16px] font-light leading-[1.7]">
            At Zavari Haus, every residence experience is tailored around discreet, quiet luxury. 
            From personal concierges to private in-suite culinary orchestrations.
          </p>
        </div>

        {/* 4 Cards Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {EXPERIENCES_DATA.map((item) => (
            <div
              key={item.id}
              className="group bg-[#FDFBF7] border border-[#E8E1D6] p-4 flex flex-col justify-between transition-all duration-300 hover:border-[#B8975A] shadow-[0_10px_25px_rgba(28,28,28,0.06)]"
              style={{ borderRadius: '2px' }}
            >
              <div className="space-y-6">
                <div className="relative aspect-[4/3] overflow-hidden bg-[#EDE5D7]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <span
                    className="absolute top-3 left-3 bg-[#513431] text-[#B8975A] text-[9px] font-semibold tracking-[0.16em] uppercase px-3 py-1.5"
                    style={{ borderRadius: '2px' }}
                  >
                    {item.tag}
                  </span>
                </div>

                <div className="px-2 space-y-2">
                  <span className="block text-[10px] tracking-[0.2em] uppercase text-[#AAA39A]">
                    {item.subtitle}
                  </span>
                  <h3
                    className="text-[24px] font-normal text-[#1C1C1C]"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-[#77736E] text-[14px] font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 px-2 border-t border-[#E8E1D6]/50 mt-6">
                <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-[#B8975A] group-hover:text-[#513431] transition-colors flex items-center gap-1">
                  <span>UPON REQUEST</span>
                  <span className="text-xs">→</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Quiet Luxury Hospitality Features Banner */}
        <div className="mt-20 bg-[#FDFBF7] border border-[#E8E1D6] p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center" style={{ borderRadius: '2px' }}>
          <div className="space-y-2">
            <span className="block text-[36px] font-light text-[#B8975A]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              24 / 7
            </span>
            <h4 className="text-[14px] font-medium tracking-[0.16em] uppercase text-[#1C1C1C]">
              DISCREET BUTLER ATTENTION
            </h4>
            <p className="text-[#77736E] text-[13px] font-light">
              Always available for unpacking, laundry, and private errands.
            </p>
          </div>

          <div className="space-y-2 border-y md:border-y-0 md:border-x border-[#E8E1D6] py-6 md:py-0 md:px-6">
            <span className="block text-[36px] font-light text-[#B8975A]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              100%
            </span>
            <h4 className="text-[14px] font-medium tracking-[0.16em] uppercase text-[#1C1C1C]">
              ACOUSTIC ISOLATION
            </h4>
            <p className="text-[#77736E] text-[13px] font-light">
              Triple-glazed windows and insulated walling for total tranquility.
            </p>
          </div>

          <div className="space-y-2">
            <span className="block text-[36px] font-light text-[#B8975A]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              FINE LINEN
            </span>
            <h4 className="text-[14px] font-medium tracking-[0.16em] uppercase text-[#1C1C1C]">
              400TC ORGANIC COTTON
            </h4>
            <p className="text-[#77736E] text-[13px] font-light">
              Artisanal bedding, pillow menus, and hypoallergenic down.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
