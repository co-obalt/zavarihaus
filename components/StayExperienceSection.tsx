"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";
import { staySteps } from "@/lib/siteData";
import SectionLabel from "./ui/SectionLabel";
import SplitTextReveal from "./ui/SplitTextReveal";

export default function StayExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from(".step-item", {
        opacity: 0,
        x: -20,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".steps-container",
          start: "top 75%",
        },
      });
      
      gsap.from(".step-line", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".steps-container",
          start: "top 75%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section-padding bg-[var(--soft-white)]" ref={containerRef}>
      <div className="section-shell">
        <SectionLabel className="mb-6">Your Journey</SectionLabel>
        
        <SplitTextReveal as="h2" className="text-section-title text-balance mb-16">
          From arrival to a quiet night in.
        </SplitTextReveal>

        <div className="steps-container relative flex flex-col md:flex-row gap-8 md:gap-4 justify-between">
          {/* Connecting line (Desktop) */}
          <div className="step-line hidden md:block absolute top-[28px] left-[40px] right-[40px] h-[1px] bg-[var(--line)] -z-10" />

          {staySteps.map((step, i) => (
            <div key={i} className="step-item relative flex flex-row md:flex-col gap-6 md:gap-4 md:w-1/5">
              {/* Connecting line (Mobile) */}
              {i !== staySteps.length - 1 && (
                <div className="md:hidden absolute top-[40px] left-[20px] bottom-[-32px] w-[1px] bg-[var(--line)] -z-10" />
              )}
              
              <div className="w-10 h-10 rounded-full bg-[var(--surface)] border border-[var(--line)] flex items-center justify-center shrink-0">
                <span className="font-editorial text-xl text-[var(--champagne)]">{step.number}</span>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg text-[var(--ink)] mb-2">{step.title}</h3>
                <p className="text-[var(--muted)] text-sm leading-relaxed">{step.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
