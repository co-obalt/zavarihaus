import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Mail, Phone, MessageCircle, MapPin, CheckCircle, Instagram, Facebook } from 'lucide-react';
import Footer from '../sections/Footer';

export default function Contact() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [success, setSuccess] = useState(false);

  // Load animation word sweep
  useEffect(() => {
    const headingWords = headingRef.current?.querySelectorAll('.clip-word');
    if (headingWords) {
      gsap.fromTo(headingWords,
        { clipPath: 'inset(0 0 100% 0)', y: 35 },
        {
          clipPath: 'inset(0 0 0% 0)',
          y: 0,
          stagger: 0.12,
          duration: 1,
          ease: 'power4.out',
        }
      );
    }
  }, []);

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
  };

  return (
    <div className="relative min-h-screen bg-[#FAF9F6] pt-[120px]">
      
      {/* 1. Hero Cover Header (60vh) */}
      <div
        className="relative w-full h-[60vh] bg-cover bg-center flex items-center justify-center select-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=1600')` // REPLACE: contact support covers
        }}
      >
        <div className="absolute inset-0 bg-[#111009]/60" />

        <div className="relative z-10 text-center px-4">
          <h1
            ref={headingRef}
            className="font-display text-[48px] md:text-[80px] text-white font-light flex justify-center gap-3 overflow-hidden leading-tight pb-3"
          >
            {"Connect".split(" ").map((word, idx) => (
              <span key={idx} className="overflow-hidden inline-block pr-1 leading-none">
                <span className="clip-word inline-block origin-bottom">{word}</span>
              </span>
            ))}
          </h1>
          <p className="font-sans text-[13px] md:text-[15px] text-white/70 tracking-wide mt-4 uppercase">
            Any time. Anywhere. We are here to assist.
          </p>
        </div>
      </div>

      {/* 2. Main Dual Layout panels (50/50 column flows) */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-24 select-text grid grid-cols-1 lg:grid-cols-2 gap-16 relative bg-[#FAF9F6] z-10">
        
        {/* LEFT COLUMN: Clean message contact forms */}
        <div className="flex flex-col">
          {success ? (
            <div className="booking-card-glass p-8 md:p-12 text-center flex flex-col items-center gap-6 shadow-xl border border-[#B8975A]/25 rounded-[2px] h-full justify-center">
              <CheckCircle size={56} className="text-[#B8975A]" />
              <h2 className="font-display text-[32px] text-[#B8975A] leading-tight font-medium">
                Message Received
              </h2>
              <p className="font-sans text-[14px] text-[#6B6560] leading-relaxed max-w-[420px]">
                We have registered your inquiry details. Our concierge dispatcher will inspect your request and reply to you at <strong className="text-[#1A1814]">{formData.email}</strong> shortly within indices.
              </p>
              <button
                onClick={() => {
                  setFormData({ name: '', email: '', phone: '', message: '' });
                  setSuccess(false);
                }}
                className="mt-4 border border-[#B8975A] text-[#B8975A] hover:bg-[#B8975A] hover:text-[#111009] px-6 py-2.5 font-sans uppercase text-[11px] tracking-widest transition-all duration-300 rounded-[2px] cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <div className="booking-card-glass p-6 md:p-10 shadow-lg border border-[#B8975A]/15 rounded-[2px] bg-white flex flex-col gap-8">
              <div>
                <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#B8975A] font-bold block mb-2">
                  Direct Inquiries
                </span>
                <h3 className="font-display text-[36px] text-[#1A1814] font-light leading-none">
                  Write to Us
                </h3>
              </div>

              <form onSubmit={handleMessageSubmit} className="flex flex-col gap-6">
                {/* Name */}
                <div>
                  <label className="text-[9px] font-sans uppercase tracking-widest text-[#1A1814]/50 mb-1 block">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Zara Malik"
                    className="w-full border-b border-[#B8975A]/20 pb-2 bg-transparent font-sans text-[14px] text-[#1A1814] outline-none focus:border-[#B8975A] transition-colors duration-300"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-[9px] font-sans uppercase tracking-widest text-[#1A1814]/50 mb-1 block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="zara@example.com"
                    className="w-full border-b border-[#B8975A]/20 pb-2 bg-transparent font-sans text-[14px] text-[#1A1814] outline-none focus:border-[#B8975A] transition-colors duration-300"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="text-[9px] font-sans uppercase tracking-widest text-[#1A1814]/50 mb-1 block">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+92 300 1234567"
                    className="w-full border-b border-[#B8975A]/20 pb-2 bg-transparent font-sans text-[14px] text-[#1A1814] outline-none focus:border-[#B8975A] transition-colors duration-300"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="text-[9px] font-sans uppercase tracking-widest text-[#1A1814]/50 mb-1 block">
                    Your Message
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write details about stay requirements or transport arrangements..."
                    className="w-full border-b border-[#B8975A]/20 pb-2 bg-transparent font-sans text-[14px] text-[#1A1814] outline-none focus:border-[#B8975A] transition-colors duration-300 resize-none h-[120px]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-[52px] bg-[#B8975A] text-[#111009] font-sans text-[11px] uppercase tracking-[0.2em] font-semibold flex items-center justify-center overflow-hidden rounded-[2px] mt-2 relative group cursor-pointer"
                >
                  <span className="absolute inset-0 w-1/2 h-full bg-white/20 -skew-x-[30deg] -translate-x-[150%] group-hover:translate-x-[250%] transition-transform duration-700 ease-out" />
                  Send Message
                </button>
              </form>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Contact cards and maps framing */}
        <div className="flex flex-col gap-10">
          
          {/* Grayscale styled Iframe map */}
          <div className="relative group overflow-hidden shadow-lg rounded-[2px] border border-[#B8975A]/15 h-[400px] select-none">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3406.9580661264367!2d74.18364607560517!3d31.360136374287663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzHCsDIxJzM2LjUiTiA3NMKwMTEnMTAuNCJF!5e0!3m2!1sen!2s!4v1780941194729!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Zavari Haus Contact Map"
              className="w-full h-full grayscale hover:grayscale-0 transition-all duration-[800ms] ease-in-out"
            />
            <div className="absolute inset-0 border border-[#B8975A]/15 pointer-events-none group-hover:border-[#B8975A]/50 transition-colors duration-[600ms]" />
          </div>

          {/* Quick Communication contacts details cards */}
          <div className="flex flex-col gap-8 select-text">
            
            <h3 className="font-display text-[32px] text-[#1A1814] font-light leading-none mb-2">
              Direct Lines
            </h3>

            <div className="flex flex-col gap-6">
              
              {/* WhatsApp Chat Line */}
              <a
                href="https://wa.me/923058480987"
                target="_blank"
                referrerPolicy="no-referrer"
                rel="noreferrer"
                className="flex items-center gap-4 group cursor-pointer"
                aria-label="Direct WhatsApp Link"
              >
                <div className="w-10 h-10 rounded-full border border-[#B8975A]/25 flex items-center justify-center text-[#B8975A] group-hover:bg-[#B8975A] group-hover:text-[#111009] transition-all duration-300">
                  <MessageCircle size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-sans uppercase tracking-[0.15em] text-[#6B6560]/50 block">Instant Chat</span>
                  <span className="font-sans text-[14px] text-[#1A1814] group-hover:text-[#B8975A] font-medium transition-colors duration-250">
                    Chat on WhatsApp
                  </span>
                </div>
              </a>

              {/* Direct Voice phone */}
              <a
                href="tel:+923058480987"
                className="flex items-center gap-4 group cursor-pointer"
                aria-label="Direct Voice Phone Call Link"
              >
                <div className="w-10 h-10 rounded-full border border-[#B8975A]/25 flex items-center justify-center text-[#B8975A] group-hover:bg-[#B8975A] group-hover:text-[#111009] transition-all duration-300">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-sans uppercase tracking-[0.15em] text-[#6B6560]/50 block">Voice Reservation</span>
                  <span className="font-sans text-[14px] text-[#1A1814] group-hover:text-[#B8975A] font-medium transition-colors duration-250">
                    +923058480987
                  </span>
                </div>
              </a>

              {/* Email support */}
              <a
                href="mailto:stay@zavarihaus.com"
                className="flex items-center gap-4 group cursor-pointer"
                aria-label="Direct Email link Support"
              >
                <div className="w-10 h-10 rounded-full border border-[#B8975A]/25 flex items-center justify-center text-[#B8975A] group-hover:bg-[#B8975A] group-hover:text-[#111009] transition-all duration-300">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-sans uppercase tracking-[0.15em] text-[#6B6560]/50 block">Email Inquiries</span>
                  <span className="font-sans text-[14px] text-[#1A1814] group-hover:text-[#B8975A] font-medium transition-colors duration-250">
                    stay@zavarihaus.com
                  </span>
                </div>
              </a>

              <a
                href="https://www.instagram.com/zavarihaus/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 group cursor-pointer"
                aria-label="Instagram Link"
              >
                <div className="w-10 h-10 rounded-full border border-[#B8975A]/25 flex items-center justify-center text-[#B8975A] group-hover:bg-[#B8975A] group-hover:text-[#111009] transition-all duration-300">
                  <Instagram size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-sans uppercase tracking-[0.15em] text-[#6B6560]/50 block">Instagram</span>
                  <span className="font-sans text-[14px] text-[#1A1814] group-hover:text-[#B8975A] font-medium transition-colors duration-250">
                    @zavarihaus
                  </span>
                </div>
              </a>

              <a
                href="https://www.facebook.com/ZavariHaus"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 group cursor-pointer"
                aria-label="Facebook Link"
              >
                <div className="w-10 h-10 rounded-full border border-[#B8975A]/25 flex items-center justify-center text-[#B8975A] group-hover:bg-[#B8975A] group-hover:text-[#111009] transition-all duration-300">
                  <Facebook size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-sans uppercase tracking-[0.15em] text-[#6B6560]/50 block">Facebook</span>
                  <span className="font-sans text-[14px] text-[#1A1814] group-hover:text-[#B8975A] font-medium transition-colors duration-250">
                    /ZavariHaus
                  </span>
                </div>
              </a>

              {/* Location pin Address */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-[#B8975A]/15 flex items-center justify-center text-[#B8975A]/70 select-none">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-sans uppercase tracking-[0.15em] text-[#6B6560]/50 block">Physical Address</span>
                  <span className="font-sans text-[14px] text-[#1A1814] font-medium">
                    Bahria Town, Lahore, Punjab, Pakistan
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      <Footer />
    </div>
  );
}
