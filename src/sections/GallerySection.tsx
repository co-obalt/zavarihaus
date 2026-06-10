import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useContent } from '../content/ContentContext';

gsap.registerPlugin(ScrollTrigger);

const GALLERY_IMAGES = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=600&h=840", // REPLACE: luxurious dining room setting
    alt: "Luxurious Dining Setting",
    className: "row-span-2 col-span-1 h-[448px] w-full md:w-[320px]"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&q=80&w=400&h=400", // REPLACE: tactile interior detailing
    alt: "Textile Interior Close Up",
    className: "col-span-1 h-[224px] w-full md:w-[224px]"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&q=80&w=400&h=400", // REPLACE: designer lighting lounge
    alt: "Designer Lounge Setting",
    className: "col-span-1 h-[224px] w-full md:w-[224px]"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800&h=400", // REPLACE: wide angle panoramic outdoor balcony terrace
    alt: "Panoramic Outdoor Balcony",
    className: "col-span-2 h-[224px] w-full md:w-[460px]"
  }
];

export default function GallerySection() {
  const { home } = useContent();
  const gallery = home.galleryPreview;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const items = container.querySelectorAll('.gallery-grid-item');
      items.forEach((item) => {
        const mask = item.querySelector('.gallery-mask');
        const img = item.querySelector('img');

        if (mask && img) {
          gsap.timeline({
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          })
          // Curtain drops up (scaleY goes from 1 to 0)
          .fromTo(mask, 
            { scaleY: 1 },
            { scaleY: 0, duration: 0.9, ease: 'power3.inOut', transformOrigin: 'top' }
          )
          // Image scales down from 1.18 to 1.0 simultaneously
          .fromTo(img, 
            { scale: 1.18 },
            { scale: 1.0, duration: 1.1, ease: 'power2.out' },
            0
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#FAF9F6] py-[112px] px-8 md:px-[64px] flex flex-col items-center z-10"
    >
      <div className="max-w-[1200px] w-full flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center mb-12 select-none">
          <span className="font-sans text-[11px] tracking-[0.25em] text-[#B8975A] uppercase font-bold">
            {gallery.eyebrow}
          </span>
          <h2 className="font-display text-[40px] md:text-[46px] text-[#1A1814] font-light mt-4">
            {gallery.title}
          </h2>
          <div className="w-[64px] h-[1px] bg-[#B8975A] mt-5 mx-auto" />
        </div>

        {/* Asymmetric CSS Grid Container */}
        <div className="flex flex-col md:grid md:grid-cols-3 md:grid-rows-2 gap-4 max-w-fit select-none">
          {gallery.images.map((img: any) => (
            <div
              key={img.id}
              className={`gallery-grid-item relative overflow-hidden bg-[#111009] cursor-pointer rounded-[2px] group ${img.className}`}
            >
              {/* Dynamic Reveal Mask Overlay */}
              <div className="gallery-mask absolute inset-0 bg-[#FAF9F6] z-10 origin-top" />

              {/* The Image inside */}
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-full object-cover origin-center transition-transform duration-[800ms] group-hover:scale-[1.05]"
                referrerPolicy="no-referrer"
              />

              {/* Aesthetic Hover Tint Overlay */}
              <div className="absolute inset-0 bg-[#111009]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
                  <span className="font-sans text-[11px] tracking-widest text-[#FAF9F6] border border-[#FAF9F6]/30 px-4 py-2 uppercase bg-[#111009]/30 rounded-[2px] backdrop-blur-sm">
                  {gallery.hoverLabel}
                  </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
