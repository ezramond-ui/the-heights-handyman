const { layout, site, esc } = require('../layout');
const C = require('../components');
const { locations } = require('../../data/locations');

module.exports = function serviceAreas() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Service Areas', path: '/service-areas' },
  ];

  const cardFor = (l) =>
    `<li><a class="area-link" href="/areas/${l.slug}" data-name="${esc(l.name.toLowerCase())}">${C.icon('pin', 'icon icon-sm icon-accent')}<span>${esc(l.name)}</span></a></li>`;

  const jsonLd =
    C.jsonLdScript(C.breadcrumbSchema(crumbs)) +
    C.jsonLdScript({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Handyman service areas in the Heights',
      numberOfItems: locations.length,
      itemListElement: locations.map((l, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: `Handyman & POS violation repair in ${l.name}, OH`,
        url: `${site.url}/areas/${l.slug}`,
      })),
    });

  const body = `
  ${C.breadcrumbTrail(crumbs)}
  <section class="page-hero center">
    <div class="container">
      <span class="eyebrow">Service areas</span>
      <h1>Your local handyman across the Heights</h1>
      <p class="lead">${esc(site.name)} serves ${locations.length} communities across ${esc(site.address.regionName)}’s eastside — from our home base in ${esc(site.address.locality)} out through the Heights, the Mayfield Road corridor, and the lakefront. Handyman repairs, small renovations, and point of sale violation corrections. Pick your city for details.</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <ul class="area-list area-list-lg">${locations.map(cardFor).join('')}</ul>
    </div>
  </section>

  ${C.ctaBand('Not sure if you’re in our area?', 'Just ask — call or text us and we’ll let you know right away and get you a free estimate.')}
  `;

  return {
    path: 'service-areas.html',
    html: layout({
      title: `Service Areas | Handyman in South Euclid, Cleveland Heights, Shaker Heights, Euclid & More`,
      description:
        'Handyman repairs & point of sale violation fixes across 11 eastside Cleveland communities — South Euclid, Cleveland Heights, Shaker Heights, Beachwood, Lyndhurst, Euclid, Maple Heights & more. Find your city.',
      path: '/service-areas',
      body,
      jsonLd,
    }),
  };
};
