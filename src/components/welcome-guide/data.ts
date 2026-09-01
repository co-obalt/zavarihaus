import { PropertyDetails, LocalAttraction, AmenityItem, HousePolicy, SupportContact } from './types';

// Let's use the actual generated image URLs here
export const IMAGES = {
  hero: '/images/welcome-guide/zavari_haus_suite_1783772116328.jpg',
  eiffel: '/images/welcome-guide/eiffel_tower_lahore_1783772136769.jpg'
};

export const PROPERTY_INFO: PropertyDetails = {
  name: "Zavari Haus",
  tagline: "The finest luxury service apartments near Eiffel Tower.",
  description: "Boutique luxury suites in the heart of Bahria Town Lahore. Styled with Gilded Minimalism and treated as curated cinematic sets, our premium suites offer a refined sanctuary tailored for corporate high-flyers, expat returnees, and families seeking an unmatched luxury guarantee.",
  address: "Nishter Block, Bahria Town, Lahore, 53720, PK",
  floorsCount: 5,
  apartmentsCount: 15, // 3 Units across 5 floors
  maxOccupancy: 3,
  checkInTime: "12:00 PM",
  checkOutTime: "11:00 AM",
  wifi: {
    ssid: "Zavari Haus F1",
    password: "Zavari@2026",
    type: "Dedicated High-Speed corporate fiber network",
    floors: [
      { floor: 1, name: "Floor 1 (F1)", ssid: "Zavari Haus F1", notes: "Ground Floor & Reception Area Router" },
      { floor: 2, name: "Floor 2 (F2)", ssid: "Zavari Haus F2", notes: "2nd Floor High-Speed Fiber Router" },
      { floor: 3, name: "Floor 3 (F3)", ssid: "Zavari Haus F3", notes: "3rd Floor High-Speed Fiber Router" },
      { floor: 4, name: "Floor 4 (F4)", ssid: "Zavari Haus F4", notes: "4th Floor High-Speed Fiber Router" },
      { floor: 5, name: "Floor 5 (F5)", ssid: "Zavari Haus F5", notes: "5th Floor Skyview Suite Router" },
    ]
  },
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3406.9575957117727!2d74.18352187462811!3d31.360149355042196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391855c0fb31b321%3A0xe0159e5d126f5440!2sZavari%20Haus!5e0!3m2!1sen!2s!4v1783773802238!5m2!1sen!2s",
  mapDirectUrl: "https://maps.app.goo.gl/BPj14vco1kzsHJpZ8"
};

export const SUITE_TYPES = [
  {
    name: "Skyview Suite",
    description: "Located on the higher floors, featuring expansive glass windows with direct sightlines of the Eiffel Tower replica and surrounding Bahria landscape.",
    amenities: ["Top-floor vista", "Gilded accents", "Plush seating", "Smart workspace"]
  },
  {
    name: "Sunset Suite",
    description: "West-facing luxury suites, capturing the exquisite golden hour twilight of Lahore through custom-designed panoramic windows.",
    amenities: ["Sunset exposure", "Warm ambient lighting", "Integrated kitchen", "Premium bedding"]
  },
  {
    name: "Executive Suite",
    description: "Designed strictly for corporate high-flyers, blending functional minimalism with elegant brushed gold features.",
    amenities: ["Workstation", "High-speed Wi-Fi optimal", "Daily housekeeping", "Quiet zone spacing"]
  }
];

export const ACCESS_STEPS = [
  {
    title: "Ground Floor Arrival",
    description: "Park in the secure, complimentary street parking directly in front of the building. Enter the lobby where our 24/7 on-site staff will welcome you.",
    iconName: "ParkingCircle"
  },
  {
    title: "Meet & Greet Reception",
    description: "Our receptionist will complete a brief check-in identification and hand over your physical entry credentials.",
    iconName: "UserCheck"
  },
  {
    title: "Secure Lift Passcode (0440#)",
    description: "Enter passcode 0440# on the elevator touchpad panel or tap your access card to reach your assigned suite floor.",
    iconName: "KeyRound"
  },
  {
    title: "Your Suite Awaits",
    description: "Use the lift to reach your floor, tap your card, and step into a beautifully temperature-controlled suite designed for premium comfort.",
    iconName: "DoorOpen"
  }
];

