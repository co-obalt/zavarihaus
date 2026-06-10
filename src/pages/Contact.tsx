import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Mail, Phone, MessageCircle, MapPin, CheckCircle, Instagram, Facebook } from 'lucide-react';
import Footer from '../sections/Footer';
import { useContent } from '../content/ContentContext';

export default function Contact() {
  const { pages, site } = useContent();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const headingWords = headingRef.current?.querySelectorAll('.clip-word');
    if (headingWords) {
      gsap.fromTo(headingWords, { clipPath: 'inset(0 0 100% 0)', y: 35 }, { clipPath: 'inset(0 0 0% 0)', y: 0, stagger: 0.12, duration: 1, ease: 'power4.out' });
    }
  }, []);

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
  };

  return (
    <div className="relative min-h-screen bg-[#FAF9F6] pt-[120px]">
      <div className="relative w-full h-[60vh] bg-cover bg-center flex items-center justify-center select-none" style={{ backgroundImage: `url('${pages.contact.heroImage}')` }}>
        <div className="absolute inset-0 bg-[#111009]/60" />
        <div className="relative z-10 text-center px-4">
          <h1 ref={headingRef} className="font-display text-[48px] md:text-[80px] text-white font-light flex justify-center gap-3 overflow-hidden leading-tight pb-3">
            {pages.contact.title.split(' ').map((word, idx) => (
              <span key={idx} className="overflow-hidden inline-block pr-1 leading-none">
                <span className="clip-word inline-block origin-bottom">{word}</span>
              </span>
            ))}
          </h1>
          <p className="font-sans text-[13px] md:text-[15px] text-white/70 tracking-wide mt-4 uppercase">{pages.contact.subtitle}</p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-24 select-text grid grid-cols-1 lg:grid-cols-2 gap-16 relative bg-[#FAF9F6] z-10">
        <div className="flex flex-col">
          {success ? (
            <div className="booking-card-glass p-8 md:p-12 text-center flex flex-col items-center gap-6 shadow-xl border border-[#B8975A]/25 rounded-[2px] h-full justify-center">
              <CheckCircle size={56} className="text-[#B8975A]" />
              <h2 className="font-display text-[32px] text-[#B8975A] leading-tight font-medium">{pages.contact.successTitle}</h2>
              <p className="font-sans text-[14px] text-[#6B6560] leading-relaxed max-w-[420px]">
                {pages.contact.successMessageStart} <strong className="text-[#1A1814]">{formData.email}</strong> {pages.contact.successMessageEnd}
              </p>
              <button onClick={() => { setFormData({ name: '', email: '', phone: '', message: '' }); setSuccess(false); }} className="mt-4 border border-[#B8975A] text-[#B8975A] hover:bg-[#B8975A] hover:text-[#111009] px-6 py-2.5 font-sans uppercase text-[11px] tracking-widest transition-all duration-300 rounded-[2px] cursor-pointer">
                {pages.contact.successButton}
              </button>
            </div>
          ) : (
            <div className="booking-card-glass p-6 md:p-10 shadow-lg border border-[#B8975A]/15 rounded-[2px] bg-white flex flex-col gap-8">
              <div>
                <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#B8975A] font-bold block mb-2">{pages.contact.formEyebrow}</span>
                <h3 className="font-display text-[36px] text-[#1A1814] font-light leading-none">{pages.contact.formTitle}</h3>
              </div>

              <form onSubmit={handleMessageSubmit} className="flex flex-col gap-6">
                <div>
                  <label className="text-[9px] font-sans uppercase tracking-widest text-[#1A1814]/50 mb-1 block">Your Name</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Zara Malik" className="w-full border-b border-[#B8975A]/20 pb-2 bg-transparent font-sans text-[14px] text-[#1A1814] outline-none focus:border-[#B8975A] transition-colors duration-300" />
                </div>
                <div>
                  <label className="text-[9px] font-sans uppercase tracking-widest text-[#1A1814]/50 mb-1 block">Email Address</label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="zara@example.com" className="w-full border-b border-[#B8975A]/20 pb-2 bg-transparent font-sans text-[14px] text-[#1A1814] outline-none focus:border-[#B8975A] transition-colors duration-300" />
                </div>
                <div>
                  <label className="text-[9px] font-sans uppercase tracking-widest text-[#1A1814]/50 mb-1 block">Phone Number</label>
                  <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+92 300 1234567" className="w-full border-b border-[#B8975A]/20 pb-2 bg-transparent font-sans text-[14px] text-[#1A1814] outline-none focus:border-[#B8975A] transition-colors duration-300" />
                </div>
                <div>
                  <label className="text-[9px] font-sans uppercase tracking-widest text-[#1A1814]/50 mb-1 block">Your Message</label>
                  <textarea rows={5} required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Write details about stay requirements or transport arrangements..." className="w-full border-b border-[#B8975A]/20 pb-2 bg-transparent font-sans text-[14px] text-[#1A1814] outline-none focus:border-[#B8975A] transition-colors duration-300 resize-none h-[120px]" />
                </div>
                <button type="submit" className="w-full h-[52px] bg-[#B8975A] text-[#111009] font-sans text-[11px] uppercase tracking-[0.2em] font-semibold flex items-center justify-center overflow-hidden rounded-[2px] mt-2 relative group cursor-pointer">
                  <span className="absolute inset-0 w-1/2 h-full bg-white/20 -skew-x-[30deg] -translate-x-[150%] group-hover:translate-x-[250%] transition-transform duration-700 ease-out" />
                  {pages.contact.submitLabel}
                </button>
              </form>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-10">
          <div className="relative group overflow-hidden shadow-lg rounded-[2px] border border-[#B8975A]/15 h-[400px] select-none">
            <iframe src={site.contact.mapEmbedUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Zavari Haus Contact Map" className="w-full h-full grayscale hover:grayscale-0 transition-all duration-[800ms] ease-in-out" />
            <div className="absolute inset-0 border border-[#B8975A]/15 pointer-events-none group-hover:border-[#B8975A]/50 transition-colors duration-[600ms]" />
          </div>

          <div className="flex flex-col gap-8 select-text">
            <h3 className="font-display text-[32px] text-[#1A1814] font-light leading-none mb-2">{pages.contact.directLinesTitle}</h3>
            <div className="flex flex-col gap-6">
              <a href={site.contact.whatsappUrl} target="_blank" referrerPolicy="no-referrer" rel="noreferrer" className="flex items-center gap-4 group cursor-pointer" aria-label="Direct WhatsApp Link">
                <div className="w-10 h-10 rounded-full border border-[#B8975A]/25 flex items-center justify-center text-[#B8975A] group-hover:bg-[#B8975A] group-hover:text-[#111009] transition-all duration-300"><MessageCircle size={18} /></div>
                <div><span className="text-[10px] font-sans uppercase tracking-[0.15em] text-[#6B6560]/50 block">Instant Chat</span><span className="font-sans text-[14px] text-[#1A1814] group-hover:text-[#B8975A] font-medium transition-colors duration-250">Chat on WhatsApp</span></div>
              </a>
              <a href={`tel:${site.contact.phone}`} className="flex items-center gap-4 group cursor-pointer" aria-label="Direct Voice Phone Call Link">
                <div className="w-10 h-10 rounded-full border border-[#B8975A]/25 flex items-center justify-center text-[#B8975A] group-hover:bg-[#B8975A] group-hover:text-[#111009] transition-all duration-300"><Phone size={18} /></div>
                <div><span className="text-[10px] font-sans uppercase tracking-[0.15em] text-[#6B6560]/50 block">Voice Reservation</span><span className="font-sans text-[14px] text-[#1A1814] group-hover:text-[#B8975A] font-medium transition-colors duration-250">{site.contact.phoneDisplay}</span></div>
              </a>
              <a href={`mailto:${site.contact.email}`} className="flex items-center gap-4 group cursor-pointer" aria-label="Direct Email link Support">
                <div className="w-10 h-10 rounded-full border border-[#B8975A]/25 flex items-center justify-center text-[#B8975A] group-hover:bg-[#B8975A] group-hover:text-[#111009] transition-all duration-300"><Mail size={18} /></div>
                <div><span className="text-[10px] font-sans uppercase tracking-[0.15em] text-[#6B6560]/50 block">Email Inquiries</span><span className="font-sans text-[14px] text-[#1A1814] group-hover:text-[#B8975A] font-medium transition-colors duration-250">{site.contact.email}</span></div>
              </a>
              <a href={site.contact.instagramUrl} target="_blank" rel="noreferrer" className="flex items-center gap-4 group cursor-pointer" aria-label="Instagram Link">
                <div className="w-10 h-10 rounded-full border border-[#B8975A]/25 flex items-center justify-center text-[#B8975A] group-hover:bg-[#B8975A] group-hover:text-[#111009] transition-all duration-300"><Instagram size={18} /></div>
                <div><span className="text-[10px] font-sans uppercase tracking-[0.15em] text-[#6B6560]/50 block">Instagram</span><span className="font-sans text-[14px] text-[#1A1814] group-hover:text-[#B8975A] font-medium transition-colors duration-250">{site.contact.instagramHandle}</span></div>
              </a>
              <a href={site.contact.facebookUrl} target="_blank" rel="noreferrer" className="flex items-center gap-4 group cursor-pointer" aria-label="Facebook Link">
                <div className="w-10 h-10 rounded-full border border-[#B8975A]/25 flex items-center justify-center text-[#B8975A] group-hover:bg-[#B8975A] group-hover:text-[#111009] transition-all duration-300"><Facebook size={18} /></div>
                <div><span className="text-[10px] font-sans uppercase tracking-[0.15em] text-[#6B6560]/50 block">Facebook</span><span className="font-sans text-[14px] text-[#1A1814] group-hover:text-[#B8975A] font-medium transition-colors duration-250">{site.contact.facebookHandle}</span></div>
              </a>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-[#B8975A]/15 flex items-center justify-center text-[#B8975A]/70 select-none"><MapPin size={18} /></div>
                <div><span className="text-[10px] font-sans uppercase tracking-[0.15em] text-[#6B6560]/50 block">{site.contact.addressName}</span><span className="font-sans text-[14px] text-[#1A1814] font-medium">{site.contact.address}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
