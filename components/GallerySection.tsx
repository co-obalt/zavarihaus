"use client";

import Image from "next/image";
import { gallery } from "@/lib/siteData";
import SectionLabel from "./ui/SectionLabel";
import SplitTextReveal from "./ui/SplitTextReveal";
import { cn } from "@/lib/utils";

export default function GallerySection() {
  return (
    <section id="gallery" className="section-padding bg-[var(--soft-white)]">
      <div className="section-shell">
        <SectionLabel className="mb-6">Gallery</SectionLabel>
        
        <SplitTextReveal as="h2" className="text-section-title text-balance mb-16">
          See the spaces before you arrive.
        </SplitTextReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {gallery.map((img, i) => (
            <div 
              key={i} 
              className={cn(
                "relative rounded-2xl overflow-hidden group cursor-pointer",
                i === 0 ? "md:col-span-2 aspect-[16/10] md:aspect-auto" : "aspect-[4/3]"
              )}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes={i === 0 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"}
              />
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <span className="text-xs font-medium bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-[var(--ink)]">
                  {img.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
