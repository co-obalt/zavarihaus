import React, { useState } from 'react';
import { FAQ_DATA } from '../data/hospitalityData';
import { Plus, Minus } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQ_DATA[0].id);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-[100px] md:py-[140px] bg-[#FAF9F6] border-t border-[#E8E1D6]">
      <div className="max-w-[1400px] mx-auto px-[5vw]">
        
        {/* Exact Layout Specification: ~30% heading column / ~70% FAQ column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* ~30% Heading Column */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#B8975A]">
              INFORMATION &amp; POLICIES
            </span>

            <h2
              className="text-[#1C1C1C] font-normal leading-[0.95]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(44px, 5vw, 68px)',
              }}
            >
              Frequently <br />
              Asked <span className="gold-italic font-normal">Questions</span>
            </h2>

            <p className="text-[#77736E] text-[16px] font-light leading-[1.7] pt-2">
              Everything you need to know about reserving your private residence, check-in logistics, amenities, and customized concierge services.
            </p>
          </div>

          {/* ~70% FAQ Column */}
          <div className="lg:col-span-8 space-y-0">
            {FAQ_DATA.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className="border-b border-[#E8E1D6] py-6 md:py-8 transition-colors"
                >
                  {/* Question row */}
                  <button
                    onClick={() => toggleFaq(item.id)}
                    className="w-full flex items-center justify-between text-left focus:outline-none group gap-6"
                  >
                    <span
                      className="text-[18px] md:text-[20px] font-medium text-[#1C1C1C] group-hover:text-[#B8975A] transition-colors"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {item.question}
                    </span>

                    {/* Exact 46px circular expand button from design.md */}
                    <div
                      className={`w-[46px] h-[46px] rounded-full border border-[#E8E1D6] text-[#B8975A] flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                        isOpen ? 'bg-[#EDE5D7] border-[#EDE5D7] text-[#513431]' : 'group-hover:border-[#B8975A]'
                      }`}
                    >
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </div>
                  </button>

                  {/* Expanded Answer */}
                  {isOpen && (
                    <div className="mt-4 pr-12 text-[#77736E] text-[16px] font-light leading-[1.7] animate-in slide-in-from-top-2 duration-300">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
