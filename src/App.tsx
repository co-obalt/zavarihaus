import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import BookingModal from './components/BookingModal';
import ScrollToTop from './components/ScrollToTop';
import TransitionWrapper from './components/TransitionWrapper';
import Seo from './components/Seo';
import { ModalProvider } from './context/ModalContext';
import { ContentProvider } from './content/ContentContext';
import { useLenis } from './hooks/useLenis';

// Pages import
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import Amenities from './pages/Amenities';
import Gallery from './pages/Gallery';
import Booking from './pages/Booking';
import Contact from './pages/Contact';

function AppContent() {
  const [loading, setLoading] = useState(true);

  // Initialize smooth scroll lenis
  useLenis();

  return (
    <>
      <Seo />
      <ScrollToTop />
      <Navbar />
      
      {/* Dynamic page routes wrapped with page clip transitions */}
      <TransitionWrapper>
        <Routes>
          <Route path="/" element={<Home isReady={!loading} />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/amenities" element={<Amenities />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </TransitionWrapper>

      {/* Slide-out Overlay panel */}
      <BookingModal />

      {loading && <Preloader onComplete={() => setLoading(false)} />}
    </>
  );
}

export default function App() {
  return (
    <ContentProvider>
      <ModalProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </ModalProvider>
    </ContentProvider>
  );
}
