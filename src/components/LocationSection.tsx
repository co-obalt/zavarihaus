import React from 'react';
import { LANDMARKS_DATA } from '../data/hospitalityData';
import { MapPin, Phone, Mail, Instagram, Facebook, MessageCircle } from 'lucide-react';

export const LocationSection: React.FC = () => {
  return (
    <section id="location" className="py-[90px] md:py-[130px] bg-[#FAF9F6] border-t border-[#E8E1D6]">
      <div className="max-w-[1400px] mx-auto px-[5vw]">
        
        {/* Header matching user's design */}
        <div className="mb-12">
          <span className="text-[11px] font-medium tracking-[0.24em] uppercase text-[#B8975A]">
            PRIME LOCATION
          </span>
          <h2
            className="text-[#1C1C1C] font-normal leading-[1.0] mt-1"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(44px, 5vw, 68px)',
            }}
          >
            Find Us
          </h2>
        </div>

        {/* Address Card */}
        <div className="bg-[#FDFBF7] border border-[#E8E1D6] p-6 md:p-8 mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-[0_8px_24px_rgba(28,28,28,0.04)]" style={{ borderRadius: '2px' }}>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#EDE5D7] text-[#B8975A] flex items-center justify-center flex-shrink-0 mt-0.5">
              <MapPin size={20} />
            </div>
            <div>
              <h3 className="text-[16px] font-medium text-[#1C1C1C] tracking-[0.05em]" style={{ fontFamily: "'Inter', sans-serif" }}>
                Zavari Haus Address
              </h3>
              <p className="text-[#77736E] text-[15px] font-light mt-0.5">
                Bahria Town, Lahore, Punjab, Pakistan
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://wa.me/923058480987"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#B8975A] text-[#1C1C1C] hover:bg-[#513431] hover:text-[#B8975A] transition-all duration-200 text-[11px] font-semibold tracking-[0.16em] uppercase px-5 py-3"
              style={{ borderRadius: '2px' }}
            >
              <MessageCircle size={15} />
              <span>CHAT ON WHATSAPP</span>
            </a>
            <a
              href="tel:+923058480987"
              className="inline-flex items-center gap-2 border border-[#B8975A] text-[#B8975A] hover:bg-[#B8975A] hover:text-[#1C1C1C] transition-all duration-200 text-[11px] font-semibold tracking-[0.16em] uppercase px-5 py-3"
              style={{ borderRadius: '2px' }}
            >
              <Phone size={15} />
              <span>VOICE RESERVATION</span>
            </a>
          </div>
        </div>

        {/* Location Split View: Real Google Map Iframe + Nearby Places */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Embedded Google Map Iframe Provided by User */}
          <div className="lg:col-span-7 bg-[#FDFBF7] border border-[#E8E1D6] p-2 shadow-[0_12px_30px_rgba(28,28,28,0.06)] overflow-hidden" style={{ borderRadius: '2px' }}>
            <div className="relative w-full aspect-[4/3] md:aspect-[16/11] bg-[#EDE5D7] overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3406.957760783757!2d74.1860968!3d31.360144799999993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391855c0fb31b321%3A0xe0159e5d126f5440!2sZavari%20Haus!5e0!3m2!1sen!2s!4v1788100470059!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Zavari Haus Location Map"
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Nearby Places List (exact design from screenshot) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FDFBF7] border border-[#E8E1D6] p-7 md:p-8 space-y-6 shadow-[0_12px_30px_rgba(28,28,28,0.06)]" style={{ borderRadius: '2px' }}>
              <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#AAA39A] block border-b border-[#E8E1D6]/80 pb-3">
                NEARBY PLACES
              </span>

              <div className="space-y-4">
                {LANDMARKS_DATA.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2 border-b border-[#E8E1D6]/50 last:border-b-0">
                    <div className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B8975A]" />
                      <span className="text-[15px] font-normal text-[#1C1C1C]">
                        {item.name}
                      </span>
                    </div>

                    <span
                      className="bg-[#FAF9F6] border border-[#E8E1D6] text-[#B8975A] px-3 py-1 text-[11px] font-mono tracking-[0.05em] whitespace-nowrap"
                      style={{ borderRadius: '2px' }}
                    >
                      {item.distance}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Social & Contact Card */}
            <div className="bg-[#FDFBF7] border border-[#E8E1D6] p-6 space-y-4 shadow-[0_8px_24px_rgba(28,28,28,0.04)]" style={{ borderRadius: '2px' }}>
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#B8975A] block">
                DIRECT CHANNELS
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13px] text-[#77736E]">
                <a
                  href="mailto:stay@zavarihaus.com"
                  className="flex items-center gap-2.5 p-2.5 border border-[#E8E1D6] hover:border-[#B8975A] hover:text-[#1C1C1C] transition-colors"
                  style={{ borderRadius: '2px' }}
                >
                  <Mail size={15} className="text-[#B8975A]" />
                  <span className="truncate">stay@zavarihaus.com</span>
                </a>

                <a
                  href="https://instagram.com/zavarihaus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-2.5 border border-[#E8E1D6] hover:border-[#B8975A] hover:text-[#1C1C1C] transition-colors"
                  style={{ borderRadius: '2px' }}
                >
                  <Instagram size={15} className="text-[#B8975A]" />
                  <span>@zavarihaus</span>
                </a>

                <a
                  href="https://facebook.com/ZavariHaus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-2.5 border border-[#E8E1D6] hover:border-[#B8975A] hover:text-[#1C1C1C] transition-colors"
                  style={{ borderRadius: '2px' }}
                >
                  <Facebook size={15} className="text-[#B8975A]" />
                  <span>/ZavariHaus</span>
                </a>

                <a
                  href="tel:+923058480987"
                  className="flex items-center gap-2.5 p-2.5 border border-[#E8E1D6] hover:border-[#B8975A] hover:text-[#1C1C1C] transition-colors"
                  style={{ borderRadius: '2px' }}
                >
                  <Phone size={15} className="text-[#B8975A]" />
                  <span>+92 305 8480987</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
