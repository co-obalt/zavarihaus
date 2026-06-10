import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_NAME = 'Zavari Haus';
const DEFAULT_BASE_URL = 'https://zavarihaus.com';
const SITE_URL = (import.meta.env.VITE_SITE_URL || DEFAULT_BASE_URL).replace(/\/$/, '');
const DEFAULT_IMAGE = `${SITE_URL}/logo.png`;

const ROUTE_META: Record<string, { title: string; description: string; keywords: string }> = {
  '/': {
    title: 'Zavari Haus | Luxury Short-Stay Apartments in Pakistan',
    description: 'Zavari Haus is a premium short-stay luxury apartment brand in Pakistan with cinematic stays, elegant rooms, and direct booking support.',
    keywords: 'luxury apartments Pakistan, short stay Lahore, premium stay, Zavari Haus',
  },
  '/rooms': {
    title: 'Rooms & Suites | Zavari Haus',
    description: 'Explore luxury suites, penthouse, studio retreat, and villa options at Zavari Haus in Pakistan.',
    keywords: 'luxury rooms, suites, penthouse, villa, Zavari Haus rooms',
  },
  '/amenities': {
    title: 'Amenities & Experience | Zavari Haus',
    description: 'Discover the spa, dining, fitness, concierge, and wellness experience at Zavari Haus.',
    keywords: 'Zavari Haus amenities, luxury hospitality, concierge, wellness',
  },
  '/gallery': {
    title: 'Gallery | Zavari Haus',
    description: 'View cinematic interiors, exteriors, pool spaces, and detail shots from Zavari Haus.',
    keywords: 'Zavari Haus gallery, luxury interiors, apartment gallery',
  },
  '/booking': {
    title: 'Book a Stay | Zavari Haus',
    description: 'Reserve a luxury short-stay at Zavari Haus with direct booking support and WhatsApp coordination.',
    keywords: 'book Zavari Haus, luxury stay booking, short stay Lahore',
  },
  '/contact': {
    title: 'Contact Zavari Haus',
    description: 'Contact Zavari Haus by email, phone, WhatsApp, Instagram, or Facebook for stay inquiries and reservations.',
    keywords: 'Zavari Haus contact, luxury stay contact, Lahore apartment contact',
  },
};

function setOrCreateMeta(name: string, value: string, isProperty = false) {
  const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    if (isProperty) {
      element.setAttribute('property', name);
    } else {
      element.setAttribute('name', name);
    }
    document.head.appendChild(element);
  }
  element.setAttribute('content', value);
}

function setCanonical(url: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.rel = 'canonical';
    document.head.appendChild(element);
  }
  element.href = url;
}

export default function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = ROUTE_META[pathname] || ROUTE_META['/'];
    const canonicalUrl = `${SITE_URL}${pathname === '/' ? '' : pathname}`;
    const title = meta.title;
    const description = meta.description;

    document.title = title;
    document.documentElement.lang = 'en';

    setOrCreateMeta('description', description);
    setOrCreateMeta('author', SITE_NAME);
    setOrCreateMeta('robots', 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');
    setOrCreateMeta('theme-color', '#111009');
    setOrCreateMeta('application-name', SITE_NAME);
    setOrCreateMeta('keywords', meta.keywords);

    setOrCreateMeta('og:site_name', SITE_NAME, true);
    setOrCreateMeta('og:locale', 'en_US', true);
    setOrCreateMeta('og:type', 'website', true);
    setOrCreateMeta('og:title', title, true);
    setOrCreateMeta('og:description', description, true);
    setOrCreateMeta('og:url', canonicalUrl, true);
    setOrCreateMeta('og:image', DEFAULT_IMAGE, true);
    setOrCreateMeta('og:image:alt', `${SITE_NAME} logo`, true);

    setOrCreateMeta('twitter:card', 'summary_large_image');
    setOrCreateMeta('twitter:title', title);
    setOrCreateMeta('twitter:description', description);
    setOrCreateMeta('twitter:image', DEFAULT_IMAGE);

    setCanonical(canonicalUrl);

    const schema = [
      {
        '@context': 'https://schema.org',
        '@type': 'LodgingBusiness',
        name: SITE_NAME,
        url: canonicalUrl,
        logo: DEFAULT_IMAGE,
        image: DEFAULT_IMAGE,
        telephone: '+923058480987',
        email: 'stay@zavarihaus.com',
        priceRange: 'PKR 10,500 - PKR 75,000',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Bahria Town',
          addressLocality: 'Lahore',
          addressRegion: 'Punjab',
          addressCountry: 'PK',
        },
        sameAs: [
          'https://www.instagram.com/zavarihaus/',
          'https://www.facebook.com/ZavariHaus',
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        url: canonicalUrl,
      },
    ];

    let script = document.getElementById('zavari-haus-jsonld') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = 'zavari-haus-jsonld';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);
  }, [pathname]);

  return null;
}