export const AMENITIES_LIST: AmenityItem[] = [
  {
    id: "kitchen",
    name: "Integrated Gourmet Kitchen",
    iconName: "ChefHat",
    description: "Fully functional integrated setup designed to support quick meals or culinary preparations.",
    instructions: [
      "Stove: Press the dial inward and turn counter-clockwise while holding for 3 seconds to ignite.",
      "Microwave: Touch-control panel. Ideal for quick warming. Do not put metallic dinnerware inside.",
      "Refrigerator: Stocked with complimentary mineral water on arrival. Temperature is pre-set.",
      "Geyser (Water Heater): Activated server-side or via the switch located beside the washroom entry. Please switch off when not in use to save energy."
    ]
  },
  {
    id: "climate",
    name: "Split Air Conditioning",
    iconName: "Snowflake",
    description: "Dedicated high-capacity cooling splits installed inside every suite for customized climate control.",
    instructions: [
      "Use the dedicated AC remote control mounted on the wall sleeve near the workstation.",
      "Press the Orange Power button to turn on/off.",
      "Set the Mode to 'Cool' (indicated by a snowflake symbol) for optimal summertime comfort.",
      "We recommend 22°C to 24°C as the perfect balanced climate for Lahore's weather.",
      "Please keep all balcony doors and main entry doors closed to maintain cooling efficiency."
    ]
  },
  {
    id: "entertainment",
    name: "Smart Streaming TV",
    iconName: "Tv",
    description: "High-definition flat screen connected directly to our high-speed Wi-Fi.",
    instructions: [
      "Use the TV Remote (black) or Streaming Stick Remote (smaller controller).",
      "Power on using the Red power button at the top.",
      "Press 'Home' to access the streaming tray containing Netflix, YouTube, and Amazon Prime.",
      "The TV is pre-configured with Zavari Haus high-speed Wi-Fi.",
      "Guests are welcome to log into their personal profiles. Make sure to log out upon checkout."
    ]
  },
  {
    id: "housekeeping",
    name: "Housekeeping & Laundry Services",
    iconName: "Shirt",
    description: "Premium daily cleaning and responsive garment care on demand.",
    instructions: [
      "Complimentary Daily Housekeeping: Sanitization, bed-making, and fresh towels provided daily at no extra charge.",
      "Laundry Service: Professional dry cleaning, washing, and ironing is available strictly on-demand.",
      "To request cleaning or garment press, tap the 'Digital Concierge' tab or send a direct WhatsApp text."
    ]
  }
];

export const POLICIES_LIST: HousePolicy[] = [
  {
    id: "parties",
    title: "No Parties & Events",
    isStrict: true,
    description: "To ensure a premium and secure residential standard, strictly no commercial gatherings, parties, or large external groups are permitted.",
    details: "Max occupancy is limited to 3 registered guests. Violation of this rule will lead to immediate cancellation of stay without refund."
  },
  {
    id: "smoking",
    title: "Strict Smoke-Free Interiors",
    isStrict: true,
    description: "Zero tolerance for indoor smoking of cigarettes, e-cigarettes, vapes, or shisha within the suites.",
    details: "A dedicated outdoor smoking area is provided on the ground floor compound and specific balconies where ashtrays are clearly provided. Indoor smoking triggers a PKR 15,000 deep-cleaning fee."
  },
  {
    id: "noise",
    title: "Quiet Hours (10:00 PM - 8:00 AM)",
    isStrict: false,
    description: "We cater to executive corporate travelers and peace-seeking returnees.",
    details: "Please keep volume levels on Smart TVs and music systems down during quiet hours to respect neighboring suites."
  }
];

