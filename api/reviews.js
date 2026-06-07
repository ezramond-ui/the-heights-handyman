/**
 * GET /api/reviews — returns the list of published (owner-approved) reviews
 * as JSON for the reviews page to render. Always 200 with an array, even if
 * storage isn't configured, so the page degrades to its review invite.
 */
const store = require('./_lib/reviews-store');

module.exports = async function handler(req, res) {
  let reviews = [];
  try {
    reviews = await store.getReviews();
  } catch (err) {
    console.error('reviews list failed:', err);
  }
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=60');
  res.statusCode = 200;
  return res.end(JSON.stringify({ reviews }));
};
