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

  hours: 'Monday–Saturday, 8:00am–6:00pm',
  hoursSchema: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '08:00', closes: '18:00' },
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
  bonded: true,

  // Primary call-to-action copy reused across the site. A free estimate is
  // the low-commitment ask; calling/texting is the most prominent action.
  primaryCta: { label: 'Get a Free Estimate', href: '/contact.html' },
  secondaryCta: { label: 'View services', href: '/services.html' },

  // Reassurance microcopy shown beneath primary CTAs sitewide.
  ctaNote: 'Free estimates · Call or text us · Licensed, insured & bonded',
};