export const SAFETY_INFO = {
  securityText: "Located in Nishter Block, Bahria Town—one of Lahore's most highly secure, upscale suburban areas. Perfect for families and expat returnees. The complex features 24/7 active CCTV surveillance, a secure locked perimeter, and dedicated professional on-site security guards.",
  contacts: {
    emergency: {
      label: "On-site Management & Reception",
      phone: "0305 8480987",
      available: "24/7 Support"
    },
    concierge: {
      label: "Guest Support on WhatsApp",
      phone: "0311 4545993",
      available: "WhatsApp Support"
    }
  }
};

export const LOCAL_SPOTS: LocalAttraction[] = [
  {
    id: "eiffel",
    name: "Bahria Eiffel Tower Replica",
    category: "landmark",
    distance: "2 min walk (directly adjacent)",
    description: "Lahore's iconic 80-meter tall scale replica of the Parisian monument, illuminated spectacularly with neon strobe sequences every evening. The surrounding gardens are perfect for evening strolls.",
    highlights: ["Nightly light show", "Beautiful manicured lawns", "Great photo opportunities"],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3407.1163851678275!2d74.1847287!3d31.355767399999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39185534f481750b%3A0x27cf2f7a64ee6a58!2sEiffel%20Tower%20Bahria%20Town%20Lahore!5e0!3m2!1sen!2s!4v1783773882702!5m2!1sen!2s",
    mapDirectUrl: "https://maps.app.goo.gl/xYeYpJSVh8tHirUg9"
  },
  {
    id: "themepark",
    name: "Bahria Adventure Land Theme Park",
    category: "leisure",
    distance: "3 min walk",
    description: "A world-class amusement park featuring standard roller coasters, water rides, carnival games, and exciting family attractions. Located right around the block.",
    highlights: ["Thrill rides", "Food court options", "Perfect for children & families"],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.406351534796!2d67.3106212743705!3d25.02028033884569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb34b0db47aa5b3%3A0xd79e410d47f7029c!2sBahria%20Adventure%20Land!5e0!3m2!1sen!2s!4v1783773850896!5m2!1sen!2s",
    mapDirectUrl: "https://maps.app.goo.gl/wVPkPq4dg8oJpobF6"
  },
  {
    id: "winterland",
    name: "Winter Land Lahore",
    category: "leisure",
    distance: "4 min walk",
    description: "An indoor sub-zero snow theme park. Experience real snowfall, snow slides, ice sculptures, and ice skating in a climate controlled -10°C chamber (winter gear provided on site).",
    highlights: ["Real snow slides", "Ice sculptures", "-10°C escape from summer heat"],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1170.3654227031495!2d74.17229318793882!3d31.350912712203012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3918fff4f12bc9ab%3A0x14abbd77e2839eb3!2sWinter%20Land%20-%20Lahore!5e0!3m2!1sen!2s!4v1783773706496!5m2!1sen!2s",
    mapDirectUrl: "https://maps.app.goo.gl/yQqnC8JTXJ1fRNnE9"
  },
  {
    id: "malls",
    name: "Jasmine Mall & Commercial Strip Malls",
    category: "shopping",
    distance: "2-5 min walk",
    description: "Premium shopping plazas featuring Jasmine Mall and Nishter Block retail hubs. Experience diverse brand outlets, department stores, a giant hypermarket, international food courts, and al-fresco rooftop fine dining.",
    highlights: ["Jasmine Mall flagship stores", "Premium brand outlets", "Al-Fresco cafes & fine dining"],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54501.72756314277!2d74.11506722167971!3d31.37669160000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3918ff91e0ef34d7%3A0x3ec9298898df996f!2sJasmine%20Mall!5e0!3m2!1sen!2s!4v1783774783107!5m2!1sen!2s",
    mapDirectUrl: "https://www.google.com/maps/search/Commercial+Strip+Malls+%26+Fine+Dining+Nishter+Block,+Bahria+Town,+Lahore,+53720,+PK/@31.3787498,74.1696997,13z?entry=ttu&g_ep=EgoyMDI2MDcwOC4wIKXMDSoASAFQAw%3D%3D"
  }
];

