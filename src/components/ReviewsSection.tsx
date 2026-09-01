import React, { useState } from 'react';
import { REVIEWS_DATA } from '../data/hospitalityData';
import { GuestReview } from '../types';
import { Star, Quote, Plus, Check } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<GuestReview[]>(REVIEWS_DATA);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [author, setAuthor] = useState('');
  const [suiteTitle, setSuiteTitle] = useState('Skyview Suite');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !comment) return;

    const newRev: GuestReview = {
      id: `rev-${Date.now()}`,
      author,
      suiteTitle,
      rating,
      date: 'August 2026',
      comment,
      city: city || 'Verified Resident',
    };

    setReviews([newRev, ...reviews]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowForm(false);
      setAuthor('');
      setComment('');
      setCity('');
    }, 2000);
  };

  return (
    <section id="reviews" className="py-[100px] md:py-[140px] bg-[#FAF9F6]">
      <div className="max-w-[1400px] mx-auto px-[5vw]">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-[#E8E1D6]">
          <div className="space-y-3">
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#B8975A]">
              RESIDENT TESTIMONIALS
            </span>
            <h2
              className="text-[#1C1C1C] font-normal leading-[0.95]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(44px, 5vw, 76px)',
              }}
            >
              Guest <span className="gold-italic font-normal">Reflections</span>
            </h2>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="mt-6 md:mt-0 bg-transparent border border-[#B8975A] text-[#B8975A] hover:bg-[#B8975A] hover:text-[#1C1C1C] transition-all duration-300 text-[12px] font-medium tracking-[0.16em] uppercase px-6 py-3 flex items-center gap-2"
            style={{ borderRadius: '2px' }}
          >
            <Plus size={16} />
            <span>SHARE REFLECTION</span>
          </button>
        </div>

        {/* Share Review Form Drawer */}
        {showForm && (
          <div className="mb-16 bg-[#FDFBF7] border border-[#E8E1D6] p-8 shadow-sm animate-in slide-in-from-top-4 duration-300">
            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#EDE5D7] text-[#B8975A] flex items-center justify-center mx-auto">
                  <Check size={24} />
                </div>
                <h3 className="text-[24px] font-normal text-[#1C1C1C]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Thank You for Your Reflection
                </h3>
                <p className="text-[#77736E] text-[14px]">Your testimonial has been added to the guestbook.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-[22px] font-normal text-[#1C1C1C] border-b border-[#E8E1D6] pb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Add Your Guest Reflection
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-medium tracking-[0.12em] uppercase text-[#AAA39A]">YOUR NAME</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sara Ahmed"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="w-full bg-transparent border-b border-[#E8E1D6] py-2 text-[15px] text-[#1C1C1C] focus:outline-none focus:border-[#B8975A]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-medium tracking-[0.12em] uppercase text-[#AAA39A]">CITY / LOCATION</label>
                    <input
                      type="text"
                      placeholder="e.g. Lahore / London"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-transparent border-b border-[#E8E1D6] py-2 text-[15px] text-[#1C1C1C] focus:outline-none focus:border-[#B8975A]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-medium tracking-[0.12em] uppercase text-[#AAA39A]">SUITE EXPERIENCED</label>
                    <select
                      value={suiteTitle}
                      onChange={(e) => setSuiteTitle(e.target.value)}
                      className="w-full bg-transparent border-b border-[#E8E1D6] py-2 text-[15px] text-[#1C1C1C] focus:outline-none focus:border-[#B8975A]"
                    >
                      <option value="Skyview Residence">Skyview Residence</option>
                      <option value="The Skyview Signature Suite">The Skyview Signature Suite</option>
                      <option value="Heritage Duplex Suite">Heritage Duplex Suite</option>
                      <option value="Executive Studio">Executive Studio</option>
                      <option value="Garden Villa">Garden Villa</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-medium tracking-[0.12em] uppercase text-[#AAA39A]">YOUR REFLECTION</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe your stay, ambience, or butler service..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full bg-transparent border-b border-[#E8E1D6] py-2 text-[15px] text-[#1C1C1C] focus:outline-none focus:border-[#B8975A]"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-3 border border-[#E8E1D6] text-[#77736E] text-[12px] tracking-[0.15em] uppercase"
                    style={{ borderRadius: '2px' }}
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-[#B8975A] text-[#1C1C1C] hover:bg-[#513431] hover:text-[#B8975A] transition-colors text-[12px] font-semibold tracking-[0.18em] uppercase"
                    style={{ borderRadius: '2px' }}
                  >
                    SUBMIT REFLECTION
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* 3 Column Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#FDFBF7] border border-[#E8E1D6] p-8 space-y-6 flex flex-col justify-between shadow-[0_10px_25px_rgba(28,28,28,0.06)]"
              style={{ borderRadius: '2px' }}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-[#E8E1D6]/60 pb-4">
                  <div className="flex text-[#B8975A] gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="#B8975A" />
                    ))}
                  </div>
                  <span className="text-[11px] font-medium tracking-[0.14em] uppercase text-[#AAA39A]">
                    {rev.date}
                  </span>
                </div>

                <Quote size={28} className="text-[#EDE5D7]" />

                <p
                  className="text-[18px] text-[#1C1C1C] font-normal leading-[1.6] italic"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8E1D6]/60">
                <h4 className="text-[15px] font-medium text-[#1C1C1C]">
                  {rev.author}
                </h4>
                <div className="flex justify-between text-[12px] text-[#77736E] mt-0.5">
                  <span>{rev.suiteTitle}</span>
                  <span className="text-[#B8975A]">{rev.city}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
