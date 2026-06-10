/**
 * Central site configuration.
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │  PLACEHOLDERS — update these before going live.                      │
 * │  Search the codebase for "PLACEHOLDER" to confirm nothing is missed. │
 * └─────────────────────────────────────────────────────────────────────┘
 */
module.exports = {
  name: 'Cleveland Smart Home Solutions',
  shortName: 'Cleveland Smart Home',
  tagline: 'Smart Living, Done Simply.',
  legalName: 'Cleveland Smart Home Solutions LLC',

  // The canonical production URL (no trailing slash). Used for sitemap,
  // canonical tags, Open Graph, and structured data.
  url: 'https://www.clevelandsmarthomesolutions.com',

  // ── PLACEHOLDER CONTACT DETAILS ──────────────────────────────────────
  phone: '(216) 284-9433',
  phoneHref: '+12162849433',
  email: 'hello@clevelandsmarthomesolutions.com', // PLACEHOLDER email
  // Where contact-form and review submissions are emailed for approval.
  // Used as the default MAIL_TO recipient for the contact API (see api/_lib/mailer.js).
  ownerEmail: 'ezra@clevelandsmarthomesolutions.com',
  salesEmail: 'sales@clevelandsmarthomesolutions.com',

  // ── BUSINESS LOCATION ────────────────────────────────────────────────
  address: {
    locality: 'University Heights',
    region: 'OH',
    regionName: 'Ohio',
    postalCode: '44118',             // PLACEHOLDER ZIP
    country: 'US',
    // Approx. coordinates for University Heights, OH (fine for LocalBusiness).
    latitude: 41.4948,
    longitude: -81.5357,
  },
  serviceAreaLabel: 'Northeast Ohio',

  hours: 'Monday–Friday, 8:30am–5:00pm',
  hoursSchema: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:30', closes: '17:00' },
  ],

  // ── SOCIAL (optional — leave blank to hide) ──────────────────────────
  social: {
    facebook: '',   // PLACEHOLDER e.g. https://facebook.com/...
    instagram: '',  // PLACEHOLDER
    google: '',     // PLACEHOLDER Google Business Profile
  },

  // Default Open Graph / social share image (relative to site root).
  ogImage: '/images/og-default.svg',

  founded: '2025',
  licensed: true,
  insured: true,

  // Primary call-to-action copy reused across the site.
  // The offer is concrete and low-commitment: a free in-home consultation.
  primaryCta: { label: 'Book a Free Consult', href: '/contact.html' },
  secondaryCta: { label: 'See how it works', href: '/services.html' },

  // Reassurance microcopy shown beneath primary CTAs sitewide.
  ctaNote: 'Free in-home consult · No pressure · Reply within 1 business day',

  // ── PRICING ANCHOR (optional) ────────────────────────────────────────
  // Leave `startingAt` empty until you have a firm floor price you're
  // comfortable publishing. When set (e.g. '$249'), the Services pricing
  // section shows a concrete "starting at" anchor; when empty it falls back
  // to softer, no-number reassurance copy. Search "pricing.startingAt".
  pricing: { startingAt: '$299' },
};
