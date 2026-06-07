/**
 * Tiny HMAC token helper for one-click review approval links.
 *
 * The approval link carries the review itself in a signed token, so the
 * approve endpoint can verify authenticity without any pending-review storage.
 * A token is `base64url(payloadJSON).base64url(hmacSHA256)`; it is unforgeable
 * without the secret and is checked with a timing-safe comparison.
 *
 * Secret: REVIEW_SECRET (preferred). Falls back to SMTP_PASS so approvals work
 * out of the box wherever email is already configured — set a dedicated
 * REVIEW_SECRET in production for clean separation.
 */
const crypto = require('crypto');

// Approval links stay valid for this long after submission.
const MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000; // 90 days

function secret() {
  return process.env.REVIEW_SECRET || process.env.SMTP_PASS || '';
}

function sign(payload) {
  const key = secret();
  if (!key) return null;
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const mac = crypto.createHmac('sha256', key).update(data).digest('base64url');
  return `${data}.${mac}`;
}

function verify(token) {
  const key = secret();
  if (!key || typeof token !== 'string' || token.indexOf('.') === -1) return null;

  const [data, mac] = token.split('.');
  const expected = crypto.createHmac('sha256', key).update(data).digest('base64url');

  const a = Buffer.from(mac);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;

  let payload;
  try {
    payload = JSON.parse(Buffer.from(data, 'base64url').toString('utf8'));
  } catch {
    return null;
  }

  if (payload && payload.iat && Date.now() - payload.iat > MAX_AGE_MS) return null;
  return payload;
}

module.exports = { sign, verify };
