/**
 * Real Google reviews, transcribed from the Google Business Profile.
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │  NEVER invent an entry in this file.                                 │
 * │  Every review below is attributed to a real, named person and is     │
 * │  presented to customers as their words. Made-up reviews are both     │
 * │  deceptive and, for a business soliciting work, legally risky.       │
 * │  Only transcribe what actually appears on the Google profile.        │
 * └─────────────────────────────────────────────────────────────────────┘
 *
 * The whole reviews feature is gated on this file having content:
 * while `reviews` is empty, the /reviews page is not built, the nav link
 * is hidden, it stays out of the sitemap, and the homepage rating badge
 * does not render. Fill it in and everything switches on automatically.
 *
 *   author – reviewer's display name exactly as Google shows it
 *   rating – integer 1–5
 *   date   – 'Month YYYY' as shown on the profile
 *   text   – the review, verbatim. Trim with an ellipsis if very long,
 *            but never reword.
 */

/**
 * Public link to the Google Business Profile — the "See all reviews on
 * Google" button. Built from the profile's CID rather than a share.google
 * short link or a URL copied from the address bar: those carry an
 * `authuser` parameter tied to one Google account and break for everyone
 * else. This form is account-neutral and stable.
 *   Derived from place id 0xaf60def0371c4357:0x9733baebbb608689
 */
const googleUrl = 'https://www.google.com/maps?cid=10895257445163107977';

/**
 * Drops the visitor straight into the write-a-review form. Comes from the
 * profile's own "Ask for reviews" short link.
 */
const writeReviewUrl = 'https://g.page/r/CYmGYLvrujOXEBE/review';

// PLACEHOLDER — awaiting real reviews from the Google profile.
// Shape of an entry:
//   { author: 'Jane D.', rating: 5, date: 'July 2026', text: '…' },
const reviews = [];

/** Ratings actually shown on the site, derived — never hand-written. */
const count = reviews.length;
const average = count
  ? Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / count) * 10) / 10
  : 0;
const allFiveStar = count > 0 && reviews.every((r) => r.rating === 5);

/**
 * True only when we have real reviews AND somewhere to send people for the
 * rest. Every reviews-related bit of UI checks this one flag.
 */
const enabled = count > 0 && Boolean(googleUrl);

/**
 * Honest phrasing for the homepage badge. "5-star rated" is only claimed
 * when every review really is five stars; otherwise we show the average.
 */
const ratingLabel = allFiveStar
  ? '5-star rated on Google'
  : `Rated ${average} on Google`;

module.exports = {
  googleUrl,
  writeReviewUrl,
  reviews,
  count,
  average,
  allFiveStar,
  enabled,
  ratingLabel,
};
