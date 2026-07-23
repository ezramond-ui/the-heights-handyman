/**
 * Central site configuration.
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │  PLACEHOLDERS — update these before going live.                      │
 * │  Search the codebase for "PLACEHOLDER" to confirm nothing is missed. │
 * └─────────────────────────────────────────────────────────────────────┘
 */
module.exports = {
  name: 'The Heights Handyman',
  shortName: 'The Heights Handyman',
  tagline: 'Done right. Done clean. Done on time.',
  legalName: 'North Coast Residential Solutions LLC',
  // Shown in the footer beneath the brand.
  parentCompany: 'A division of North Coast Residential Solutions LLC',

  // The canonical production URL (no trailing slash). Used for sitemap,
  // canonical tags, Open Graph, and structured data.
  url: 'https://www.theheightshandyman.com', // PLACEHOLDER — confirm final domain

  // ── CONTACT DETAILS ──────────────────────────────────────────────────
  phone: '(216) 284-9433',
  phoneHref: '+12162849433',
  // Text-message link uses the same number.
  smsHref: '+12162849433',
  email: 'ezra@theheightshandyman.com',
  // Where contact-form submissions are emailed.
  // Used as the default MAIL_TO recipient for the contact API (see api/_lib/mailer.js).
  ownerEmail: 'ezra@theheightshandyman.com',

  // ── BUSINESS LOCATION ────────────────────────────────────────────────
  address: {
    locality: 'South Euclid',
    region: 'OH',
    regionName: 'Ohio',
    postalCode: '44121',             // PLACEHOLDER ZIP — update to real address
    country: 'US',
    // Approx. coordinates for South Euclid, OH (fine for LocalBusiness).
    latitude: 41.5231,
    longitude: -81.5190,
  },
  serviceAreaLabel: 'the Heights',
  // The four communities we serve, in copy order.
  serviceCities: ['South Euclid', 'University Heights', 'Cleveland Heights', 'Beachwood'],

  hours: 'Monday–Thursday, 8:30am–5:30pm · Friday, 8:30am–2:00pm',
  hoursSchema: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '08:30', closes: '17:30' },
    { days: ['Friday'], opens: '08:30', closes: '14:00' },
  ],

  // ── SOCIAL (optional — leave blank to hide) ──────────────────────────
  // Note: the business intentionally has no social media accounts.
  social: {
    facebook: '',
    instagram: '',
    google: 'https://share.google/f09PdFQ8WWnFDUGM2', // Google Business Profile
  },

  // Default Open Graph / social share image (relative to site root).
  // PNG, 1200×630 — Google/Facebook/Twitter don't render SVG previews.
  // Regenerate from og-default.svg with: node scripts/generate-og.js
  ogImage: '/images/og-default.png',

  founded: '2025',
  licensed: true,
  insured: true,
  bonded: true,

  // Primary call-to-action copy reused across the site. A free estimate is
  // the low-commitment ask; calling/texting is the most prominent action.
  primaryCta: { label: 'Get a Free Estimate', href: '/contact' },
  secondaryCta: { label: 'View services', href: '/services' },

  // Reassurance microcopy shown beneath primary CTAs sitewide.
  ctaNote: 'Free estimates · Call or text us · Licensed, insured & bonded',
};
