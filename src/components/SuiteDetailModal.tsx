import React, { useState } from 'react';
import { Suite } from '../types';
import { X, Check, Bed, Bath, Maximize2, Users, ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react';

interface SuiteDetailModalProps {
  suite: Suite | null;
  onClose: () => void;
  onBookNow: (suite: Suite) => void;
}

export const SuiteDetailModal: React.FC<SuiteDetailModalProps> = ({
  suite,
  onClose,
  onBookNow,
}) => {
  if (!suite) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-[#1C1C1C]/60 backdrop-blur-xs animate-in fade-in duration-300 overflow-y-auto">
      <div
        className="relative bg-[#FAF9F6] w-full max-w-5xl max-h-[90vh] overflow-y-auto border border-[#E8E1D6] shadow-[0_25px_60px_rgba(28,28,28,0.25)] my-auto"
        style={{ borderRadius: '2px' }}
      >
        {/* Sticky Close Button */}
        <button
          onClick={onClose}
          className="sticky top-4 right-4 ml-auto z-20 w-10 h-10 rounded-full bg-[#FAF9F6] border border-[#E8E1D6] text-[#1C1C1C] hover:text-[#B8975A] flex items-center justify-center transition-colors shadow-sm"
          aria-label="Close detail modal"
        >
          <X size={20} />
        </button>

        <div className="p-6 md:p-10 -mt-10">
          
          {/* Header Specs */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#E8E1D6]">
            <div>
              <div className="inline-block bg-[#513431] text-[#B8975A] px-4 py-1.5 text-[11px] font-semibold tracking-[0.16em] uppercase mb-3" style={{ borderRadius: '2px' }}>
                {suite.badge}
              </div>
              <h2 className="text-[34px] md:text-[46px] font-normal text-[#1C1C1C] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {suite.title}
              </h2>
            </div>

            <div className="text-left md:text-right">
              <span className="block text-[11px] tracking-[0.15em] uppercase text-[#AAA39A]">{suite.rateLabel}</span>
              <span className="text-[32px] font-medium text-[#B8975A]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                PKR {suite.pricePkr.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Gallery View */}
          <div className="mt-8 space-y-4">
            <div className="aspect-[16/10] md:aspect-[21/9] w-full overflow-hidden bg-[#EDE5D7] border border-[#E8E1D6]" style={{ borderRadius: '2px' }}>
              <img
                src={suite.gallery[activeImageIndex] || suite.mainImage}
                alt={suite.title}
                className="w-full h-full object-cover transition-all duration-500"
              />
            </div>

            {/* Gallery Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {suite.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative flex-shrink-0 w-24 aspect-[3/2] overflow-hidden border transition-all ${
                    activeImageIndex === idx ? 'border-[#B8975A] ring-1 ring-[#B8975A]' : 'border-[#E8E1D6] opacity-70 hover:opacity-100'
                  }`}
                  style={{ borderRadius: '2px' }}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Suite Overview Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-10">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <h3 className="text-[20px] font-medium text-[#1C1C1C] mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Residence Architecture &amp; Ambience
                </h3>
                <p className="text-[#77736E] text-[16px] leading-[1.8] font-light">
                  {suite.description}
                </p>
              </div>

              {/* Suite Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-[#FDFBF7] border border-[#E8E1D6]" style={{ borderRadius: '2px' }}>
                <div className="text-center">
                  <Maximize2 size={18} className="mx-auto text-[#B8975A] mb-1" />
                  <span className="block text-[11px] uppercase text-[#AAA39A]">SIZE</span>
                  <span className="text-[14px] font-medium text-[#1C1C1C]">{suite.sizeSqFt} sq ft</span>
                </div>
                <div className="text-center">
                  <Bed size={18} className="mx-auto text-[#B8975A] mb-1" />
                  <span className="block text-[11px] uppercase text-[#AAA39A]">BEDROOMS</span>
                  <span className="text-[14px] font-medium text-[#1C1C1C]">{suite.bedrooms} King</span>
                </div>
                <div className="text-center">
                  <Bath size={18} className="mx-auto text-[#B8975A] mb-1" />
                  <span className="block text-[11px] uppercase text-[#AAA39A]">BATHROOMS</span>
                  <span className="text-[14px] font-medium text-[#1C1C1C]">{suite.bathrooms} Luxury</span>
                </div>
                <div className="text-center">
                  <Users size={18} className="mx-auto text-[#B8975A] mb-1" />
                  <span className="block text-[11px] uppercase text-[#AAA39A]">CAPACITY</span>
                  <span className="text-[14px] font-medium text-[#1C1C1C]">{suite.guests} Guests</span>
                </div>
              </div>

              {/* Unique Features */}
              <div className="space-y-4">
                <h4 className="text-[13px] font-semibold tracking-[0.16em] uppercase text-[#513431]">
                  EXCLUSIVE SUITE AMENITIES
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {suite.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-[14px] text-[#1C1C1C]">
                      <span className="w-5 h-5 rounded-full bg-[#EDE5D7] text-[#B8975A] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check size={12} />
                      </span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Action Box */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#FDFBF7] p-8 border border-[#E8E1D6] space-y-6 shadow-sm" style={{ borderRadius: '2px' }}>
                <div className="border-b border-[#E8E1D6] pb-4">
                  <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#B8975A]">
                    DIRECT RESIDENCE RESERVATION
                  </span>
                  <h4 className="text-[26px] text-[#1C1C1C] font-normal mt-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    Reserve {suite.title}
                  </h4>
                </div>

                <div className="space-y-3 text-[14px] text-[#77736E]">
                  <div className="flex justify-between py-1 border-b border-[#E8E1D6]/50">
                    <span>Nightly Rate</span>
                    <span className="font-medium text-[#1C1C1C]">PKR {suite.pricePkr.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#E8E1D6]/50">
                    <span>Private Butler</span>
                    <span className="text-[#B8975A] font-medium">Included</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#E8E1D6]/50">
                    <span>Valet &amp; Parking</span>
                    <span className="text-[#B8975A] font-medium">Included</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onBookNow(suite);
                  }}
                  className="w-full bg-[#B8975A] text-[#1C1C1C] hover:bg-[#513431] hover:text-[#B8975A] transition-all duration-300 text-[12px] font-semibold tracking-[0.2em] uppercase py-4 flex items-center justify-center gap-2"
                  style={{ borderRadius: '2px' }}
                >
                  <span>REQUEST RESERVATION</span>
                  <ArrowUpRight size={16} />
                </button>

                <div className="flex items-center gap-2 text-[12px] text-[#77736E] justify-center pt-2">
                  <ShieldCheck size={15} className="text-[#B8975A]" />
                  <span>Flexible cancellation up to 48 hours prior</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
