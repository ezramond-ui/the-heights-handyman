/**
 * Durable store for published reviews, backed by Vercel Blob.
 *
 * Approved reviews live in a single public JSON blob at a stable pathname.
 * The approve endpoint appends to it; the public reviews page fetches it
 * (via /api/reviews) and renders the cards client-side, so an approval shows
 * up immediately with no rebuild.
 *
 * Setup: enable Blob storage in the Vercel project (Storage → Blob). Vercel
 * injects BLOB_READ_WRITE_TOKEN automatically. When it isn't configured the
 * store degrades gracefully — reads return [] and writes report not-configured.
 */
const PATHNAME = 'reviews/published.json';

function isConfigured() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

// Lazy-require so a missing module never crashes handler/module load.
function blob() {
  return require('@vercel/blob');
}

async function getReviews() {
  if (!isConfigured()) return [];
  try {
    const { list } = blob();
    const { blobs } = await list({ prefix: PATHNAME, token: process.env.BLOB_READ_WRITE_TOKEN });
    const found = blobs.find((b) => b.pathname === PATHNAME) || blobs[0];
    if (!found) return [];
    const res = await fetch(found.url, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error('getReviews failed:', err);
    return [];
  }
}

// Append a review. Idempotent on review.id so repeat link clicks are safe.
async function addReview(review) {
  if (!isConfigured()) throw new Error('blob-not-configured');
  const { put } = blob();
  const current = await getReviews();
  if (current.some((r) => r.id === review.id)) return current;

  const updated = [review, ...current];
  await put(PATHNAME, JSON.stringify(updated), {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
    cacheControlMaxAge: 0,
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });
  return updated;
}

module.exports = { isConfigured, getReviews, addReview, PATHNAME };
