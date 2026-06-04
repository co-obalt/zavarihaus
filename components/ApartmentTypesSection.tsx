"use client";

import Image from "next/image";
import { apartments } from "@/lib/siteData";
import SectionLabel from "./ui/SectionLabel";
import SplitTextReveal from "./ui/SplitTextReveal";

export default function ApartmentTypesSection() {
  return (
    <section id="apartments" className="section-padding bg-[var(--background)]">
      <div className="section-shell">
        <SectionLabel className="mb-6">Apartments</SectionLabel>
        
        <SplitTextReveal as="h2" className="text-section-title text-balance mb-16">
          Choose the apartment that fits your stay.
        </SplitTextReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {apartments.map((apt, i) => (
            <div key={i} className="card-base overflow-hidden flex flex-col group">
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                  src={apt.image}
                  alt={apt.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-semibold text-[var(--ink)] mb-3">{apt.title}</h3>
                <p className="text-[var(--muted)] mb-6">{apt.description}</p>
                
                <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6">
                  <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-wider text-[var(--muted)]">Guests</span>
                    <span className="font-medium text-[var(--ink)]">{apt.guests}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-wider text-[var(--muted)]">Bed</span>
                    <span className="font-medium text-[var(--ink)]">{apt.bed}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                  {apt.features.map((feature, j) => (
                    <span key={j} className="text-xs font-medium bg-[var(--cream)] px-3 py-1.5 rounded-full text-[var(--ink)]">
                      {feature}
                    </span>
                  ))}
                </div>
                
                <a href="#book" className="btn-secondary w-full sm:w-auto self-start !py-3">
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
