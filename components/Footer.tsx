"use client";

import { navLinks, contact } from "@/lib/siteData";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--ink)] text-[var(--soft-white)] py-16 pb-8">
      <div className="section-shell">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
          <div className="max-w-xs">
            <h2 className="text-2xl font-semibold mb-2">Zavari Haus</h2>
            <p className="text-sm text-white/70">Premium serviced apartments in Bahria Town Lahore.</p>
          </div>
          
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-white/70 hover:text-[var(--champagne)] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="h-[1px] w-full bg-white/10 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs text-white/50">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <span>Phone: {contact.phone}</span>
            <span>WhatsApp: {contact.whatsapp}</span>
            <span>{contact.address}</span>
          </div>
          
          <p>&copy; {currentYear} Zavari Haus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
