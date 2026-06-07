/**
 * POST /api/review — emails a customer review to the owner for approval.
 *
 * The approval email carries a one-click "Approve & publish" link. The review
 * itself rides along inside an HMAC-signed token (see _lib/sign), so clicking
 * the link publishes it straight to the reviews page (via _lib/reviews-store)
 * with no further steps. No pending-review storage is needed.
 */
const crypto = require('crypto');
const { isConfigured, sendMail, readBody, esc, validEmail } = require('./_lib/mailer');
const { sign } = require('./_lib/sign');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    return res.end(JSON.stringify({ error: 'Method not allowed' }));
  }

  const body = await readBody(req);
  const { name, city, email, rating, message, company } = body;

  if (company) {
    res.statusCode = 200;
    return res.end(JSON.stringify({ ok: true }));
  }

  if (!name || !city || !validEmail(email) || !message) {
    res.statusCode = 400;
    return res.end(
      JSON.stringify({ error: 'Please provide your name, city, a valid email, and your review.' })
    );
  }

  if (!isConfigured()) {
    res.statusCode = 503;
    return res.end(
      JSON.stringify({
        error:
          'Review submission isn’t connected yet. Please email us your review and we’ll be glad to post it.',
      })
    );
  }

  const ratingNum = Math.max(1, Math.min(5, Number(rating) || 5));
  const stars = '★'.repeat(ratingNum);

  // The published review (no email — it isn't shown publicly). `iat` is used
  // only to expire the approval link and is stripped before publishing.
  const review = {
    id: crypto.randomUUID(),
    name: String(name).trim().slice(0, 80),
    city: String(city).trim().slice(0, 80),
    rating: ratingNum,
    message: String(message).trim().slice(0, 1500),
    date: new Date().toISOString().slice(0, 10),
    iat: Date.now(),
  };

  const token = sign(review);
  const base =
    process.env.SITE_URL ||
    `https://${req.headers['x-forwarded-host'] || req.headers.host || ''}`;
  const approveUrl = token ? `${base}/api/approve-review?token=${encodeURIComponent(token)}` : null;

  const subject = `New review awaiting approval — ${review.name} (${review.city}) ${stars}`;

  const text = [
    'A new review was submitted and is awaiting your approval.',
    '',
    `Name: ${review.name}`,
    `City: ${review.city}`,
    `Email: ${email}`,
    `Rating: ${ratingNum}/5`,
    '',
    'Review:',
    review.message,
    '',
    approveUrl
      ? `To publish it to the website, open this one-click approval link:\n${approveUrl}`
      : 'Approval link unavailable — set REVIEW_SECRET (or SMTP_PASS) to enable one-click approval.',
  ].join('\n');

  const approveButton = approveUrl
    ? `<table cellpadding="0" cellspacing="0" style="margin:18px 0"><tr><td style="border-radius:999px;background:#1d9b6c">
        <a href="${approveUrl}" style="display:inline-block;padding:14px 26px;font-family:Arial,sans-serif;font-size:15px;font-weight:bold;color:#ffffff;text-decoration:none;border-radius:999px">✓ Approve &amp; publish to website</a>
      </td></tr></table>
      <p style="font-family:Arial,sans-serif;font-size:12px;color:#6b6e76">One click publishes this review to your reviews page — no other steps needed. If you don’t want it published, simply ignore this email.</p>`
    : `<p style="font-family:Arial,sans-serif;font-size:13px;color:#b5392e">One-click approval is unavailable until <code>REVIEW_SECRET</code> (or <code>SMTP_PASS</code>) is set.</p>`;

  const html = `
    <h2 style="font-family:Georgia,serif">New review — awaiting approval</h2>
    <p style="font-family:Arial,sans-serif;color:#b08a52;font-size:20px">${stars}</p>
    <table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">
      <tr><td><strong>Name</strong></td><td>${esc(review.name)}</td></tr>
      <tr><td><strong>City</strong></td><td>${esc(review.city)}</td></tr>
      <tr><td><strong>Email</strong></td><td>${esc(email)}</td></tr>
      <tr><td><strong>Rating</strong></td><td>${ratingNum}/5</td></tr>
    </table>
    <blockquote style="font-family:Georgia,serif;font-size:15px;border-left:3px solid #b08a52;margin:12px 0;padding:4px 16px;color:#3a3d44">${esc(review.message).replace(/\n/g, '<br>')}</blockquote>
    ${approveButton}`;

  try {
    await sendMail({ subject, text, html, replyTo: email });
    res.statusCode = 200;
    return res.end(JSON.stringify({ ok: true }));
  } catch (err) {
    console.error('review send failed:', err);
    res.statusCode = 500;
    return res.end(
      JSON.stringify({ error: 'We couldn’t submit your review. Please email it to us directly.' })
    );
  }
};
