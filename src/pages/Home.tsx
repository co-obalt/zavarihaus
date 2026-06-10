import React, { useEffect } from 'react';
import Hero from '../sections/Hero';
import KineticStatement from '../sections/KineticStatement';
import FeaturedSpaces from '../sections/FeaturedSpaces';
import KineticAccordion from '../sections/KineticAccordion';
import GallerySection from '../sections/GallerySection';
import Testimonials from '../sections/Testimonials';
import FAQ from '../sections/FAQ';
import LocationSection from '../sections/LocationSection';
import BookingCTA from '../sections/BookingCTA';
import Footer from '../sections/Footer';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Home() {
  useEffect(() => {
    // Force refresh ScrollTriggers to adjust dimensions accurately
    window.addEventListener('load', () => {
      ScrollTrigger.refresh();
    });
    ScrollTrigger.refresh();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#FAF9F6]">
      <Hero />
      <KineticStatement />
      <FeaturedSpaces />
      <KineticAccordion />
      <GallerySection />
      <Testimonials />
      <FAQ />
      <LocationSection />
      <BookingCTA />
      <Footer />
    </div>
  );
}
