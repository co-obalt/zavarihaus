"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/siteData";
import SectionLabel from "./ui/SectionLabel";
import SplitTextReveal from "./ui/SplitTextReveal";
import { cn } from "@/lib/utils";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section-padding bg-[var(--soft-white)]">
      <div className="section-shell">
        <div className="flex flex-col items-center text-center mb-16">
          <SectionLabel className="mb-6 flex justify-center">FAQ</SectionLabel>
          <SplitTextReveal as="h2" className="text-section-title text-balance">
            Common questions answered.
          </SplitTextReveal>
        </div>

        <div className="max-w-[760px] mx-auto">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="border-b border-[var(--line)] last:border-b-0">
                <button
                  className="w-full py-6 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--champagne)] rounded-sm"
                  onClick={() => toggleAccordion(i)}
                  aria-expanded={isOpen}
                >
                  <span className="text-lg font-medium text-[var(--ink)] pr-8">{faq.question}</span>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 text-[var(--muted)] shrink-0 transition-transform duration-300",
                      isOpen && "rotate-180 text-[var(--champagne)]"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isOpen ? "max-h-[200px] opacity-100 pb-6" : "max-h-0 opacity-0"
                  )}
                >
                  <p className="text-[var(--muted)] text-base">{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
