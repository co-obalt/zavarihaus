import React, { useState } from 'react';
import { Suite, BookingInquiry } from '../types';
import { SUITES_DATA } from '../data/suitesData';
import { X, Check, Calendar, Users, Shield, Sparkles, ArrowRight } from 'lucide-react';

interface BookingModalProps {
  initialSuiteId?: string;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
  isOpen: boolean;
  onClose: () => void;
  onBookingConfirmed: (booking: BookingInquiry) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  initialSuiteId,
  initialCheckIn = '2026-09-01',
  initialCheckOut = '2026-09-04',
  initialGuests = 2,
  isOpen,
  onClose,
  onBookingConfirmed,
}) => {
  if (!isOpen) return null;

  const [selectedSuiteId, setSelectedSuiteId] = useState(initialSuiteId || SUITES_DATA[0].id);
  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);
  const [guests, setGuests] = useState(initialGuests);
  
  // Luxury Add-ons
  const [addMaybachTransfer, setAddMaybachTransfer] = useState(false);
  const [addPrivateChef, setAddPrivateChef] = useState(false);

  // Guest details
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  const [isConfirmed, setIsConfirmed] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingInquiry | null>(null);

  const selectedSuite = SUITES_DATA.find((s) => s.id === selectedSuiteId) || SUITES_DATA[0];

  // Calculate Nights
  const calculateNights = () => {
    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return isNaN(diffDays) || diffDays <= 0 ? 1 : diffDays;
  };

  const nights = calculateNights();
  const suiteTotal = selectedSuite.pricePkr * nights;
  const transferFee = addMaybachTransfer ? 15000 : 0;
  const chefFee = addPrivateChef ? 25000 : 0;
  const grandTotalPkr = suiteTotal + transferFee + chefFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBooking: BookingInquiry = {
      id: `ZH-${Math.floor(100000 + Math.random() * 900000)}`,
      suiteId: selectedSuite.id,
      suiteTitle: selectedSuite.title,
      checkIn,
      checkOut,
      guests,
      guestName,
      guestEmail,
      guestPhone,
      specialRequests,
      totalPkr: grandTotalPkr,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'confirmed',
    };

    onBookingConfirmed(newBooking);
    setConfirmedBooking(newBooking);
    setIsConfirmed(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-[#1C1C1C]/60 backdrop-blur-xs animate-in fade-in duration-300 overflow-y-auto">
      <div
        className="relative bg-[#FAF9F6] w-full max-w-4xl max-h-[92vh] overflow-y-auto border border-[#E8E1D6] shadow-[0_25px_60px_rgba(28,28,28,0.25)] my-auto"
        style={{ borderRadius: '2px' }}
      >
        {/* Sticky Close Header */}
        <div className="sticky top-0 right-0 z-20 bg-[#FAF9F6]/95 backdrop-blur-xs border-b border-[#E8E1D6] p-5 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B8975A]" />
            <span className="text-[12px] font-medium tracking-[0.18em] uppercase text-[#1C1C1C]">
              ZAVARI HAUS DIRECT RESERVATION
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-[#E8E1D6] text-[#1C1C1C] hover:text-[#B8975A] flex items-center justify-center transition-colors"
            aria-label="Close booking modal"
          >
            <X size={18} />
          </button>
        </div>

        {isConfirmed && confirmedBooking ? (
          <div className="p-8 md:p-12 text-center space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-[#EDE5D7] text-[#B8975A] flex items-center justify-center mx-auto border border-[#E8E1D6]">
              <Check size={32} />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#B8975A]">
                RESERVATION CONFIRMED
              </span>
              <h3 className="text-[36px] font-normal text-[#1C1C1C]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Welcome to Zavari Haus
              </h3>
              <p className="text-[#77736E] text-[15px] max-w-md mx-auto font-light">
                Your reservation reference is <strong className="text-[#513431] font-semibold">{confirmedBooking.id}</strong>. A confirmation document and butler welcome call will follow.
              </p>
            </div>

            {/* Booking Summary Card */}
            <div className="max-w-md mx-auto bg-[#FDFBF7] border border-[#E8E1D6] p-6 text-left space-y-3 text-[14px]">
              <div className="flex justify-between border-b border-[#E8E1D6]/60 pb-2">
                <span className="text-[#AAA39A] uppercase text-[11px] tracking-wider">RESIDENCE</span>
                <span className="font-medium text-[#1C1C1C]">{confirmedBooking.suiteTitle}</span>
              </div>
              <div className="flex justify-between border-b border-[#E8E1D6]/60 pb-2">
                <span className="text-[#AAA39A] uppercase text-[11px] tracking-wider">DATES</span>
                <span className="font-medium text-[#1C1C1C]">{confirmedBooking.checkIn} → {confirmedBooking.checkOut} ({nights} Nights)</span>
              </div>
              <div className="flex justify-between border-b border-[#E8E1D6]/60 pb-2">
                <span className="text-[#AAA39A] uppercase text-[11px] tracking-wider">GUEST NAME</span>
                <span className="font-medium text-[#1C1C1C]">{confirmedBooking.guestName}</span>
              </div>
              <div className="flex justify-between pt-1 text-[16px]">
                <span className="font-semibold text-[#513431]">TOTAL AMOUNT</span>
                <span className="font-medium text-[#B8975A]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  PKR {confirmedBooking.totalPkr.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="mt-4 bg-[#B8975A] text-[#1C1C1C] hover:bg-[#513431] hover:text-[#B8975A] transition-colors text-[12px] font-semibold tracking-[0.18em] uppercase px-8 py-4"
              style={{ borderRadius: '2px' }}
            >
              RETURN TO RESIDENCE
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-8">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              {/* Left Column: Dates, Suite, Add-ons */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h3 className="text-[26px] font-normal text-[#1C1C1C]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    Select Residence &amp; Dates
                  </h3>
                  <p className="text-[#77736E] text-[14px] font-light">
                    Direct bookings include 24/7 personal butler service and priority late check-out.
                  </p>
                </div>

                {/* Suite Picker */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-medium tracking-[0.12em] uppercase text-[#AAA39A]">
                    SELECT SUITE
                  </label>
                  <select
                    value={selectedSuiteId}
                    onChange={(e) => setSelectedSuiteId(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-[#E8E1D6] p-3 text-[15px] text-[#1C1C1C] focus:outline-none focus:border-[#B8975A]"
                    style={{ borderRadius: '2px' }}
                  >
                    {SUITES_DATA.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title} — PKR {s.pricePkr.toLocaleString()} / night ({s.badge})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Dates Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-medium tracking-[0.12em] uppercase text-[#AAA39A]">CHECK-IN</label>
                    <input
                      type="date"
                      required
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-[#FDFBF7] border border-[#E8E1D6] p-3 text-[14px] text-[#1C1C1C] focus:outline-none focus:border-[#B8975A]"
                      style={{ borderRadius: '2px' }}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-medium tracking-[0.12em] uppercase text-[#AAA39A]">CHECK-OUT</label>
                    <input
                      type="date"
                      required
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full bg-[#FDFBF7] border border-[#E8E1D6] p-3 text-[14px] text-[#1C1C1C] focus:outline-none focus:border-[#B8975A]"
                      style={{ borderRadius: '2px' }}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-medium tracking-[0.12em] uppercase text-[#AAA39A]">GUESTS</label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full bg-[#FDFBF7] border border-[#E8E1D6] p-3 text-[14px] text-[#1C1C1C] focus:outline-none focus:border-[#B8975A]"
                      style={{ borderRadius: '2px' }}
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Optional Luxury Inclusions */}
                <div className="space-y-3 pt-2">
                  <span className="block text-[11px] font-medium tracking-[0.14em] uppercase text-[#513431]">
                    BESPOKE RESIDENCE INCLUSIONS
                  </span>

                  <label
                    onClick={() => setAddMaybachTransfer(!addMaybachTransfer)}
                    className={`flex items-start gap-3 p-4 border cursor-pointer transition-colors ${
                      addMaybachTransfer ? 'bg-[#EDE5D7]/50 border-[#B8975A]' : 'bg-[#FDFBF7] border-[#E8E1D6]'
                    }`}
                    style={{ borderRadius: '2px' }}
                  >
                    <input
                      type="checkbox"
                      checked={addMaybachTransfer}
                      onChange={() => {}}
                      className="mt-1 accent-[#B8975A]"
                    />
                    <div>
                      <div className="flex justify-between text-[14px] font-medium text-[#1C1C1C]">
                        <span>Mercedes-Maybach Airport Transfer</span>
                        <span className="text-[#B8975A]">+ PKR 15,000</span>
                      </div>
                      <p className="text-[12px] text-[#77736E] font-light">
                        Chauffeur pickup at ISB/LHE terminal with private luggage handling.
                      </p>
                    </div>
                  </label>

                  <label
                    onClick={() => setAddPrivateChef(!addPrivateChef)}
                    className={`flex items-start gap-3 p-4 border cursor-pointer transition-colors ${
                      addPrivateChef ? 'bg-[#EDE5D7]/50 border-[#B8975A]' : 'bg-[#FDFBF7] border-[#E8E1D6]'
                    }`}
                    style={{ borderRadius: '2px' }}
                  >
                    <input
                      type="checkbox"
                      checked={addPrivateChef}
                      onChange={() => {}}
                      className="mt-1 accent-[#B8975A]"
                    />
                    <div>
                      <div className="flex justify-between text-[14px] font-medium text-[#1C1C1C]">
                        <span>In-Suite Private Chef Dinner (3-Course)</span>
                        <span className="text-[#B8975A]">+ PKR 25,000</span>
                      </div>
                      <p className="text-[12px] text-[#77736E] font-light">
                        Tailored multi-course dinner prepared live in your suite dining salon.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Right Column: Guest Details & Payment Total */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-[#FDFBF7] border border-[#E8E1D6] p-6 space-y-6 shadow-xs" style={{ borderRadius: '2px' }}>
                  <h4 className="text-[20px] font-normal text-[#1C1C1C] border-b border-[#E8E1D6] pb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    Guest Details
                  </h4>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="block text-[11px] font-medium tracking-[0.12em] uppercase text-[#AAA39A]">FULL NAME</label>
                      <input
                        type="text"
                        required
                        placeholder="Zara Malik"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="w-full bg-transparent border-b border-[#E8E1D6] py-1.5 text-[15px] text-[#1C1C1C] focus:outline-none focus:border-[#B8975A]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[11px] font-medium tracking-[0.12em] uppercase text-[#AAA39A]">EMAIL ADDRESS</label>
                      <input
                        type="email"
                        required
                        placeholder="zara@example.com"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        className="w-full bg-transparent border-b border-[#E8E1D6] py-1.5 text-[15px] text-[#1C1C1C] focus:outline-none focus:border-[#B8975A]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[11px] font-medium tracking-[0.12em] uppercase text-[#AAA39A]">PHONE NUMBER</label>
                      <input
                        type="tel"
                        required
                        placeholder="+92 300 0000000"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        className="w-full bg-transparent border-b border-[#E8E1D6] py-1.5 text-[15px] text-[#1C1C1C] focus:outline-none focus:border-[#B8975A]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[11px] font-medium tracking-[0.12em] uppercase text-[#AAA39A]">SPECIAL REQUESTS</label>
                      <input
                        type="text"
                        placeholder="e.g. Late arrival 9 PM"
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        className="w-full bg-transparent border-b border-[#E8E1D6] py-1.5 text-[15px] text-[#1C1C1C] focus:outline-none focus:border-[#B8975A]"
                      />
                    </div>
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="border-t border-[#E8E1D6] pt-4 space-y-2 text-[13px] text-[#77736E]">
                    <div className="flex justify-between">
                      <span>{selectedSuite.title} ({nights} nights)</span>
                      <span>PKR {suiteTotal.toLocaleString()}</span>
                    </div>
                    {addMaybachTransfer && (
                      <div className="flex justify-between">
                        <span>Maybach Transfer</span>
                        <span>PKR 15,000</span>
                      </div>
                    )}
                    {addPrivateChef && (
                      <div className="flex justify-between">
                        <span>Private Chef Dinner</span>
                        <span>PKR 25,000</span>
                      </div>
                    )}
                    <div className="flex justify-between text-[17px] font-semibold text-[#1C1C1C] pt-2 border-t border-[#E8E1D6]">
                      <span>TOTAL ESTIMATE</span>
                      <span className="text-[#B8975A]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                        PKR {grandTotalPkr.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full h-[54px] bg-[#B8975A] text-[#1C1C1C] hover:bg-[#513431] hover:text-[#B8975A] transition-all duration-300 font-semibold text-[12px] tracking-[0.2em] uppercase flex items-center justify-center gap-2"
                    style={{ borderRadius: '2px' }}
                  >
                    <span>CONFIRM RESERVATION</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>

            </div>
          </form>
        )}
      </div>
    </div>
  );
};
