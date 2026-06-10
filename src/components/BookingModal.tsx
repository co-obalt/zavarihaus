import React, { useEffect, useRef, useState } from 'react';
import { useModal } from '../hooks/useModal';
import { getLenis } from '../hooks/useLenis';
import { gsap } from 'gsap';
import { 
  X, Users, Maximize2, BedDouble, Volume2, Wind, Sliders, 
  ChevronDown, ArrowRight, ArrowLeft, MessageSquare, Check, Sparkles, ShieldCheck, Sun,
  Tv, Wifi, Lock, Bath, Sofa, Clock, MapPin, Share2
} from 'lucide-react';
import { useContent } from '../content/ContentContext';

// Royal exact tokens definition
const AMENITIES_LIST = [
  { label: "Air Conditioning", icon: Wind },
  { label: "Flat-Screen TV", icon: Tv },
  { label: "High-Speed Wi-Fi", icon: Wifi },
  { label: "Electronic Safe", icon: Lock },
  { label: "Sound System", icon: Volume2 },
  { label: "Vanity Mirror", icon: Sparkles },
  { label: "Bathtubs", icon: Bath },
  { label: "Seating Area", icon: Sofa },
  { label: "Alarm Clock", icon: Clock }
];

// Similar cohort exploring grid layout
interface SimilarProps {
  currentRoomId: string;
  onRoomSelect: (name: string) => void;
}

