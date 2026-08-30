import { ExperienceItem, GalleryItem, FaqItem, Landmark, GuestReview } from '../types';

export const EXPERIENCES_DATA: ExperienceItem[] = [
  {
    id: 'exp-concierge',
    title: 'Bespoke Concierge',
    subtitle: 'PERSONALIZED ATTENTION',
    description: 'Our dedicated team provides seamless service from private airport transfers and priority dining reservations to tailored city excursions.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=85',
    tag: '24/7 ATTENTION'
  },
  {
    id: 'exp-dining',
    title: 'In-Suite Dining',
    subtitle: 'CULINARY ARTISTRY',
    description: 'Chef-crafted menus featuring seasonal organic ingredients, served privately in the comfort of your suite dining room with fine beverages.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=85',
    tag: 'PRIVATE CHEF'
  },
  {
    id: 'exp-acoustic',
    title: 'Acoustic Sanctuary',
    subtitle: 'QUIET LUXURY',
    description: 'Triple-glazed soundproof insulation, automated blackout drapes, and circadian ambient lighting for restful sleep and deep focus.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=85',
    tag: 'TOTAL TRANQUILITY'
  },
  {
    id: 'exp-valet',
    title: 'Chauffeur & Valet',
    subtitle: 'EFFORTLESS MOBILITY',
    description: 'Complimentary private parking, valet service, and luxury private airport transfers on demand.',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=85',
    tag: 'PRIVATE TRANSFERS'
  }
];

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'The Skyview Living Salon',
    category: 'living',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    caption: 'Warm oak paneling and plush bouclé seating bathed in natural afternoon sunlight.'
  },
  {
    id: 'g-2',
    title: 'Master Bedroom Sanctuary',
    category: 'suites',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85',
    caption: '400-thread Egyptian linen bedding paired with muted champagne gold bedside lamps.'
  },
  {
    id: 'g-3',
    title: 'Private Terrace Dining',
    category: 'dining',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85',
    caption: 'Chef-prepared private dining set against sweeping skyline vistas.'
  },
  {
    id: 'g-4',
    title: 'Architectural Stairwell Detail',
    category: 'architectural',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85',
    caption: 'Clean geometric lines, floating oak treads, and warm travertine limestone finishes.'
  },
  {
    id: 'g-5',
    title: 'Twilight Cityscape View',
    category: 'views',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85',
    caption: 'Quiet luxury balcony vantage point at dusk.'
  },
  {
    id: 'g-6',
    title: 'Penthouse Freestanding Tub',
    category: 'suites',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85',
    caption: 'Custom travertine stone bath with organic botanical bath infusions.'
  },
  {
    id: 'g-7',
    title: 'Bespoke Espresso & Wine Salon',
    category: 'living',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
    caption: 'Handcrafted dark espresso cabinetry with champagne brass accents.'
  },
  {
    id: 'g-8',
    title: 'Courtyard Garden View',
    category: 'views',
    image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=85',
    caption: 'Secluded inner courtyard surrounded by flowering jasmine and limestone walls.'
  }
];

export const FAQ_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What is the check-in and check-out schedule?',
    answer: 'Standard check-in begins at 3:00 PM, and check-out is at 11:00 AM. We offer flexible early arrival and late departure arrangements upon request, managed directly by your private concierge.',
    category: 'checkin'
  },
  {
    id: 'faq-2',
    question: 'Are long-term serviced apartment stays available?',
    answer: 'Yes, Zavari Haus specializes in both short boutique luxury stays and extended corporate or diplomatic residences. Stays exceeding 14 nights qualify for bespoke long-term pricing and tailored butler servicing.',
    category: 'booking'
  },
  {
    id: 'faq-3',
    question: 'Is private parking and airport transfer provided?',
    answer: 'Complimentary secure underground valet parking is provided for all residents. Private luxury vehicle airport transfers (including Mercedes-Maybach or Range Rover) can be scheduled seamlessly when reserving your suite.',
    category: 'amenities'
  },
  {
    id: 'faq-4',
    question: 'What culinary services are offered in-suite?',
    answer: 'Every suite features a full chef-grade kitchen equipped with Sub-Zero and Miele appliances. Guests can also order from our 24/7 room service menu or request a dedicated private chef to prepare custom multi-course dinners inside your suite.',
    category: 'amenities'
  },
  {
    id: 'faq-5',
    question: 'What is the cancellation and reservation modification policy?',
    answer: 'Reservations modified or canceled up to 48 hours prior to arrival incur zero penalty. Direct booking guests enjoy priority flexible date shifts and complimentary suite upgrade eligibility.',
    category: 'booking'
  },
  {
    id: 'faq-6',
    question: 'Where is Zavari Haus located?',
    answer: 'Zavari Haus is situated in a prestigious, quiet tree-lined enclave just 5 minutes from the central financial district and diplomatic zone, offering maximum privacy with immediate urban access.',
    category: 'location'
  }
];

export const LANDMARKS_DATA: Landmark[] = [
  {
    name: 'Eiffel Tower',
    category: 'Landmark',
    distance: '1 min',
    description: 'Iconic replica landmark located right within Bahria Town.'
  },
  {
    name: 'Bahria Grand Mosque',
    category: 'Architecture',
    distance: '2 min',
    description: 'World-class Islamic architecture and peaceful spiritual sanctuary.'
  },
  {
    name: 'Lahore Ring Road',
    category: 'Expressway Access',
    distance: '2 min',
    description: 'Direct high-speed expressway connecting across Lahore.'
  },
  {
    name: 'DHA Raya',
    category: 'Shopping & Leisure',
    distance: '10 min',
    description: 'Upmarket commercial enclave with golf view dining & boutique cafes.'
  },
  {
    name: 'Packages Mall',
    category: 'Retail & Entertainment',
    distance: '15 min',
    description: 'Premier shopping mall featuring international brands and cinemas.'
  },
  {
    name: 'Lahore Airport',
    category: 'Transit Hub',
    distance: '20 min',
    description: 'Allama Iqbal International Airport with direct private transfer.'
  }
];

export const REVIEWS_DATA: GuestReview[] = [
  {
    id: 'rev-1',
    author: 'Zara & Tariq M.',
    suiteTitle: 'The Grand Penthouse',
    rating: 5,
    date: 'August 2026',
    comment: 'Zavari Haus is the embodiment of quiet luxury. The warm ivory tones, incredible attention to acoustic privacy, and private rooftop hearth made our anniversary stay unforgettable.',
    city: 'London / Islamabad'
  },
  {
    id: 'rev-2',
    author: 'Dr. Edward Vance',
    suiteTitle: 'Skyview Residence',
    rating: 5,
    date: 'July 2026',
    comment: 'As a frequent traveler who dislikes sterile luxury hotels, Zavari Haus feels like a private residence crafted by an architect. The champagne gold details and butler service were top-tier.',
    city: 'Dubai'
  },
  {
    id: 'rev-3',
    author: 'Amina Al-Mansoor',
    suiteTitle: 'Heritage Duplex Suite',
    rating: 5,
    date: 'June 2026',
    comment: 'The double-height glass library wall and in-suite dining were extraordinary. Immaculate cleanliness and seamless booking experience.',
    city: 'Riyadh'
  }
];
