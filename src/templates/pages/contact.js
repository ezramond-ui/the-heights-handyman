const { layout, site, esc } = require('../layout');
const C = require('../components');

module.exports = function contact() {
  const crumbs = [
    { name: 'Home', path: '/index.html' },
    { name: 'Contact', path: '/contact.html' },
  ];

  const jsonLd =
    C.jsonLdScript(C.breadcrumbSchema(crumbs)) +
    C.jsonLdScript({
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: `Contact ${site.name}`,
      url: site.url + '/contact.html',
    });

  const body = `
  ${C.breadcrumbTrail(crumbs)}
  <section class="page-hero center">
    <div class="container">
      <span class="eyebrow">Contact us</span>
      <h1>Call or text for a free estimate</h1>
      <p class="lead">The fastest way to reach us is by phone. Call or text us — send a photo of the job or your inspection report and we’ll get right back to you.</p>
      <div class="call-hero">
        <a class="btn btn-call btn-xl" href="tel:${site.phoneHref}">${C.icon('phone', 'icon')} ${esc(site.phone)}</a>
        <p class="call-hero-note">Call or text · ${esc(site.hours)}</p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container contact-grid">
      <div class="contact-form-wrap">
        <h2>Prefer to send a message?</h2>
        <p class="muted">Fill this out and we’ll follow up — usually the same day.</p>
        <form id="contact-form" class="form" action="/api/contact" method="POST" novalidate>
          <div class="form-row">
            <div class="field">
              <label for="name">Name <span class="req">*</span></label>
              <input type="text" id="name" name="name" autocomplete="name" required>
            </div>
            <div class="field">
              <label for="phone">Phone</label>
              <input type="tel" id="phone" name="phone" autocomplete="tel">
            </div>
          </div>
          <div class="form-row">
            <div class="field">
              <label for="email">Email <span class="req">*</span></label>
              <input type="email" id="email" name="email" autocomplete="email" required>
            </div>
            <div class="field">
              <label for="city">Your city</label>
              <input type="text" id="city" name="city" placeholder="e.g. Cleveland Heights">
            </div>
          </div>
          <div class="field">
            <label for="tier">What do you need?</label>
            <select id="tier" name="tier">
              <option value="">Not sure yet — help me decide</option>
              <option value="POS / point of sale violation repair">POS / point of sale violation repair</option>
              <option value="Electrical">Electrical</option>
              <option value="Drywall">Drywall</option>
              <option value="Painting">Painting</option>
              <option value="Tile">Tile</option>
              <option value="Masonry">Masonry</option>
              <option value="Carpentry">Carpentry</option>
              <option value="Flooring">Flooring</option>
              <option value="General handyman / small renovation">General handyman / small renovation</option>
            </select>
          </div>
          <div class="field">
            <label for="message">Job details <span class="req">*</span></label>
            <textarea id="message" name="message" rows="5" required placeholder="Tell us what needs doing. Selling your home? Mention your closing date and paste the violations from your inspection report."></textarea>
          </div>
          <!-- Honeypot anti-spam field: humans never see or fill this. -->
          <div class="hp" aria-hidden="true">
            <label for="company">Company</label>
            <input type="text" id="company" name="company" tabindex="-1" autocomplete="off">
          </div>
          <button type="submit" class="btn btn-accent btn-lg form-submit">Send my request</button>
          <p class="form-status" role="status" aria-live="polite"></p>
          <p class="form-fineprint">By submitting, you agree to be contacted about your request. We never share your information.</p>
        </form>
      </div>

      <aside class="contact-aside">
        <div class="contact-card">
          <h2>Reach us directly</h2>
          <ul class="contact-list">
            <li>${C.icon('phone', 'icon icon-accent')}<div><span class="contact-label">Call or text</span><a href="tel:${site.phoneHref}">${esc(site.phone)}</a></div></li>
            <li>${C.icon('pin', 'icon icon-accent')}<div><span class="contact-label">Serving</span><span>${esc(site.serviceCities.join(', '))}, OH</span></div></li>
            <li>${C.icon('clock', 'icon icon-accent')}<div><span class="contact-label">Hours</span><span>${esc(site.hours)}</span></div></li>
          </ul>
          <p class="contact-area"><a href="/service-areas.html">See all service areas</a>.</p>
        </div>
        <div class="contact-promise">
          ${C.icon('shield', 'icon icon-lg icon-accent')}
          <p>Licensed, insured &amp; bonded. Done right, done clean, done on time.</p>
        </div>
      </aside>
    </div>
  </section>
  `;

  return {
    path: 'contact.html',
    html: layout({
      title: `Contact | Free Handyman Estimate in the Heights | ${site.name}`,
      description:
        'Call or text (216) 284-9433 for a free handyman estimate across South Euclid, University Heights, Cleveland Heights & Beachwood — including fast point of sale violation repairs. Licensed, insured & bonded.',
      path: '/contact.html',
      body,
      jsonLd,
    }),
  };
};