const SimilarRoomsLayout: React.FC<SimilarProps> = ({ currentRoomId, onRoomSelect }) => {
  const { rooms } = useContent();
  const filtered = rooms.filter(r => r.id !== currentRoomId).slice(0, 3);
  
  return (
    <div className="mt-20 sm:mt-28 border-t border-[#B8975A]/20 pt-16 pb-12 select-text" id="similar-cohorts-section">
      <div className="text-center mb-12 relative select-none">
        <span className="font-serif italic text-[#B8975A]/8 text-[44px] sm:text-[78px] uppercase tracking-widest absolute -top-10 left-1/2 -transparent -translate-x-1/2 select-none font-extrabold">
          SIMILAR COHORTS
        </span>
        <span className="font-display text-[10px] uppercase tracking-[0.25em] text-[#B8975A] font-extrabold relative z-10 block">
          Spatial Cohort Vectors
        </span>
        <h2 className="font-display text-[26px] sm:text-[34px] font-semibold text-[#1A1814] tracking-tight relative z-10 block mt-2.5 leading-none">
          Explore Similar Rooms
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((room) => {
          return (
            <div 
              key={room.id}
              onClick={() => onRoomSelect(room.name)}
              className="relative aspect-[4/3] rounded-[2px] border border-[#B8975A]/20 bg-[#111009] overflow-hidden cursor-pointer group shadow-[0_12px_40px_rgba(0,0,0,0.12)] hover:shadow-[0_16px_50px_rgba(0,0,0,0.16)] transition-all duration-500"
              id={`similar-room-card-${room.id}`}
            >
              {/* Full background picture */}
              <img 
                src={room.image} 
                alt={room.name} 
                className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105 saturate-[0.85]"
                referrerPolicy="no-referrer"
              />
              
              {/* Floating top badge */}
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-[#B8975A]/35 px-3 py-1 rounded-[1px] z-10 select-none">
                <span className="font-sans text-[8px] uppercase tracking-[0.18em] text-[#B8975A] font-bold">
                  {room.type} Suite
                </span>
              </div>

              {/* Black overlay standard to overlay image */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#111009]/95 via-[#111009]/45 to-transparent transition-colors duration-500 group-hover:from-[#111009]/100" />

              {/* Overlay elements */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 z-10 flex flex-col justify-end">
                <div className="flex items-center justify-between">
                  <h4 className="font-display text-[17px] sm:text-[19px] tracking-wide text-[#FAF9F6] font-[400] uppercase group-hover:text-[#B8975A] transition-colors duration-300">
                    {room.name}
                  </h4>
                  <div className="flex items-center gap-1">
                    <span className="text-[#B8975A] text-[11px]">★</span>
                    <span className="font-mono text-[10.5px] text-[#FAF9F6] font-bold">5.0</span>
                  </div>
                </div>

                {/* Smooth slider details panel */}
                <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 overflow-hidden group-hover:mt-2">
                  <p className="font-sans text-[11.5px] text-[#FAF9F6]/75 line-clamp-1 mb-2.5">
                    {room.description}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-[#B8975A]/25 pt-3 mt-3">
                  <div className="font-mono text-[11px] text-[#B8975A] font-bold uppercase">
                    {room.price.split(' ')[0]} {room.price.split(' ')[1]}
                    <span className="text-[#FAF9F6]/55 font-light text-[9.5px]/none"> / night</span>
                  </div>
                  <span className="font-mono text-[9px] text-[#FAF9F6]/70 uppercase tracking-widest font-bold">
                    {room.specs.size} INDEX
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function BookingModal() {
  const { isModalOpen, closeModal, selectedProperty, openModal } = useModal();
  const { rooms, site } = useContent();
  const modalWrapperRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<'details' | 'book'>('details');

  const [hoveredImgIdx, setHoveredImgIdx] = useState<number | null>(null);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    property: '',
    checkIn: '',
    checkOut: '',
    requests: ''
  });
  const [submitRedirecting, setSubmitRedirecting] = useState(false);

  // Match room data safely
  const currentRoom = rooms.find(r => r.name === selectedProperty) ||
                      rooms.find(r => r.name.toLowerCase().includes(selectedProperty.toLowerCase())) ||
                      rooms[0];

  const galleryImages = currentRoom?.images || [];

  // Sync selected room to form property
  useEffect(() => {
    if (selectedProperty) {
      setFormData((prev) => ({ ...prev, property: selectedProperty }));
    }
  }, [selectedProperty]);

  // Handle open actions
  useEffect(() => {
    const lenis = getLenis();
    if (isModalOpen) {
      setViewMode('details');
      setSubmitRedirecting(false);
      document.body.style.overflow = 'hidden';
      lenis?.stop();

      // Scroll modal container inside to view starting position top immediately
      if (modalWrapperRef.current) {
        modalWrapperRef.current.scrollTop = 0;
      }

      // GSAP entrance fade-reveal
      gsap.fromTo(modalWrapperRef.current, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
      );
    } else {
      document.body.style.overflow = '';
      lenis?.start();
    }

    return () => {
      document.body.style.overflow = '';
      lenis?.start();
    };
  }, [isModalOpen, selectedProperty]);

  // Handle Close with smooth fade out
  const handleClose = () => {
    const lenis = getLenis();
    gsap.to(modalWrapperRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.35,
      ease: 'power2.in',
      onComplete: () => {
        closeModal();
        lenis?.start();
      }
    });
  };

  // Immediate Whatsapp "More Info" Action
  const handleInquireWhatsApp = () => {
    const textMessage = `Hello! I would love to request more info and coordinate stay options for ${currentRoom?.name || 'Zavari Haus Spaces'}.`;
    const waUrl = `${site.contact.whatsappUrl}?text=${encodeURIComponent(textMessage)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  // Submit Reservation Form & trigger prefilled Whatsapp
  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitRedirecting(true);

    const checkInDate = formData.checkIn || 'Not selected';
    const checkOutDate = formData.checkOut || 'Not selected';
    const requestsText = formData.requests || 'None';

    const formattedMessage = `*ZAVARI HAUS - RESERVATION REQUEST*
---------------------------------------
*Guest Name:* ${formData.name}
*Email Address:* ${formData.email}
*Phone Number:* ${formData.phone}
*Sanctuary Space:* ${formData.property}
*Check-In Date:* ${checkInDate}
*Check-Out Date:* ${checkOutDate}
*Special Requests:* ${requestsText}
---------------------------------------
Please verify availability and secure my reservation. Thank you!`;

    const waUrl = `${site.contact.whatsappUrl}?text=${encodeURIComponent(formattedMessage)}`;

    setTimeout(() => {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
      setSubmitRedirecting(false);
      handleClose();
    }, 1500);
  };

  if (!isModalOpen || !currentRoom) return null;

  return (
    <div 
      ref={modalWrapperRef}
      className="fixed inset-0 z-[200] w-full h-screen bg-[#FAF9F6] overflow-y-auto flex flex-col scroll-smooth"
      data-lenis-prevent="true"
    >
      {/* 1. Sticky Luxury Header Header */}
      <div className="sticky top-0 z-[150] w-full bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#B8975A]/15 px-6 md:px-12 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-display text-[22px] text-[#B8975A] font-semibold tracking-widest">ZH</span>
          <div className="h-4 w-[1px] bg-[#B8975A]/35" />
          <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#6B6560]">
            {viewMode === 'details' ? 'Sanctuary Exhibition' : 'Private Coordination'}
          </span>
        </div>

        <button
          onClick={handleClose}
          className="group flex items-center gap-3 font-sans text-[11px] uppercase tracking-[0.2em] text-[#1A1814] hover:text-[#B8975A] transition-colors duration-200 cursor-pointer"
          id="close-exhibition-btn"
        >
          <span>Close Exhibition</span>
          <span className="w-8 h-8 rounded-full border border-[#B8975A]/25 flex items-center justify-center group-hover:border-[#B8975A] group-hover:bg-[#B8975A]/5 transition-all duration-200">
            <X size={15} />
          </span>
        </button>
      </div>

      {/* 2. Main Responsive Content Container */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 w-full flex flex-col gap-0 px-4 sm:px-6 md:px-12"
      >
        
        {/* ================= TOP HALF: DYNAMIC ELASTIC FLEX GRID ================= */}
        <div id="elastic-gallery" className="w-full mt-4 sm:mt-6 bg-[#FAF9F6]">
          <div className="flex flex-col md:flex-row gap-4 h-[350px] sm:h-[450px] md:h-[500px] w-full select-none">
            {galleryImages.slice(0, 4).map((image, idx) => {
              // Calculate flex values smoothly based on which frame is hovered
              let flexStyle = "flex-[1]";
              if (hoveredImgIdx === null) {
                if (idx === 0) flexStyle = "md:flex-[1.8]";
                else flexStyle = "md:flex-[0.8]";
              } else {
                if (hoveredImgIdx === idx) flexStyle = "md:flex-[2.4]";
                else flexStyle = "md:flex-[0.5]";
              }

              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredImgIdx(idx)}
                  onMouseLeave={() => setHoveredImgIdx(null)}
                  onClick={() => setLightboxImg(image)}
                  className={`relative ${flexStyle} h-[24%] md:h-full overflow-hidden bg-black border border-[#B8975A]/20 shadow-[0_12px_30px_rgba(0,0,0,0.06)] rounded-[2px] transition-all duration-500 ease-in-out cursor-pointer group`}
                  id={`gallery-frame-${idx}`}
                >
                  <img
                    src={image}
                    alt={`${currentRoom.name} imagery detail ${idx + 1}`}
                    className={`w-full h-full object-cover transition-all duration-[1000ms] ease-out group-hover:scale-105 ${
                      hoveredImgIdx !== null && hoveredImgIdx !== idx ? 'saturate-[0.35] brightness-[0.70]' : 'saturate-[0.95]'
                    }`}
                    referrerPolicy="no-referrer"
                  />
                  {/* Glass overlay */}
                  <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
                  
                  {/* Numeric Log Index Code Tag */}
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md border border-[#B8975A]/35 px-2.5 py-0.5 rounded-[1px] pointer-events-none">
                    <span className="font-mono text-[8.5px] text-[#B8975A] uppercase tracking-[0.2em] font-bold">
                      [ 0{idx + 1} / IMAGE ]
                    </span>
                  </div>

                  {/* Dynamic interactive detail tag */}
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/85 via-black/45 to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center justify-between">
                    <span className="text-[#FAF9F6] font-display text-[10.5px] uppercase tracking-wider font-semibold">
                      Calibrated Perspective Frame
                    </span>
                    <Maximize2 size={12} className="text-[#B8975A]" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= BOTTOM HALF: DETAILED SHOWCASE / RESERVATION FLOW ================= */}
        {viewMode === 'details' ? (
          
          /* ========== VIEW: SANCTUARY EXHIBITION DETAILS (Two Columns Elegant Layout) ========== */
          <div className="w-full max-w-[1280px] mx-auto py-8 md:py-14 pb-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              
              {/* LEFT COLUMN: 7 columns width */}
              <div className="lg:col-span-7 xl:col-span-7 flex flex-col gap-10 md:gap-14">
                
                {/* 1. Standard Header, Cost Display & Horizontal Specs Card */}
                <div className="bg-transparent border border-[#B8975A]/30 p-6 sm:p-8 rounded-[24px] mb-8 relative">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <h1 className="font-display text-[28px] sm:text-[34px] font-bold text-[#1A1814] tracking-tight">
                        {currentRoom.name}
                      </h1>
                      <span className="bg-[#1C4A47] text-white text-[11px] font-semibold px-4 py-1.5 rounded-full tracking-wider font-sans uppercase">
                        Luxury Rooms
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-500 text-[14px] mt-3 font-sans">
                    <MapPin size={15} className="text-gray-400 shrink-0" />
                    <span>{currentRoom.modalLocation}</span>
                  </div>

                  <div className="mt-5 mb-5 select-none font-serif flex items-baseline">
                    <span className="text-[#1C4A47] font-serif font-extrabold text-[32px] tracking-tight">
                      {currentRoom.price.split(' ')[0]} {currentRoom.price.split(' ')[1]}
                    </span>
                    <span className="text-[14px] font-sans text-gray-500 font-normal ml-1.5 font-light">/ night</span>
                  </div>

                  <div className="h-[1px] bg-gray-200 my-5" />

                  {/* Horizontal Specs Strip */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 font-sans text-[13px] text-[#55524F] font-semibold">
                      <div className="flex items-center gap-2">
                        <BedDouble size={16} className="text-[#B8975A] shrink-0" />
                        <span>{currentRoom.specs.bed}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Bath size={16} className="text-[#B8975A] shrink-0" />
                        <span>1 Bath</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Maximize2 size={15} className="text-[#B8975A] shrink-0" />
                        <span>{currentRoom.specs.size}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-[#B8975A] shrink-0" />
                        <span>{currentRoom.specs.guests}</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: `Zavari Haus - ${currentRoom.name}`,
                            text: currentRoom.description,
                            url: window.location.href,
                          }).catch(() => {});
                        } else {
                          navigator.clipboard.writeText(window.location.href);
                          alert('Gallery URL copied to clipboard.');
                        }
                      }}
                      className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-full hover:bg-gray-50 text-[12px] font-semibold text-[#1F1E1C] active:scale-95 transition-all cursor-pointer font-sans"
                    >
                      <Share2 size={13} className="text-gray-500" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>

                {/* 2. Overview Section */}
                <div id="overview-section" className="space-y-4">
                  <h3 className="font-display text-[26px] sm:text-[30.5px] font-semibold text-[#1A1814] tracking-tight">
                    Overview
                  </h3>
                  <p className="font-sans text-[14.5px] text-[#6B6560] leading-relaxed font-light">
                    {currentRoom.description} This property operates on an uncompromised sensory baseline, featuring pure HEPA active air flow, advanced sound shield technology, and custom circadian room warming. Every aspect coordinates for physical rest.
                  </p>
                </div>

                {/* 3. Simple Room Characteristics */}
                <div className="space-y-4 my-2" id="room-characteristics">
                  <div className="flex items-center gap-2.5 select-none">
                    <div className="h-4 w-[1px] bg-[#B8975A]" />
                    <span className="font-display text-[12px] text-[#1A1814] uppercase tracking-widest font-semibold">
                      Room Characteristics
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-6 py-4 border-y border-[#B8975A]/20 font-sans text-[13px] text-[#6B6560]">
                    <div>
                      <span className="block font-bold text-[#1A1814] uppercase text-[9px] tracking-[0.18em] mb-1">Capacity</span>
                      <span className="font-sans text-[13.5px] text-[#6B6560]">{currentRoom.specs.guests}</span>
                    </div>
                    <div>
                      <span className="block font-bold text-[#1A1814] uppercase text-[9px] tracking-[0.18em] mb-1">Area Size</span>
                      <span className="font-sans text-[13.5px] text-[#6B6560]">{currentRoom.specs.size} Curated</span>
                    </div>
                    <div>
                      <span className="block font-bold text-[#1A1814] uppercase text-[9px] tracking-[0.18em] mb-1">Bed Configuration</span>
                      <span className="font-sans text-[13.5px] text-[#6B6560]">{currentRoom.specs.bed}</span>
                    </div>
                  </div>
                </div>

                {/* 4. Room Amenities (Transparent Grid) */}
                <div className="space-y-5" id="rooms-amenities-style">
                  <div className="select-none">
                    <h3 className="font-display text-[26px] sm:text-[30.5px] font-semibold text-[#1A1814] tracking-tight">
                      Room Amenities
                    </h3>
                    <p className="font-sans text-[13.5px] text-[#6B6560] mt-1.5 leading-relaxed font-light">
                      Every feature is meticulously curated to guarantee an atmosphere of unrivaled calmness and physical ease inside our custom residential spaces.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 pt-2">
                    {AMENITIES_LIST.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <div 
                          key={idx}
                          className="flex items-center gap-4 py-1.5 cursor-default group"
                        >
                          <div className="w-12 h-12 shrink-0 bg-transparent border border-neutral-300 rounded-[14px] flex items-center justify-center transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.01)] group-hover:border-[#B8975A]">
                            <Icon size={18} className="text-[#1C4A47]" />
                          </div>
                          
                          <span className="font-display text-[15px] text-[#1A1814] font-medium tracking-normal mt-0.5 group-hover:text-[#B8975A] transition-colors duration-200">
                            {item.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 5. Booking Rules Checklist Section */}
                <div className="space-y-5 mt-4" id="booking-rules">
                  <div className="select-none">
                    <h3 className="font-display text-[26px] sm:text-[30.5px] font-semibold text-[#1A1814] tracking-tight">
                      Booking Rules
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-1">
                    {/* Check-In */}
                    <div className="space-y-4">
                      <h4 className="font-display text-[18px] sm:text-[20px] font-medium text-[#1A1814] border-b border-[#B8975A]/20 pb-2">
                        Check In
                      </h4>
                      <div className="space-y-3.5">
                        <div className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-[#E58B43] flex items-center justify-center text-white shrink-0 mt-0.5 shadow-sm">
                            <Check size={11} strokeWidth={3} className="text-white" />
                          </div>
                          <span className="font-sans text-[13.5px] text-[#6B6560] leading-relaxed font-light">
                            Check-in commences securely starting at 14:00 (2:00 PM).
                          </span>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-[#E58B43] flex items-center justify-center text-white shrink-0 mt-0.5 shadow-sm">
                            <Check size={11} strokeWidth={3} className="text-white" />
                          </div>
                          <span className="font-sans text-[13.5px] text-[#6B6560] leading-relaxed font-light">
                            Digital verification of government passport files is completed at entry.
                          </span>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-[#E58B43] flex items-center justify-center text-white shrink-0 mt-0.5 shadow-sm">
                            <Check size={11} strokeWidth={3} className="text-white" />
                          </div>
                          <span className="font-sans text-[13.5px] text-[#6B6560] leading-relaxed font-light">
                            Premium local welcome teas are prepared fresh for direct host greetings.
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Check-Out */}
                    <div className="space-y-4">
                      <h4 className="font-display text-[18px] sm:text-[20px] font-medium text-[#1A1814] border-b border-[#B8975A]/20 pb-2">
                        Check Out
                      </h4>
                      <div className="space-y-3.5">
                        <div className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-[#E58B43] flex items-center justify-center text-white shrink-0 mt-0.5 shadow-sm">
                            <Check size={11} strokeWidth={3} className="text-white" />
                          </div>
                          <span className="font-sans text-[13.5px] text-[#6B6560] leading-relaxed font-light">
                            Check-out is completed by 12:00 PM (Noon) to ensure pristine room detailing.
                          </span>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-[#E58B43] flex items-center justify-center text-white shrink-0 mt-0.5 shadow-sm">
                            <Check size={11} strokeWidth={3} className="text-white" />
                          </div>
                          <span className="font-sans text-[13.5px] text-[#6B6560] leading-relaxed font-light">
                            Access lock security sequences must be completed upon key drop-off.
                          </span>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-[#E58B43] flex items-center justify-center text-white shrink-0 mt-0.5 shadow-sm">
                            <Check size={11} strokeWidth={3} className="text-white" />
                          </div>
                          <span className="font-sans text-[13.5px] text-[#6B6560] leading-relaxed font-light">
                            Detailed checkout confirmation records are processed live on the portal.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: 5 columns width (Sticky Elegant Sideboard) */}
              <div className="lg:col-span-5 xl:col-span-5 lg:sticky lg:top-[100px] flex flex-col gap-6">
                
                {/* Active Space Action Panel card (Replaces generic inputs sidebar) */}
                <div className="bg-white border border-[#B8975A]/25 p-6 sm:p-8 rounded-[2px] shadow-[0_12px_45px_rgba(0,0,0,0.05)] relative overflow-hidden flex flex-col">
                  
                  {/* Subtle golden corner light */}
                  <div className="absolute top-0 right-0 w-[80px] h-[80px] bg-[#B8975A]/4 blur-[40px] pointer-events-none" />

                  {/* Title pricing header */}
                  <div className="border-b border-[#B8975A]/15 pb-5 mb-5 select-none text-center">
                    <span className="font-mono text-[8.5px] uppercase tracking-[0.25em] text-[#B8975A] font-extrabold block mb-1">
                      ACTIVE VERIFIED STAY RATE
                    </span>
                    <div className="flex items-baseline justify-center gap-1.5 mt-1">
                      <span className="font-display text-[26px] sm:text-[32px] text-[#1A1814] font-extrabold tracking-tight">
                        {currentRoom.price.split(' ')[0]} {currentRoom.price.split(' ')[1]}
                      </span>
                      <span className="text-[12px] font-sans text-[#6B6560]/80 tracking-wide">/ night</span>
                    </div>
                  </div>

                  {/* Summary coordinates indicator lists */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between border-b border-[#B8975A]/10 pb-3">
                      <span className="text-[10px] font-sans uppercase tracking-widest text-[#6B6560]">Sanctuary Type</span>
                      <span className="text-[11.5px] font-mono uppercase tracking-wider text-[#1A1814] font-bold">{currentRoom.type} Space</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-[#B8975A]/10 pb-3">
                      <span className="text-[10px] font-sans uppercase tracking-widest text-[#6B6560]">Assigned Butler</span>
                      <span className="text-[11.5px] font-mono uppercase tracking-wider text-[#1A1814] font-bold">24/7 Personal Access</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-[#B8975A]/10 pb-3">
                      <span className="text-[10px] font-sans uppercase tracking-widest text-[#6B6560]">Atmos Air Filter</span>
                      <span className="text-[11.5px] font-mono uppercase tracking-wider text-green-700 font-extrabold">Active Hepa</span>
                    </div>
                  </div>

                  {/* Description of safe checkouts */}
                  <p className="font-sans text-[12px] text-[#6B6560] leading-relaxed text-center mb-6 max-w-sm mx-auto">
                    Requests processed instantly via WhatsApp. Room rates will be validated live by our coordination desk to finalize details.
                  </p>

                  {/* DUAL INTENT ACTION ARRAY BUTTONS */}
                  <div className="space-y-3.5">
                    {/* Action Tier A primary */}
                    <button
                      onClick={() => {
                        setViewMode('book');
                        setFormData(prev => ({ ...prev, property: currentRoom.name }));
                      }}
                      className="w-full py-4 bg-[#B8975A] hover:bg-[#D4B07A] text-[#111009] font-sans text-[11px] uppercase tracking-[0.22em] font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md active:scale-[0.98] group rounded-none"
                      id="sidebar-reserve-btn"
                    >
                      <span>Reserve Sanctum</span>
                      <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </button>

                    {/* Action Tier B secondary */}
                    <button
                      onClick={handleInquireWhatsApp}
                      className="w-full py-3.5 rounded-none border border-[#B8975A]/35 text-[#1A1814] hover:border-[#B8975A] hover:bg-[#B8975A]/5 transition-all font-sans text-[10.5px] uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-2 cursor-pointer"
                      id="sidebar-inquire-btn"
                    >
                      <MessageSquare size={13} className="text-[#B8975A]" />
                      <span>Inquire Desk</span>
                    </button>
                  </div>

                  {/* Secure site assurance tag */}
                  <div className="pt-5 mt-5 border-t border-[#B8975A]/15 flex items-center justify-center gap-2 select-none">
                    <ShieldCheck size={14} className="text-[#B8975A]" />
                    <span className="font-mono text-[8.5px] text-[#1A1814]/50 uppercase tracking-[0.18em]">
                      🔒 100% Secure Cryptographic Host
                    </span>
                  </div>

                </div>

              </div>
              
            </div>

            {/* Similar rooms exploring slider grid (completely overrides review list) */}
            <SimilarRoomsLayout currentRoomId={currentRoom.id} onRoomSelect={(name) => openModal(name)} />

          </div>
        ) : (
          
          /* ========== VIEW: PRIVATE RESERVATION FORM FLOW ========== */
          <div className="max-w-3xl mx-auto w-full bg-white border border-[#B8975A]/20 p-6 sm:p-10 rounded-[2px] shadow-xl my-8 md:my-14" id="booking-sheet-form">
            
            {/* Form Back Button */}
            <div className="flex items-center justify-between mb-8 pb-5 border-b border-[#B8975A]/15 select-none">
              <button
                onClick={() => setViewMode('details')}
                className="flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.2em] text-[#6B6560] hover:text-[#B8975A] transition-colors duration-200 cursor-pointer"
                id="return-to-showcase-btn"
              >
                <ArrowLeft size={14} />
                <span>Return to Showcase</span>
              </button>
              
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#B8975A] bg-[#B8975A]/6 px-3 py-1 font-bold">
                Step 2 / Secure Registration
              </span>
            </div>

            {submitRedirecting ? (
              <div className="py-16 text-center flex flex-col items-center justify-center gap-6 select-none">
                <div className="w-14 h-14 border-2 border-[#B8975A]/20 border-t-[#B8975A] rounded-full animate-spin" />
                <div>
                  <h3 className="font-display text-[22px] text-[#B8975A] font-medium tracking-wide">Compiling stay coordinates...</h3>
                  <p className="font-sans text-[13px] text-[#6B6560] mt-2 max-w-sm mx-auto leading-relaxed">
                    Preparing communication stream. Directly forwarding stayed variables to registry coordinator desk at <strong>+923058480987</strong>.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitBooking} className="space-y-8">
                
                <div className="select-none">
                  <h2 className="font-display text-[28px] text-[#1A1814] font-light tracking-tight">
                    Coordinate Stay Session
                  </h2>
                  <p className="font-sans text-[13px] text-[#6B6560] mt-1.5 font-light">
                    Establish physical check-in variables. Submitting pre-formats reservation messages which open instantly inside WhatsApp securely.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label className="block text-[8px] font-sans tracking-[0.22em] uppercase text-[#1A1814]/65 mb-2 font-bold select-none">
                        Full Booking Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your Full Name"
                        className="w-full border-b border-[#B8975A]/25 py-2 font-sans text-[14px] text-[#1A1814] outline-none focus:border-[#B8975A] transition-colors duration-300 bg-transparent"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-[8px] font-sans tracking-[0.22em] uppercase text-[#1A1814]/65 mb-2 font-bold select-none">
                        WhatsApp Contact Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+92 300 1234567"
                        className="w-full border-b border-[#B8975A]/25 py-2 font-sans text-[14px] text-[#1A1814] outline-none focus:border-[#B8975A] transition-colors duration-300 bg-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Email */}
                    <div>
                      <label className="block text-[8px] font-sans tracking-[0.22em] uppercase text-[#1A1814]/65 mb-2 font-bold select-none">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        className="w-full border-b border-[#B8975A]/25 py-2 font-sans text-[14px] text-[#1A1814] outline-none focus:border-[#B8975A] transition-colors duration-300 bg-transparent"
                      />
                    </div>

                    {/* Property selection */}
                    <div>
                      <label className="block text-[8px] font-sans tracking-[0.22em] uppercase text-[#1A1814]/65 mb-2 font-bold select-none">
                        Selected Sanctuary Space
                      </label>
                      <select
                        required
                        value={formData.property}
                        onChange={(e) => setFormData({ ...formData, property: e.target.value })}
                        className="w-full border-b border-[#B8975A]/25 py-2 font-sans text-[14px] text-[#1A1814] outline-none focus:border-[#B8975A] transition-colors duration-150 bg-white cursor-pointer"
                      >
                        {rooms.map((r) => (
                          <option key={r.id} value={r.name}>{r.name} ({r.type})</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    {/* Check In */}
                    <div>
                      <label className="block text-[8px] font-sans tracking-[0.22em] uppercase text-[#1A1814]/65 mb-2 font-bold select-none">
                        Check-In Date
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.checkIn}
                        onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                        className="w-full border-b border-[#B8975A]/25 py-2 font-sans text-[13px] text-[#1A1814] outline-none focus:border-[#B8975A] transition-colors duration-300 bg-transparent"
                      />
                    </div>

                    {/* Check Out */}
                    <div>
                      <label className="block text-[8px] font-sans tracking-[0.22em] uppercase text-[#1A1814]/65 mb-2 font-bold select-none">
                        Check-Out Date
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.checkOut}
                        onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                        className="w-full border-b border-[#B8975A]/25 py-2 font-sans text-[13px] text-[#1A1814] outline-none focus:border-[#B8975A] transition-colors duration-300 bg-transparent"
                      />
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label className="block text-[8px] font-sans tracking-[0.22em] uppercase text-[#1A1814]/65 mb-2 font-bold select-none">
                      Special Requests (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.requests}
                      onChange={(e) => setFormData({ ...formData, requests: e.target.value })}
                      placeholder="Dietary requests, airport pickup schedules, pillow types, acoustic desires..."
                      className="w-full border-b border-[#B8975A]/25 py-2 font-sans text-[13px] text-[#1A1814] outline-none focus:border-[#B8975A] transition-colors duration-300 bg-transparent"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full h-[58px] bg-[#B8975A] hover:bg-[#D4B07A] text-[#111009] font-sans text-[11px] uppercase tracking-[0.25em] font-bold flex items-center justify-center gap-2 rounded-none cursor-pointer transition-colors duration-300 shadow-md"
                  id="submit-whatsapp-booking-btn"
                >
                  <MessageSquare size={15} />
                  <span>Secure stay via WhatsApp</span>
                </button>

                <p className="font-sans text-[10px] text-[#6B6560]/80 leading-relaxed text-center select-none">
                  Your reservation request formats immediately and routes directly to check-in supervisor coordinates at <strong>+92 305 8480987</strong>.
                </p>

              </form>
            )}

          </div>
        )}

      </div>

      {/* Lightbox full-screen modal viewport */}
      {lightboxImg && (
        <div 
          className="fixed inset-0 z-[300] bg-black/92 backdrop-blur-xl flex items-center justify-center p-4 cursor-zoom-out animate-fade-in"
          onClick={() => setLightboxImg(null)}
          id="lightbox-backdrop"
        >
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-[#B8975A] transition-colors duration-200 z-50 p-2 cursor-pointer bg-black/40 rounded-full"
            onClick={(e) => { e.stopPropagation(); setLightboxImg(null); }}
            id="close-lightbox-btn"
          >
            <X size={26} />
          </button>
          <div className="relative max-w-[95%] max-h-[85vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <img 
              src={lightboxImg} 
              alt="Expanded sanctuary detail" 
              className="max-w-full max-h-[85vh] object-contain border border-[#B8975A]/25 shadow-2xl rounded-[1px]" 
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-3 left-3 font-mono text-[9px] text-[#B8975A] tracking-wider uppercase bg-black/75 px-3 py-1 border border-[#B8975A]/35 select-none">
              Authentic Sanctuary Texture View
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
