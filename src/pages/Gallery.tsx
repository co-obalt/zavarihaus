import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '../sections/Footer';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useContent } from '../content/ContentContext';

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const { pages, gallery } = useContent();
  const [activeTab, setActiveTab] = useState<'All' | 'Exterior' | 'Interior' | 'Pool & Spa' | 'Details'>('All');
  const [filteredPhotos, setFilteredPhotos] = useState<any[]>(gallery);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const headingWords = headingRef.current?.querySelectorAll('.clip-word');
    if (headingWords) {
      gsap.fromTo(headingWords, { clipPath: 'inset(0 0 100% 0)', y: 35 }, { clipPath: 'inset(0 0 0% 0)', y: 0, stagger: 0.12, duration: 1, ease: 'power4.out' });
    }
  }, []);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const ctx = gsap.context(() => {
      const items = grid.querySelectorAll('.masonry-grid-item');
      items.forEach((item) => {
        const mask = item.querySelector('.image-reveal-curtain');
        const img = item.querySelector('.masonry-img');
        if (mask && img) {
          gsap.timeline({
            scrollTrigger: { trigger: item, start: 'top 85%', toggleActions: 'play none none none' },
          })
            .fromTo(mask, { scaleY: 1 }, { scaleY: 0, duration: 0.85, ease: 'power3.inOut', transformOrigin: 'top' })
            .fromTo(img, { scale: 1.15 }, { scale: 1.0, duration: 1.1, ease: 'power2.out' }, 0);
        }
      });
    }, grid);

    return () => ctx.revert();
  }, [filteredPhotos]);

  const handleTabChange = (tab: 'All' | 'Exterior' | 'Interior' | 'Pool & Spa' | 'Details') => {
    if (tab === activeTab) return;

    const items = gridRef.current?.querySelectorAll('.masonry-grid-item');
    if (!items || items.length === 0) {
      setActiveTab(tab);
      applyFilter(tab);
      return;
    }

    gsap.to(items, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      stagger: 0.02,
      ease: 'power2.in',
      onComplete: () => {
        setActiveTab(tab);
        applyFilter(tab);
      },
    });
  };

  const applyFilter = (tab: 'All' | 'Exterior' | 'Interior' | 'Pool & Spa' | 'Details') => {
    if (tab === 'All') {
      setFilteredPhotos(gallery);
    } else {
      setFilteredPhotos(gallery.filter((photo: any) => photo.category === tab));
    }

    setTimeout(() => {
      const items = gridRef.current?.querySelectorAll('.masonry-grid-item');
      if (items) {
        gsap.fromTo(items, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.03, ease: 'power2.out' });
      }
    }, 50);
  };

  const openLightbox = (idx: number) => {
    setLightboxIndex(idx);
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      const modal = lightboxRef.current;
      if (modal) {
        const modalImg = modal.querySelector('.lightbox-image');
        gsap.fromTo(modal, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' });
        if (modalImg) {
          gsap.fromTo(modalImg, { scale: 0.85 }, { scale: 1, duration: 0.5, ease: 'power2.out' });
        }
      }
    }, 10);
  };

  const closeLightbox = () => {
    const modal = lightboxRef.current;
    if (modal) {
      const modalImg = modal.querySelector('.lightbox-image');
      gsap.to(modalImg, { scale: 0.85, duration: 0.3, ease: 'power2.in' });
      gsap.to(modal, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => {
          setLightboxIndex(null);
          document.body.style.overflow = '';
        },
      });
    } else {
      setLightboxIndex(null);
      document.body.style.overflow = '';
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev! - 1 + filteredPhotos.length) % filteredPhotos.length);
      if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev! + 1) % filteredPhotos.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredPhotos]);

  useEffect(() => {
    setFilteredPhotos(gallery);
  }, [gallery]);

  return (
    <div className="relative min-h-screen bg-[#FAF9F6] pt-[120px]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 text-center mb-16 select-none flex flex-col items-center">
        <h1 ref={headingRef} className="font-display text-[56px] md:text-[96px] text-[#1A1814] font-light tracking-tight flex justify-center gap-4 overflow-hidden leading-tight pb-3">
          {pages.gallery.title.split(' ').map((word, idx) => (
            <span key={idx} className="overflow-hidden inline-block pr-1 leading-none">
              <span className="clip-word inline-block origin-bottom">{word}</span>
            </span>
          ))}
        </h1>
        <div className="w-[80px] h-[1px] bg-[#B8975A] mt-6" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex flex-wrap justify-center items-center gap-6 md:gap-10 mb-16 pb-4 border-b border-[#B8975A]/15 select-none">
        {pages.gallery.tabs.map((tab: string) => {
          const isActive = activeTab === tab;
          return (
            <button key={tab} onClick={() => handleTabChange(tab as any)} className="font-sans text-[11px] uppercase tracking-[0.2em] relative py-2 text-[#6B6560] hover:text-[#B8975A] transition-colors duration-250 cursor-pointer">
              <span>{tab}</span>
              {isActive && <span className="absolute bottom-[-17px] left-0 w-full h-[2px] bg-[#B8975A] z-10" />}
            </button>
          );
        })}
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 pb-24 relative bg-[#FAF9F6] z-10">
        <div ref={gridRef} className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          {filteredPhotos.map((photo, idx) => (
            <div key={photo.id} onClick={() => openLightbox(idx)} className="masonry-grid-item break-inside-avoid relative overflow-hidden bg-[#111009] cursor-pointer rounded-[2px] mb-4 group scale-100 shadow-sm">
              <div className="image-reveal-curtain absolute inset-0 bg-[#FAF9F6] z-10 origin-top" />
              <img src={photo.url} alt={photo.alt} className="masonry-img w-full h-auto object-cover transition-transform duration-[800ms] group-hover:scale-105" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-[#111009]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-center items-center gap-2 select-none">
                <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-white font-medium border border-white/20 px-4 py-2 bg-[#111009]/20 backdrop-blur-sm rounded-[1px]">VIEW</span>
                <span className="font-sans text-[9px] tracking-widest text-[#B8975A] uppercase font-bold">{photo.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <div ref={lightboxRef} onClick={closeLightbox} className="fixed inset-0 bg-black/95 z-[500] flex items-center justify-center select-none" style={{ opacity: 0 }}>
          <div className="absolute top-6 right-8 flex items-center gap-1">
            <button onClick={closeLightbox} className="text-white/60 hover:text-white transition-colors duration-200 cursor-pointer p-2" aria-label="Close Lightbox">
              <X size={32} />
            </button>
          </div>
          <button onClick={handlePrev} className="absolute left-6 text-white/55 hover:text-[#B8975A] transition-colors duration-250 cursor-pointer p-4 hover:scale-110" aria-label="Previous Slide Photo">
            <ChevronLeft size={40} />
          </button>
          <div className="max-w-[90vw] max-h-[85vh] overflow-hidden flex flex-col items-center gap-4">
            <img src={filteredPhotos[lightboxIndex].url} alt={filteredPhotos[lightboxIndex].alt} className="lightbox-image max-w-[90vw] max-h-[80vh] object-contain rounded-sm" onClick={(e) => e.stopPropagation()} referrerPolicy="no-referrer" />
            <div className="flex justify-between items-center w-full px-2">
              <span className="font-display italic text-white/70 text-[18px]">{filteredPhotos[lightboxIndex].alt}</span>
              <span className="font-mono text-[10px] tracking-widest text-[#B8975A] uppercase font-semibold">{filteredPhotos[lightboxIndex].category}{lightboxIndex + 1} / {filteredPhotos.length}</span>
            </div>
          </div>
          <button onClick={handleNext} className="absolute right-6 text-white/55 hover:text-[#B8975A] transition-colors duration-250 cursor-pointer p-4 hover:scale-110" aria-label="Next Slide Photo">
            <ChevronRight size={40} />
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
}
