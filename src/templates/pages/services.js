const { layout, site, esc } = require('../layout');
const C = require('../components');

module.exports = function services() {
  const crumbs = [
    { name: 'Home', path: '/index.html' },
    { name: 'Services', path: '/services.html' },
  ];

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Handyman services and small renovations',
    provider: { '@id': site.url + '/#business' },
    areaServed: site.serviceCities.map((c) => ({ '@type': 'City', name: `${c}, OH` })),
    description: C.SERVICE_SUMMARY,
  };

  const jsonLd =
    C.jsonLdScript(C.breadcrumbSchema(crumbs)) + C.jsonLdScript(serviceSchema);

  const body = `
  ${C.breadcrumbTrail(crumbs)}
  <section class="page-hero services-hero">
    <div class="container services-hero-inner">
      <div class="services-hero-copy">
        <span class="eyebrow">Services</span>
        <h1>One call handles the whole list</h1>
        <p class="lead">Repairs, upgrades, and small renovations across the Heights — done right, done clean, done on time. No job too small.</p>
        <div class="hero-actions">
          <a class="btn btn-accent btn-lg" href="${site.primaryCta.href}">${esc(site.primaryCta.label)}</a>
          ${C.callButton()}
        </div>
        ${C.ctaNote()}
      </div>
      <figure class="services-hero-media">
        <img src="/images/services-tools.jpg" width="600" height="450"
             alt="A tape measure, square, pliers, wrench and drill — the tools behind our Cleveland Heights handyman services" loading="eager" decoding="async">
      </figure>
    </div>
  </section>

  <section class="section" aria-labelledby="trades-h">
    <div class="container">
      <div class="section-head center">
        <span class="eyebrow">Trades we cover</span>
        <h2 id="trades-h">What we do</h2>
        <p class="lead">A skilled local pro across every trade your home needs — including the repairs city inspectors flag at resale.</p>
      </div>
      <div class="trade-grid">${C.serviceDetail()}</div>
      <div class="mt-lg">${C.estimateCta()}</div>
    </div>
  </section>

  <section class="section section-soft" aria-labelledby="pos-h">
    <div class="container pos-callout">
      <div class="pos-callout-copy">
        <span class="eyebrow">Selling your home?</span>
        <h2 id="pos-h">Failed a point-of-sale inspection?</h2>
        <p>Cleveland Heights, University Heights, South Euclid, and Beachwood all require a city inspection before you sell. If yours turned up violations, we fix the exact items on the list and get you to closing — fast.</p>
        <a class="btn btn-accent" href="/pos-violations.html">POS violation repairs</a>
      </div>
      <div class="pos-callout-card">
        ${C.icon('clipboard', 'icon icon-xl icon-accent')}
        <p class="pos-callout-stat">Built for closing deadlines</p>
        <p>We prioritize inspection repairs so a violation letter doesn’t hold up your sale.</p>
      </div>
    </div>
  </section>

  ${C.processSteps()}

  ${C.ctaBand('Let’s get it done', 'Tell us what you need and we’ll get you a free, honest estimate — no pressure.')}
  `;

  return {
    path: 'services.html',
    html: layout({
      title: `Handyman Services in the Heights | ${site.name}`,
      description:
        'Electrical, drywall, painting, tile, masonry, carpentry, flooring, and small renovations across South Euclid, University Heights, Cleveland Heights & Beachwood. Free estimates — call or text us.',
      path: '/services.html',
      body,
      jsonLd,
    }),
  };
};
