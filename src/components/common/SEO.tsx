import { useEffect } from 'react';

export interface SEOProps {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  schema?: Record<string, unknown>[];
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  ogImage = '/assets/forma_facade.jpg',
  schema
}) => {
  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // 2. Helper to set or create meta tag
    const setMetaTag = (nameAttr: 'name' | 'property', attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${nameAttr}="${attrValue}"]`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(nameAttr, attrValue);
        document.head.appendChild(element);
      }
      element.content = content;
    };

    // Description & Robots
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'robots', 'index, follow');

    // Open Graph
    const fullCanonical = window.location.origin + canonical;
    const fullOgImage = ogImage.startsWith('http') ? ogImage : window.location.origin + ogImage;

    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', fullCanonical);
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:image', fullOgImage);

    // Twitter Cards
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', fullOgImage);

    // 3. Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullCanonical);

    // 4. JSON-LD Schemas
    const schemaScriptId = 'service-page-jsonld';
    let scriptElement = document.getElementById(schemaScriptId) as HTMLScriptElement | null;
    
    if (schema && schema.length > 0) {
      if (!scriptElement) {
        scriptElement = document.createElement('script');
        scriptElement.id = schemaScriptId;
        scriptElement.type = 'application/ld+json';
        document.head.appendChild(scriptElement);
      }
      scriptElement.textContent = JSON.stringify(schema.length === 1 ? schema[0] : schema);
    } else if (scriptElement) {
      scriptElement.remove();
    }

    return () => {
      const existingScript = document.getElementById(schemaScriptId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [title, description, canonical, ogImage, schema]);

  return null;
};
