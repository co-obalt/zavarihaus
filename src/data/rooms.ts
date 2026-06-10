export interface Room {
  id: string;
  name: string;
  type: 'All' | 'Suite' | 'Penthouse' | 'Studio' | 'Villa';
  description: string;
  image: string;
  price: string;
  rawPrice: number; // for calculations
  specs: {
    guests: string;
    size: string;
    bed: string;
  };
}

export const ROOMS_DATA: Room[] = [
  {
    id: "suite-1",
    name: "Suite No. 1",
    type: "Suite",
    description: "An elegant, sun-drenched sanctuary featuring warm oak finishes and tailored minimalist interiors designed for restful pause.",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800", // REPLACE: luxury room 1
    price: "PKR 14,000 / night",
    rawPrice: 14000,
    specs: {
      guests: "2 Guests",
      size: "48 m²",
      bed: "King Bed"
    }
  },
  {
    id: "suite-2",
    name: "Suite No. 2",
    type: "Suite",
    description: "Indulge in organic textile pairings, custom stone installations, and panoramic architectural views curated for dynamic comfort.",
    image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=800", // REPLACE: luxury room 2
    price: "PKR 16,500 / night",
    rawPrice: 16500,
    specs: {
      guests: "2 Guests",
      size: "52 m²",
      bed: "King Bed"
    }
  },
  {
    id: "suite-3",
    name: "Suite No. 3",
    type: "Suite",
    description: "A restorative enclave featuring deep acoustic isolation, custom-molded pure merino lines, and private outdoor garden views.",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800", // REPLACE: luxury room 3
    price: "PKR 12,000 / night",
    rawPrice: 12000,
    specs: {
      guests: "2 Guests",
      size: "45 m²",
      bed: "King Bed"
    }
  },
  {
    id: "penthouse",
    name: "The Penthouse",
    type: "Penthouse",
    description: "Our crowning residence. Double-height ceilings, a private glass pool, and unparalleled panoramic vistas of Lahore's skyline.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800", // REPLACE: penthouse
    price: "PKR 45,000 / night",
    rawPrice: 45000,
    specs: {
      guests: "4 Guests",
      size: "180 m²",
      bed: "2 King Beds"
    }
  },
  {
    id: "studio-retreat",
    name: "Studio Retreat",
    type: "Studio",
    description: "An exceptional, space-optimized studio pairing a custom micro-kitchen with elegant monolithic design accents.",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800", // REPLACE: studio
    price: "PKR 10,500 / night",
    rawPrice: 10500,
    specs: {
      guests: "2 Guests",
      size: "38 m²",
      bed: "Queen Bed"
    }
  },
  {
    id: "villa-retreat",
    name: "Villa Retreat",
    type: "Villa",
    description: "A private multi-level villa enclosed in gated grounds, featuring geothermal heating, an outdoor fireplace, and private staff quarters.",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=800", // REPLACE: villa
    price: "PKR 75,000 / night",
    rawPrice: 75000,
    specs: {
      guests: "6 Guests",
      size: "310 m²",
      bed: "3 King Beds"
    }
  }
];
