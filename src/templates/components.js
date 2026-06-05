/** Reusable UI sections, inline SVG icons, and JSON-LD schema builders. */
const { esc, site } = require('./layout');
const { tiers, keyServices } = require('../data/services');

/* ───────────────────────── Inline SVG icons ───────────────────────── */
const icons = {
  bulb: '<path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V18h6v-1.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2Z"/>',
  switch: '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M9 7h6M12 12v5"/>',
  thermostat: '<path d="M14 14.76V5a2 2 0 0 0-4 0v9.76a4 4 0 1 0 4 0Z"/>',
  camera: '<rect x="3" y="6" width="14" height="12" rx="2"/><path d="M17 10l4-2v8l-4-2"/><circle cx="10" cy="12" r="2.5"/>',
  lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  shade: '<path d="M3 4h18M4 4v8a8 8 0 0 0 16 0V4M12 12v8M12 20l-2.5-2.5M12 20l2.5-2.5"/>',
  home: '<path d="M3 11l9-7 9 7M5 10v10h5v-6h4v6h5V10"/>',
  shield: '<path d="M12 2l8 3v6c0 5-3.4 8.5-8 11-4.6-2.5-8-6-8-11V5l8-3Z"/><path d="M9 12l2 2 4-4"/>',
  spark: '<path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l4 4M15 15l4 4M19 5l-4 4M9 15l-4 4"/>',
  hand: '<path d="M18 11V6a2 2 0 0 0-4 0M14 10V4a2 2 0 0 0-4 0v2M10 10.5V6a2 2 0 0 0-4 0v8a8 8 0 0 0 8 8h2a6 6 0 0 0 6-6v-3a2 2 0 0 0-4 0"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.4 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2Z"/>',
  pin: '<path d="M12 22s8-7 8-12a8 8 0 1 0-16 0c0 5 8 12 8 12Z"/><circle cx="12" cy="10" r="3"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  star: '<path d="M12 2l3 7 7 .5-5.5 4.5 2 7L12 17l-6.5 4 2-7L2 9.5 9 9z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  leaf: '<path d="M11 20A7 7 0 0 1 4 13c0-5 5-9 16-9 0 11-4 16-9 16Z"/><path d="M11 20c0-5 2-9 6-12"/>',
  voice: '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
};

