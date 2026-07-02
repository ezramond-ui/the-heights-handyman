const { layout, site, esc } = require('../layout');
const C = require('../components');

module.exports = function home() {
  const cities = site.serviceCities.join(' · ');

  const jsonLd =
    C.jsonLdScript({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: site.name,
      url: site.url,
      potentialAction: {
        '@type': 'SearchAction',
        target: site.url + '/service-areas.html?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    }) +
    C.jsonLdScript(C.localBusinessSchema()) +
    C.jsonLdScript({
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: 'Handyman services and point of sale violation repair',
      provider: { '@id': site.url + '/#business' },
      areaServed: site.serviceCities.map((c) => ({ '@type': 'City', name: `${c}, OH` })),
      description: C.SERVICE_SUMMARY,
    });

  const body = `
  <section class="hero">
    <div class="container hero-inner">
      <div class="hero-copy">
        <span class="eyebrow">${esc(site.name)} · ${esc(cities)}</span>
        <h1>Done right. <span class="accent-text">Done clean. Done on time.</span></h1>
        <p class="lead">Your local handyman for repairs, small renovations, and point-of-sale inspection fixes across the Heights. Call or text us for a free estimate.</p>
        <div class="hero-actions">
          <a class="btn btn-accent btn-lg" href="${site.primaryCta.href}">${esc(site.primaryCta.label)}</a>
          ${C.callButton()}
        </div>
        ${C.ctaNote()}
        <ul class="hero-points">
          <li>${C.icon('bolt', 'icon icon-sm icon-accent')} Electrical, drywall, paint &amp; more</li>
          <li>${C.icon('clipboard', 'icon icon-sm icon-accent')} POS violation repairs</li>
          <li>${C.icon('check', 'icon icon-sm icon-accent')} Licensed, insured &amp; bonded</li>
        </ul>
      </div>
      <div class="hero-visual">
        <img class="hero-photo" src="/images/hero-tools.jpg" width="1200" height="800"
             alt="Drill, hammer, paintbrush and fasteners laid out on a workbench, ready for home repairs in the Heights" loading="eager" decoding="async">
      </div>
    </div>
  </section>

  ${C.posBanner()}

  <section class="section" id="services" aria-labelledby="services-h">
    <div class="container">
      <div class="section-head center">
        <span class="eyebrow">What we do</span>
        <h2 id="services-h">One local pro for the whole to-do list</h2>
        <p class="lead">From a single repair to a small renovation — tap a trade to see more.</p>
      </div>
      ${C.serviceTiles()}
      <div class="center mt-lg"><a class="btn btn-outline" href="/services.html">See all services</a></div>
    </div>
  </section>

  ${C.differentiator()}

  ${C.trustRow()}

  <section class="section quote-band" aria-labelledby="quote-band-h">
    <div class="container quote-band-inner">
      <div class="quote-band-copy">
        <span class="eyebrow">Free estimate</span>
        <h2 id="quote-band-h">Tell us what you need</h2>
        <p>Send a couple of details — or just <a href="tel:${site.phoneHref}">call or text ${esc(site.phone)}</a>. We reply fast, usually the same day.</p>
        <ul class="check-list">
          <li>${C.icon('check', 'icon icon-sm icon-accent')}<span>Free, no-pressure estimates</span></li>
          <li>${C.icon('check', 'icon icon-sm icon-accent')}<span>On time and cleaned up when we leave</span></li>
        </ul>
      </div>
      <form id="home-quote-form" class="form quote-band-form" action="/api/contact" method="POST" novalidate>
        <div class="field">
          <label for="hq-name">Name <span class="req">*</span></label>
          <input type="text" id="hq-name" name="name" autocomplete="name" required>
        </div>
        <div class="form-row">
          <div class="field">
            <label for="hq-phone">Phone</label>
            <input type="tel" id="hq-phone" name="phone" autocomplete="tel">
          </div>
          <div class="field">
            <label for="hq-email">Email <span class="req">*</span></label>
            <input type="email" id="hq-email" name="email" autocomplete="email" required>
          </div>
        </div>
        <div class="field">
          <label for="hq-message">What do you need done? <span class="req">*</span></label>
          <textarea id="hq-message" name="message" rows="3" required placeholder="e.g. drywall patch &amp; paint, a failed POS inspection item, or a small bathroom update."></textarea>
        </div>
        <!-- Honeypot anti-spam field: humans never see or fill this. -->
        <div class="hp" aria-hidden="true">
          <label for="hq-company">Company</label>
          <input type="text" id="hq-company" name="company" tabindex="-1" autocomplete="off">
        </div>
        <button type="submit" class="btn btn-accent btn-lg form-submit">Request my free estimate</button>
        <p class="form-status" role="status" aria-live="polite"></p>
        <p class="form-fineprint">By submitting, you agree to be contacted about your request. We never share your information.</p>
      </form>
    </div>
  </section>

  ${C.ctaBand('Ready to knock out your to-do list?', 'Get a free estimate today — or call or text us and we’ll take it from there.')}
  `;

  return {
    path: 'index.html',
    html: layout({
      title: `${site.name} | Handyman & POS Violation Repair in South Euclid, University Heights, Cleveland Heights & Beachwood`,
      description:
        'Local handyman for repairs, small renovations, and point-of-sale (POS) inspection violation repair across South Euclid, University Heights, Cleveland Heights & Beachwood, OH. Licensed, insured & bonded. Call or text us for a free estimate.',
      path: '/index.html',
      body,
      jsonLd,
      bodyClass: 'page-home',
    }),
  };
};
