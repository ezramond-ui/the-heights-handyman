const { layout, site, esc } = require('../layout');
const C = require('../components');
const { tiers, keyServices } = require('../../data/services');

module.exports = function services() {
  const crumbs = [
    { name: 'Home', path: '/index.html' },
    { name: 'Services', path: '/services.html' },
  ];

  const offerCatalog = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Smart home installation',
    provider: { '@id': site.url + '/#business' },
    areaServed: site.serviceAreaLabel,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Smart home packages',
      itemListElement: tiers.map((t) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: `${t.name} — ${t.headline}`, description: t.summary },
      })),
    },
  };

  const jsonLd =
    C.jsonLdScript(C.breadcrumbSchema(crumbs)) + C.jsonLdScript(offerCatalog);

  const body = `
  ${C.breadcrumbTrail(crumbs)}
  <section class="page-hero">
    <div class="container">
      <span class="eyebrow">Services &amp; pricing</span>
      <h1>Smart home services, installed simply</h1>
      <p class="lead">Everything we do starts with the same promise: a clean, elegant install with <strong>no major construction, no mess, and no stress</strong>. Choose a package, or mix and match the services below.</p>
    </div>
  </section>

  ${C.differentiator('plain')}

  <section class="section section-soft" aria-labelledby="tiers-h">
    <div class="container">
      <div class="section-head center">
        <span class="eyebrow">Three tiers, one standard of care</span>
        <h2 id="tiers-h">Find the right fit for your home</h2>
        <p class="lead">Pricing is custom because every home is different. Each quote is honest, transparent, and free — and every tier is also ideal for landlords and rental owners.</p>
      </div>
      <div class="tier-grid">${C.tierCards({ full: true })}</div>
      <p class="center muted mt-lg">Not sure which tier fits? <a href="/contact.html">Tell us about your home</a> and we’ll recommend the right starting point — never an upsell.</p>
    </div>
  </section>

  <section class="section" aria-labelledby="key-h">
    <div class="container">
      <div class="section-head center">
        <span class="eyebrow">Key services</span>
        <h2 id="key-h">What we install</h2>
        <p class="lead">Smart lighting is our core focus — the rest brings your whole home together.</p>
      </div>
      <figure class="section-figure">
        <img src="/images/smart-switch-install.jpg" width="1408" height="768"
             alt="Cleveland Smart Home Solutions technician installing a smart light switch with no wall damage" loading="lazy" decoding="async">
      </figure>
      <div class="service-grid">${C.serviceGrid()}</div>
    </div>
  </section>

  <section class="section section-soft" aria-labelledby="ll-h">
    <div class="container landlord-inner">
      <div class="landlord-copy">
        <span class="eyebrow">Built for landlords, too</span>
        <h2 id="ll-h">Every package works for rental properties</h2>
        <p>Each tier — Essentials, Comfort, and Signature — is designed to give rental owners remote control, scheduling, and smart management of their properties. Manage one unit or many from a single app.</p>
        <a class="btn btn-accent" href="/landlords.html">See landlord solutions</a>
      </div>
      <div class="landlord-card">
        ${C.icon('home', 'icon icon-xl icon-accent')}
        <p class="landlord-stat">Remote-ready</p>
        <p>Control and monitor every property from anywhere — perfect between tenants and during turnovers.</p>
      </div>
    </div>
  </section>

  ${C.processSteps()}

  ${C.ctaBand('Let’s design your smart home', 'Tell us what you’re hoping for. We’ll put together a clean, no-pressure plan and a free quote.')}
  `;

  return {
    path: 'services.html',
    html: layout({
      title: `Smart Home Services & Pricing | ${site.shortName} Solutions`,
      description:
        'Smart lighting, three-way switches, thermostats, locks, shades & full home automation. Three honest packages — Essentials, Comfort & Signature — installed with no mess. Free quotes in NE Ohio.',
      path: '/services.html',
      body,
      jsonLd,
    }),
  };
};
