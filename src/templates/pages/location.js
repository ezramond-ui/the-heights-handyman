const { layout, site, esc } = require('../layout');
const C = require('../components');
const { locations } = require('../../data/locations');
const { categories } = require('../../data/services');

// A few intro phrasings, chosen by index, so pages don't share identical
// sentence structure even though every page also has unique local detail.
const introTemplates = [
  (l) =>
    `Need a handyman in ${l.name}? ${site.name} handles repairs, small renovations, and point of sale inspection violations across ${l.name}, ${l.county} County — done right, done clean, done on time.`,
  (l) =>
    `${l.name} is ${l.character} We keep those homes in great shape with skilled, code-compliant handyman work — and we fix the exact items city inspectors flag before a sale.`,
  (l) =>
    `${l.name} homeowners call ${site.name} for reliable repairs and fast point of sale violation corrections. One local pro for electrical, drywall, paint, tile, masonry, carpentry, and flooring.`,
  (l) =>
    `Bringing dependable handyman service and point of sale repair to ${l.name}, Ohio. From a quick fix to a small renovation — or a failed city inspection — we get it done and keep your home clean.`,
];

function locationFaq(l) {
  return [
    {
      q: `Do you offer handyman services in ${l.name}?`,
      a: `Yes — ${l.name} is part of our core service area. We handle electrical, drywall, painting, tile, masonry, carpentry, flooring, and general repairs and small renovations throughout ${l.name} and ${l.county} County.`,
    },
    {
      q: `Can you fix point of sale (POS) inspection violations in ${l.name}?`,
      a: `Absolutely. ${l.name} requires a point of sale inspection before a home sells, and we specialize in correcting the violations on that report — fast — so you can pass re-inspection and get to closing on time.`,
    },
    {
      q: `Are you licensed, insured, and bonded?`,
      a: `Yes. ${site.name} is licensed, insured, and bonded. We treat every ${l.name} home with care and leave each space cleaner than we found it.`,
    },
    {
      q: `How much does a repair in ${l.name} cost?`,
      a: `Every estimate is free and honest. Pricing depends on the scope of the work — call or text us at ${site.phone}, or send a photo of the job, and we’ll get you a fast quote.`,
    },
  ];
}

