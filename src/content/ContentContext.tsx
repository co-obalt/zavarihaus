import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export interface Room {
  id: string;
  name: string;
  type: 'All' | 'Suite' | 'Penthouse' | 'Studio' | 'Villa' | string;
  description: string;
  image: string;
  images: string[];
  location: string;
  modalLocation: string;
  price: string;
  rawPrice: number;
  specs: {
    guests: string;
    size: string;
    bed: string;
    bath: string;
  };
}

export interface ContentBundle {
  site: any;
  home: any;
  pages: any;
  rooms: Room[];
  amenities: any[];
  gallery: any[];
  faq: any[];
  testimonials: any[];
}

const ContentContext = createContext<ContentBundle | null>(null);

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Unable to load ${path}`);
  }
  return response.json() as Promise<T>;
}

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<ContentBundle | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    Promise.all([
      fetchJson('/content/site.json'),
      fetchJson('/content/home.json'),
      fetchJson('/content/pages.json'),
      fetchJson<Room[]>('/content/rooms.json'),
      fetchJson<any[]>('/content/amenities.json'),
      fetchJson<any[]>('/content/gallery.json'),
      fetchJson<any[]>('/content/faq.json'),
      fetchJson<any[]>('/content/testimonials.json'),
    ])
      .then(([site, home, pages, rooms, amenities, gallery, faq, testimonials]) => {
        if (!isMounted) return;
        setContent({ site, home, pages, rooms, amenities, gallery, faq, testimonials });
      })
      .catch((loadError: Error) => {
        if (!isMounted) return;
        setError(loadError);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const value = useMemo(() => content, [content]);

  if (error) {
    return (
      <div className="min-h-screen bg-[#111009] text-[#FAF9F6] flex items-center justify-center px-6 text-center">
        <div>
          <h1 className="font-display text-3xl text-[#B8975A] mb-3">Content failed to load</h1>
          <p className="font-sans text-sm text-white/70">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!value) {
    return <div className="min-h-screen bg-[#111009]" />;
  }

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const content = useContext(ContentContext);
  if (!content) {
    throw new Error('useContent must be used inside ContentProvider');
  }
  return content;
}

export function splitPrice(price: string) {
  const parts = price.split(' ');
  return `${parts[0] ?? ''} ${parts[1] ?? ''}`.trim();
}
