const { layout, site, esc } = require('../layout');
const C = require('../components');
const R = require('../../data/reviews');

/**
 * Reviews page. Only built when src/data/reviews.js holds real reviews and
 * a Google profile link (see build.js) — so this never ships an empty or
 * fabricated testimonial section.
 *
 * Deliberately NO aggregateRating / Review structured data: Google's rich
 * result guidelines don't allow marking up reviews collected from a third
 * party (including Google itself), and doing it anyway risks a manual
 * action. The reviews are here to convert visitors, not to chase stars in
 * the search results.
 */
module.exports = function reviews() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Reviews', path: '/reviews' },
  ];

  const stars = (n) =>
    `<span class="stars" role="img" aria-label="${n} out of 5 stars">${
      Array.from({ length: n }, () => C.icon('star', 'icon icon-sm star-on')).join('')
    }</span>`;

  const cards = R.reviews
    .map(
      (r) => `<figure class="review-card">
      ${stars(r.rating)}
      <blockquote><p>${esc(r.text)}</p></blockquote>
      <figcaption>
        <span class="review-author">${esc(r.author)}</span>
        <span class="review-meta">${esc(r.date)} · via Google</span>
      </figcaption>
    </figure>`
    )
    .join('');

  const seeMore = `<a class="btn btn-outline btn-lg" href="${esc(R.googleUrl)}" target="_blank" rel="noopener">See all reviews on Google</a>`;

  const jsonLd = C.jsonLdScript(C.breadcrumbSchema(crumbs));

  const body = `
  ${C.breadcrumbTrail(crumbs)}
  <section class="page-hero center">
    <div class="container">
      <span class="eyebrow">${C.icon('star', 'icon icon-sm')} ${esc(R.ratingLabel)}</span>
      <h1>What your neighbors say</h1>
      <p class="lead">Every review below is a real, verified Google review from a ${esc(site.serviceAreaLabel)} homeowner. Read them all on our Google profile — and if we've worked for you, we'd be grateful if you left one.</p>
    </div>
  </section>

  ${C.trustRow()}

  <section class="section">
    <div class="container">
      <div class="review-grid">${cards}</div>
      <div class="center mt-lg review-actions">
        ${seeMore}
        <a class="btn btn-accent btn-lg" href="${esc(R.writeReviewUrl)}" target="_blank" rel="noopener">Leave us a review</a>
      </div>
    </div>
  </section>

  ${C.ctaBand(
    'Ready to get your list done?',
    'Free, honest estimates on repairs, small renovations, and point of sale violations. Call or text us.'
  )}
  `;

  return {
    path: 'reviews.html',
    html: layout({
      title: `Reviews | ${site.name}`,
      description: `Real Google reviews for ${site.name} — handyman repairs, small renovations, and point of sale violation work across ${C.AREA_PHRASE} in ${site.address.regionName}.`,
      path: '/reviews',
      body,
      jsonLd,
      bodyClass: 'page-reviews',
    }),
  };
};
