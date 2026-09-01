import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Suite, BookingInquiry } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SpacesSection } from './components/SpacesSection';
import { ExperienceSection } from './components/ExperienceSection';
import { GallerySection } from './components/GallerySection';
import { LocationSection } from './components/LocationSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { Check } from 'lucide-react';

const WelcomeGuide = lazy(() => import('./pages/WelcomeGuide'));
const SuiteDetailModal = lazy(() => import('./components/SuiteDetailModal').then(m => ({ default: m.SuiteDetailModal })));
const BookingModal = lazy(() => import('./components/BookingModal').then(m => ({ default: m.BookingModal })));

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<'home' | 'welcome-guide'>(() => {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('welcome') || path.includes('guide')) {
      return 'welcome-guide';
    }
    return 'home';
  });

  const [activeSection, setActiveSection] = useState('hero');
  const [selectedSuite, setSelectedSuite] = useState<Suite | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<{
    suiteId?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: number;
  }>({});

  const [activeBooking, setActiveBooking] = useState<BookingInquiry | null>(null);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      if (path.includes('welcome') || path.includes('guide')) {
        setCurrentRoute('welcome-guide');
      } else {
        setCurrentRoute('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToHome = () => {
    setCurrentRoute('home');
    window.history.pushState(null, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToWelcomeGuide = () => {
    setCurrentRoute('welcome-guide');
    window.history.pushState(null, '', '/welcome-guide');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (sectionId: string) => {
    if (currentRoute !== 'home') {
      setCurrentRoute('home');
      window.history.pushState(null, '', '/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenBooking = () => {
    setBookingDetails({});
    setIsBookingModalOpen(true);
  };

  const handleOpenBookingWithDetails = (details: {
    suiteId?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: number;
  }) => {
    setBookingDetails(details);
    setIsBookingModalOpen(true);
  };

  const handleBookSuite = (suite: Suite) => {
    setSelectedSuite(null);
    setBookingDetails({ suiteId: suite.id });
    setIsBookingModalOpen(true);
  };

  const handleBookingConfirmed = (booking: BookingInquiry) => {
    setActiveBooking(booking);
  };

  // If user is viewing the dedicated /welcome-guide page
  if (currentRoute === 'welcome-guide') {
    return (
      <Suspense fallback={<div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center text-[#B8975A] font-serif text-xl tracking-widest uppercase">ZAVARI HAUS...</div>}>
        <WelcomeGuide onBackToHome={navigateToHome} />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1C1C1C] flex flex-col font-sans selection:bg-[#EDE5D7] selection:text-[#513431]">
      
      {/* Active Booking Notification Banner if user has confirmed booking */}
      {activeBooking && (
        <div className="bg-[#513431] text-[#B8975A] px-[5vw] py-2.5 text-[12px] font-medium tracking-[0.15em] uppercase flex items-center justify-between z-50 border-b border-[#B8975A]/30">
          <div className="flex items-center gap-2">
            <Check size={14} className="text-[#B8975A]" />
            <span>
              ACTIVE RESERVATION: {activeBooking.suiteTitle} ({activeBooking.id}) — {activeBooking.checkIn} TO {activeBooking.checkOut}
            </span>
          </div>
          <button
            onClick={() => handleOpenBookingWithDetails({ suiteId: activeBooking.suiteId })}
            className="underline hover:text-white transition-colors cursor-pointer"
          >
            VIEW DETAILS
          </button>
        </div>
      )}

      {/* Main Header */}
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenBooking={handleOpenBooking}
        onOpenWelcomeGuide={navigateToWelcomeGuide}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          onExploreSpaces={() => handleNavigate('spaces')}
          onOpenBookingWithDetails={handleOpenBookingWithDetails}
        />

        <SpacesSection
          onSelectSuite={(suite) => setSelectedSuite(suite)}
          onBookSuite={handleBookSuite}
        />

        <ExperienceSection onOpenBooking={handleOpenBooking} />

        <GallerySection />

        <LocationSection />

        <ReviewsSection />

        <FaqSection />

        <ContactForm />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBooking={handleOpenBooking}
        onOpenWelcomeGuide={navigateToWelcomeGuide}
      />

      {/* Suite Details Modal */}
      {selectedSuite && (
        <Suspense fallback={null}>
          <SuiteDetailModal
            suite={selectedSuite}
            onClose={() => setSelectedSuite(null)}
            onBookNow={handleBookSuite}
          />
        </Suspense>
      )}

      {/* Booking Engine Modal */}
      {isBookingModalOpen && (
        <Suspense fallback={null}>
          <BookingModal
            isOpen={isBookingModalOpen}
            initialSuiteId={bookingDetails.suiteId}
            initialCheckIn={bookingDetails.checkIn}
            initialCheckOut={bookingDetails.checkOut}
            initialGuests={bookingDetails.guests}
            onClose={() => setIsBookingModalOpen(false)}
            onBookingConfirmed={handleBookingConfirmed}
          />
        </Suspense>
      )}
    </div>
  );
}
