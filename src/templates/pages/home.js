const { layout, site, esc } = require('../layout');
const C = require('../components');
const testimonials = require('../../data/testimonials');

module.exports = function home() {
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
      serviceType: 'Smart home installation',
      provider: { '@id': site.url + '/#business' },
      areaServed: site.serviceAreaLabel,
      description:
        'Premium smart lighting and home automation installed cleanly, with no major construction or mess.',
    });

  const body = `
  <section class="hero">
    <div class="container hero-inner">
      <div class="hero-copy">
        <span class="eyebrow">${esc(site.serviceAreaLabel)} · Smart home specialists</span>
        <h1>Smart living, <span class="accent-text">done simply.</span></h1>
        <p class="lead">Premium smart lighting and home automation for ${esc(site.serviceAreaLabel)} homeowners — installed cleanly and elegantly, with <strong>no major construction, no mess, and no stress</strong>.</p>
        <div class="hero-actions">
          <a class="btn btn-accent btn-lg" href="${site.primaryCta.href}">${esc(site.primaryCta.label)}</a>
          <a class="btn btn-outline btn-lg" href="${site.secondaryCta.href}">${esc(site.secondaryCta.label)}</a>
        </div>
        <ul class="hero-points">
          <li>${C.icon('check', 'icon icon-sm icon-accent')} No walls opened</li>
          <li>${C.icon('check', 'icon icon-sm icon-accent')} No wires run</li>
          <li>${C.icon('check', 'icon icon-sm icon-accent')} Licensed &amp; insured</li>
        </ul>
      </div>
      <div class="hero-visual">
        <figure class="hero-media">
          <img class="hero-photo" src="/images/thermostat-install.jpg" width="1408" height="768"
               alt="Cleveland Smart Home Solutions technician installing a smart thermostat on a living room wall" loading="eager" decoding="async">
          <div class="hero-card" aria-hidden="true">
            <div class="hero-card-top">
              <span class="dot"></span><span class="dot"></span><span class="dot"></span>
              <span class="hero-card-title">Good Evening</span>
            </div>
            <div class="hero-scene"><span>Living Room</span><span class="hero-toggle on"></span></div>
            <div class="hero-scene"><span>Kitchen</span><span class="hero-toggle on"></span></div>
            <div class="hero-scene dim"><span>Movie Night</span><span class="hero-pill">Tap to start</span></div>
          </div>
        </figure>
      </div>
    </div>
  </section>

  ${C.trustRow()}

  ${C.differentiator('band')}

  <section class="section" aria-labelledby="services-h">
    <div class="container">
      <div class="section-head center">
        <span class="eyebrow">What we do</span>
        <h2 id="services-h">Smart lighting at the core — and so much more</h2>
        <p class="lead">Smart lighting is our specialty, and the foundation of a great smart home. From there, we make every part of your home work together, beautifully.</p>
      </div>
      <div class="service-grid">${C.serviceGrid()}</div>
      <div class="center mt-lg"><a class="btn btn-outline" href="/services.html">See all services &amp; pricing</a></div>
    </div>
  </section>

  <section class="section section-soft" aria-labelledby="tiers-h">
    <div class="container">
      <div class="section-head center">
        <span class="eyebrow">Simple, honest packages</span>
        <h2 id="tiers-h">Three ways to start smart</h2>
        <p class="lead">Whether you’re dipping your toes in or designing a whole-home experience, there’s a tier that fits — and every one is great for landlords, too.</p>
      </div>
      <div class="tier-grid">${C.tierCards({ full: false })}</div>
    </div>
  </section>

  <section class="section landlord-feature" aria-labelledby="ll-h">
    <div class="container landlord-inner">
      <div class="landlord-copy">
        <span class="eyebrow">For landlords &amp; rental owners</span>
        <h2 id="ll-h">Smart management for every property you own</h2>
        <p>Remote control, scheduling, and oversight of your rentals — all from your phone. Add value for tenants, simplify turnovers, and keep an eye on every unit without driving across town.</p>
        <ul class="check-list">
          <li>${C.icon('check', 'icon icon-sm icon-accent')}<span>Remote on/off, dimming, and scheduling between tenants</span></li>
          <li>${C.icon('check', 'icon icon-sm icon-accent')}<span>Smart locks with guest codes for showings and contractors</span></li>
          <li>${C.icon('check', 'icon icon-sm icon-accent')}<span>One dashboard to manage multiple properties</span></li>
        </ul>
        <a class="btn btn-accent" href="/landlords.html">Explore landlord solutions</a>
      </div>
      <div class="landlord-card">
        ${C.icon('home', 'icon icon-xl icon-accent')}
        <p class="landlord-stat">No construction. No mess.</p>
        <p>Clean installs mean less downtime between tenants and no disruptive renovation in occupied units.</p>
      </div>
    </div>
  </section>

  ${C.processSteps()}

  <section class="section section-soft" aria-labelledby="reviews-h">
    <div class="container">
      <div class="section-head center">
        <span class="eyebrow">Loved by neighbors</span>
        <h2 id="reviews-h">What ${esc(site.serviceAreaLabel)} homeowners are saying</h2>
      </div>
      ${C.testimonialCards(testimonials, 3)}
      <div class="center mt-lg"><a class="btn btn-outline" href="/reviews.html">Read more &amp; leave a review</a></div>
    </div>
  </section>

  ${C.ctaBand('Ready for a smarter, simpler home?', 'Get a free, no-pressure quote today. We’ll design a clean install that fits your home and your life.')}
  `;

  return {
    path: 'index.html',
    html: layout({
      title: `${site.name} | Smart Home Installation in ${site.serviceAreaLabel}`,
      description:
        'Premium smart lighting & home automation in Northeast Ohio — installed cleanly with no major construction, no mess, no stress. Locally owned, licensed & insured. Free quotes.',
      path: '/index.html',
      body,
      jsonLd,
      bodyClass: 'page-home',
    }),
  };
};