export const SOCIAL_LINKS = {
  whatsapp: "https://wa.me/923114545993",
  instagram: "https://instagram.com/zavarihaus",
  facebook: "https://facebook.com/ZavariHaus",
  whatsappRaw: "0311 4545993"
};

const checkoutAnswer = "Our standard check-out time is **11:00 AM**. If you require a late check-out, please let us know in advance on WhatsApp!";
const checkinAnswer = "Standard check-in is at **12:00 PM**. If you arrive early, you are welcome to relax in our reception lobby while we prepare your suite.";

// Help answers for Digital Concierge smart-chat module
export const CONCIERGE_ANSWERS: Record<string, string> = {
  lift: "To use the elevator, enter passcode **0440#** on the lift touchpad panel.",
  passcode: "To use the elevator, enter passcode **0440#** on the lift touchpad panel.",
  elevator: "To use the elevator, enter passcode **0440#** on the lift touchpad panel.",
  wifi: "Each floor at Zavari Haus has its dedicated high-speed router (`Zavari Haus F1` through `Zavari Haus F5`) for maximum speed. All 5 floors share the exact same password: **Zavari@2026**. Simply copy your floor network name from the Wi-Fi card!",
  "wi-fi": "Each floor at Zavari Haus has its dedicated high-speed router (`Zavari Haus F1` through `Zavari Haus F5`) for maximum speed. All 5 floors share the exact same password: **Zavari@2026**. Simply copy your floor network name from the Wi-Fi card!",
  checkout: checkoutAnswer,
  "check-out": checkoutAnswer,
  "check out": checkoutAnswer,
  checkin: checkinAnswer,
  "check-in": checkinAnswer,
  "check in": checkinAnswer,
  housekeeping: "We provide **complimentary daily housekeeping**! If you would like our staff to clean your suite or replenish fresh towels, please request here or via WhatsApp.",
  cleaning: "We provide **complimentary daily housekeeping**! If you would like our staff to clean your suite or replenish fresh towels, please request here or via WhatsApp.",
  ac: "Each suite is equipped with a high-capacity Split AC. Use the remote control on the wall sleeve, press the power button, and set the mode to 'Cool' at 22-24°C for optimal comfort.",
  climate: "Each suite is equipped with a high-capacity Split AC. Use the remote control on the wall sleeve, press the power button, and set the mode to 'Cool' at 22-24°C for optimal comfort.",
  geyser: "The geyser switch is located outside the washroom. Switch it on 10 minutes before showering for continuous hot water.",
  kitchen: "Your suite includes an integrated gourmet kitchen with a fridge, microwave, stove, and hot water. Cookware is provided for light meal preparation.",
  laundry: "On-demand laundry and garment pressing services are available. Simply contact reception or message us on WhatsApp for pick-up.",
  ironing: "On-demand laundry and garment pressing services are available. Simply contact reception or message us on WhatsApp for pick-up.",
  smoking: "Indoor smoking is strictly forbidden inside the suites. Dedicated smoking areas with ashtrays are provided in the ground floor courtyard and on suite balconies.",
  parking: "We offer **complimentary, secure street parking** directly in front of our building complex, monitored 24/7 by security staff and cameras.",
  eiffel: "The Bahria Eiffel Tower replica is just a 2-minute walk away! It lights up magnificently every evening at dusk.",
  contact: "For immediate operational assistance, call Management at **0305 8480987** or message our reception team on WhatsApp at **0311 4545993**."
};
