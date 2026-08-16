const { layout, site, esc } = require('../layout');
const C = require('../components');
const { locations } = require('../../data/locations');

module.exports = function propertyManagers() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Property Managers', path: '/property-managers' },
  ];

  const faqs = [
    {
      q: 'Do you work with property management companies and landlords?',
      a: `Yes — we already work with property managers and portfolio owners across ${C.AREA_PHRASE}. We're set up to be the one call that handles maintenance across your whole portfolio, not just a single address.`,
    },
    {
      q: 'Can you handle rental license or point-of-sale inspection repairs?',
      a: 'Yes. Many of the cities we serve require a rental license, a point-of-occupancy inspection, or a point-of-sale inspection before a unit can be rented or sold. Send us the address and the inspection report (if there is one) and we\'ll repair the exact items flagged so it passes re-inspection.',
    },
    {
      q: 'Can you turn around a vacant unit between tenants?',
      a: "Yes. Tell us the move-out date and what needs to happen before the next tenant moves in — paint, drywall, flooring, fixtures, punch-list items — and we'll schedule around your turnover window so the unit doesn't sit vacant longer than it has to.",
    },
    {
      q: 'How does billing work across multiple properties?',
      a: "We can set up simple, itemized invoicing that's easy to track across a portfolio. Contact us and we'll work out what fits how you manage your properties.",
    },
    {
      q: 'Are you licensed, insured, and bonded?',
      a: 'Yes — licensed, insured, and bonded, with proof of coverage available on request. That matters when you\'re bringing in a contractor on behalf of an owner or company you answer to.',
    },
  ];

  const jsonLd =
    C.jsonLdScript(C.breadcrumbSchema(crumbs)) +
    C.jsonLdScript(C.localBusinessSchema()) +
    C.jsonLdScript({
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: 'Property management maintenance and rental turnover repair',
      name: 'Property Manager & Landlord Maintenance Services',
      provider: { '@id': site.url + '/#business' },
      areaServed: C.AREA_SERVED,
      audience: { '@type': 'BusinessAudience', audienceType: 'Property managers and landlords' },
      description: `Maintenance, tenant turnover repair, and rental/point-of-sale inspection compliance for property managers and landlords across ${C.AREA_PHRASE} in Ohio.`,
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
    .map((l) => `<a href="/areas/${l.slug}">${esc(l.name)}</a>`)
    .join('');

  const whyUs = [
    'One point of contact for every property in your portfolio — no juggling separate contractors per address.',
    'Rental license, point-of-occupancy, and point-of-sale inspection repair experience.',
    'Fast turnaround on vacant-unit make-readies, scheduled around your move-out and move-in dates.',
    'Licensed, insured, and bonded, with documentation available for the owners or companies you report to.',
    'Straightforward, itemized pricing that\'s easy to track across multiple properties.',
    'Electrical, drywall, paint, tile, masonry, carpentry, and flooring — one crew for the whole punch list.',
  ];

  const body = `
  ${C.breadcrumbTrail(crumbs)}
  <section class="page-hero">
    <div class="container">
      <span class="eyebrow">${C.icon('clipboard', 'icon icon-sm')} Property managers &amp; landlords</span>
      <h1>One Handyman for Your Whole Portfolio</h1>
      <p class="lead">${esc(site.name)} handles tenant turnover repairs, rental and inspection compliance, and general maintenance for property managers and landlords across ${esc(C.AREA_PHRASE)}.</p>
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
      <h2>Why property managers and landlords call us</h2>
      <ul class="check-list check-list-2col">
        ${whyUs.map((f) => `<li>${C.icon('check', 'icon icon-sm icon-accent')}<span>${esc(f)}</span></li>`).join('')}
      </ul>

      <h2>Turnovers, make-readies &amp; rental inspection repairs</h2>
      <p>Between tenants, we handle the full punch list — paint, drywall, flooring, fixtures, and the small repairs that hold up a unit turning back over. If a property needs to pass a rental license, point-of-occupancy, or point-of-sale inspection, send us the report and we'll repair the exact items flagged so it clears re-inspection.</p>
      <p>One call covers general portfolio maintenance too — routine repairs and small renovations across every property you manage, not just one address at a time.</p>

      <div class="mt-lg">${C.estimateCta({ heading: 'Managing more than one property?', sub: 'Tell us how many properties and what\'s on the list — we\'ll work out a schedule and pricing that fits your portfolio.' })}</div>
    </div>
  </section>

  <section class="section section-soft" aria-labelledby="pm-faq-h">
    <div class="container prose-wide">
      <div class="section-head">
        <span class="eyebrow">Property manager FAQs</span>
        <h2 id="pm-faq-h">Common questions from property managers</h2>
      </div>
      <div class="faq-list">${faqHtml}</div>
    </div>
  </section>

  <section class="section" aria-labelledby="pm-cities-h">
    <div class="container">
      <div class="section-head center">
        <span class="eyebrow">Where we work</span>
        <h2 id="pm-cities-h">Portfolio &amp; rental maintenance across the Heights</h2>
      </div>
      <div class="nearby-links">${cityLinks}</div>
    </div>
  </section>

  ${C.ctaBand('Have a unit or a whole portfolio that needs attention?', 'Call, text, or send us your property list — we\'ll get back to you fast with a plan.')}
  `;

  return {
    path: 'property-managers.html',
    html: layout({
      title: `Property Manager & Landlord Maintenance Services | ${site.name}`,
      description:
        'Maintenance, tenant turnover repair, and rental license / point-of-sale inspection compliance for property managers and landlords across the Heights and surrounding Cleveland-area communities. Licensed, insured & bonded.',
      path: '/property-managers',
      body,
      jsonLd,
      bodyClass: 'page-pos',
    }),
  };
};
