/**
 * GET /api/approve-review?token=… — one-click review approval.
 *
 * The token is an HMAC-signed copy of the review (see _lib/sign). If the
 * signature checks out, the review is published to the Blob-backed store and
 * appears on the reviews page immediately. Idempotent: clicking again is safe.
 * Responds with a small styled HTML page since it opens in a browser.
 */
const { verify } = require('./_lib/sign');
const store = require('./_lib/reviews-store');

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function page(res, status, title, message, accent) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end(`<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} — Cleveland Smart Home Solutions</title>
<style>
  body{margin:0;font-family:Inter,system-ui,Segoe UI,Roboto,sans-serif;background:#eaeff6;color:#0f1d2e;
       display:flex;min-height:100vh;align-items:center;justify-content:center;padding:1.5rem}
  .card{background:#fff;border:1px solid #dde4ec;border-radius:18px;box-shadow:0 18px 50px rgba(15,29,46,.15);
        max-width:520px;width:100%;padding:2.2rem 2rem;text-align:center}
  .badge{width:56px;height:56px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;
         font-size:28px;color:#fff;background:${accent};margin-bottom:1rem}
  h1{font-size:1.4rem;margin:.2rem 0 .6rem}
  p{color:#5c6b7e;line-height:1.6;margin:.4rem 0}
  .btn{display:inline-block;margin-top:1.3rem;background:#2563c9;color:#fff;text-decoration:none;
       font-weight:600;padding:.8rem 1.6rem;border-radius:999px}
</style></head>
<body><div class="card">
  <span class="badge">${status === 200 ? '✓' : '!'}</span>
  <h1>${esc(title)}</h1>
  ${message}
  <a class="btn" href="/reviews.html">View the reviews page</a>
</div></body></html>`);
}

module.exports = async function handler(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const token = url.searchParams.get('token');

  const review = verify(token);
  if (!review || !review.id) {
    return page(
      res, 400, 'This approval link isn’t valid',
      '<p>The link may be malformed, expired, or already changed. Please use the most recent approval email.</p>',
      '#d2483b'
    );
  }

  if (!store.isConfigured()) {
    return page(
      res, 503, 'Review storage isn’t connected yet',
      '<p>Add Blob storage to the site (Vercel → Storage → Blob) so approvals can publish. The review is safe in this link and can be approved once storage is enabled.</p>',
      '#d2483b'
    );
  }

  try {
    // Strip the signing-only field before publishing.
    const { iat, ...published } = review;
    await store.addReview(published);
    return page(
      res, 200, 'Review published',
      `<p><strong>${esc(review.name)}</strong> from ${esc(review.city)} is now live on your reviews page.</p>
       <p>Clicking this link again won’t create a duplicate.</p>`,
      '#1d9b6c'
    );
  } catch (err) {
    console.error('approve-review failed:', err);
    return page(
      res, 500, 'Something went wrong',
      '<p>We couldn’t publish the review just now. Please try the link again in a moment.</p>',
      '#d2483b'
    );
  }
};
