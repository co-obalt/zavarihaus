import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function KineticStatement() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const statsLineRef = useRef<HTMLDivElement>(null);

  const statVal1 = useRef<HTMLSpanElement>(null);
  const statVal2 = useRef<HTMLSpanElement>(null);
  const statVal3 = useRef<HTMLSpanElement>(null);

  const sentence = "We don't just offer rooms; we curate experiences that linger long after you leave.";
  const words = sentence.split(" ");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Text scrub animation
      const wordSpans = textRef.current?.querySelectorAll('.kinetic-word');
      if (wordSpans && wordSpans.length > 0) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            end: 'bottom 40%',
            scrub: 1,
          }
        });

        wordSpans.forEach((word, index) => {
          tl.to(word, {
            opacity: 1,
            ease: 'none',
          }, index * 0.06); // Offset stagger based on index
        });
      }

      // 2. Stats rule alignment line
      gsap.fromTo(statsLineRef.current,
        { width: 0 },
        {
          width: 120,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsLineRef.current,
            start: 'top 85%',
          }
        }
      );

      // 3. Stats numerical countups
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
          }
        });
      };

      countUp(statVal1, 14, '', '+');
      countUp(statVal2, 4.9, '', '★');
      countUp(statVal3, 500, '', '+');

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      id="narrative"
      ref={containerRef}
      className="relative w-full bg-[#FAF9F6] py-[160px] px-8 md:px-[80px] overflow-hidden flex flex-col items-center"
    >
      <div className="max-w-[1100px] text-center">
        {/* Paragraph wrapping the separate kinetic words */}
        <p
          ref={textRef}
          className="font-display text-[32px] md:text-[clamp(36px,5.5vw,80px)] text-[#1A1814] font-light leading-[1.2] mb-24"
        >
          {words.map((word, idx) => (
            <span
              key={idx}
              className="kinetic-word inline-block opacity-[0.08]"
              style={{ marginRight: '0.25em' }}
            >
              {word}
            </span>
          ))}
        </p>

        {/* Divider above stats */}
        <div
          ref={statsLineRef}
          className="h-[1px] bg-[#B8975A] mb-12 mx-auto"
          style={{ width: '0px' }}
        />

        {/* Stats Row */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-[80px] items-center justify-center">
          {/* Item 1 */}
          <div className="flex flex-col items-center">
            <span
              ref={statVal1}
              className="font-display text-[56px] md:text-[64px] text-[#B8975A] font-medium leading-none"
            >
              0+
            </span>
            <span className="font-sans text-[11px] md:text-[12px] uppercase tracking-[0.2em] text-[#6B6560] mt-2">
              Properties
            </span>
          </div>

          {/* Item 2 */}
          <div className="flex flex-col items-center">
            <span
              ref={statVal2}
              className="font-display text-[56px] md:text-[64px] text-[#B8975A] font-medium leading-none"
            >
              0★
            </span>
            <span className="font-sans text-[11px] md:text-[12px] uppercase tracking-[0.2em] text-[#6B6560] mt-2">
              Rating
            </span>
          </div>

          {/* Item 3 */}
          <div className="flex flex-col items-center">
            <span
              ref={statVal3}
              className="font-display text-[56px] md:text-[64px] text-[#B8975A] font-medium leading-none"
            >
              0+
            </span>
            <span className="font-sans text-[11px] md:text-[12px] uppercase tracking-[0.2em] text-[#6B6560] mt-2">
              Guests
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
