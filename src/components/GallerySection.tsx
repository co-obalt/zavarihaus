import React, { useState } from 'react';
import { GALLERY_DATA } from '../data/hospitalityData';
import { GalleryCategory, GalleryItem } from '../types';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const categories: { label: string; value: GalleryCategory }[] = [
    { label: 'ALL PHOTOS', value: 'all' },
    { label: 'SUITES', value: 'suites' },
    { label: 'LIVING SALONS', value: 'living' },
    { label: 'DINING', value: 'dining' },
    { label: 'ARCHITECTURAL', value: 'architectural' },
    { label: 'VIEWS', value: 'views' },
  ];

  const filteredItems = GALLERY_DATA.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const handleNextImage = () => {
    if (!selectedImage) return;
    const currIndex = filteredItems.findIndex((i) => i.id === selectedImage.id);
    const nextIndex = (currIndex + 1) % filteredItems.length;
    setSelectedImage(filteredItems[nextIndex]);
  };

  const handlePrevImage = () => {
    if (!selectedImage) return;
    const currIndex = filteredItems.findIndex((i) => i.id === selectedImage.id);
    const prevIndex = (currIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedImage(filteredItems[prevIndex]);
  };

  return (
    <section id="gallery" className="py-[100px] md:py-[140px] bg-[#FAF9F6]">
      <div className="max-w-[1400px] mx-auto px-[5vw]">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-[#E8E1D6]">
          <div className="space-y-3">
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#B8975A]">
              ARCHITECTURAL PORTFOLIO
            </span>
            <h2
              className="text-[#1C1C1C] font-normal leading-[0.95]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(44px, 5vw, 76px)',
              }}
            >
              Visual <span className="gold-italic font-normal">Narrative</span>
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="mt-8 md:mt-0 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`text-[12px] font-medium tracking-[0.14em] uppercase px-4 py-2 transition-all duration-300 ${
                  activeCategory === cat.value
                    ? 'border border-[#B8975A] text-[#1C1C1C] bg-[#EDE5D7]/50'
                    : 'border border-[#E8E1D6] text-[#77736E] hover:border-[#B8975A] hover:text-[#1C1C1C]'
                }`}
                style={{ borderRadius: '2px' }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group cursor-pointer relative aspect-[4/3] bg-[#FDFBF7] border border-[#E8E1D6] overflow-hidden shadow-xs hover:border-[#B8975A] transition-all"
              style={{ borderRadius: '2px' }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
              />

              <div className="absolute inset-0 bg-[#1C1C1C]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#B8975A]">
                  {item.category}
                </span>
                <h4 className="text-[18px] font-normal" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {item.title}
                </h4>
                <div className="mt-2 w-8 h-8 rounded-full border border-[#B8975A] text-[#B8975A] flex items-center justify-center">
                  <Maximize2 size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-[#1C1C1C]/90 backdrop-blur-xs flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-200">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white/80 hover:text-[#B8975A] p-2 focus:outline-none"
            aria-label="Close Lightbox"
          >
            <X size={28} />
          </button>

          <button
            onClick={handlePrevImage}
            className="absolute left-4 md:left-8 text-white/80 hover:text-[#B8975A] p-3 bg-black/30 rounded-full border border-white/20"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={handleNextImage}
            className="absolute right-4 md:right-8 text-white/80 hover:text-[#B8975A] p-3 bg-black/30 rounded-full border border-white/20"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>

          <div className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center">
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="max-h-[70vh] w-auto object-contain border border-[#E8E1D6]/30 shadow-2xl"
              style={{ borderRadius: '2px' }}
            />
            <div className="mt-4 text-center max-w-lg space-y-1">
              <h3 className="text-[24px] font-normal text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {selectedImage.title}
              </h3>
              <p className="text-[14px] text-white/70 font-light">
                {selectedImage.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
