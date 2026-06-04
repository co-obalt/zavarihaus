"use client";

import Image from "next/image";
import { locationHighlights, contact } from "@/lib/siteData";
import SectionLabel from "./ui/SectionLabel";
import SplitTextReveal from "./ui/SplitTextReveal";
import MagneticButton from "./ui/MagneticButton";

export default function LocationSection() {
  return (
    <section id="location" className="section-padding bg-[var(--background)]">
      <div className="section-shell">
        <SectionLabel className="mb-6">Location</SectionLabel>
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          <div className="w-full lg:w-[55%]">
            <SplitTextReveal as="h2" className="text-section-title text-balance mb-8">
              Placed in Bahria Town Lahore.
            </SplitTextReveal>
            
            <p className="text-body-large text-[var(--muted)] mb-10">
              Stay close to restaurants, shopping, family attractions, daily essentials, main boulevard access, and the Eiffel Tower landmark area in Bahria Town Lahore.
            </p>

            <ul className="space-y-4 mb-12">
              {locationHighlights.map((highlight, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-[var(--champagne)] mt-2 shrink-0" />
                  <span className="text-[var(--ink)] font-medium text-lg">{highlight}</span>
                </li>
              ))}
            </ul>

            <MagneticButton as="a" href={contact.whatsappLink} className="btn-primary">
              Get Directions
            </MagneticButton>
          </div>

          <div className="w-full lg:w-[45%]">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden card-base">
              <Image
                src="/images/location/bahria-town.jpeg"
                alt="Bahria Town Lahore Location"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
            <p className="text-sm text-[var(--muted)] mt-4 text-center">
              Zavari Haus — {contact.address}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
