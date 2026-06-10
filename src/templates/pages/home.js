const { layout, site, esc } = require('../layout');
const C = require('../components');

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
        <span class="eyebrow">Cleveland Smart Home Solutions · ${esc(site.serviceAreaLabel)}</span>
        <h1>Smart home installation, <span class="accent-text">without tearing your house apart.</span></h1>
        <p class="lead">Premium smart lighting, thermostats, locks, and automation for ${esc(site.serviceAreaLabel)} homeowners — installed cleanly in a single tidy visit. No walls opened, no wires run, no mess.</p>
        <div class="hero-actions">
          <a class="btn btn-accent btn-lg" href="${site.primaryCta.href}">${esc(site.primaryCta.label)}</a>
          <a class="btn btn-outline btn-lg" href="${site.secondaryCta.href}">${esc(site.secondaryCta.label)}</a>
        </div>
        ${C.ctaNote()}
        <ul class="hero-points hero-benefits">
          <li>${C.icon('lock', 'icon icon-sm icon-accent')} Lock up &amp; check your door from anywhere</li>
          <li>${C.icon('bulb', 'icon icon-sm icon-accent')} Every light, one tap — or fully automatic</li>
          <li>${C.icon('thermostat', 'icon icon-sm icon-accent')} Lower bills, year-round comfort</li>
        </ul>
      </div>
      <div class="hero-visual">
        <img class="hero-photo" src="/images/thermostat-install.jpg?v=2" width="1408" height="768"
             alt="Cleveland Smart Home Solutions technician installing a smart thermostat on a living room wall" loading="eager" decoding="async">
      </div>
    </div>
  </section>

  <section class="section quote-band" aria-labelledby="quote-band-h">
    <div class="container quote-band-inner">
      <div class="quote-band-copy">
        <span class="eyebrow">Free in-home consult</span>
        <h2 id="quote-band-h">Tell us about your home</h2>
        <p>Share a couple of details and we’ll follow up to schedule your free, no-pressure consult — usually within one business day.</p>
        <ul class="check-list">
          <li>${C.icon('check', 'icon icon-sm icon-accent')}<span>Honest, transparent advice — never an upsell</span></li>
          <li>${C.icon('check', 'icon icon-sm icon-accent')}<span>Clean installs with no major construction</span></li>
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
          <label for="hq-message">What are you thinking about? <span class="req">*</span></label>
          <textarea id="hq-message" name="message" rows="3" required placeholder="e.g. smart lighting downstairs, a video doorbell, or a whole-home plan."></textarea>
        </div>
        <!-- Honeypot anti-spam field: humans never see or fill this. -->
        <div class="hp" aria-hidden="true">
          <label for="hq-company">Company</label>
          <input type="text" id="hq-company" name="company" tabindex="-1" autocomplete="off">
        </div>
        <button type="submit" class="btn btn-accent btn-lg form-submit">Request my free consult</button>
        <p class="form-status" role="status" aria-live="polite"></p>
        <p class="form-fineprint">By submitting, you agree to be contacted about your request. We never share your information.</p>
      </form>
    </div>
  </section>

  ${C.popularInstalls()}

  ${C.trustRow()}

  ${C.differentiator('band')}

  <section class="section why-section" aria-labelledby="why-h">
    <div class="container why-inner">
      <figure class="why-media">
        <img src="/images/technician-tablet-kitchen.jpg?v=2" width="1408" height="768"
             alt="Cleveland Smart Home Solutions technician setting up a smart home system on a tablet in a client’s kitchen" loading="lazy" decoding="async">
      </figure>
      <div class="why-copy">
        <span class="eyebrow">Why choose us</span>
        <h2 id="why-h">A smart home partner who treats your house like their own</h2>
        <p>We’re local, hands-on, and genuinely invested in getting it right. From the first walkthrough to the final tap on your phone, we design, install, and explain everything until your home simply <em>works</em>.</p>
        <ul class="check-list">
          <li>${C.icon('check', 'icon icon-sm icon-accent')}<span>One specialist from quote to walkthrough — no rotating crews</span></li>
          <li>${C.icon('check', 'icon icon-sm icon-accent')}<span>Tidy, minimal-impact installs and spotless cleanup</span></li>
          <li>${C.icon('check', 'icon icon-sm icon-accent')}<span>We set it up and show you exactly how to use it</span></li>
        </ul>
        <a class="btn btn-accent" href="${site.primaryCta.href}">${esc(site.primaryCta.label)}</a>
      </div>
    </div>
  </section>

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

  ${C.guarantee()}

  ${C.ctaBand('Ready for a smarter, simpler home?', 'Book a free, no-pressure in-home consult today. We’ll design a clean install that fits your home and your life.')}
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
