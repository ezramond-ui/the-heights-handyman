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

// First four (July 2026) transcribed from the Google profile 2026-08-05;
// the rest added 2026-11-05. Text is verbatim; the only edits are restoring
// the spaces after full stops that were lost when the reviews were copied
// out of Google (paragraph breaks became joins).
// Dates: Google only shows relative ages ("a month ago"), so the month for
// the 2026-11-05 batch is converted from that and may be off by one.
// Star-only reviews with no text (Andrew Mayor, Jeremy Gant) are left out —
// there's nothing to quote.
// Newest first, matching how Google orders them.
const reviews = [
  {
    author: 'Kathy Patton',
    rating: 5,
    date: 'November 2026',
    text:
      `I found Heights Handyman by way of a Google search, and am glad I did.  He responded quickly, asked a few pertinent questions about the work that needed to be done, gave me a reasonable quote and we scheduled the work.  He arrived when he said he would,  did the work,   cleaned up after himself.  Heights Handyman ticked all the boxes for me and my project.`,
  },
  {
    author: 'Andrew Bohmer',
    rating: 5,
    date: 'November 2026',
    text: `Good communication and fast service for drywall repair`,
  },
  {
    author: 'Ramona Kay Wiles',
    rating: 5,
    date: 'October 2026',
    text:
      `Ezra and his crew rebuilt the top landing for my basement stairs and some other odd jobs. They did an excellent job and the landing is secure and safe. He was very good about responding to any questions and concerns. The work was completed when he said it would be done. I would recommend him for work needed.`,
  },
  {
    author: 'Brandon Fox',
    rating: 5,
    date: 'October 2026',
    text:
      `I used the Heights Handyman for driveway repairs that we needed done on short notice. Ezra provided clear and prompt feedback on pricing as well as his availability to complete the job. He showed up on time and provided quality work for a fair price. I would highly recommend his services.`,
  },
  {
    author: 'Sarah Wittine',
    rating: 5,
    date: 'October 2026',
    topics: ['pos'],
    text:
      `This exceptional business helped us promptly with a point of sale repair that needed done quickly. They were flexible, both fitting us in with a short window, and understanding when a few things needed to be changed. The work was professional, prompt, and done right. I highly recommend The Heights Handyman and working with Ezra was fantastic from start to finish!`,
  },
  {
    author: 'Cathy Mockus',
    rating: 5,
    date: 'September 2026',
    text:
      `Ezra responded quickly to give us a quote.  His price was good and he fixed our issues quickly.  We would definately hire him again!!!`,
  },
  {
    author: 'Jeremy Mulloy',
    rating: 5,
    date: 'September 2026',
    topics: ['pos'],
    text:
      `Received the violations, contacted the inspector, and got his feedback. Then delivered exactly what was asked for to clear us from our violations. Showed up on time and quickly corrected a ten plus incident violation report and we were able to reinspect a week later. We passed with flying cover 10/10 recommend to get you through a POS issue. Wonderful response time and actually listens.`,
  },
  {
    author: 'John Bugbee',
    rating: 5,
    date: 'September 2026',
    text:
      `Ezra came to our house on short notice. We had two rooms with sliding closet doors that were sticking and one bedroom entry that would not close properly plus a crack above the door. He fixed them all quickly. Sliders slide perfectly now and entry closes perfectly. Crack fixed. We will call on him again. Reliable and professional.`,
  },
  {
    author: 'Thomas Mcdonald',
    rating: 5,
    date: 'September 2026',
    text:
      `Ezra followed through reliably on porch railing, exterior door and electrical repairs to my home.  When issues came up unexpectedly along the way Ezra was able to problem solve and complete work with good results!  Price estimate and material cost was very reasonable.`,
  },
  {
    author: 'Melissa Johnson',
    rating: 5,
    date: 'September 2026',
    text: `Prompt service at a reasonable price.`,
  },
  {
    author: 'Menucha Schubert',
    rating: 5,
    date: 'August 2026',
    topics: ['pos'],
    text:
      `Ezra was so efficient and amazing! He got all of our work done so fast and even helped us deal with the city inspectors for some of our projects. Would highly recommend.`,
  },
  {
    author: 'AllPro Home Solutions',
    rating: 5,
    date: 'August 2026',
    text:
      `Ezra did an outstanding job. He came on time and was patience enough to explain to tenant. I will hire him again for future jobs.`,
  },
  {
    author: 'Office Work',
    rating: 5,
    date: 'August 2026',
    text:
      `I am extremely satisfied with his work! He works with great skill, and the finishing is so flawless that it’s a delight to see. What I appreciated most is his professionalism and sense of responsibility—he is a very polite and honest person. Considering the quality of his work, his service charge is very reasonable. Overall, I am completely satisfied with his work and recommend him 100%`,
  },
  {
    author: 'Stephanie Slavick',
    rating: 5,
    date: 'August 2026',
    text: `Amazing service. Great communication! Got the home repairs done swiftly. Thank you.`,
  },
  {
    author: 'Kory Konte',
    rating: 5,
    date: 'August 2026',
    text: `I was very satisfied with there services. they were on time, Professional and friendly.`,
  },
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
    topics: ['pos'],
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

/**
 * Pick a review to feature on a topic page — see the `topics` field above.
 * Returns undefined when nothing is tagged, and callers render nothing, so
 * a page never ends up with an empty testimonial slot.
 */
const byTopic = (topic) =>
  enabled ? reviews.find((r) => (r.topics || []).includes(topic)) : undefined;

module.exports = {
  googleUrl,
  writeReviewUrl,
  reviews,
  byTopic,
  count,
  average,
  allFiveStar,
  enabled,
  ratingLabel,
};