function icon(name, cls = 'icon') {
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.spark}</svg>`;
}

/* ─────────────────────── Shared content sections ──────────────────── */

// The core differentiator — reused prominently across the site.
function differentiator(variant = 'band') {
  const points = [
    { icon: 'home', title: 'No major construction', text: 'We don’t open walls or run new wire. Your home stays your home.' },
    { icon: 'leaf', title: 'No mess', text: 'Clean, careful, tidy work — we leave each space better than we found it.' },
    { icon: 'spark', title: 'No stress', text: 'A sophisticated, modern approach. You relax while we handle everything.' },
  ];
  const cards = points
    .map(
      (p) => `<div class="diff-card">
        ${icon(p.icon, 'icon icon-accent')}
        <h3>${p.title}</h3>
        <p>${p.text}</p>
      </div>`
    )
    .join('');

  return `<section class="section diff-section ${variant === 'band' ? 'diff-band' : ''}" aria-labelledby="diff-h">
    <div class="container">
      <div class="section-head center">
        <span class="eyebrow">The premium difference</span>
        <h2 id="diff-h">Smart home technology, without tearing your home apart</h2>
        <p class="lead">Many companies treat smart home installation like a renovation — opening walls, running wire, and disrupting your home and your life for days. We do the opposite. Cleveland Smart Home Solutions specializes in <strong>clean, simple, elegant installs with minimal impact</strong>.</p>
      </div>
      <div class="diff-grid">${cards}</div>
    </div>
  </section>`;
}

// Tier cards — used on home (compact) and services (full).
function tierCards({ full = false } = {}) {
  return tiers
    .map((t) => {
      const feats = t.features
        .map((f) => `<li>${icon('check', 'icon icon-sm icon-accent')}<span>${esc(f)}</span></li>`)
        .join('');
      return `<article class="tier-card${t.popular ? ' tier-popular' : ''}" id="${t.id}">
        ${t.popular ? '<span class="tier-flag">Most popular</span>' : ''}
        <div class="tier-head">
          <h3 class="tier-name">${esc(t.name)}</h3>
          <p class="tier-headline">${esc(t.headline)}</p>
        </div>
        <p class="tier-summary">${esc(t.summary)}</p>
        ${full ? `<ul class="tier-features">${feats}</ul>` : ''}
        <div class="tier-landlord">
          ${icon('home', 'icon icon-sm')}
          <p><strong>Great for landlords &amp; rentals:</strong> ${esc(t.landlord)}</p>
        </div>
        ${full ? `<p class="tier-price">${esc(t.priceNote)}</p>` : ''}
        <a class="btn ${t.popular ? 'btn-accent' : 'btn-outline'} tier-cta" href="/contact.html?tier=${t.id}">Get a ${esc(t.name)} quote</a>
      </article>`;
    })
    .join('');
}

// Popular installs — a curated highlight of our most-requested upgrades.
// Replaces the old tier cards on the home and location pages, so both share
// the same simple card layout.
const popularInstallIds = [
  'smart-lighting',
  'three-way-switches',
  'smart-thermostats',
  'smart-locks',
  'doorbell-cameras',
  'smart-shades',
];

function popularInstalls({ id, lead } = {}) {
  const cards = popularInstallIds
    .map((id) => keyServices.find((s) => s.id === id))
    .filter(Boolean)
    .map((s) => {
      // The second-switch card is clickable everywhere it appears — it opens
      // the animated before/after explainer modal. The trigger sits at the
      // top of the card.
      if (s.id === 'three-way-switches') {
        return `<article class="service-card service-card-interactive" role="button" tabindex="0"
        data-switch-demo-open aria-haspopup="dialog" aria-controls="switch-demo-modal">
      <span class="service-card-cta">${icon('spark', 'icon icon-sm')} See the before &amp; after</span>
      ${icon(s.icon, 'icon icon-lg icon-accent')}
      <h3>${esc(s.name)}</h3>
      <p>${esc(s.blurb)}</p>
    </article>`;
      }
      return `<article class="service-card">
      ${icon(s.icon, 'icon icon-lg icon-accent')}
      <h3>${esc(s.name)}</h3>
      <p>${esc(s.blurb)}</p>
    </article>`;
    })
    .join('');
  const leadText =
    lead ||
    'No rigid packages — just the upgrades homeowners ask for most. Mix and match what fits your home, and we’ll figure out the best solution for you.';
  return `<section class="section section-soft"${id ? ` id="${id}"` : ''} aria-labelledby="popular-h">
    <div class="container">
      <div class="section-head center">
        <span class="eyebrow">Popular installs</span>
        <h2 id="popular-h">Our most-requested smart upgrades</h2>
        <p class="lead">${esc(leadText)}</p>
      </div>
      <div class="service-grid">${cards}</div>
      <div class="center mt-lg"><a class="btn btn-accent btn-lg" href="/contact.html">Get a Free Quote</a></div>
    </div>
  </section>
  ${switchDemoModal()}`;
}

// Animated before/after explainer for the second-switch upgrade.
// The canvases are driven by the switch-demo code in /js/main.js.
function switchDemoModal() {
  return `<div class="modal-overlay" id="switch-demo-modal" hidden>
    <div class="modal switch-demo" role="dialog" aria-modal="true" aria-labelledby="switch-demo-title">
      <button class="modal-close" type="button" data-switch-demo-close aria-label="Close explainer">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>
      </button>
      <div class="switch-demo-head">
        <span class="eyebrow">A second switch, anywhere</span>
        <h2 id="switch-demo-title">The old way vs. a smart wireless switch</h2>
      </div>
      <div class="switch-demo-grid">
        <figure class="switch-demo-panel switch-demo-before">
          <figcaption class="switch-demo-side-title">Before</figcaption>
          <div class="switch-demo-stage"><canvas class="switch-demo-canvas" data-scene="before" aria-label="Animation: a person walks across the room to reach a single light switch, then walks back."></canvas></div>
          <p class="switch-demo-status" data-status="before" aria-live="polite"></p>
        </figure>
        <figure class="switch-demo-panel switch-demo-after">
          <figcaption class="switch-demo-side-title">After — Smart Switch</figcaption>
          <div class="switch-demo-stage"><canvas class="switch-demo-canvas" data-scene="after" aria-label="Animation: a person taps a smart switch beside them; a wireless signal crosses to the far switch and turns the light off."></canvas></div>
          <p class="switch-demo-status" data-status="after" aria-live="polite"></p>
        </figure>
      </div>
      <div class="switch-demo-actions">
        <button class="btn btn-accent" type="button" data-switch-demo-replay>
          ${icon('spark', 'icon icon-sm')} Replay
        </button>
      </div>
    </div>
  </div>`;
}

// Key services grid.
function serviceGrid() {
  return keyServices
    .map(
      (s) => `<article class="service-card${s.core ? ' service-core' : ''}">
      ${icon(s.icon, 'icon icon-lg icon-accent')}
      <h3>${esc(s.name)}${s.core ? ' <span class="badge">Our specialty</span>' : ''}</h3>
      <p>${esc(s.blurb)}</p>
    </article>`
    )
    .join('');
}

// How it works.
function processSteps() {
  const steps = [
    { n: '01', t: 'Free consultation', d: 'We listen to how you live and what you want — by phone, video, or in your home. No pressure, ever.' },
    { n: '02', t: 'A simple plan', d: 'We design a clean, no-demolition plan and an honest, transparent quote tailored to your home.' },
    { n: '03', t: 'Tidy install day', d: 'We arrive on time, work cleanly, and respect your space like the neighbors we are.' },
    { n: '04', t: 'Walkthrough', d: 'We set up your scenes and app, then walk you through everything until it feels effortless.' },
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
        <h2 id="process-h">From hello to “wow” — without the headache</h2>
      </div>
      <ol class="steps">${items}</ol>
    </div>
  </section>`;
}

