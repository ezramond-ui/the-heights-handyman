/**
 * /api/approve-review — owner review approval.
 *
 *   GET  ?token=…  → shows a confirmation page with the review and a
 *                    "Publish review" button. Nothing is changed on GET, so
 *                    email link pre-fetching/scanning can't publish anything.
 *   POST (token in form body) → verifies the token and publishes the review
 *                    to the Blob-backed store, then shows a success page.
 *
 * The token is an HMAC-signed copy of the review (see _lib/sign). Publishing
 * is idempotent on review id, so pressing Publish twice is safe.
 */
const { verify } = require('./_lib/sign');
const store = require('./_lib/reviews-store');

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function shell(res, status, title, inner) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end(`<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${esc(title)} — Cleveland Smart Home Solutions</title>
<style>
  body{margin:0;font-family:Inter,system-ui,Segoe UI,Roboto,sans-serif;background:#eaeff6;color:#0f1d2e;
       display:flex;min-height:100vh;align-items:center;justify-content:center;padding:1.5rem}
  .card{background:#fff;border:1px solid #dde4ec;border-radius:18px;box-shadow:0 18px 50px rgba(15,29,46,.15);
        max-width:560px;width:100%;padding:2.2rem 2rem;text-align:center}
  .badge{width:56px;height:56px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;
         font-size:28px;color:#fff;margin-bottom:1rem}
  h1{font-size:1.4rem;margin:.2rem 0 .6rem}
  p{color:#5c6b7e;line-height:1.6;margin:.4rem 0}
  .stars{color:#b08a52;font-size:20px;letter-spacing:.1em}
  blockquote{font-family:Georgia,serif;font-size:15px;text-align:left;border-left:3px solid #2563c9;
             margin:1rem 0;padding:.4rem 1rem;color:#2c3a4d;background:#f5f8fd;border-radius:0 8px 8px 0}
  .who{font-weight:600;color:#0f1d2e}
  .who span{font-weight:400;color:#5c6b7e}
  .btn{display:inline-block;margin-top:1.2rem;background:#1d9b6c;color:#fff;border:0;cursor:pointer;
       font-family:inherit;font-size:1rem;font-weight:600;padding:.85rem 1.8rem;border-radius:999px;text-decoration:none}
  .btn-link{display:inline-block;margin-top:1rem;color:#2563c9;text-decoration:none;font-weight:600}
  .muted{font-size:12px;color:#8a96a6;margin-top:1rem}
</style></head>
<body><div class="card">${inner}</div></body></html>`);
}

function statusPage(res, status, title, message, accent) {
  shell(res, status, title,
    `<span class="badge" style="background:${accent}">${status === 200 ? '✓' : '!'}</span>
     <h1>${esc(title)}</h1>
     ${message}
     <a class="btn-link" href="/reviews.html">View the reviews page</a>`);
}

function confirmPage(res, token, review) {
  const n = Math.max(1, Math.min(5, Number(review.rating) || 5));
  const stars = '★'.repeat(n) + '☆'.repeat(5 - n);
  shell(res, 200, 'Publish this review?',
    `<span class="badge" style="background:#2563c9">★</span>
     <h1>Publish this review?</h1>
     <p>Review it below, then click Publish to add it to your website. Nothing is published until you do.</p>
     <p class="stars" aria-label="${n} out of 5 stars">${stars}</p>
     <blockquote>${esc(review.message).replace(/\n/g, '<br>')}</blockquote>
     <p class="who">— ${esc(review.name)} <span>${esc(review.city)}</span></p>
     <form method="POST" action="/api/approve-review">
       <input type="hidden" name="token" value="${esc(token)}">
       <button type="submit" class="btn">Publish review</button>
     </form>
     <p class="muted">Don’t want to publish it? Just close this page.</p>`);
}

function readToken(req) {
  return new Promise((resolve) => {
    if (req.body && typeof req.body === 'object') return resolve(req.body.token);
    let raw = '';
    req.on('data', (c) => (raw += c));
    req.on('end', () => {
      try {
        if (raw.trim().charAt(0) === '{') return resolve(JSON.parse(raw).token);
        resolve(new URLSearchParams(raw).get('token'));
      } catch { resolve(null); }
    });
    req.on('error', () => resolve(null));
  });
}

module.exports = async function handler(req, res) {
  const isPost = req.method === 'POST';
  const token = isPost
    ? await readToken(req)
    : new URL(req.url, `http://${req.headers.host}`).searchParams.get('token');

  const review = verify(token);
  if (!review || !review.id) {
    return statusPage(
      res, 400, 'This approval link isn’t valid',
      '<p>The link may be malformed, expired, or already changed. Please use the most recent approval email.</p>',
      '#d2483b'
    );
  }

  if (!store.isConfigured()) {
    return statusPage(
      res, 503, 'Review storage isn’t connected yet',
      '<p>Add Blob storage to the site (Vercel → Storage → Blob) so approvals can publish. The review is safe in this link and can be approved once storage is enabled.</p>',
      '#d2483b'
    );
  }

  // GET just shows the review and a Publish button — no changes made.
  if (!isPost) return confirmPage(res, token, review);

  // POST → publish (strip the signing-only field first).
  try {
    const { iat, ...published } = review;
    await store.addReview(published);
    return statusPage(
      res, 200, 'Review published',
      `<p><strong>${esc(review.name)}</strong> from ${esc(review.city)} is now live on your reviews page.</p>
       <p>Publishing again won’t create a duplicate.</p>`,
      '#1d9b6c'
    );
  } catch (err) {
    console.error('approve-review failed:', err);
    return statusPage(
      res, 500, 'Something went wrong',
      '<p>We couldn’t publish the review just now. Please go back and try again in a moment.</p>',
      '#d2483b'
    );
  }
};
