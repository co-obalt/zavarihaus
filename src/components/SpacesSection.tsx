import React, { useState } from 'react';
import { Suite } from '../types';
import { SUITES_DATA } from '../data/suitesData';
import { ArrowUpRight, Bed, Users, Maximize2 } from 'lucide-react';

interface SpacesSectionProps {
  onSelectSuite: (suite: Suite) => void;
  onBookSuite: (suite: Suite) => void;
}

export const SpacesSection: React.FC<SpacesSectionProps> = ({
  onSelectSuite,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'Skyview' | 'Family Heaven' | 'Sunset'>('all');

  const categories: { label: string; value: 'all' | 'Skyview' | 'Family Heaven' | 'Sunset'; count: number }[] = [
    { label: 'ALL SUITES', value: 'all', count: SUITES_DATA.length },
    { label: 'SKYVIEW', value: 'Skyview', count: SUITES_DATA.filter((s) => s.category === 'Skyview').length },
    { label: 'FAMILY HEAVEN', value: 'Family Heaven', count: SUITES_DATA.filter((s) => s.category === 'Family Heaven').length },
    { label: 'SUNSET', value: 'Sunset', count: SUITES_DATA.filter((s) => s.category === 'Sunset').length },
  ];

  const filteredSuites = SUITES_DATA.filter((suite) => {
    if (activeCategory === 'all') return true;
    return suite.category === activeCategory;
  });

  return (
    <section id="spaces" className="py-[100px] md:py-[140px] bg-[#FAF9F6]">
      <div className="max-w-[1400px] mx-auto px-[5vw]">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 pb-8 border-b border-[#E8E1D6]">
          <div className="space-y-4 max-w-2xl">
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#B8975A]">
              ACCOMMODATION COLLECTION — 12 RESIDENCES
            </span>
            <h2
              className="text-[#1C1C1C] font-normal leading-[0.95]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(44px, 5vw, 76px)',
              }}
            >
              Featured <span className="gold-italic font-normal">Spaces</span>
            </h2>
            <p className="text-[#77736E] text-[16px] font-light max-w-xl">
              12 bespoke serviced residences organized across three distinct sanctuary categories: Skyview skyline suites, Family Heaven grand lofts, and golden Sunset residences.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="mt-8 md:mt-0 flex flex-wrap gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`text-[12px] font-medium tracking-[0.16em] uppercase px-5 py-2.5 transition-all duration-300 flex items-center gap-2 ${
                  activeCategory === cat.value
                    ? 'border border-[#B8975A] text-[#1C1C1C] bg-[#EDE5D7]/60 font-semibold'
                    : 'border border-[#E8E1D6] text-[#77736E] hover:border-[#B8975A] hover:text-[#1C1C1C] bg-[#FDFBF7]'
                }`}
                style={{ borderRadius: '2px' }}
              >
                <span>{cat.label}</span>
                <span className="text-[10px] text-[#B8975A] font-light">({cat.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* 12 Cards Grid (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {filteredSuites.map((suite) => (
            <div
              key={suite.id}
              onClick={() => onSelectSuite(suite)}
              className="group cursor-pointer bg-[#FDFBF7] border border-[#E8E1D6] overflow-hidden transition-all duration-500 hover:border-[#B8975A]/60 shadow-[0_12px_30px_rgba(28,28,28,0.06)] hover:shadow-[0_20px_45px_rgba(28,28,28,0.12)] flex flex-col justify-between"
              style={{ borderRadius: '2px' }}
            >
              {/* Image & Dark Badge Container */}
              <div className="relative aspect-[3/2] overflow-hidden bg-[#EDE5D7]">
                <img
                  src={suite.mainImage}
                  alt={suite.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                />

                {/* Badge: Deep Espresso (#513431) with Gold (#B8975A) text */}
                <div
                  className="absolute top-[20px] left-[20px] bg-[#513431] text-[#B8975A] px-[16px] py-[9px] text-[10px] font-semibold tracking-[0.16em] uppercase z-10 shadow-sm"
                  style={{ borderRadius: '2px' }}
                >
                  {suite.badge}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-7 space-y-5 flex-1 flex flex-col justify-between">
                <div className="space-y-2.5">
                  <h3
                    className="text-[25px] md:text-[27px] font-normal text-[#1C1C1C] leading-[1.1] transition-colors group-hover:text-[#B8975A]"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {suite.title}
                  </h3>

                  <p className="text-[#77736E] text-[13.5px] font-light leading-relaxed line-clamp-2">
                    {suite.tagline}
                  </p>
                </div>

                {/* Specs Pill row */}
                <div className="flex items-center space-x-5 text-[12.5px] text-[#77736E] border-y border-[#E8E1D6]/70 py-3">
                  <div className="flex items-center gap-1.5">
                    <Maximize2 size={13} className="text-[#B8975A]" />
                    <span>{suite.sizeSqFt} sq ft</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Bed size={13} className="text-[#B8975A]" />
                    <span>{suite.bedrooms} Bed</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users size={13} className="text-[#B8975A]" />
                    <span>{suite.guests} Guests</span>
                  </div>
                </div>

                {/* Footer Price & Circular Arrow Button */}
                <div className="flex items-end justify-between pt-1">
                  <div>
                    <span className="block text-[10px] tracking-[0.15em] uppercase text-[#AAA39A]">
                      {suite.rateLabel}
                    </span>
                    <span
                      className="text-[23px] font-medium text-[#B8975A]"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      PKR {suite.pricePkr.toLocaleString()}
                    </span>
                  </div>

                  {/* Circular 48px Arrow Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectSuite(suite);
                    }}
                    className="w-[48px] h-[48px] rounded-full border border-[#E8E1D6] text-[#B8975A] bg-transparent transition-all duration-300 flex items-center justify-center group-hover:bg-[#EDE5D7] group-hover:border-[#EDE5D7] group-hover:text-[#513431]"
                    aria-label={`View details for ${suite.title}`}
                  >
                    <ArrowUpRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
                    />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
