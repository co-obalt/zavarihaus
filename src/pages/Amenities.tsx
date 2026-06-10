import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '../sections/Footer';
import { useContent } from '../content/ContentContext';

gsap.registerPlugin(ScrollTrigger);

export default function Amenities() {
  const { pages, amenities } = useContent();
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const headingWords = headingRef.current?.querySelectorAll('.clip-word');
    if (headingWords) {
      gsap.fromTo(headingWords, { clipPath: 'inset(0 0 100% 0)', y: 35 }, { clipPath: 'inset(0 0 0% 0)', y: 0, stagger: 0.12, duration: 1, ease: 'power4.out' });
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const blocks = container.querySelectorAll('.amenity-block');
      blocks.forEach((block) => {
        const imgWrap = block.querySelector('.amenity-img-wrap');
        const img = block.querySelector('.amenity-img');
        const textContent = block.querySelector('.amenity-text-content');

        if (imgWrap && img) {
          gsap.fromTo(imgWrap, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.1, ease: 'power3.inOut', scrollTrigger: { trigger: block, start: 'top 75%' } });
          gsap.fromTo(img, { scale: 1.15 }, { scale: 1, duration: 1.3, ease: 'power2.out', scrollTrigger: { trigger: block, start: 'top 75%' } });
        }

        if (textContent) {
          gsap.fromTo(textContent, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: block, start: 'top 75%' } });
        }
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#FAF9F6]">
      <div
        className="relative w-full h-[60vh] bg-cover bg-center flex items-center justify-center select-none"
        style={{ backgroundImage: `url('${pages.amenities.heroImage}')` }}
      >
        <div className="absolute inset-0 bg-[#111009]/60" />
        <div className="relative z-10 text-center px-4">
          <h1 ref={headingRef} className="font-display text-[48px] md:text-[80px] text-white font-light flex justify-center gap-3 overflow-hidden leading-tight pb-3">
            {pages.amenities.title.split(' ').map((word, idx) => (
              <span key={idx} className="overflow-hidden inline-block pr-1 leading-none">
                <span className="clip-word inline-block origin-bottom">{word}</span>
              </span>
            ))}
          </h1>
          <p className="font-sans text-[13px] md:text-[15px] text-white/70 tracking-wide mt-4 uppercase">
            {pages.amenities.subtitle}
          </p>
        </div>
      </div>

      <div ref={containerRef} className="w-full flex flex-col pt-10 relative bg-[#FAF9F6] z-10 pr-0 pl-0">
        {amenities.map((amenity: any, index: number) => {
          const isOdd = index % 2 !== 0;
          return (
            <section key={index} className={`amenity-block w-full min-h-[90vh] lg:min-h-screen flex flex-col ${isOdd ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center bg-[#FAF9F6]`}>
              <div className="amenity-img-wrap w-full lg:w-[55%] h-[400px] lg:h-screen overflow-hidden relative" style={{ clipPath: 'inset(0 100% 0 0)' }}>
                <img src={amenity.image} alt={amenity.title} className="amenity-img w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111009]/15 to-transparent pointer-events-none" />
              </div>

              <div className="w-full lg:w-[45%] h-full flex flex-col justify-center px-8 md:px-[64px] py-16">
                <div className="amenity-text-content max-w-[450px]">
                  <span className="font-mono text-[10px] md:text-[11px] text-[#B8975A] tracking-[0.25em] font-bold">{amenity.category}</span>
                  <h2 className="font-display text-[36px] md:text-[52px] text-[#1A1814] font-light leading-tight mt-4 select-text">{amenity.title}</h2>
                  <p className="font-sans text-[14px] md:text-[15px] italic text-[#6B6560] leading-relaxed mt-4 mb-8 select-text">{amenity.subtitle}</p>
                  <ul className="flex flex-col gap-4 select-none">
                    {amenity.bullets.map((bullet: string, bIdx: number) => (
                      <li key={bIdx} className="flex items-start gap-3 text-[#1A1814]/85">
                        <span className="text-[#B8975A] font-bold">â€”</span>
                        <span className="font-sans text-[13px] md:text-[14px] text-[#6B6560]">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <Footer />
    </div>
  );
}
