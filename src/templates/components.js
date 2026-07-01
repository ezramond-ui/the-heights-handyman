/** Reusable UI sections, inline SVG icons, and JSON-LD schema builders. */
const { esc, site } = require('./layout');
const { categories } = require('../data/services');

/* ───────────────────────── Inline SVG icons ───────────────────────── */
// Trade icons for the service tiles + a few generic UI icons. All are drawn
// on a 24×24 grid with `stroke="currentColor"` and no fill.
const icons = {
  // Trades
  bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/>',
  panel: '<rect x="3.5" y="4.5" width="17" height="15" rx="1"/><path d="M9 4.5v15M15 4.5v15"/>',
  roller: '<rect x="4" y="4" width="12" height="6" rx="1"/><path d="M16 7h3.5a1 1 0 0 1 1 1v2.5a1 1 0 0 1-1 1H12"/><path d="M12 12.5V15a1 1 0 0 1-1 1h-1v5"/>',
  tile: '<rect x="3.5" y="3.5" width="7" height="7" rx="1"/><rect x="13.5" y="3.5" width="7" height="7" rx="1"/><rect x="3.5" y="13.5" width="7" height="7" rx="1"/><rect x="13.5" y="13.5" width="7" height="7" rx="1"/>',
  brick: '<rect x="3" y="5" width="18" height="14" rx="1"/><path d="M3 12h18M10 5v7M17 5v7M6 12v7M13.5 12v7"/>',
  saw: '<path d="M13.5 8.5 4.9 17.1a1.9 1.9 0 0 0 0 2.7 1.9 1.9 0 0 0 2.7 0L16.2 11"/><path d="M11.8 6.8l5.4 5.4 3-3a2.4 2.4 0 0 0 0-3.4l-2-2a2.4 2.4 0 0 0-3.4 0z"/>',
  plank: '<rect x="3" y="5" width="18" height="14" rx="1"/><path d="M3 9.7h18M3 14.3h18M9 5v4.7M15 9.7v4.6M6 14.3V19M13 14.3V19"/>',
  wrench: '<path d="M14.5 4.5a4 4 0 0 0-4.9 5.2L3 16.3V21h4.7l6.6-6.6a4 4 0 0 0 5.2-4.9l-2.7 2.7-2.8-.8-.8-2.8z"/>',
  // General UI
  clipboard: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2H9z"/><path d="M8.5 12.5l2.5 2.5 4.5-4.5"/>',
  home: '<path d="M3 11l9-7 9 7M5 10v10h5v-6h4v6h5V10"/>',
  shield: '<path d="M12 2l8 3v6c0 5-3.4 8.5-8 11-4.6-2.5-8-6-8-11V5l8-3Z"/><path d="M9 12l2 2 4-4"/>',
  spark: '<path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l4 4M15 15l4 4M19 5l-4 4M9 15l-4 4"/>',
  hand: '<path d="M18 11V6a2 2 0 0 0-4 0M14 10V4a2 2 0 0 0-4 0v2M10 10.5V6a2 2 0 0 0-4 0v8a8 8 0 0 0 8 8h2a6 6 0 0 0 6-6v-3a2 2 0 0 0-4 0"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.4 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2Z"/>',
  pin: '<path d="M12 22s8-7 8-12a8 8 0 1 0-16 0c0 5 8 12 8 12Z"/><circle cx="12" cy="10" r="3"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  star: '<path d="M12 2l3 7 7 .5-5.5 4.5 2 7L12 17l-6.5 4 2-7L2 9.5 9 9z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  broom: '<path d="M19 4 9 14M4 20s1-4 3.5-6.5S14 10 14 10l0 0s-1 4-3.5 6.5S4 20 4 20Z"/><path d="M12 12l3 3"/>',
};

