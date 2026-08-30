export interface Suite {
  id: string;
  category: 'Skyview' | 'Family Heaven' | 'Sunset';
  badge: string; // e.g., "SKYVIEW SUITE", "FAMILY HEAVEN VILLA", "SUNSET SUITE"
  title: string;
  tagline: string;
  pricePkr: number;
  rateLabel: string; // e.g., "PER NIGHT" or "RATE"
  sizeSqFt: number;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  mainImage: string;
  gallery: string[];
  description: string;
  features: string[];
  floorPlanUrl?: string;
}

export interface ExperienceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tag: string;
}

export type GalleryCategory = 'all' | 'suites' | 'living' | 'dining' | 'architectural' | 'views';

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  image: string;
  caption: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'booking' | 'amenities' | 'checkin' | 'location';
}

export interface BookingInquiry {
  id: string;
  suiteId: string;
  suiteTitle: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests: string;
  totalPkr: number;
  createdAt: string;
  status: 'confirmed' | 'pending';
}

export interface Landmark {
  name: string;
  category: string;
  distance: string;
  description: string;
}

export interface GuestReview {
  id: string;
  author: string;
  suiteTitle: string;
  rating: number;
  date: string;
  comment: string;
  city: string;
}
