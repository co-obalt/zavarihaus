import React from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../hooks/useModal';
import { Instagram, MessageCircle, Facebook } from 'lucide-react';
import { useContent } from '../content/ContentContext';
import logo from '../../logo.png';

export default function Footer() {
  const { site } = useContent();
  const { openModal } = useModal();

  const navLinks = site.footerNav;

  return (
    <footer
      className="relative w-full bg-[#111009] text-white pt-16 pb-10 px-8 md:px-[80px] z-10 select-none"
    >
      <div className="max-w-[1200px] mx-auto flex flex-col">
        
        {/* Top block (3 cols layout) */}
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_2fr_1fr] gap-12 md:gap-8 items-start">
          
          {/* Col 1 Left: Brand signature */}
          <div className="flex flex-col gap-3">
            <img src={logo} alt={site.logoAlt} className="h-11 w-auto object-contain" />
          </div>

          {/* Col 2 Center: Nav links with liquid overlay sliders */}
          <div className="flex flex-wrap gap-x-8 gap-y-4 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="group relative font-sans text-[11px] uppercase tracking-[0.15em] text-white/55 hover:text-[#B8975A] transition-colors duration-250 py-1"
              >
                <span>{link.label}</span>
                {/* Liquid underlined effect sliding */}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#B8975A] scale-x-0 group-hover:scale-x-100 transition-transform duration-350 origin-left" />
              </Link>
            ))}
            <button
              onClick={() => openModal()}
              className="group relative font-sans text-[11px] uppercase tracking-[0.15em] text-white/55 hover:text-[#B8975A] transition-colors duration-250 py-1 cursor-pointer"
            >
              <span>{site.footer.bookingLabel}</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#B8975A] scale-x-0 group-hover:scale-x-100 transition-transform duration-350 origin-left" />
            </button>
          </div>

          {/* Col 3 Right: Social icons */}
          <div className="flex gap-6 justify-start md:justify-end items-center">
            
            {/* Instagram */}
            <a
              href={site.contact.instagramUrl}
              target="_blank"
              referrerPolicy="no-referrer"
              rel="noreferrer"
              className="text-white/50 hover:text-[#B8975A] transition-colors duration-250"
              aria-label="Instagram Link"
            >
              <Instagram size={20} />
            </a>

            {/* Whatsapp */}
            <a
              href={site.contact.whatsappUrl}
              target="_blank"
              referrerPolicy="no-referrer"
              rel="noreferrer"
              className="text-white/50 hover:text-[#B8975A] transition-colors duration-250"
              aria-label="WhatsApp Link"
            >
              <MessageCircle size={20} />
            </a>

            {/* Facebook */}
            <a
              href={site.contact.facebookUrl}
              target="_blank"
              referrerPolicy="no-referrer"
              rel="noreferrer"
              className="text-white/50 hover:text-[#B8975A] transition-colors duration-250"
              aria-label="Facebook Link"
            >
              <Facebook size={20} />
            </a>

          </div>

        </div>

        {/* Divider thin solid line */}
        <div className="h-[1px] bg-[#B8975A]/15 w-full my-10" />

        {/* Bottom row copyright claims */}
        <div className="flex justify-center items-center text-center">
          <span className="font-sans text-[11px] text-white/30 tracking-wide">
            {site.footer.copyright}
          </span>
        </div>

      </div>
    </footer>
  );
}