function icon(name, cls = 'icon') {
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.wrench}</svg>`;
}

/* ─────────────────────── Call-to-action helpers ───────────────────── */

// Small reassurance line shown beneath a primary CTA.
function ctaNote(text) {
  return `<p class="cta-note">${esc(text || site.ctaNote)}</p>`;
}

// The primary tap-to-call button — large, matching the flyer's "Call or Text"
// treatment. `variant` controls styling on light vs. dark backgrounds.
function callButton({ variant = 'accent' } = {}) {
  const cls = variant === 'ghost' ? 'btn btn-ghost btn-lg' : 'btn btn-call btn-lg';
  return `<a class="${cls}" href="tel:${site.phoneHref}">${icon('phone', 'icon icon-sm')} Call or text us</a>`;
}

// A repeated "Get a Free Estimate" + call block. Used across pages.
function estimateCta({ heading, sub, center = true } = {}) {
  return `<div class="estimate-cta${center ? ' center' : ''}">
    ${heading ? `<h2 class="estimate-cta-h">${esc(heading)}</h2>` : ''}
    ${sub ? `<p class="estimate-cta-sub">${esc(sub)}</p>` : ''}
    <div class="cta-actions${center ? ' cta-actions-center' : ''}">
      <a class="btn btn-accent btn-lg" href="/contact.html">${esc(site.primaryCta.label)}</a>
      ${callButton()}
    </div>
    ${ctaNote()}
  </div>`;
}

// Final call-to-action band (navy).
function ctaBand(heading, sub) {
  return `<section class="cta-band" aria-labelledby="cta-h">
    <div class="container cta-inner">
      <div>
        <h2 id="cta-h">${esc(heading)}</h2>
        <p>${esc(sub)}</p>
      </div>
      <div class="cta-actions">
        <a class="btn btn-accent btn-lg" href="/contact.html">${esc(site.primaryCta.label)}</a>
        ${callButton({ variant: 'ghost' })}
        <p class="cta-note cta-note-band">${esc(site.ctaNote)}</p>
      </div>
    </div>
  </section>`;
}

/* ─────────────────────── Service (trade) tiles ────────────────────── */

// Minimal trade tiles: circular icon badge, bold label, thin gold underline.
// Each links to the matching anchor on the Services page.
function serviceTiles() {
  const tiles = categories
    .map(
      (c) => `<a class="tile" href="/services.html#${c.id}">
        <span class="tile-badge">${icon(c.icon, 'icon icon-lg')}</span>
        <span class="tile-label">${esc(c.name)}</span>
      </a>`
    )
    .join('');
  return `<div class="tile-grid">${tiles}</div>`;
}

// Detailed trade cards (icon badge + label + one line), each with an id anchor
// so tiles on other pages can deep-link to it. Used on the Services page.
function serviceDetail() {
  return categories
    .map(
      (c) => `<article class="trade-card" id="${c.id}">
        <span class="tile-badge">${icon(c.icon, 'icon icon-lg')}</span>
        <h3>${esc(c.name)}</h3>
        <p>${esc(c.blurb)}</p>
      </article>`
    )
    .join('');
}

/* ─────────────────── Point-of-Sale violation banner ───────────────── */

// Prominent navy banner — the site's primary SEO focus. Matches the flyer's
// navy treatment. Used on the homepage and reused elsewhere.
function posBanner() {
  return `<section class="pos-banner" aria-labelledby="pos-banner-h">
    <div class="container pos-banner-inner">
      <div class="pos-banner-copy">
        <span class="eyebrow">Point of Sale (POS) violations</span>
        <h2 id="pos-banner-h">Specializing in Point of Sale Violations</h2>
        <p class="pos-banner-lead">Failed your inspection? We’ll get you to closing — <strong>fast</strong>. We repair the exact items city inspectors flag across ${esc(site.serviceCities.join(', '))}.</p>
        <div class="pos-banner-actions">
          <a class="btn btn-accent btn-lg" href="/pos-violations.html">POS violation repairs</a>
          ${callButton({ variant: 'ghost' })}
        </div>
      </div>
      <figure class="pos-banner-media">
        <img src="https://placehold.co/1000x760/F4EEE1/12233F/png?text=Home+exterior+%2F%0Ainspection+clipboard%0A(replace+photo)" width="1000" height="760"
             alt="Home exterior in the Heights being prepared for a point of sale city inspection" loading="lazy" decoding="async">
      </figure>
    </div>
  </section>`;
}

/* ───────────────────────── Shared sections ────────────────────────── */

// The three-part promise — echoes the tagline.
function differentiator() {
  const points = [
    { icon: 'check', title: 'Done right', text: 'Code-compliant, quality repairs that pass inspection and last — no shortcuts.' },
    { icon: 'broom', title: 'Done clean', text: 'We protect your floors and finishes and leave every space tidier than we found it.' },
    { icon: 'clock', title: 'Done on time', text: 'We show up when we say we will and hit your closing and project deadlines.' },
  ];
  const cards = points
    .map(
      (p) => `<div class="diff-card">
        ${icon(p.icon, 'icon icon-lg icon-accent')}
        <h3>${p.title}</h3>
        <p>${p.text}</p>
      </div>`
    )
    .join('');
  return `<section class="section diff-section" aria-labelledby="diff-h">
    <div class="container">
      <div class="section-head center">
        <span class="eyebrow">Why neighbors call us</span>
        <h2 id="diff-h">Done right. Done clean. Done on time.</h2>
      </div>
      <div class="diff-grid">${cards}</div>
    </div>
  </section>`;
}

// Trust badges row — Licensed, Insured, Bonded.
function trustRow() {
  const items = [
    { icon: 'shield', t: 'Licensed', d: 'Professional, code-compliant work' },
    { icon: 'check', t: 'Insured', d: 'Fully covered, start to finish' },
    { icon: 'star', t: 'Bonded', d: 'Protected and accountable work' },
  ];
  return `<section class="trust-row" aria-label="Licensed, insured, and bonded">
    <div class="container trust-grid">
      ${items
        .map(
          (i) => `<div class="trust-item">${icon(i.icon, 'icon icon-accent')}<div><strong>${i.t}</strong><span>${i.d}</span></div></div>`
        )
        .join('')}
    </div>
  </section>`;
}

// How it works — short handyman process.
function processSteps() {
  const steps = [
    { n: '01', t: 'Call or text us', d: 'Tell us what you need — send a few photos if it’s easier. We reply fast.' },
    { n: '02', t: 'Free estimate', d: 'A clear, honest price with no surprises and no pressure.' },
    { n: '03', t: 'We get to work', d: 'On time, clean, and code-compliant — done around your schedule and deadlines.' },
    { n: '04', t: 'Done & spotless', d: 'We finish the job right and leave your home clean.' },
  ];
  const items = steps
    .map(
      (s) => `<li class="step">
      <span class="step-num">${s.n}</span>
      <h3>${s.t}</h3>
      <p>${s.d}</p>
    </li>`
    )
    .join('');
  return `<section class="section" aria-labelledby="process-h">
    <div class="container">
      <div class="section-head center">
        <span class="eyebrow">How it works</span>
        <h2 id="process-h">Simple, from first call to finished job</h2>
      </div>
      <ol class="steps">${items}</ol>
    </div>
  </section>`;
}

/* ──────────────────────── JSON-LD schema builders ─────────────────── */

function jsonLdScript(obj) {
  return `<script type="application/ld+json">${JSON.stringify(obj)}</script>`;
}

// The services we advertise, reused in schema descriptions.
const SERVICE_SUMMARY =
  'Handyman services, small renovations, and point-of-sale (POS) inspection violation repair — electrical, drywall, painting, tile, masonry, carpentry, and flooring.';

function localBusinessSchema(extra = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': site.url + '/#business',
    name: site.name,
    legalName: site.legalName,
    slogan: site.tagline,
    description: SERVICE_SUMMARY,
    url: site.url,
    telephone: site.phone,
    image: site.url + site.ogImage,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.address.latitude,
      longitude: site.address.longitude,
    },
    areaServed: site.serviceCities.map((c) => ({ '@type': 'City', name: `${c}, OH` })),
    openingHoursSpecification: site.hoursSchema.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    ...extra,
  };
}

function breadcrumbSchema(crumbs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: site.url + c.path,
    })),
  };
}

function breadcrumbTrail(crumbs) {
  const last = crumbs.length - 1;
  const items = crumbs
    .map((c, i) =>
      i === last
        ? `<li aria-current="page">${esc(c.name)}</li>`
        : `<li><a href="${c.path}">${esc(c.name)}</a></li>`
    )
    .join('');
  return `<nav class="breadcrumbs" aria-label="Breadcrumb"><div class="container"><ol>${items}</ol></div></nav>`;
}

module.exports = {
  icon,
  ctaNote,
  callButton,
  estimateCta,
  ctaBand,
  serviceTiles,
  serviceDetail,
  posBanner,
  differentiator,
  trustRow,
  processSteps,
  jsonLdScript,
  SERVICE_SUMMARY,
  localBusinessSchema,
  breadcrumbSchema,
  breadcrumbTrail,
};
