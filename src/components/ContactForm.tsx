import React, { useState } from 'react';
import { Send, Phone, Mail, MapPin, Clock, CheckCircle2 } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [suitePref, setSuitePref] = useState('Skyview Residence');
  const [dates, setDates] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-[100px] md:py-[140px] bg-[#FAF9F6]">
      <div className="max-w-[1400px] mx-auto px-[5vw]">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#B8975A]">
            DIRECT CONCIERGE INQUIRIES
          </span>
          <h2
            className="text-[#1C1C1C] font-normal leading-[0.95]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(44px, 5vw, 76px)',
            }}
          >
            Connect With <span className="gold-italic font-normal">Zavari Haus</span>
          </h2>
          <p className="text-[#77736E] text-[16px] font-light leading-[1.7]">
            Whether planning an upcoming stay, corporate long-term booking, or private event inquiry, our host team is at your immediate service.
          </p>
        </div>

        {/* Layout Specification: ~50% form / ~50% location & contact info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ~50% Form Column */}
          <div className="lg:col-span-6 bg-[#FDFBF7] p-8 md:p-12 border border-[#E8E1D6] shadow-[0_12px_30px_rgba(28,28,28,0.06)]" style={{ borderRadius: '2px' }}>
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-[#EDE5D7] text-[#B8975A] flex items-center justify-center mx-auto">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-[32px] font-normal text-[#1C1C1C]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Inquiry Transmitted
                </h3>
                <p className="text-[#77736E] text-[16px] max-w-md mx-auto font-light leading-[1.7]">
                  Thank you, <strong className="font-semibold text-[#1C1C1C]">{name}</strong>. Our private host team has received your request and will contact you within 2 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setMessage('');
                  }}
                  className="mt-6 border border-[#B8975A] text-[#B8975A] hover:bg-[#B8975A] hover:text-[#1C1C1C] transition-colors px-6 py-3 text-[12px] tracking-[0.16em] uppercase"
                  style={{ borderRadius: '2px' }}
                >
                  SEND ANOTHER INQUIRY
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Field: YOUR NAME */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-medium tracking-[0.12em] uppercase text-[#AAA39A]">
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Zara Malik"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent border-none border-b border-[#E8E1D6] py-2 text-[16px] text-[#77736E] focus:outline-none focus:border-[#B8975A] transition-colors"
                  />
                </div>

                {/* Field: EMAIL ADDRESS */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-medium tracking-[0.12em] uppercase text-[#AAA39A]">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="zara.malik@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-none border-b border-[#E8E1D6] py-2 text-[16px] text-[#77736E] focus:outline-none focus:border-[#B8975A] transition-colors"
                  />
                </div>

                {/* Grid for Phone & Suite Preference */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-medium tracking-[0.12em] uppercase text-[#AAA39A]">
                      PHONE / WHATSAPP
                    </label>
                    <input
                      type="tel"
                      placeholder="+92 300 123 4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-transparent border-none border-b border-[#E8E1D6] py-2 text-[16px] text-[#77736E] focus:outline-none focus:border-[#B8975A] transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-medium tracking-[0.12em] uppercase text-[#AAA39A]">
                      SUITE PREFERENCE
                    </label>
                    <select
                      value={suitePref}
                      onChange={(e) => setSuitePref(e.target.value)}
                      className="w-full bg-transparent border-none border-b border-[#E8E1D6] py-2 text-[16px] text-[#77736E] focus:outline-none focus:border-[#B8975A] cursor-pointer transition-colors"
                    >
                      <option value="Skyview Residence">Skyview Residence</option>
                      <option value="The Grand Penthouse">The Grand Penthouse</option>
                      <option value="Heritage Duplex Suite">Heritage Duplex Suite</option>
                      <option value="Executive Studio">Executive Studio</option>
                      <option value="Garden Villa">Garden Villa</option>
                    </select>
                  </div>
                </div>

                {/* Field: TENTATIVE DATES */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-medium tracking-[0.12em] uppercase text-[#AAA39A]">
                    TENTATIVE DATES &amp; DURATION
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sept 15 - Sept 20, 2026 (5 nights)"
                    value={dates}
                    onChange={(e) => setDates(e.target.value)}
                    className="w-full bg-transparent border-none border-b border-[#E8E1D6] py-2 text-[16px] text-[#77736E] focus:outline-none focus:border-[#B8975A] transition-colors"
                  />
                </div>

                {/* Field: SPECIAL REQUESTS */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-medium tracking-[0.12em] uppercase text-[#AAA39A]">
                    SPECIAL REQUESTS OR INQUIRY
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Mention airport transfer requirements, dietary preferences, or butler requests..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-transparent border-none border-b border-[#E8E1D6] py-2 text-[16px] text-[#77736E] focus:outline-none focus:border-[#B8975A] transition-colors resize-none"
                  />
                </div>

                {/* Exact Design System CTA: Full-width Gold Button, Height 60px */}
                <button
                  type="submit"
                  className="w-full h-[60px] bg-[#B8975A] text-[#1C1C1C] hover:bg-[#513431] hover:text-[#B8975A] transition-all duration-300 border-none font-semibold text-[12px] tracking-[0.2em] uppercase flex items-center justify-center gap-3 shadow-sm cursor-pointer"
                  style={{ borderRadius: '2px' }}
                >
                  <span>SEND MESSAGE</span>
                  <Send size={16} />
                </button>
              </form>
            )}
          </div>

          {/* ~50% Location & Contact Info Column */}
          <div className="lg:col-span-6 space-y-8">
            <div className="bg-[#FDFBF7] p-8 md:p-12 border border-[#E8E1D6] space-y-8 shadow-[0_12px_30px_rgba(28,28,28,0.06)]" style={{ borderRadius: '2px' }}>
              <div>
                <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#B8975A]">
                  RESERVATIONS DESK
                </span>
                <h3 className="text-[32px] font-normal text-[#1C1C1C] mt-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Boutique Residence Host
                </h3>
              </div>

              <div className="space-y-6 text-[15px] text-[#77736E]">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full border border-[#E8E1D6] text-[#B8975A] flex items-center justify-center flex-shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="block text-[11px] tracking-[0.14em] uppercase text-[#AAA39A]">TELEPHONE &amp; WHATSAPP</span>
                    <a href="tel:+923058480987" className="text-[#1C1C1C] font-medium hover:text-[#B8975A] transition-colors">
                      +92 305 8480987
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full border border-[#E8E1D6] text-[#B8975A] flex items-center justify-center flex-shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="block text-[11px] tracking-[0.14em] uppercase text-[#AAA39A]">DIRECT CONCIERGE EMAIL</span>
                    <a href="mailto:stay@zavarihaus.com" className="text-[#1C1C1C] font-medium hover:text-[#B8975A] transition-colors">
                      stay@zavarihaus.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full border border-[#E8E1D6] text-[#B8975A] flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="block text-[11px] tracking-[0.14em] uppercase text-[#AAA39A]">ADDRESS</span>
                    <p className="text-[#1C1C1C] font-medium">
                      Bahria Town, Lahore, Punjab, Pakistan
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full border border-[#E8E1D6] text-[#B8975A] flex items-center justify-center flex-shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <span className="block text-[11px] tracking-[0.14em] uppercase text-[#AAA39A]">RECEPTION &amp; BUTLER DESK</span>
                    <p className="text-[#1C1C1C] font-medium">
                      24 Hours / 7 Days a Week
                    </p>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Quick Action */}
              <div className="pt-6 border-t border-[#E8E1D6]">
                <a
                  href="https://wa.me/923058480987"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#EDE5D7] border border-[#E8E1D6] text-[#513431] hover:bg-[#B8975A] hover:text-[#1C1C1C] transition-colors text-[12px] font-semibold tracking-[0.16em] uppercase py-3.5 px-6 flex items-center justify-center gap-2"
                  style={{ borderRadius: '2px' }}
                >
                  <span>CONNECT VIA WHATSAPP CONCIERGE (+92 305 8480987)</span>
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
