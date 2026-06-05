const { layout, site, esc } = require('../layout');
const C = require('../components');

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
    description:
      'Custom smart home installation tailored to each home — smart lighting, switches, thermostats, locks, shades and full home automation, with free quotes across NE Ohio.',
  };

  const jsonLd =
    C.jsonLdScript(C.breadcrumbSchema(crumbs)) + C.jsonLdScript(offerCatalog);

  const body = `
  ${C.breadcrumbTrail(crumbs)}
  ${C.popularInstalls({
    lead:
      'The smart upgrades homeowners ask for most — start with a single room or design a whole connected home. Smart lighting is our core focus, and the rest brings your whole home together.',
  })}

  <section class="page-hero services-hero">
    <div class="container services-hero-inner">
      <div class="services-hero-copy">
        <span class="eyebrow">Services</span>
        <h1>Smart home services, installed simply</h1>
        <p class="lead">Everything we do starts with the same promise: a clean, elegant install with <strong>no major construction, no mess, and no stress</strong>. Mix and match the upgrades that fit your home.</p>
      </div>
      <figure class="services-hero-media">
        <img src="/images/smart-switch-install.jpg?v=2" width="1408" height="768"
             alt="Cleveland Smart Home Solutions technician installing a smart light switch with no wall damage" loading="eager" decoding="async">
      </figure>
    </div>
  </section>

  ${C.differentiator('plain')}

  <section class="section section-soft" aria-labelledby="quote-h">
    <div class="container">
      <div class="section-head center">
        <span class="eyebrow">Honest, custom pricing</span>
        <h2 id="quote-h">Every home is different</h2>
        <p class="lead">There’s no one-size-fits-all package here. Tell us about your home and how you’d like to live in it, and we will figure out the best solution for you — honest, transparent, and always free to quote.</p>
        <p class="center mt-lg"><a class="btn btn-accent btn-lg" href="/contact.html">Get a Free Quote</a></p>
      </div>
    </div>
  </section>

  <section class="section section-soft" aria-labelledby="ll-h">
    <div class="container landlord-inner">
      <div class="landlord-copy">
        <span class="eyebrow">Built for landlords, too</span>
        <h2 id="ll-h">Built for rental properties</h2>
        <p>Whatever solution we design gives rental owners remote control, scheduling, and smart management of their properties. Manage one unit or many from a single app.</p>
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
      title: `Smart Home Services | ${site.shortName} Solutions`,
      description:
        'Smart lighting, three-way switches, thermostats, locks, shades & full home automation. Custom solutions tailored to your home, installed with no mess. Free quotes in NE Ohio.',
      path: '/services.html',
      body,
      jsonLd,
    }),
  };
};
