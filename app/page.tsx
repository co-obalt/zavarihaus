"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { initLenis, destroyLenis } from "@/lib/lenis";

import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import FloatingNav from "@/components/FloatingNav";
import HeroFrameSequence from "@/components/HeroFrameSequence";
import IntroSection from "@/components/IntroSection";
import StayExperienceSection from "@/components/StayExperienceSection";
import ApartmentTypesSection from "@/components/ApartmentTypesSection";
import AmenitiesSection from "@/components/AmenitiesSection";
import GallerySection from "@/components/GallerySection";
import LocationSection from "@/components/LocationSection";
import ReviewsSection from "@/components/ReviewsSection";
import FAQSection from "@/components/FAQSection";
import FinalBookingCTA from "@/components/FinalBookingCTA";
import Footer from "@/components/Footer";

export default function Home() {
  useEffect(() => {
    const lenis = initLenis();
    let lenisRaf: ((time: number) => void) | null = null;

    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);
      lenisRaf = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(lenisRaf);
      gsap.ticker.lagSmoothing(0);
    }

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad, { once: true });

    const handleLockScroll = () => {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    };

    const handleUnlockScroll = () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };

    window.addEventListener("zavari:lock-scroll", handleLockScroll);
    window.addEventListener("zavari:unlock-scroll", handleUnlockScroll);
    
    // Refresh ScrollTrigger slightly after mount to ensure layout is calculated
    const refreshTimeout = window.setTimeout(() => ScrollTrigger.refresh(), 700);

    return () => {
      window.clearTimeout(refreshTimeout);
      window.removeEventListener("load", onLoad);
      window.removeEventListener("zavari:lock-scroll", handleLockScroll);
      window.removeEventListener("zavari:unlock-scroll", handleUnlockScroll);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      if (lenisRaf) gsap.ticker.remove(lenisRaf);
      destroyLenis();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <Preloader />
      <FloatingNav />
      <main id="main-content">
        <HeroFrameSequence />
        <IntroSection />
        <StayExperienceSection />
        <ApartmentTypesSection />
        <AmenitiesSection />
        <GallerySection />
        <LocationSection />
        <ReviewsSection />
        <FAQSection />
        <FinalBookingCTA />
      </main>
      <Footer />
    </>
  );
}
