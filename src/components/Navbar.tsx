import React, { useEffect, useState, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useModal } from '../hooks/useModal';
import { Menu, X } from 'lucide-react';
import { gsap } from 'gsap';
import { motion } from 'motion/react';
import { useContent } from '../content/ContentContext';
import logo from '../../logo.png';

export default function Navbar() {
  const { site } = useContent();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [metrics, setMetrics] = useState<{ left: number; width: number } | null>(null);
  const buttonRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const { openModal } = useModal();
  const location = useLocation();
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Monitor scroll for header background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Magnetic CTA pull physics
  useEffect(() => {
    const btn = buttonRef.current;
    if (!btn) return;

    const maxDelta = 8; // Max 8px translate toward cursor
    const activeRadius = 100; // Trigger within 100px radius

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const btnX = rect.left + rect.width / 2;
      const btnY = rect.top + rect.height / 2;

      const dx = e.clientX - btnX;
      const dy = e.clientY - btnY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < activeRadius) {
        const factor = (activeRadius - distance) / activeRadius; // closer = stronger pull
        const pullX = (dx / distance) * maxDelta * factor;
        const pullY = (dy / distance) * maxDelta * factor;

        gsap.to(btn, {
          x: pullX,
          y: pullY,
          duration: 0.3,
          ease: 'power2.out',
        });
      } else {
        springBack();
      }
    };

    const springBack = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseleave', springBack);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (btn) btn.removeEventListener('mouseleave', springBack);
    };
  }, []);

  // Stagger links entrance on mobile menu opened
  useEffect(() => {
    if (isMobileMenuOpen) {
      gsap.fromTo(
        '.mobile-nav-link',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: 'power2.out', delay: 0.2 }
      );
    }
  }, [isMobileMenuOpen]);

  const navLinks = site.nav;

  const activeIdx = navLinks.findIndex(link => link.path === location.pathname);

  useEffect(() => {
    if (hoveredIdx !== null) {
      const el = buttonRefs.current[hoveredIdx];
      if (el) {
        setMetrics({
          left: el.offsetLeft,
          width: el.offsetWidth
        });
      }
    } else {
      setMetrics(null);
    }
  }, [hoveredIdx]);

  useEffect(() => {
    const handleResize = () => {
      if (hoveredIdx !== null) {
        const el = buttonRefs.current[hoveredIdx];
        if (el) {
          setMetrics({
            left: el.offsetLeft,
            width: el.offsetWidth
          });
        }
      } else {
        setMetrics(null);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [hoveredIdx]);

  // High-performance dynamic math to calculate exact top/bottom hover lines mapping
  const containerWidth = 400;
  const containerHeight = 60;
  const totalPerimeter = (containerWidth + containerHeight) * 2; // 920px

  let strokeDashoffset: number | string = 5;
  let strokeDasharray = "0 0 10 40 10 40";

  if (metrics && hoveredIdx !== null) {
    const left = metrics.left;
    const width = metrics.width;

    // Convert pixels to pathLength-percentiles
    const leftUnits = (left / totalPerimeter) * 100;
    const widthUnits = (width / totalPerimeter) * 100;

    // gap2 is from top-right of button to start of bottom-line (860px - left - width)
    const gap2Pixels = 860 - 2 * left - 2 * width;
    const gap2Units = (gap2Pixels / totalPerimeter) * 100;

    // gap3 completes the 100% pathLength loop
    const gap3Pixels = 60 + left;
    const gap3Units = (gap3Pixels / totalPerimeter) * 100;

    strokeDashoffset = 0;
    strokeDasharray = `0 ${leftUnits.toFixed(3)} ${widthUnits.toFixed(3)} ${gap2Units.toFixed(3)} ${widthUnits.toFixed(3)} ${gap3Units.toFixed(3)}`;
  }

  return (
    <>
      <header
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`fixed top-0 left-0 w-full h-[72px] z-100 flex items-center justify-between px-6 md:px-12 transition-all duration-400 ${
          isHovered
            ? 'bg-[#111009]/35 backdrop-blur-[18px] border-b border-white/10 shadow-none'
            : 'bg-transparent border-b border-transparent shadow-none backdrop-blur-0'
        } ${location.pathname === '/' && !isScrolled ? 'text-white' : 'text-[#1A1814]'}`}
      >
        {/* Left: Branding */}
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logo} alt={site.logoAlt} className="h-15 w-auto object-contain" />
        </Link>

        {/* Center: Desktop Links + Elite Uiverse Responsive Sliding Corner Boundaries */}
        <div className="uiverse-nav hidden md:block w-[400px] h-[60px]">
          <div className="uiverse-container relative w-full h-full flex" onMouseLeave={() => setHoveredIdx(null)}>
            {navLinks.map((link, idx) => (
              <NavLink
                key={link.path}
                to={link.path}
                ref={(el) => {
                  buttonRefs.current[idx] = el;
                }}
                onMouseEnter={() => setHoveredIdx(idx)}
                className={({ isActive }) =>
                  `uiverse-btn relative z-10 font-sans text-[11px] uppercase tracking-[0.16em] font-medium transition-colors duration-300 cursor-pointer flex items-center justify-center ${
                    isActive ? 'text-[#B8975A]' : ''
                  }`
                }
              >
                <span className="relative z-10">{link.label}</span>
              </NavLink>
            ))}

            {/* Premium Sliding Corners Bracket Frame underlay */}
            <svg className="uiverse-outline" viewBox="0 0 400 60" preserveAspectRatio="none">
              <rect
                className="uiverse-rect"
                x="0"
                y="0"
                width="100%"
                height="100%"
                pathLength="100"
                style={{
                  strokeDashoffset,
                  strokeDasharray,
                }}
              />
            </svg>
          </div>
        </div>

        {/* Right: Book Now CTA & Mobile Burger */}
        <div className="flex items-center gap-4">
          <button
            ref={buttonRef}
            onClick={() => openModal()}
            className="group relative overflow-hidden hidden md:block border border-[#B8975A] text-[#B8975A] px-6 py-2.5 font-sans text-[11px] uppercase tracking-[0.15em] font-medium leading-none cursor-pointer rounded-[2px]"
          >
            {/* Background clip-path wipe fill indicator */}
            <span
              className="absolute inset-0 bg-[#B8975A] transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] origin-left -translate-x-full group-hover:translate-x-0 z-0"
              style={{
                clipPath: 'inset(0 0% 0 0)'
              }}
            />
            <span className="relative z-10 group-hover:text-[#111009] transition-colors duration-300">
              Book Now
            </span>
          </button>

          {/* Hamburger (Mobile) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center justify-center p-2 cursor-pointer z-50 text-[#B8975A]"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Screen Mobile Overlay Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-90 bg-[#111009] flex flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="mobile-nav-link font-display text-[48px] text-white/80 hover:text-[#B8975A] transition-colors duration-300"
              >
                {link.label}
              </NavLink>
            ))}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openModal();
              }}
              className="mt-6 border border-[#B8975A] text-[#B8975A] hover:bg-[#B8975A] hover:text-[#111009] transition-all duration-300 px-8 py-3 text-[12px] uppercase tracking-widest font-sans rounded-[2px] cursor-pointer"
            >
              Book Now
            </button>
          </div>
        </div>
      )}
    </>
  );
}
