"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";
import { trustPoints } from "@/lib/siteData";
import SectionLabel from "./ui/SectionLabel";
import SplitTextReveal from "./ui/SplitTextReveal";

export default function IntroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from(".trust-card", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".trust-grid",
          start: "top 80%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="stay" className="section-padding bg-[var(--cream)]" ref={containerRef}>
      <div className="section-shell">
        <SectionLabel className="mb-6">The Experience</SectionLabel>
        
        <SplitTextReveal as="h2" className="text-section-title text-balance mb-8">
          A calmer way to stay in Bahria Town Lahore.
        </SplitTextReveal>
        
        <p className="text-body-large text-[var(--muted)] max-w-2xl mb-16">
          Zavari Haus offers private serviced apartments for guests who want the space of a home with the ease of a hotel. Every stay is fully furnished, thoughtfully prepared, and designed for simple short-term booking.
        </p>

        <div className="trust-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          {trustPoints.map((point, i) => (
            <div key={i} className="trust-card card-base p-6 flex items-start gap-4">
              <div className="w-2 h-2 rounded-full bg-[var(--champagne)] mt-2 shrink-0" />
              <p className="font-medium text-[var(--ink)]">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
