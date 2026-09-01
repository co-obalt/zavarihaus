import { Suite } from '../types';

export const SUITES_DATA: Suite[] = [
  // --- CATEGORY 1: SKYVIEW (4 Rooms - R1) ---
  {
    id: 'skyview-signature-suite',
    category: 'Skyview',
    badge: 'SKYVIEW SUITE',
    title: 'The Skyview Signature Suite',
    tagline: 'Panoramic skyline views framed by warm minimalist oak, floor-to-ceiling double glazing, and soft linen.',
    pricePkr: 6500,
    rateLabel: 'RATE / NIGHT',
    sizeSqFt: 1150,
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    mainImage: '/images/suites/r1/sig_main.jpg',
    gallery: [
      '/images/suites/r1/sig_main.jpg',
      '/images/suites/r1/sig_bed.jpg',
      '/images/suites/r1/sig_bath.jpg',
      '/images/suites/r1/sig_kitchen.jpg',
      '/images/suites/r1/sig_lounge.jpg'
    ],
    description: 'Designed with quiet restraint, the Skyview Signature Suite features floor-to-ceiling windows overlooking the city skyline. Hand-crafted cabinetry, custom travertine marble counters, and organic brushed brass fixtures create an atmosphere of calm sophistication.',
    features: [
      'Private corner balcony with skyline views',
      'Freestanding deep soaking bathtub',
      'Sub-Zero & Miele integrated kitchen suite',
      'Custom 400-thread Egyptian cotton bedding',
      'Automated blackout drapery & circadian lighting',
      'Private high-speed fiber Wi-Fi',
      '24/7 Butler & laundry service'
    ]
  },
  {
    id: 'skyview-duplex-residence',
    category: 'Skyview',
    badge: 'SKYVIEW DUPLEX',
    title: 'Skyview Duplex Residence',
    tagline: 'Two stories of architectural grandeur with soaring double-height ceilings overlooking the city.',
    pricePkr: 8000,
    rateLabel: 'RATE / NIGHT',
    sizeSqFt: 1650,
    bedrooms: 2,
    bathrooms: 2.5,
    guests: 4,
    mainImage: '/images/suites/r1/dup_main.jpg',
    gallery: [
      '/images/suites/r1/dup_main.jpg',
      '/images/suites/r1/dup_bed.jpg',
      '/images/suites/r1/dup_lounge.jpg',
      '/images/suites/r1/dup_kitchen.jpg'
    ],
    description: 'A seamless blend of classical symmetry and modern warm minimalism. The lower floor features an open dining salon and library, while an elegant floating oak staircase leads to the serene upper sleeping sanctuary.',
    features: [
      '6-meter double-height glass library wall',
      'Executive work lounge with leather desk setup',
      'Custom terrazzo & warm oak finishes',
      'Private coffee & tea preparation station',
      'Daily turn-down service'
    ]
  },
  {
    id: 'skyview-atelier-studio',
    category: 'Skyview',
    badge: 'SKYVIEW STUDIO',
    title: 'Skyview Atelier Studio',
    tagline: 'Intimate high-floor corner residence designed for discerning executive travelers.',
    pricePkr: 6000,
    rateLabel: 'RATE / NIGHT',
    sizeSqFt: 780,
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    mainImage: '/images/suites/r1/atl_main.jpg',
    gallery: [
      '/images/suites/r1/atl_main.jpg',
      '/images/suites/r1/atl_bath.jpg',
      '/images/suites/r1/atl_bed.jpg',
      '/images/suites/r1/atl_lounge.jpg'
    ],
    description: 'Effortless luxury meets modern functionality. Features a plush king bed, ergonomic workspace, rain shower, and a cozy breakfast nook overlooking peaceful skyline vistas.',
    features: [
      'High-floor city views',
      'High-speed Wi-Fi 6 & smart hub',
      'Nespresso Vertuo coffee bar',
      'Rainfall walk-in shower',
      'Daily laundry service available'
    ]
  },
  {
    id: 'skyview-imperial-residence',
    category: 'Skyview',
    badge: 'SKYVIEW IMPERIAL',
    title: 'The Imperial Skyview Residence',
    tagline: 'Expansive luxury residence with private scenic terrace, outdoor fire lounge, and panoramic skyline vistas.',
    pricePkr: 9000,
    rateLabel: 'RATE / NIGHT',
    sizeSqFt: 2600,
    bedrooms: 4,
    bathrooms: 4,
    guests: 8,
    mainImage: '/images/suites/r1/imp_main.jpg',
    gallery: [
      '/images/suites/r1/imp_main.jpg',
      '/images/suites/r1/imp_bed.jpg',
      '/images/suites/r1/imp_bath.jpg',
      '/images/suites/r1/imp_lounge.jpg',
      '/images/suites/r1/imp_kitchen.jpg'
    ],
    description: 'Occupying the top level, The Imperial Skyview Residence is an architectural masterpiece of quiet luxury. Boasting a private rooftop terrace, Bang & Olufsen sound, and private concierge attention.',
    features: [
      'Rooftop terrace with fire lounge',
      'Private elevator entry',
      'Master suite with double rain shower',
      'Bespoke espresso bar',
      'Dedicated 24/7 Butler',
      'Valet parking included'
    ]
  },

  // --- CATEGORY 2: FAMILY HEAVEN (4 Rooms - R2) ---
  {
    id: 'family-heaven-grand-suite',
    category: 'Family Heaven',
    badge: 'FAMILY HEAVEN',
    title: 'Family Heaven Grand Suite',
    tagline: 'Spacious 3-bedroom family sanctuary with open living salon, dining room, and full chef kitchen.',
    pricePkr: 7500,
    rateLabel: 'RATE / NIGHT',
    sizeSqFt: 1950,
    bedrooms: 3,
    bathrooms: 3,
    guests: 6,
    mainImage: '/images/suites/r2/grand_main.jpg',
    gallery: [
      '/images/suites/r2/grand_main.jpg',
      '/images/suites/r2/grand_bed.jpg',
      '/images/suites/r2/grand_bath.jpg',
      '/images/suites/r2/grand_kitchen.jpg',
      '/images/suites/r2/grand_lounge.jpg'
    ],
    description: 'Generously proportioned for family comfort and security. Offers a large central living room, separate dining quarters for 8 guests, soundproofed bedrooms, and a fully equipped family kitchen.',
    features: [
      'Generous 8-person family dining table',
      'Soundproofed acoustic bedroom partitions',
      'Fully equipped family kitchen',
      'Dual vanity marble bathrooms',
      'Child-safe balcony locks & quiet air conditioning'
    ]
  },
  {
    id: 'family-heaven-garden-villa',
    category: 'Family Heaven',
    badge: 'FAMILY HEAVEN VILLA',
    title: 'Family Heaven Garden Villa',
    tagline: 'Secluded ground-level villa featuring a private enclosed lawn, garden patio, and hearth.',
    pricePkr: 8500,
    rateLabel: 'RATE / NIGHT',
    sizeSqFt: 2100,
    bedrooms: 3,
    bathrooms: 3.5,
    guests: 7,
    mainImage: '/images/suites/r2/villa_main.jpg',
    gallery: [
      '/images/suites/r2/villa_main.jpg',
      '/images/suites/r2/villa_bed.jpg',
      '/images/suites/r2/villa_bath.jpg',
      '/images/suites/r2/villa_kitchen.jpg'
    ],
    description: 'Surrounded by jasmine gardens and limestone walls, the Family Heaven Garden Villa provides complete family privacy. Relax on your private lawn or enjoy outdoor breakfasts.',
    features: [
      'Enclosed private Mediterranean garden lawn',
      'Outdoor family dining area & hearth',
      'Marble bathrooms with garden views',
      'Private chef catering available upon request',
      'Subtle garden security & ambient lighting'
    ]
  },
  {
    id: 'family-heaven-connecting-loft',
    category: 'Family Heaven',
    badge: 'FAMILY HEAVEN LOFT',
    title: 'Family Heaven Connecting Loft',
    tagline: 'Dual-wing interconnected loft residence ideal for multi-generational families.',
    pricePkr: 7000,
    rateLabel: 'RATE / NIGHT',
    sizeSqFt: 1500,
    bedrooms: 2,
    bathrooms: 2,
    guests: 5,
    mainImage: '/images/suites/r2/loft_main.jpg',
    gallery: [
      '/images/suites/r2/loft_main.jpg',
      '/images/suites/r2/loft_lounge.jpg',
      '/images/suites/r2/loft_bed.jpg',
      '/images/suites/r2/loft_lounge2.jpg'
    ],
    description: 'Designed for family comfort with connected bedroom suites, a shared central media salon, and spacious dressing rooms.',
    features: [
      'Interconnecting security doors between wings',
      'Spacious central lounge with Smart TV 4K',
      'Hypoallergenic bedding options',
      'Kitchenette & dining breakfast bar',
      '24/7 concierge assistance'
    ]
  },
  {
    id: 'family-heaven-royal-manor',
    category: 'Family Heaven',
    badge: 'FAMILY HEAVEN MANOR',
    title: 'Family Heaven Royal Manor',
    tagline: 'Superb 4-bedroom estate residence with private media room, large dining hall, and butler service.',
    pricePkr: 9000,
    rateLabel: 'RATE / NIGHT',
    sizeSqFt: 2550,
    bedrooms: 4,
    bathrooms: 4.5,
    guests: 8,
    mainImage: '/images/suites/r2/manor_main.jpg',
    gallery: [
      '/images/suites/r2/manor_main.jpg',
      '/images/suites/r2/manor_bed.jpg',
      '/images/suites/r2/manor_bath.jpg',
      '/images/suites/r2/manor_kitchen.jpg',
      '/images/suites/r2/manor_lounge.jpg'
    ],
    description: 'The ultimate space for large families. Includes 4 plush master bedrooms, a private movie salon, formal dining hall, and dedicated butler pantry.',
    features: [
      '4 Master suite bedrooms with en-suite baths',
      'Private family cinema room',
      '10-seater formal dining table',
      'Butler kitchen with separate entrance',
      '24/7 dedicated butler service'
    ]
  },

  // --- CATEGORY 3: SUNSET (4 Rooms - R3) ---
  {
    id: 'sunset-terrace-suite',
    category: 'Sunset',
    badge: 'SUNSET SUITE',
    title: 'The Sunset Terrace Suite',
    tagline: 'West-facing terrace residence designed to capture golden hour sunsets over the city skyline.',
    pricePkr: 7000,
    rateLabel: 'RATE / NIGHT',
    sizeSqFt: 1300,
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    mainImage: '/images/suites/r3/terr_main.jpg',
    gallery: [
      '/images/suites/r3/terr_main.jpg',
      '/images/suites/r3/terr_bed.jpg',
      '/images/suites/r3/terr_bath.jpg',
      '/images/suites/r3/terr_kitchen.jpg'
    ],
    description: 'Positioned perfectly on the western elevation, this suite offers dramatic views as the sun dips below the horizon. Features a outdoor lounge terrace and warm oak interiors.',
    features: [
      'West-facing private sunset viewing terrace',
      'Outdoor lounge seating & ambient heating',
      'Custom travertine stone bath',
      'Espresso bar & wine cooler',
      'Automated evening mood lighting'
    ]
  },
  {
    id: 'sunset-panorama-villa',
    category: 'Sunset',
    badge: 'SUNSET VILLA',
    title: 'Sunset Panorama Villa',
    tagline: 'Warm timber and limestone interiors featuring an expansive sun-drenched sunset deck.',
    pricePkr: 8500,
    rateLabel: 'RATE / NIGHT',
    sizeSqFt: 2050,
    bedrooms: 3,
    bathrooms: 3,
    guests: 6,
    mainImage: '/images/suites/r3/pan_main.jpg',
    gallery: [
      '/images/suites/r3/pan_main.jpg',
      '/images/suites/r3/pan_bed.jpg',
      '/images/suites/r3/pan_bath.jpg',
      '/images/suites/r3/pan_kitchen.jpg'
    ],
    description: 'An architectural villa framed by warm timber slats and full glass walls. Enjoy breathtaking evening sunset panoramas from your private sun deck.',
    features: [
      'Panoramic 180-degree sunset horizon deck',
      'Open-concept living room with fireplace',
      'Master bedroom with sunset terrace access',
      'Freestanding bathtub overlooking sunset',
      'Private chef dining setup'
    ]
  },
  {
    id: 'sunset-sanctuary-studio',
    category: 'Sunset',
    badge: 'SUNSET SANCTUARY',
    title: 'Sunset Sanctuary Studio',
    tagline: 'Serene sunset studio with freestanding tub framing golden twilight horizon views.',
    pricePkr: 6500,
    rateLabel: 'RATE / NIGHT',
    sizeSqFt: 920,
    bedrooms: 1,
    bathrooms: 1.5,
    guests: 2,
    mainImage: '/images/suites/r3/sanc_main.jpg',
    gallery: [
      '/images/suites/r3/sanc_main.jpg',
      '/images/suites/r3/sanc_bed.jpg',
      '/images/suites/r3/sanc_lounge.jpg',
      '/images/suites/r3/sanc_bath.jpg'
    ],
    description: 'An intimate sanctuary designed specifically to capture sunset aesthetics. Relish quiet evenings with custom lighting, plush king bedding, and a window-side bathtub.',
    features: [
      'Window-side soaking tub with sunset view',
      'King-size plush bedding with Egyptian cotton',
      'Integrated Bluetooth acoustic soundbar',
      'Nespresso gourmet coffee setup',
      'In-suite dining service'
    ]
  },
  {
    id: 'sunset-celestial-suite',
    category: 'Sunset',
    badge: 'SUNSET CELESTIAL',
    title: 'Sunset Celestial Suite',
    tagline: 'Ultra-exclusive top-tier sunset suite with private glass lounge and outdoor fire pit.',
    pricePkr: 9000,
    rateLabel: 'RATE / NIGHT',
    sizeSqFt: 2400,
    bedrooms: 3,
    bathrooms: 3.5,
    guests: 6,
    mainImage: '/images/suites/r3/cel_main.jpg',
    gallery: [
      '/images/suites/r3/cel_main.jpg',
      '/images/suites/r3/cel_bed.jpg',
      '/images/suites/r3/cel_kitchen.jpg',
      '/images/suites/r3/cel_lounge.jpg',
      '/images/suites/r3/cel_bed2.jpg'
    ],
    description: 'An extraordinary luxury residence elevated above the city skyline. Experience twilight transition in a glass-walled celestial salon with warm hearth.',
    features: [
      'Glass celestial lounge with sunset vistas',
      'Private outdoor deck with gas fire pit',
      'Three master bedrooms with rain showers',
      'Integrated Sub-Zero wine & dining bar',
      '24/7 butler service'
    ]
  }
];