function renderLocation(l, index) {
  const slug = l.slug;
  const path = `/areas/${slug}.html`;
  const intro = introTemplates[index % introTemplates.length](l);
  const nearby = l.nearby || [];

  // Match nearby names to real location pages for internal linking.
  const nearbyLinks = nearby
    .map((n) => {
      const match = locations.find((x) => x.name.toLowerCase() === n.toLowerCase());
      return match
        ? `<a href="/areas/${match.slug}.html">${esc(match.name)}</a>`
        : `<span>${esc(n)}</span>`;
    })
    .join('');

  const crumbs = [
    { name: 'Home', path: '/index.html' },
    { name: 'Service Areas', path: '/service-areas.html' },
    { name: l.name, path },
  ];

  const faqs = locationFaq(l);

  const jsonLd =
    C.jsonLdScript(C.breadcrumbSchema(crumbs)) +
    C.jsonLdScript(
      C.localBusinessSchema({
        name: `${site.name} — ${l.name}`,
        areaServed: {
          '@type': 'City',
          name: `${l.name}, OH`,
          containedInPlace: { '@type': 'AdministrativeArea', name: `${l.county} County, Ohio` },
        },
      })
    ) +
    C.jsonLdScript({
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: 'Handyman services and point of sale violation repair',
      name: `Handyman & POS Violation Repair in ${l.name}, OH`,
      provider: { '@id': site.url + '/#business' },
      areaServed: { '@type': 'City', name: `${l.name}, OH` },
      description: `Handyman repairs, small renovations, and point of sale inspection violation corrections in ${l.name}, ${l.county} County, Ohio.`,
    }) +
    C.jsonLdScript({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });

  // A focused trades list for the location page.
  const svcItems = categories
    .map(
      (s) =>
        `<li>${C.icon(s.icon, 'icon icon-sm icon-accent')}<span>${esc(s.name)}</span></li>`
    )
    .join('');

  const faqHtml = faqs
    .map(
      (f) => `<details class="faq-item">
      <summary>${esc(f.q)}</summary>
      <div class="faq-answer"><p>${esc(f.a)}</p></div>
    </details>`
    )
    .join('');

  const body = `
  ${C.breadcrumbTrail(crumbs)}
  <section class="page-hero loc-hero">
    <div class="container">
      <span class="eyebrow">${C.icon('pin', 'icon icon-sm')} Handyman &amp; POS repair · ${esc(l.name)}, OH</span>
      <h1>Handyman &amp; POS Violation Repair in ${esc(l.name)}, Ohio</h1>
      <p class="lead">${esc(intro)}</p>
      <div class="hero-actions">
        ${C.callButton()}
        <a class="btn btn-outline btn-lg" href="/contact.html?city=${encodeURIComponent(l.name)}">Get a free ${esc(l.name)} estimate</a>
      </div>
    </div>
  </section>

  ${C.trustRow()}

  <section class="section">
    <div class="container prose-wide loc-body">
      <h2>Your handyman in ${esc(l.name)}</h2>
      <p>${esc(l.name)} is ${esc(l.character)} The homes here — ${esc(l.homes)} That’s exactly the kind of work we do best: skilled, code-compliant repairs, done clean and on time. From a single fix to a small renovation, one local pro handles the whole list.</p>

      <h2>Point of sale violation repair in ${esc(l.name)}</h2>
      <p>Selling in ${esc(l.name)}? The city’s point of sale inspection has to pass before you close. Send us your violation report and we’ll correct the flagged items — electrical, drywall, paint, carpentry, and masonry — fast enough to keep your closing date. <a href="/pos-violations.html">Learn more about POS violation repair →</a></p>

      <h2>Handyman services we offer in ${esc(l.name)}</h2>
      <ul class="loc-services">${svcItems}</ul>
    </div>
  </section>

  <section class="section section-soft">
    <div class="container">${C.estimateCta({ heading: `Get a free estimate in ${l.name}`, sub: `Call or text us at ${site.phone} — send a photo of the job for a fast quote.` })}</div>
  </section>

  <section class="section" aria-labelledby="faq-h">
    <div class="container prose-wide">
      <div class="section-head">
        <span class="eyebrow">Questions from ${esc(l.name)}</span>
        <h2 id="faq-h">Handyman &amp; POS FAQs for ${esc(l.name)}, OH</h2>
      </div>
      <div class="faq-list">${faqHtml}</div>
    </div>
  </section>

  ${
    nearbyLinks
      ? `<section class="section section-soft nearby-section" aria-labelledby="near-h">
    <div class="container">
      <h2 id="near-h" class="center">We also serve communities near ${esc(l.name)}</h2>
      <div class="nearby-links">${nearbyLinks}</div>
      <p class="center mt-md"><a class="btn btn-outline" href="/service-areas.html">View all service areas</a></p>
    </div>
  </section>`
      : ''
  }

  ${C.ctaBand(
    `Need a hand in ${l.name}?`,
    `Get a free, honest estimate for your ${l.name} home — repairs, renovations, or a failed inspection. Call or text us.`
  )}
  `;

  return {
    path: `areas/${slug}.html`,
    html: layout({
      title: `Handyman & POS Violation Repair in ${l.name}, OH | ${site.name}`,
      description: `Handyman services, small renovations & point of sale inspection violation repair in ${l.name}, ${l.county} County, OH. Licensed, insured & bonded. Call or text us for a free ${l.name} estimate.`,
      path,
      body,
      jsonLd,
      bodyClass: 'page-location',
    }),
  };
}

module.exports = function locationPages() {
  return locations.map((l, i) => renderLocation(l, i));
};
