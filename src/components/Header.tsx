import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onNavigate,
  onOpenBooking,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'spaces', label: 'SPACES' },
    { id: 'experience', label: 'EXPERIENCE' },
    { id: 'gallery', label: 'GALLERY' },
    { id: 'location', label: 'LOCATION' },
    { id: 'reviews', label: 'REVIEWS' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Deep Espresso Accent Stripe */}
      <div className="h-[3px] bg-[#513431] w-full fixed top-0 left-0 z-50" />

      {/* Main Minimalist Premium Header */}
      <header
        className={`fixed top-[3px] left-0 right-0 z-40 transition-all duration-300 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#E8E1D6]/80 ${
          isScrolled ? 'shadow-[0_8px_30px_rgba(28,28,28,0.05)] py-0' : ''
        }`}
        style={{ height: '78px' }}
      >
        <div className="max-w-[1440px] mx-auto h-full px-[5vw] flex items-center justify-between">
          
          {/* LOGO WITH /src/public/logo.png IMAGE ONLY */}
          <button
            onClick={() => handleNavClick('hero')}
            className="group flex items-center focus:outline-none"
            aria-label="Zavari Haus Home"
          >
            {!imgError ? (
              <img
                src="/src/public/logo.png"
                alt="Zavari Haus Logo"
                className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                onError={() => setImgError(true)}
              />
            ) : (
              <span
                className="text-[#B8975A] font-medium tracking-[0.2em] text-[18px] uppercase"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                ZH
              </span>
            )}
          </button>

          {/* DESKTOP NAV ITEMS - MINIMAL & ELEGANT */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-9">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-[12px] xl:text-[13px] font-medium tracking-[0.18em] uppercase transition-all duration-200 py-1 relative ${
                    isActive
                      ? 'text-[#B8975A] font-semibold border-b border-[#B8975A]'
                      : 'text-[#1C1C1C]/80 hover:text-[#B8975A]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* DESKTOP MINIMAL BOOK NOW BUTTON */}
          <div className="hidden lg:flex items-center">
            <button
              onClick={onOpenBooking}
              className="bg-transparent border border-[#B8975A] text-[#B8975A] hover:bg-[#B8975A] hover:text-[#1C1C1C] transition-all duration-300 text-[11px] xl:text-[12px] font-medium tracking-[0.2em] uppercase px-[26px] py-[10px]"
              style={{ borderRadius: '2px' }}
            >
              BOOK NOW
            </button>
          </div>

          {/* MOBILE MENU TOGGLE BUTTON */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-[#1C1C1C] hover:text-[#B8975A] p-2 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* MOBILE DRAWER */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-[78px] left-0 right-0 bg-[#FAF9F6] border-b border-[#E8E1D6] shadow-xl px-[6vw] py-6 flex flex-col space-y-4 animate-in slide-in-from-top-2 duration-200">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left text-[13px] font-medium tracking-[0.16em] uppercase py-2 border-b border-[#E8E1D6]/40 ${
                  activeSection === item.id
                    ? 'text-[#B8975A] pl-2 border-l-2 border-l-[#B8975A]'
                    : 'text-[#1C1C1C]'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full mt-3 bg-[#B8975A] text-[#1C1C1C] hover:bg-[#513431] hover:text-[#B8975A] transition-all duration-300 text-[12px] font-semibold tracking-[0.18em] uppercase py-[14px] text-center flex items-center justify-center gap-2"
              style={{ borderRadius: '2px' }}
            >
              <span>BOOK NOW</span>
              <ArrowUpRight size={16} />
            </button>
          </div>
        )}
      </header>
    </>
  );
};
