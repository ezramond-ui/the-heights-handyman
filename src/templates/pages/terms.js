const { layout, site, esc } = require('../layout');
const C = require('../components');

// Human-readable "last updated" date. Bump when the terms change.
const LAST_UPDATED = 'July 10, 2026';

module.exports = function terms() {
  const crumbs = [
    { name: 'Home', path: '/index.html' },
    { name: 'Terms of Service', path: '/terms.html' },
  ];

  const cityList = site.serviceCities.join(', ');
  const location = `${site.address.locality}, ${site.address.regionName}`;

  const jsonLd =
    C.jsonLdScript(C.breadcrumbSchema(crumbs)) +
    C.jsonLdScript({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: `Terms of Service | ${site.name}`,
      url: site.url + '/terms.html',
    });

  const body = `
  ${C.breadcrumbTrail(crumbs)}
  <section class="page-hero center">
    <div class="container">
      <span class="eyebrow">Legal</span>
      <h1>Terms of Service</h1>
      <p class="lead">The terms below govern your use of ${esc(site.name)}’s website, services, and text-message communications.</p>
      <p class="muted">Last updated: ${esc(LAST_UPDATED)}</p>
    </div>
  </section>

  <section class="section">
    <div class="container prose-wide">
      <h2>1. Acceptance of terms</h2>
      <p>These Terms of Service (“Terms”) are an agreement between you and ${esc(site.legalName)}, doing business as ${esc(site.name)} (“we,” “us,” or “our”). By using our website, contacting us, requesting an estimate, hiring us for work, or opting in to text-message communications, you agree to these Terms. If you do not agree, please do not use our services.</p>

      <h2>2. Description of services</h2>
      <p>${esc(site.name)} provides residential handyman and small renovation services across ${esc(cityList)}, ${esc(site.address.regionName)}. Our work includes, but is not limited to:</p>
      <ul class="check-list">
        <li>${C.icon('check', 'icon icon-sm icon-accent')}<span>General handyman repairs and small renovations.</span></li>
        <li>${C.icon('check', 'icon icon-sm icon-accent')}<span>Point of sale (POS) inspection violation corrections to help homeowners pass city inspection and get to closing.</span></li>
        <li>${C.icon('check', 'icon icon-sm icon-accent')}<span>Skilled-trade repairs including electrical, drywall, painting, tile, masonry, carpentry, and flooring.</span></li>
      </ul>
      <p>We are licensed, insured, and bonded. The specific scope of any project is defined by the estimate and any written agreement for that project.</p>

      <h2>3. Estimates and scheduling</h2>
      <p>We provide free estimates for prospective work. An estimate is a good-faith projection of cost and scope based on the information available to us at the time. <strong>Estimates are not binding contracts.</strong> A project becomes a confirmed engagement only when both parties agree to proceed, at which point the confirmed scope and price apply. Actual costs may change if the scope of work changes, if conditions differ from those described or observed, or if unforeseen issues are discovered once work begins. We will discuss any such changes with you before proceeding.</p>
      <p>Scheduling is arranged by mutual agreement. While we prioritize time-sensitive work such as point of sale violation repairs around closing deadlines, we cannot guarantee specific completion dates unless expressly agreed to in writing.</p>

      <h2>4. SMS / text-message terms</h2>
      <p>We use text messaging to communicate with customers about estimates, scheduling, and their projects. By providing your mobile number, you agree to the following:</p>
      <ul class="check-list">
        <li>${C.icon('check', 'icon icon-sm icon-accent')}<span><strong>Opt-in.</strong> You consent to receive text messages from us when you submit our contact form with a phone number, or when you text our business number at ${esc(site.phone)}.</span></li>
        <li>${C.icon('check', 'icon icon-sm icon-accent')}<span><strong>Message frequency.</strong> Message frequency varies based on your project and communications with us.</span></li>
        <li>${C.icon('check', 'icon icon-sm icon-accent')}<span><strong>Rates.</strong> Message and data rates may apply, depending on your mobile carrier and plan.</span></li>
        <li>${C.icon('check', 'icon icon-sm icon-accent')}<span><strong>Help.</strong> Text <strong>HELP</strong> to ${esc(site.phone)} for assistance, or contact us using the details below.</span></li>
        <li>${C.icon('check', 'icon icon-sm icon-accent')}<span><strong>Opt-out.</strong> You can cancel text messages at any time by texting <strong>STOP</strong> to ${esc(site.phone)}. After you opt out, we will not send you further text messages unless you opt in again.</span></li>
        <li>${C.icon('check', 'icon icon-sm icon-accent')}<span><strong>Privacy.</strong> We do not share mobile opt-in data or consent with third parties for their marketing purposes. See our <a href="/privacy.html">Privacy Policy</a> for details.</span></li>
      </ul>

      <h2>5. Payment terms</h2>
      <p>We accept <strong>cash, credit and debit cards, and digital payments such as Zelle, Venmo, and Cash App</strong>. The payment methods and amounts that apply to your project are confirmed with your estimate or written agreement.</p>
      <p>For most small jobs, <strong>payment in full is due upon completion of the work</strong>. For larger projects — or those requiring us to purchase significant materials up front — we may require a <strong>deposit before work begins</strong>, with the remaining balance due on completion. Any deposit and its amount will be agreed with you in advance as part of your confirmed estimate. If the scope of a project changes, the final amount due will reflect the revised scope as discussed with you.</p>

      <h2>6. Limitation of liability</h2>
      <p>We perform our work with reasonable care and skill. To the fullest extent permitted by law, ${esc(site.name)} and ${esc(site.legalName)} shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or for any loss of profits, revenue, or data, arising out of or related to our services or your use of this website. Our total liability for any claim arising out of a project shall not exceed the amount you paid us for that project. Nothing in these Terms limits any liability that cannot lawfully be limited, including liability for personal injury caused by negligence. This section does not affect any warranty expressly provided in a written agreement for a specific project.</p>

      <h2>7. Governing law</h2>
      <p>These Terms are governed by the laws of the State of ${esc(site.address.regionName)}, without regard to its conflict-of-law provisions. Any dispute arising out of or relating to these Terms or our services shall be subject to the exclusive jurisdiction of the state and federal courts located in ${esc(site.address.regionName)}.</p>

      <h2>8. Changes to these terms</h2>
      <p>We may update these Terms from time to time. The “Last updated” date at the top of this page reflects the most recent revision. Your continued use of our website or services after changes are posted constitutes acceptance of the revised Terms.</p>

      <h2>9. Contact us</h2>
      <p>If you have questions about these Terms, contact ${esc(site.name)}:</p>
      <ul class="check-list">
        <li>${C.icon('phone', 'icon icon-sm icon-accent')}<span>Call or text: <a href="tel:${site.phoneHref}">${esc(site.phone)}</a></span></li>
        <li>${C.icon('pin', 'icon icon-sm icon-accent')}<span>${esc(location)} — serving ${esc(cityList)}, ${esc(site.address.region)}</span></li>
      </ul>
    </div>
  </section>
  `;

  return {
    path: 'terms.html',
    html: layout({
      title: `Terms of Service | ${site.name}`,
      description: `The Terms of Service for ${site.name}, including service, estimate, payment, and SMS/text-messaging terms for customers across ${cityList}, Ohio.`,
      path: '/terms.html',
      body,
      jsonLd,
    }),
  };
};
