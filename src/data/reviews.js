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

// Transcribed from the Google profile 2026-08-05. Text is verbatim; the
// only edits are restoring the spaces after full stops that were lost when
// the reviews were copied out of Google (paragraph breaks became joins).
// Newest first, matching how Google orders them.
const reviews = [
  {
    author: 'Shaya Bassman',
    rating: 5,
    date: 'July 2026',
    text:
      `I highly recommend Ezra the Handyman. He was gracious, professional, and a pleasure to work with from start to finish. He was always helpful, constantly problem-solving, and took the time to make sure everything was done the right way. Ezra was punctual, stuck to the timeline he gave me, and always showed up when he said he would. He completed a wide variety of projects for me, including installing shower curtain rods and hanging blinds in my bathroom, putting up a light fixture, and even tightening some plumbing pipes. He also took the initiative to order the necessary materials himself, which made the entire process much easier and more convenient. His pricing was fair and reasonable, and I felt I received excellent value for the quality of his work. Ezra is truly an all-around handyman who is dependable, skilled, resourceful, and easy to work with. I would not hesitate to recommend him to anyone looking for quality handyman services.`,
  },
  {
    author: 'Lansdale Home Solutions',
    rating: 5,
    date: 'July 2026',
    text:
      `Ezra did an outstanding job and exceeded my expectations. He was professional, reliable, and true to his word throughout the entire process. He successfully completed two of my projects in a single day—something I initially thought wouldn't be possible. Not only did he finish both projects on time, but the quality of his workmanship was exceptional. I highly recommend Ezra for anyone looking for dependable, high-quality work. I will definitely be using his services again for future projects. He is my go-to contractor.`,
  },
  {
    author: 'Tuvy Miller',
    rating: 5,
    date: 'July 2026',
    text:
      `Ezra did an amazing job making sure our house was POS compliant, as well as taking care of a few other items. He was professional, prompt and worked very efficiently. I would definitely use him again and highly recommend him!`,
  },
  {
    author: 'Shlomie L',
    rating: 5,
    date: 'July 2026',
    text:
      `Ezra at Heights Handyman did a terrific job for us! He installed two new ceiling fans in our bedrooms and also fixed the hinges on our front door. Everything was completed with great attention to detail, and the quality of the work was excellent. Ezra was extremely professional, punctual, and easy to work with throughout the entire process. He showed up on time, communicated clearly, and made sure everything was done right. I wouldn't hesitate to use Heights Handyman again and highly recommend them to anyone looking for reliable, high-quality handyman services.`,
  },
];

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
