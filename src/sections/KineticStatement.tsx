import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useContent } from '../content/ContentContext';

gsap.registerPlugin(ScrollTrigger);

export default function KineticStatement() {
  const { home } = useContent();
  const statement = home.statement;
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const statsLineRef = useRef<HTMLDivElement>(null);

  const statVal1 = useRef<HTMLSpanElement>(null);
  const statVal2 = useRef<HTMLSpanElement>(null);
  const statVal3 = useRef<HTMLSpanElement>(null);

  const words = statement.sentence.split(' ');

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wordSpans = textRef.current?.querySelectorAll('.kinetic-word');
      if (wordSpans && wordSpans.length > 0) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            end: 'bottom 40%',
            scrub: 1,
          },
        });

        wordSpans.forEach((word, index) => {
          tl.to(
            word,
            {
              opacity: 1,
              ease: 'none',
            },
            index * 0.06
          );
        });
      }

      gsap.fromTo(
        statsLineRef.current,
        { width: 0 },
        {
          width: 120,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsLineRef.current,
            start: 'top 85%',
          },
        }
      );

      const countUp = (ref: React.RefObject<HTMLSpanElement | null>, endValue: number, prefix = '', suffix = '') => {
        const el = ref.current;
        if (!el) return;
        const countObj = { val: 0 };
        gsap.to(countObj, {
          val: endValue,
          duration: 1.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
          },
          onUpdate: () => {
            if (el) {
              const formattedVal = countObj.val.toFixed(endValue === 4.9 ? 1 : 0);
              el.textContent = `${prefix}${formattedVal}${suffix}`;
            }
          },
        });
      };

      countUp(statVal1, statement.stats[0].value, '', statement.stats[0].suffix);
      countUp(statVal2, statement.stats[1].value, '', statement.stats[1].suffix);
      countUp(statVal3, statement.stats[2].value, '', statement.stats[2].suffix);
    }, containerRef);

    return () => ctx.revert();
  }, [statement]);

  return (
    <div
      id="narrative"
      ref={containerRef}
      className="relative w-full bg-[#FAF9F6] py-[160px] px-8 md:px-[80px] overflow-hidden flex flex-col items-center"
    >
      <div className="max-w-[1100px] text-center">
        <p
          ref={textRef}
          className="font-display text-[32px] md:text-[clamp(36px,5.5vw,80px)] text-[#1A1814] font-light leading-[1.2] mb-24"
        >
          {words.map((word, idx) => (
            <span key={idx} className="kinetic-word inline-block opacity-[0.08]" style={{ marginRight: '0.25em' }}>
              {word}
            </span>
          ))}
        </p>

        <div ref={statsLineRef} className="h-[1px] bg-[#B8975A] mb-12 mx-auto" style={{ width: '0px' }} />

        <div className="flex flex-col md:flex-row gap-12 md:gap-[80px] items-center justify-center">
          <div className="flex flex-col items-center">
            <span ref={statVal1} className="font-display text-[56px] md:text-[64px] text-[#B8975A] font-medium leading-none">
              0{statement.stats[0].suffix}
            </span>
            <span className="font-sans text-[11px] md:text-[12px] uppercase tracking-[0.2em] text-[#6B6560] mt-2">
              {statement.stats[0].label}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span ref={statVal2} className="font-display text-[56px] md:text-[64px] text-[#B8975A] font-medium leading-none">
              0{statement.stats[1].suffix}
            </span>
            <span className="font-sans text-[11px] md:text-[12px] uppercase tracking-[0.2em] text-[#6B6560] mt-2">
              {statement.stats[1].label}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span ref={statVal3} className="font-display text-[56px] md:text-[64px] text-[#B8975A] font-medium leading-none">
              0{statement.stats[2].suffix}
            </span>
            <span className="font-sans text-[11px] md:text-[12px] uppercase tracking-[0.2em] text-[#6B6560] mt-2">
              {statement.stats[2].label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
