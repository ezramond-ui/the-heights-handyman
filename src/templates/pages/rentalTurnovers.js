const { layout, site, esc } = require('../layout');
const C = require('../components');
const { locations } = require('../../data/locations');

/**
 * Rental property turnovers / make-readies page.
 * Audience: landlords, small investors, and property managers with
 * single-family rentals, duplexes/doubles, and apartment units.
 */
module.exports = function rentalTurnovers() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Rental Turnovers', path: '/rental-turnovers' },
  ];

  const propertyTypes = [
    {
      icon: 'home',
      title: 'Single-family rentals',
      text: 'Full make-readies on rental houses, from a fresh coat of paint to the repairs a new tenant would call you about in week one.',
    },
    {
      icon: 'panel',
      title: 'Duplexes & doubles',
      text: 'Up-and-down and side-by-side doubles are all over the Heights. We turn one unit while the other stays occupied, quietly and cleanly.',
    },
    {
      icon: 'tile',
      title: 'Apartments & multi-unit',
      text: 'Unit turns in small apartment buildings, plus the common-area hallway, stair, and entry fixes that keep a building looking cared for.',
    },
  ];

  const scope = [
    'Interior painting: walls, ceilings, trim, and doors',
    'Drywall patching: nail holes, dents, cracks, and water stains',
    'Flooring repair and replacement, including LVP installs',
    'Tile, grout, and caulk refresh in kitchens and baths',
    'Light fixtures, outlets, switches, GFCIs, and smoke detectors',
    'Doors, locks, hinges, closet doors, and trim carpentry',
    'Cabinet, drawer, and hardware repairs',
    'Handrails, steps, porches, and masonry touch-ups',
    'Rental license and point-of-occupancy inspection repairs',
    'Final punch list so the unit is ready to list and show',
  ];

  const steps = [
    { title: 'Send the unit', text: 'Address, move-out date, and a few photos or a walkthrough. Inspection report too, if the city has one.' },
    { title: 'Get a clear scope', text: 'An itemized estimate for the work, so you know the cost before anything starts.' },
    { title: 'We turn it', text: 'One crew handles the paint, repairs, and punch list together, scheduled around your vacancy window.' },
    { title: 'Ready to rent', text: 'You get a clean, rent-ready unit and photos of the finished work.' },
  ];

  const faqs = [
    {
      q: 'What is a rental turnover?',
      a: 'A turnover (or make-ready) is the work done between one tenant moving out and the next moving in: painting, patching, repairs, fixture swaps, and a final punch list so the unit can be listed and shown.',
    },
    {
      q: 'What kinds of rental properties do you work on?',
      a: 'Single-family rental homes, duplexes and doubles, and units in small apartment buildings. Whether you own one rental or manage a portfolio, the process is the same.',
    },
    {
      q: 'How fast can you turn a unit?',
      a: 'It depends on the scope. A paint-and-patch turn is very different from new flooring and a bathroom refresh. Send us the move-out date and what needs doing, and we will give you a realistic timeline up front and schedule around it.',
    },
    {
      q: 'Do I need to be there?',
      a: 'No. Many owners and managers give us lockbox or key access, and we send photos and updates as the work gets done.',
    },
    {
      q: 'Can you handle the city rental inspection too?',
      a: 'Yes. Several of the cities we serve require a rental license or point-of-occupancy inspection. Send us the report and we will repair the items flagged so the unit passes.',
    },
    {
      q: 'Are you licensed and insured?',
      a: 'Yes. We are licensed, insured, and bonded, with proof of coverage available for you or the owners you work for.',
    },
  ];

  const jsonLd =
    C.jsonLdScript(C.breadcrumbSchema(crumbs)) +
    C.jsonLdScript(C.localBusinessSchema()) +
    C.jsonLdScript({
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: 'Rental property turnover and make-ready services',
      name: 'Rental Property Turnovers',
      provider: { '@id': site.url + '/#business' },
      areaServed: C.AREA_SERVED,
      audience: { '@type': 'BusinessAudience', audienceType: 'Landlords, real estate investors, and property managers' },
      description: `Rental turnover and make-ready repairs for single-family homes, duplexes, and apartments across ${C.AREA_PHRASE} in Ohio.`,
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

  const typeCards = propertyTypes
    .map(
      (t) => `<div class="step">
        ${C.icon(t.icon, 'icon icon-lg icon-accent')}
        <h3>${esc(t.title)}</h3>
        <p>${esc(t.text)}</p>
      </div>`
    )
    .join('');

  const stepItems = steps
    .map(
      (s, i) => `<li class="step">
        <span class="step-num">${String(i + 1).padStart(2, '0')}</span>
        <h3>${esc(s.title)}</h3>
        <p>${esc(s.text)}</p>
      </li>`
    )
    .join('');

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

  const body = `
  ${C.breadcrumbTrail(crumbs)}
  <section class="page-hero">
    <div class="container">
      <span class="eyebrow">${C.icon('home', 'icon icon-sm')} Landlords, investors &amp; property managers</span>
      <h1>Rental Turnovers That Get Units Rented Faster</h1>
      <p class="lead">Every day a unit sits empty costs you rent. ${esc(site.name)} handles the full make-ready between tenants (paint, repairs, flooring, fixtures, and the punch list) for single-family rentals, duplexes, and apartments across ${esc(C.AREA_PHRASE)}.</p>
      <div class="hero-actions">
        ${C.callButton()}
        <a class="btn btn-outline btn-lg" href="${site.primaryCta.href}">${esc(site.primaryCta.label)}</a>
      </div>
      ${C.ctaNote()}
    </div>
  </section>

  ${C.trustRow()}

  <section class="section" aria-labelledby="rt-types-h">
    <div class="container">
      <div class="section-head center">
        <span class="eyebrow">Properties we turn</span>
        <h2 id="rt-types-h">From one rental house to a whole building</h2>
      </div>
      <div class="steps" style="grid-template-columns:repeat(auto-fit,minmax(240px,1fr));">${typeCards}</div>
    </div>
  </section>

  <section class="section section-soft" aria-labelledby="rt-scope-h">
    <div class="container prose-wide">
      <h2 id="rt-scope-h">One crew for the whole make-ready</h2>
      <p>Most turnovers stall because the work is split between a painter, a flooring guy, an electrician, and whoever is free for the small stuff. We cover all of it, so there is one schedule, one invoice, and one person to call.</p>
      <ul class="check-list check-list-2col">
        ${scope.map((s) => `<li>${C.icon('check', 'icon icon-sm icon-accent')}<span>${esc(s)}</span></li>`).join('')}
      </ul>
      <p>Durable, rental-grade finishes are the default: scrubbable paint, tough flooring, and repairs done right the first time, so you are not paying for the same fix after the next tenant.</p>
    </div>
  </section>

  <section class="section" aria-labelledby="rt-steps-h">
    <div class="container">
      <div class="section-head center">
        <span class="eyebrow">How it works</span>
        <h2 id="rt-steps-h">Move-out to rent-ready, without the chasing</h2>
      </div>
      <ol class="steps">${stepItems}</ol>
      <div class="mt-lg">${C.estimateCta({ heading: 'Have a move-out coming up?', sub: 'Send the address and move-out date. We will get you a scope and a timeline so the unit is ready for its next tenant.' })}</div>
    </div>
  </section>

  <section class="section section-soft" aria-labelledby="rt-faq-h">
    <div class="container prose-wide">
      <div class="section-head">
        <span class="eyebrow">Turnover FAQs</span>
        <h2 id="rt-faq-h">Common questions from landlords</h2>
      </div>
      <div class="faq-list">${faqHtml}</div>
      <p class="mt-lg">Managing several properties? See our <a href="/property-managers">property manager services</a> for ongoing portfolio maintenance.</p>
    </div>
  </section>

  <section class="section" aria-labelledby="rt-cities-h">
    <div class="container">
      <div class="section-head center">
        <span class="eyebrow">Where we work</span>
        <h2 id="rt-cities-h">Rental turnovers across the eastside</h2>
      </div>
      <div class="nearby-links">${cityLinks}</div>
    </div>
  </section>

  ${C.ctaBand('Vacant unit? Let\'s get it rented.', 'Call, text, or send us the address. We will get back to you fast with a plan and a price.')}
  `;

  return {
    path: 'rental-turnovers.html',
    html: layout({
      title: `Rental Property Turnovers & Make-Readies | ${site.name}`,
      description:
        'Rental turnover and make-ready services for single-family homes, duplexes, and apartments in South Euclid, University Heights, Cleveland Heights, Beachwood and nearby. Paint, repairs, flooring, and punch lists. Licensed, insured & bonded.',
      path: '/rental-turnovers',
      body,
      jsonLd,
      bodyClass: 'page-pos',
    }),
  };
};