// Trust badges row.
function trustRow() {
  const items = [
    { icon: 'pin', t: 'Locally owned', d: 'Based in University Heights' },
    { icon: 'shield', t: 'Licensed &amp; insured', d: 'Protected from start to finish' },
    { icon: 'hand', t: 'Genuine care', d: 'We treat your home like our own' },
    { icon: 'star', t: 'Honest, local pricing', d: 'Fair rates, never an upsell' },
  ];
  return `<section class="trust-row" aria-label="Why homeowners trust us">
    <div class="container trust-grid">
      ${items
        .map(
          (i) => `<div class="trust-item">${icon(i.icon, 'icon icon-accent')}<div><strong>${i.t}</strong><span>${i.d}</span></div></div>`
        )
        .join('')}
    </div>
  </section>`;
}

// Final call-to-action band.
function ctaBand(heading, sub) {
  return `<section class="cta-band" aria-labelledby="cta-h">
    <div class="container cta-inner">
      <div>
        <h2 id="cta-h">${heading}</h2>
        <p>${sub}</p>
      </div>
      <div class="cta-actions">
        <a class="btn btn-accent btn-lg" href="/contact.html">${esc(site.primaryCta.label)}</a>
        <a class="btn btn-ghost btn-lg" href="tel:${site.phoneHref}">${icon('phone', 'icon icon-sm')} ${esc(site.phone)}</a>
      </div>
    </div>
  </section>`;
}

// Review invitation — an honest, confident call for the first reviews
// (used in place of testimonials until real, owner-approved ones arrive).
function reviewInvite({ reviewHref = '/reviews.html#leave-review' } = {}) {
  return `<div class="review-invite">
    ${icon('star', 'icon icon-xl icon-accent')}
    <p class="review-invite-lead">We’d love the chance to earn your trust. Every ${esc(site.name)} install is backed by clean, careful work and genuine care — and your honest feedback helps neighbors across ${esc(site.serviceAreaLabel)} choose with confidence. Contact us today for a free quote.</p>
    <div class="review-invite-actions">
      <a class="btn btn-accent btn-lg" href="/contact.html">Get a Free Quote</a>
      <a class="btn btn-outline" href="${reviewHref}">Leave a Review</a>
    </div>
  </div>`;
}

/* ──────────────────────── JSON-LD schema builders ─────────────────── */

function jsonLdScript(obj) {
  return `<script type="application/ld+json">${JSON.stringify(obj)}</script>`;
}

function localBusinessSchema(extra = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': site.url + '/#business',
    name: site.name,
    legalName: site.legalName,
    slogan: site.tagline,
    url: site.url,
    telephone: site.phone,
    email: site.email,
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
    areaServed: { '@type': 'GeoCircle', name: site.serviceAreaLabel },
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
  differentiator,
  tierCards,
  popularInstalls,
  switchDemoModal,
  serviceGrid,
  processSteps,
  trustRow,
  ctaBand,
  reviewInvite,
  jsonLdScript,
  localBusinessSchema,
  breadcrumbSchema,
  breadcrumbTrail,
};
