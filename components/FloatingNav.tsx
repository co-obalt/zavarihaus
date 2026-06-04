"use client";

import { useEffect, useRef, useState } from "react";
import { navLinks } from "@/lib/siteData";
import { cn } from "@/lib/utils";
import gsap from "gsap";

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide/Show on scroll
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 100 && currentScrollY > lastScrollY && !isMobileMenuOpen) {
        gsap.to(navRef.current, { y: -100, duration: 0.3, ease: "power2.inOut" });
      } else {
        gsap.to(navRef.current, { y: 0, duration: 0.3, ease: "power2.inOut" });
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Intersection Observer for active section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      gsap.to(mobileMenuRef.current, { height: "auto", opacity: 1, duration: 0.3, ease: "power2.out" });
    } else {
      gsap.to(mobileMenuRef.current, { height: 0, opacity: 0, duration: 0.3, ease: "power2.in" });
    }
  }, [isMobileMenuOpen]);

  return (
    <div
      ref={navRef}
      className="fixed left-1/2 top-5 -translate-x-1/2 z-[var(--z-nav)] w-[90%] max-w-[800px]"
    >
      <nav className="glass-nav rounded-full px-4 py-3 flex items-center justify-between">
        <a href="#" className="font-semibold text-[var(--ink)] tracking-tight ml-2">
          Zavari Haus
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.slice(0, -1).map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-[var(--champagne)]",
                activeSection === link.href ? "text-[var(--champagne)]" : "text-[var(--muted)]"
              )}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a
            href="#book"
            className="hidden md:inline-flex btn-primary !px-6 !py-2 !text-sm"
          >
            Book
          </a>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 text-[var(--ink)]"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        ref={mobileMenuRef}
        className="md:hidden h-0 opacity-0 overflow-hidden mt-2 glass-nav rounded-2xl"
      >
        <div className="flex flex-col p-4 gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-lg font-medium text-[var(--ink)] py-2 border-b border-[var(--line)] last:border-0"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
