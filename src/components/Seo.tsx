import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useContent } from '../content/ContentContext';

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
  const { site } = useContent();
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = site.seo.routes[pathname] || site.seo.routes['/'];
    const canonicalUrl = `${site.baseUrl}${pathname === '/' ? '' : pathname}`;

    document.title = meta.title;
    document.documentElement.lang = 'en';

    setOrCreateMeta('description', meta.description);
    setOrCreateMeta('author', site.name);
    setOrCreateMeta('robots', 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');
    setOrCreateMeta('theme-color', '#111009');
    setOrCreateMeta('application-name', site.name);
    setOrCreateMeta('keywords', meta.keywords);

    setOrCreateMeta('og:site_name', site.name, true);
    setOrCreateMeta('og:locale', 'en_US', true);
    setOrCreateMeta('og:type', 'website', true);
    setOrCreateMeta('og:title', meta.title, true);
    setOrCreateMeta('og:description', meta.description, true);
    setOrCreateMeta('og:url', canonicalUrl, true);
    setOrCreateMeta('og:image', `${site.baseUrl}/logo.png`, true);
    setOrCreateMeta('og:image:alt', `${site.name} logo`, true);

    setOrCreateMeta('twitter:card', 'summary_large_image');
    setOrCreateMeta('twitter:title', meta.title);
    setOrCreateMeta('twitter:description', meta.description);
    setOrCreateMeta('twitter:image', `${site.baseUrl}/logo.png`);

    setCanonical(canonicalUrl);

    const schema = [
      {
        '@context': 'https://schema.org',
        '@type': 'LodgingBusiness',
        name: site.name,
        url: canonicalUrl,
        logo: `${site.baseUrl}/logo.png`,
        image: `${site.baseUrl}/logo.png`,
        telephone: site.contact.phone,
        email: site.contact.email,
        priceRange: site.seo.priceRange,
        address: {
          '@type': 'PostalAddress',
          streetAddress: site.contact.streetAddress,
          addressLocality: site.contact.addressLocality,
          addressRegion: site.contact.addressRegion,
          addressCountry: site.contact.addressCountry,
        },
        sameAs: [site.contact.instagramUrl, site.contact.facebookUrl],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: site.name,
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
  }, [pathname, site]);

  return null;
}
