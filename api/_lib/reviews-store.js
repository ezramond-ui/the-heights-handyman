/**
 * Durable store for published reviews, backed by Vercel Blob.
 *
 * Approved reviews live in a single public JSON blob at a stable pathname.
 * The approve endpoint appends to it; the public reviews page fetches it
 * (via /api/reviews) and renders the cards client-side, so an approval shows
 * up immediately with no rebuild.
 *
 * Setup: enable Blob storage in the Vercel project (Storage → Blob) and
 * connect it to the project, then redeploy so the token reaches the function.
 *
 * Token: the standard env var is BLOB_READ_WRITE_TOKEN. If the store was
 * connected with a custom env-var prefix, Vercel instead exposes it as
 * <PREFIX>_READ_WRITE_TOKEN (e.g. reviews_READ_WRITE_TOKEN). All Vercel Blob
 * read/write tokens begin with "vercel_blob_rw_", so we detect the token by
 * value as a fallback — meaning any prefix works without code changes. When no
 * token is present the store degrades gracefully.
 */
const PATHNAME = 'reviews/published.json';

// Resolve the Blob read/write token regardless of which env var name Vercel
// used. Cached after first lookup.
let cachedToken;
function resolveToken() {
  if (cachedToken !== undefined) return cachedToken;
  cachedToken =
    process.env.BLOB_READ_WRITE_TOKEN ||
    findByValue('vercel_blob_rw_') ||
    findByKeySuffix('_READ_WRITE_TOKEN') ||
    '';
  return cachedToken;
}

function findByValue(prefix) {
  for (const v of Object.values(process.env)) {
    if (typeof v === 'string' && v.startsWith(prefix)) return v;
  }
  return '';
}

function findByKeySuffix(suffix) {
  for (const [k, v] of Object.entries(process.env)) {
    if (k.endsWith(suffix) && v) return v;
  }
  return '';
}

function isConfigured() {
  return Boolean(resolveToken());
}

// Lazy-require so a missing module never crashes handler/module load.
function blob() {
  return require('@vercel/blob');
}

async function getReviews() {
  const token = resolveToken();
  if (!token) return [];
  try {
    const { list } = blob();
    const { blobs } = await list({ prefix: PATHNAME, token });
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
  const token = resolveToken();
  if (!token) throw new Error('blob-not-configured');
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
    token,
  });
  return updated;
}

module.exports = { isConfigured, getReviews, addReview, resolveToken, PATHNAME };
