const { layout, site, esc } = require('../layout');
const C = require('../components');

// Human-readable "last updated" date. Bump when the policy changes.
const LAST_UPDATED = 'July 10, 2026';

module.exports = function privacy() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Privacy Policy', path: '/privacy' },
  ];

  const cityList = site.serviceCities.join(', ');
  const location = `${site.address.locality}, ${site.address.regionName}`;

  const jsonLd =
    C.jsonLdScript(C.breadcrumbSchema(crumbs)) +
    C.jsonLdScript({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: `Privacy Policy | ${site.name}`,
      url: site.url + '/privacy',
    });

  const body = `
  ${C.breadcrumbTrail(crumbs)}
  <section class="page-hero center">
    <div class="container">
      <span class="eyebrow">Legal</span>
      <h1>Privacy Policy</h1>
      <p class="lead">How ${esc(site.name)} collects, uses, and protects your information — including your phone number and text-message data.</p>
      <p class="muted">Last updated: ${esc(LAST_UPDATED)}</p>
    </div>
  </section>

  <section class="section">
    <div class="container prose-wide">
      <h2>1. Who we are</h2>
      <p>This Privacy Policy explains how ${esc(site.legalName)}, doing business as ${esc(site.name)} (“we,” “us,” or “our”), handles the information you share with us when you use our website, contact us, or hire us for work across ${esc(cityList)}, ${esc(site.address.regionName)}.</p>

      <h2>2. What data we collect</h2>
      <p>We collect only the information we need to respond to you and do our work. This includes:</p>
      <ul class="check-list">
        <li>${C.icon('check', 'icon icon-sm icon-accent')}<span><strong>Contact details you provide</strong> through our contact form, by phone, or by text — such as your name, email address, phone number, and the city or property address where work is needed.</span></li>
        <li>${C.icon('check', 'icon icon-sm icon-accent')}<span><strong>Project details</strong> you send us, including descriptions, inspection reports, and photos of the work.</span></li>
        <li>${C.icon('check', 'icon icon-sm icon-accent')}<span><strong>Communications</strong> with us, including phone calls and text messages.</span></li>
      </ul>
      <p>We do not knowingly collect information from anyone under 18, and we do not collect sensitive personal information beyond what you choose to share about your project.</p>

      <h2>3. How we use your data</h2>
      <p>We use the information you provide to:</p>
      <ul class="check-list">
        <li>${C.icon('check', 'icon icon-sm icon-accent')}<span>Respond to your inquiries and requests.</span></li>
        <li>${C.icon('check', 'icon icon-sm icon-accent')}<span>Prepare and discuss estimates.</span></li>
        <li>${C.icon('check', 'icon icon-sm icon-accent')}<span>Schedule and perform the work you hire us for.</span></li>
        <li>${C.icon('check', 'icon icon-sm icon-accent')}<span>Communicate with you about your project, including by text message.</span></li>
      </ul>
      <p>We do not sell your personal information.</p>

      <h2>4. SMS / text-message data</h2>
      <p>When you provide your mobile number — by submitting our contact form or by texting our business number at ${esc(site.phone)} — we use it to communicate with you about estimates, scheduling, and your project.</p>
      <p><strong>We do not share or sell your mobile opt-in data or phone number to third parties or affiliates for their marketing or promotional purposes.</strong> Your consent to receive text messages is never shared with third parties for marketing. You can opt out of text messages at any time by replying <strong>STOP</strong>, or text <strong>HELP</strong> for assistance. See our <a href="/terms">Terms of Service</a> for the full SMS terms.</p>

      <h2>5. Third-party services</h2>
      <p>We use a limited number of service providers to operate our business — for example, an email/SMTP provider that delivers contact-form submissions to us, and a text-messaging provider that carries our SMS communications. These providers process your information only to provide their service to us and are not permitted to use it for their own marketing. We do not otherwise share your information with third parties except as required by law or to complete work you have requested (for instance, coordinating with a party involved in your home sale, with your consent).</p>

      <h2>6. Cookies and analytics</h2>
      <p>Our website is intentionally lightweight. We do not use advertising cookies or sell data to advertisers. If we use basic, privacy-respecting analytics to understand general site usage, that data is aggregated and is not used to identify you personally. Your browser settings let you control or block cookies at any time.</p>

      <h2>7. Data retention and deletion</h2>
      <p>We keep your information only as long as needed to respond to you, complete your project, and meet our legal, tax, and record-keeping obligations. After that, we delete or de-identify it. You may request that we delete the personal information we hold about you at any time by contacting us using the details below, and we will do so unless we are required to retain it by law.</p>

      <h2>8. How we protect your data</h2>
      <p>We take reasonable measures to protect the information you share with us against loss, misuse, and unauthorized access. No method of transmission or storage is completely secure, but we limit access to your information to what is necessary to serve you.</p>

      <h2>9. Changes to this policy</h2>
      <p>We may update this Privacy Policy from time to time. The “Last updated” date at the top of this page reflects the most recent revision.</p>

      <h2>10. Contact us about privacy</h2>
      <p>If you have questions about this Privacy Policy or want to request deletion of your information, contact ${esc(site.name)}:</p>
      <ul class="check-list">
        <li>${C.icon('phone', 'icon icon-sm icon-accent')}<span>Call or text: <a href="tel:${site.phoneHref}">${esc(site.phone)}</a></span></li>
        <li>${C.icon('pin', 'icon icon-sm icon-accent')}<span>${esc(location)} — serving ${esc(cityList)}, ${esc(site.address.region)}</span></li>
      </ul>
    </div>
  </section>
  `;

  return {
    path: 'privacy.html',
    html: layout({
      title: `Privacy Policy | ${site.name}`,
      description: `The Privacy Policy for ${site.name} — what we collect, how we use it, and our commitment never to share or sell your mobile opt-in data or phone number for marketing.`,
      path: '/privacy',
      body,
      jsonLd,
    }),
  };
};
