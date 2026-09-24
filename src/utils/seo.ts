export interface SEOMetadata {
  title: string;
  description?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  noIndex?: boolean;
}

const DEFAULT_TITLE = 'ApkaLawyer — Verified Legal Services & Consultations in Pakistan';
const DEFAULT_DESCRIPTION = "Pakistan's trusted legal technology platform. Connect with verified High Court & Supreme Court advocates, book consultations, and track court hearings.";
const BASE_URL = 'https://apkalawyer.pk';

export function updatePageSEO(meta: SEOMetadata): void {
  if (typeof document === 'undefined') return;

  // Title
  document.title = meta.title 
    ? (meta.title.includes('ApkaLawyer') ? meta.title : `${meta.title} | ApkaLawyer`) 
    : DEFAULT_TITLE;

  // Meta Description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', meta.description || DEFAULT_DESCRIPTION);

  // Meta Robots
  let metaRobots = document.querySelector('meta[name="robots"]');
  if (!metaRobots) {
    metaRobots = document.createElement('meta');
    metaRobots.setAttribute('name', 'robots');
    document.head.appendChild(metaRobots);
  }
  metaRobots.setAttribute('content', meta.noIndex ? 'noindex, nofollow' : 'index, follow');

  // Canonical link
  let linkCanonical = document.querySelector('link[rel="canonical"]');
  if (!linkCanonical) {
    linkCanonical = document.createElement('link');
    linkCanonical.setAttribute('rel', 'canonical');
    document.head.appendChild(linkCanonical);
  }
  linkCanonical.setAttribute('href', meta.canonical || (typeof window !== 'undefined' ? window.location.href : BASE_URL));
}
