"use client";

import { Star } from "lucide-react";
import SectionLabel from "./ui/SectionLabel";
import SplitTextReveal from "./ui/SplitTextReveal";

export default function ReviewsSection() {
  const placeholders = ["Comfort", "Cleanliness", "Booking Ease"];

  return (
    <section id="reviews" className="section-padding bg-[var(--cream)]">
      <div className="section-shell">
        <SectionLabel className="mb-6 flex justify-center">Reviews</SectionLabel>
        
        <SplitTextReveal as="h2" className="text-section-title text-balance mb-16 text-center">
          Guest trust, built one stay at a time.
        </SplitTextReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {placeholders.map((title, i) => (
            <div key={i} className="card-base p-8 text-center flex flex-col items-center">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-5 h-5 text-[var(--champagne)] fill-[var(--champagne)]" />
                ))}
              </div>
              <h3 className="font-semibold text-xl text-[var(--ink)] mb-4">{title}</h3>
              <p className="text-[var(--muted)] italic">&quot;Guest feedback arriving soon.&quot;</p>
            </div>
          ))}
        </div>

        <p className="text-center text-[var(--muted)] text-sm">
          Guest feedback coming soon as Zavari Haus welcomes new stays.
        </p>
      </div>
    </section>
  );
}
