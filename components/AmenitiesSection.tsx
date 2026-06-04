"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";
import { amenities } from "@/lib/siteData";
import SectionLabel from "./ui/SectionLabel";
import SplitTextReveal from "./ui/SplitTextReveal";

export default function AmenitiesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from(".amenity-card", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".amenities-grid",
          start: "top 85%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="amenities" className="section-padding bg-[var(--cream)]" ref={containerRef}>
      <div className="section-shell">
        <SectionLabel className="mb-6">Amenities</SectionLabel>
        
        <SplitTextReveal as="h2" className="text-section-title text-balance mb-16">
          Everything you need for an easy stay.
        </SplitTextReveal>

        <div className="amenities-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {amenities.map((amenity, i) => {
            const Icon = amenity.icon;
            return (
              <div key={i} className="amenity-card card-base p-5 md:p-6 flex items-center gap-4 group hover:border-[var(--champagne)]">
                <div className="w-10 h-10 rounded-full bg-[var(--surface)] flex items-center justify-center shrink-0 group-hover:bg-[var(--champagne)] transition-colors duration-300">
                  <Icon className="w-5 h-5 text-[var(--champagne)] group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="font-medium text-sm md:text-base text-[var(--ink)] leading-tight">
                  {amenity.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
