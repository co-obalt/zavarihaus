import {
  Wifi,
  Tv,
  Snowflake,
  Bed,
  Bath,
  Utensils,
  ShieldCheck,
  KeyRound,
  MapPin,
  PanelTop,
  Sparkles,
  MessageCircle,
} from "lucide-react";

/* ─── Navigation ─── */
export const navLinks = [
  { label: "Stay", href: "#stay" },
  { label: "Apartments", href: "#apartments" },
  { label: "Amenities", href: "#amenities" },
  { label: "Gallery", href: "#gallery" },
  { label: "Location", href: "#location" },
  { label: "Reviews", href: "#reviews" },
  { label: "Book", href: "#book" },
];

/* ─── Contact ─── */
export const contact = {
  phone: "+9203058480987",
  whatsapp: "+9203058480987",
  whatsappLink: "https://wa.me/9203058480987",
  instagram: "#",
  address: "Bahria Town Lahore, Pakistan",
};

/* ─── Apartments ─── */
export const apartments = [
  {
    title: "Studio Apartment",
    slug: "studio",
    image: "/images/apartments/studio.png",
    description: "Ideal for solo guests or couples.",
    guests: "1–2 guests",
    bed: "Queen bed",
    features: ["Private bathroom", "Smart TV", "Kitchenette access"],
  },
  {
    title: "One-Bed Apartment",
    slug: "one-bed",
    image: "/images/apartments/one-bed.png",
    description: "More room for longer stays.",
    guests: "1–3 guests",
    bed: "Queen bed",
    features: ["Separate bedroom", "Private lounge", "Kitchen setup"],
  },
  {
    title: "Balcony Apartment",
    slug: "balcony",
    image: "/images/apartments/balcony.png",
    description: "Bright stay with outdoor breathing room.",
    guests: "1–3 guests",
    bed: "Queen bed",
    features: ["Balcony option", "Private lounge", "Kitchen setup"],
  },
  {
    title: "Family Apartment",
    slug: "family",
    image: "/images/apartments/family.png",
    description: "Comfortable space for families and group stays.",
    guests: "3–5 guests",
    bed: "Multiple bed setup",
    features: ["Family layout", "Private lounge", "Kitchen setup"],
  },
];

/* ─── Amenities ─── */
export const amenities = [
  { label: "Fast WiFi", icon: Wifi },
  { label: "Smart TV", icon: Tv },
  { label: "Air Conditioning", icon: Snowflake },
  { label: "Fresh Linen", icon: Bed },
  { label: "Private Bathroom", icon: Bath },
  { label: "Kitchen Setup", icon: Utensils },
  { label: "Secure Building", icon: ShieldCheck },
  { label: "Self Check-in", icon: KeyRound },
  { label: "Restaurant Nearby", icon: MapPin },
  { label: "Balcony Options", icon: PanelTop },
  { label: "Housekeeping", icon: Sparkles },
  { label: "WhatsApp Support", icon: MessageCircle },
];

/* ─── Gallery ─── */
export const gallery = [
  { src: "/images/gallery/exterior.jpeg", alt: "Zavari Haus exterior", label: "Exterior" },
  { src: "/images/gallery/entrance.jpeg", alt: "Zavari Haus entrance", label: "Entrance" },
  { src: "/images/gallery/lounge.jpeg", alt: "Serviced apartment lounge", label: "Lounge" },
  { src: "/images/gallery/bedroom.jpeg", alt: "Serviced apartment bedroom", label: "Bedroom" },
  { src: "/images/gallery/view.jpeg", alt: "Bahria Town view from Zavari Haus", label: "View" },
  { src: "/images/gallery/bathroom.jpeg", alt: "Serviced apartment bathroom", label: "Bathroom" },
];

/* ─── Stay Experience Steps ─── */
export const staySteps = [
  { number: "01", title: "Arrive", copy: "Arrive easily at Bahria Town Lahore." },
  { number: "02", title: "Enter", copy: "Check in smoothly with self-service access." },
  { number: "03", title: "Relax", copy: "Relax in a private, fully furnished lounge." },
  { number: "04", title: "Sleep", copy: "Sleep in a calm, hotel-style bedroom." },
  { number: "05", title: "Explore", copy: "Wake up near Bahria Town landmarks." },
];

/* ─── Trust Points ─── */
export const trustPoints = [
  "Private furnished apartments",
  "Smooth booking",
  "Warm hotel-style interiors",
];

/* ─── FAQs ─── */
export const faqs = [
  {
    question: "What is the check-in time?",
    answer:
      "Check-in details will be confirmed when your booking is arranged.",
  },
  {
    question: "What is the check-out time?",
    answer:
      "Check-out timing will be shared with your booking confirmation.",
  },
  {
    question: "How do I book?",
    answer:
      "You can request availability through WhatsApp, phone, or the booking CTA on this website.",
  },
  {
    question: "Is it family friendly?",
    answer:
      "Yes, selected apartments are suitable for family stays. Confirm the best option before booking.",
  },
  {
    question: "Is parking available?",
    answer: "Parking details can be confirmed at the time of booking.",
  },
  {
    question: "Is there WiFi?",
    answer: "Yes, fast WiFi is available for all guests.",
  },
  {
    question: "Are the apartments fully furnished?",
    answer:
      "Yes, Zavari Haus offers fully furnished private serviced apartments.",
  },
  {
    question: "Is security available?",
    answer:
      "The apartments are located in a secure building environment. Specific access details are confirmed during booking.",
  },
  {
    question: "What is the cancellation policy?",
    answer: "Cancellation terms will be shared before confirmation.",
  },
  {
    question: "Can I book through WhatsApp?",
    answer: "Yes, WhatsApp booking support is available.",
  },
];

/* ─── Location Highlights ─── */
export const locationHighlights = [
  "Bahria Town Lahore",
  "Restaurants & shopping nearby",
  "Family attractions & daily essentials",
  "Eiffel Tower landmark area",
];
