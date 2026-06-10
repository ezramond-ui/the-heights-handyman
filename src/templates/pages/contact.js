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
  <section class="page-hero">
    <div class="container">
      <span class="eyebrow">Contact us</span>
      <h1>Book your free in-home consult</h1>
      <p class="lead">Tell us a little about your home and what you’re hoping for. We’ll follow up to schedule a free, no-pressure in-home consult — usually within one business day.</p>
    </div>
  </section>

  <section class="section">
    <div class="container contact-grid">
      <div class="contact-form-wrap">
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
              <label for="city">Your city / area</label>
              <input type="text" id="city" name="city" placeholder="e.g. Shaker Heights">
            </div>
          </div>
          <div class="field">
            <label for="tier">I’m interested in</label>
            <select id="tier" name="tier">
              <option value="">Not sure yet — help me decide</option>
              <option value="Smart lighting and switches">Smart lighting &amp; switches</option>
              <option value="Full home automation">Full home automation</option>
              <option value="landlord">Landlord / rental property solutions</option>
              <option value="other">Something else</option>
            </select>
          </div>
          <div class="field">
            <label for="message">How can we help? <span class="req">*</span></label>
            <textarea id="message" name="message" rows="5" required placeholder="Tell us about your home, the rooms you’d like to start with, or any questions you have."></textarea>
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
            <li>${C.icon('spark', 'icon icon-accent')}<div><span class="contact-label">Email</span><a href="mailto:${site.email}">${esc(site.email)}</a></div></li>
            <li>${C.icon('pin', 'icon icon-accent')}<div><span class="contact-label">Based in</span><span>${esc(site.address.locality)}, ${esc(site.address.region)}</span></div></li>
            <li>${C.icon('clock', 'icon icon-accent')}<div><span class="contact-label">Hours</span><span>${esc(site.hours)}</span></div></li>
          </ul>
          <p class="contact-area"><strong>Proudly serving ${esc(site.serviceAreaLabel)}</strong> — and every community in between. <a href="/service-areas.html">See all service areas</a>.</p>
        </div>
        <div class="contact-promise">
          ${C.icon('shield', 'icon icon-lg icon-accent')}
          <p>Locally owned, licensed &amp; insured. Clean installs with no major construction — no mess, no stress.</p>
        </div>
      </aside>
    </div>
  </section>
  `;

  return {
    path: 'contact.html',
    html: layout({
      title: `Contact | Free Smart Home Quote in ${site.serviceAreaLabel}`,
      description:
        'Contact Cleveland Smart Home Solutions for a free, no-pressure smart home quote in Northeast Ohio. Call, email, or send us a message — we typically reply within one business day.',
      path: '/contact.html',
      body,
      jsonLd,
    }),
  };
};
