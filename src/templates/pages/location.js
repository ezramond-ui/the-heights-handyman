const { layout, site, esc } = require('../layout');
const C = require('../components');
const { locations } = require('../../data/locations');
const { keyServices } = require('../../data/services');

// A few intro phrasings, chosen by index, so pages don't share identical
// sentence structure even though every page also has unique local detail.
const introTemplates = [
  (l) =>
    `Looking for a smarter home in ${l.name}? Cleveland Smart Home Solutions brings premium smart lighting and home automation to ${l.name}, ${l.county} County — installed cleanly, with no major construction and no mess.`,
  (l) =>
    `${l.name} is ${l.character} It deserves smart home technology installed with the same care — which is exactly what we do: elegant, minimal-impact upgrades with no walls opened and no wires run.`,
  (l) =>
    `${l.name} homeowners trust Cleveland Smart Home Solutions for clean, sophisticated smart home installs. We make ${l.name} homes smarter without the disruption of traditional installations — no demolition, no mess, no stress.`,
  (l) =>
    `Bringing premium smart home technology to ${l.name}, ${site.serviceAreaLabel}. From smart lighting to whole-home automation, we deliver a premium experience to ${l.name} at honest, local prices — and we keep your home spotless while we do it.`,
];

function locationFaq(l) {
  return [
    {
      q: `Do you install smart home systems in ${l.name}?`,
      a: `Yes — ${l.name} is part of our core service area in ${site.serviceAreaLabel}. We install smart lighting, three-way switches, thermostats, locks, shades, doorbell cameras, and full home automation throughout ${l.name} and ${l.county} County.`,
    },
    {
      q: `Will installation damage my ${l.name} home?`,
      a: `No. Unlike companies that open walls and run new wire, we specialize in clean, minimal-impact installs. With ${l.homes.replace(/\.$/, '')}, that careful approach protects your home’s character — no major construction, no mess, no stress.`,
    },
    {
      q: `Do you work with landlords and rental properties in ${l.name}?`,
      a: `Absolutely. Everything we install is ideal for ${l.name} landlords and rental owners who want remote control, scheduling, and smart management of their properties — all from a single app, with minimal disruption to occupied units.`,
    },
    {
      q: `How much does a smart home install in ${l.name} cost?`,
      a: `Every quote is custom and free. Pricing depends on the size of your home and the upgrades you choose. We’ll give you an honest, transparent recommendation with no pressure and no upsell.`,
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
      serviceType: 'Smart home installation',
      name: `Smart Home Installation in ${l.name}, OH`,
      provider: { '@id': site.url + '/#business' },
      areaServed: { '@type': 'City', name: `${l.name}, OH` },
      description: `Smart lighting and home automation in ${l.name}, ${l.county} County — clean, premium installs with no major construction.`,
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

  // A focused services list for the location page.
  const svcItems = keyServices
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

  const placeWord = l.type === 'neighborhood' ? 'neighborhood' : 'community';

  const body = `
  ${C.breadcrumbTrail(crumbs)}
  <section class="page-hero loc-hero">
    <div class="container">
      <span class="eyebrow">${C.icon('pin', 'icon icon-sm')} Smart home installation · ${esc(l.name)}, OH</span>
      <h1>Smart Home Installation in ${esc(l.name)}, Ohio</h1>
      <p class="lead">${esc(intro)}</p>
      <div class="hero-actions">
        <a class="btn btn-accent btn-lg" href="/contact.html?city=${encodeURIComponent(l.name)}">Book a free ${esc(l.name)} consult</a>
        <a class="btn btn-outline btn-lg" href="tel:${site.phoneHref}">${C.icon('phone', 'icon icon-sm')} ${esc(site.phone)}</a>
      </div>
    </div>
  </section>

  ${C.trustRow()}

  <section class="section">
    <div class="container prose-wide loc-body">
      <h2>Premium smart home technology for ${esc(l.name)} homeowners</h2>
      <p>${esc(l.name)} is ${esc(l.character)} The homes here — ${esc(l.homes)} — are exactly why our approach fits so well. We bring a sophisticated, modern way to make your home smart: <strong>clean, simple, elegant installs with minimal impact</strong>. No opening walls. No running new wire. No construction-zone chaos in your living room.</p>
      <p>Smart lighting is our specialty and the heart of a great smart home in ${esc(l.name)}. From a few smart switches to whole-home scenes like “Movie Night” and “Good Morning,” we design a system that fits how you actually live — and we walk you through every bit of it until it feels effortless.</p>

      <h2>Smart home services we offer in ${esc(l.name)}</h2>
      <ul class="loc-services">${svcItems}</ul>

      <h2>Landlords &amp; rental owners in ${esc(l.name)}</h2>
      <p>Own a rental ${placeWord === 'neighborhood' ? 'in the ' + esc(l.name) + ' neighborhood' : 'in ' + esc(l.name)}? Everything we install is ideal for landlords who want remote control and smart management of their properties. Adjust lighting and schedules between tenants, issue smart-lock codes for showings, and oversee multiple units from one app — all installed with minimal disruption to occupied units. <a href="/landlords.html">See our landlord solutions →</a></p>
    </div>
  </section>

  ${C.popularInstalls()}

  ${C.differentiator('band')}

  <section class="section" aria-labelledby="faq-h">
    <div class="container prose-wide">
      <div class="section-head">
        <span class="eyebrow">Questions from ${esc(l.name)}</span>
        <h2 id="faq-h">Smart home FAQs for ${esc(l.name)}, OH</h2>
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
    `Ready for a smarter home in ${esc(l.name)}?`,
    `Get a free, no-pressure quote for your ${esc(l.name)} home. Clean install, honest price, zero hassle.`
  )}
  `;

  return {
    path: `areas/${slug}.html`,
    html: layout({
      title: `Smart Home Installation in ${l.name}, OH | ${site.shortName}`,
      description: `Premium smart lighting & home automation in ${l.name}, ${l.county} County, OH. Clean installs — no construction, no mess. Locally owned, licensed & insured. Free ${l.name} quotes.`,
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
