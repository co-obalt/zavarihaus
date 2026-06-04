"use client";

import { contact } from "@/lib/siteData";
import SectionLabel from "./ui/SectionLabel";
import SplitTextReveal from "./ui/SplitTextReveal";
import MagneticButton from "./ui/MagneticButton";

export default function FinalBookingCTA() {
  return (
    <section id="book" className="section-padding bg-[var(--background)]">
      <div className="section-shell">
        <div className="card-base p-10 md:p-20 text-center max-w-4xl mx-auto flex flex-col items-center relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[500px] bg-[var(--champagne)]/5 blur-[100px] pointer-events-none rounded-full" />
          
          <SectionLabel className="mb-6 flex justify-center z-10">Book Now</SectionLabel>
          
          <SplitTextReveal as="h2" className="text-section-title text-balance mb-6 z-10">
            Your private stay in Bahria Town starts here.
          </SplitTextReveal>
          
          <p className="text-body-large text-[var(--muted)] max-w-2xl mb-10 z-10">
            Choose a furnished apartment, confirm availability, and book your stay with ease.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 z-10">
            <MagneticButton as="a" href={contact.whatsappLink} className="btn-primary">
              Book on WhatsApp
            </MagneticButton>
            <MagneticButton as="a" href={`tel:${contact.phone}`} className="btn-secondary">
              Call Now
            </MagneticButton>
            <MagneticButton as="a" href="#apartments" className="btn-secondary">
              View Apartments
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
