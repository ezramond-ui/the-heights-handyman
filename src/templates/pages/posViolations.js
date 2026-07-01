const { layout, site, esc } = require('../layout');
const C = require('../components');
const { locations } = require('../../data/locations');

module.exports = function posViolations() {
  const crumbs = [
    { name: 'Home', path: '/index.html' },
    { name: 'POS Violations', path: '/pos-violations.html' },
  ];

  const cityList = site.serviceCities.join(', ');

  const faqs = [
    {
      q: 'What is a point of sale (POS) inspection?',
      a: `Many Ohio cities — including ${cityList} — require a point of sale inspection before a home can be sold. A city inspector walks the property and issues a report listing code violations that must be corrected (or escrowed) before a point of sale certificate is granted and the sale can close.`,
    },
    {
      q: 'Why do homes fail a POS inspection?',
      a: 'Common failures include missing GFCI outlets, ungrounded or double-tapped wiring, handrail and guardrail issues, chipping paint, cracked drywall or plaster, damaged steps and masonry, gaps around windows and doors, and worn flooring. Older Heights homes tend to flag several of these at once.',
    },
    {
      q: 'Which cities do you handle POS violation repairs in?',
      a: `We repair point of sale violations across ${cityList}, Ohio, and correct the specific items on your city inspection report.`,
    },
    {
      q: 'How fast can you complete the repairs before closing?',
      a: 'We prioritize point of sale repairs around your closing date. Send us your inspection report and we’ll give you a quick, honest estimate and a schedule that keeps your sale on track.',
    },
    {
      q: 'Do you handle multiple trades from one report?',
      a: 'Yes. A single inspection report often spans electrical, drywall, paint, carpentry, and masonry. Because we cover all of those trades, one call handles the whole list — no juggling separate contractors.',
    },
  ];

  const jsonLd =
    C.jsonLdScript(C.breadcrumbSchema(crumbs)) +
    C.jsonLdScript(C.localBusinessSchema()) +
    C.jsonLdScript({
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: 'Point of sale inspection violation repair',
      name: 'Point of Sale (POS) Violation Repair',
      provider: { '@id': site.url + '/#business' },
      areaServed: site.serviceCities.map((c) => ({ '@type': 'City', name: `${c}, OH` })),
      description: `Fast point of sale inspection violation repair across ${cityList}, Ohio — electrical, drywall, paint, carpentry, and masonry corrections to help homeowners pass city inspection and get to closing.`,
    }) +
    C.jsonLdScript({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });

  const faqHtml = faqs
    .map(
      (f) => `<details class="faq-item">
      <summary>${esc(f.q)}</summary>
      <div class="faq-answer"><p>${esc(f.a)}</p></div>
    </details>`
    )
    .join('');

  const cityLinks = locations
    .map((l) => `<a href="/areas/${l.slug}.html">${esc(l.name)}</a>`)
    .join('');

  const commonFails = [
    'Missing or non-working GFCI outlets',
    'Ungrounded, double-tapped, or exposed wiring',
    'Missing or loose handrails and guardrails',
    'Chipping or peeling interior/exterior paint',
    'Cracked drywall, plaster, and water damage',
    'Damaged steps, porches, and masonry',
    'Gaps and rot around windows and doors',
    'Worn or unsafe flooring and thresholds',
  ];

  const body = `
  ${C.breadcrumbTrail(crumbs)}
  <section class="page-hero pos-hero">
    <div class="container">
      <span class="eyebrow">${C.icon('clipboard', 'icon icon-sm')} Point of Sale (POS) inspection repairs</span>
      <h1>Point of Sale Violation Repair in ${esc(cityList)}</h1>
      <p class="lead">Failed your city inspection? We’ll get you to closing — <strong>fast</strong>. ${esc(site.name)} repairs the exact point of sale violations inspectors flag across the Heights, so your home sale stays on schedule.</p>
      <div class="hero-actions">
        ${C.callButton()}
        <a class="btn btn-outline btn-lg" href="${site.primaryCta.href}">${esc(site.primaryCta.label)}</a>
      </div>
      ${C.ctaNote()}
    </div>
  </section>

  ${C.trustRow()}

  <section class="section">
    <div class="container prose-wide">
      <h2>What is a point of sale inspection?</h2>
      <p>Before you can sell a home in ${esc(cityList)}, the city sends an inspector to check the property against local housing and safety codes. Anything that doesn’t pass goes on a <strong>point of sale violation report</strong>. Those items generally have to be repaired — or the money escrowed — before the city issues a certificate and your sale can close.</p>
      <p>That puts sellers on a clock. A long list of violations and a looming closing date is exactly the situation we specialize in.</p>

      <h2>Why homes fail — the most common violations</h2>
      <ul class="check-list check-list-2col">
        ${commonFails.map((f) => `<li>${C.icon('check', 'icon icon-sm icon-accent')}<span>${esc(f)}</span></li>`).join('')}
      </ul>

      <h2>How we get you to closing</h2>
      <ul class="check-list">
        <li>${C.icon('clipboard', 'icon icon-sm icon-accent')}<span>Send us your inspection report — we price the whole list at once.</span></li>
        <li>${C.icon('clock', 'icon icon-sm icon-accent')}<span>We schedule around your closing date and work fast.</span></li>
        <li>${C.icon('wrench', 'icon icon-sm icon-accent')}<span>One crew for electrical, drywall, paint, carpentry, and masonry.</span></li>
        <li>${C.icon('check', 'icon icon-sm icon-accent')}<span>Repairs done right and code-compliant, ready for re-inspection.</span></li>
      </ul>

      <div class="mt-lg">${C.estimateCta({ sub: 'Send us a photo of your violation report for a fast, free estimate.' })}</div>
    </div>
  </section>

  <section class="section section-soft" aria-labelledby="pos-faq-h">
    <div class="container prose-wide">
      <div class="section-head">
        <span class="eyebrow">POS inspection FAQs</span>
        <h2 id="pos-faq-h">Point of sale questions, answered</h2>
      </div>
      <div class="faq-list">${faqHtml}</div>
    </div>
  </section>

  <section class="section" aria-labelledby="pos-cities-h">
    <div class="container">
      <div class="section-head center">
        <span class="eyebrow">Where we work</span>
        <h2 id="pos-cities-h">POS violation repair across the Heights</h2>
      </div>
      <div class="nearby-links">${cityLinks}</div>
    </div>
  </section>

  ${C.ctaBand('On a closing deadline?', 'Call or text us with your inspection report and we’ll get your point of sale violations fixed — fast.')}
  `;

  return {
    path: 'pos-violations.html',
    html: layout({
      title: `Point of Sale Violation Repair | Cleveland Heights, University Heights, South Euclid & Beachwood`,
      description:
        'Failed a point of sale inspection in Cleveland Heights, University Heights, South Euclid or Beachwood? We repair POS violations fast — electrical, drywall, paint, carpentry & masonry — so you can pass city inspection and get to closing. Call or text us.',
      path: '/pos-violations.html',
      body,
      jsonLd,
      bodyClass: 'page-pos',
    }),
  };
};
