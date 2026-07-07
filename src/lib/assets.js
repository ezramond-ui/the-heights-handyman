/**
 * Cache-busting asset versions.
 *
 * The CSS/JS are served from fixed filenames with a long, `immutable`
 * Cache-Control (see vercel.json), so browsers must be told when a file
 * actually changed. build.js hashes each file's contents at build time and
 * registers the hash here; layout.js appends it as `?v=<hash>`. When the file
 * changes the hash changes, so browsers refetch — no manual version bumping.
 *
 * Falls back to `dev` if a hash was never registered (e.g. rendering outside
 * the build); that just yields a stable `?v=dev` URL.
 */
const versions = Object.create(null);

/** Register a content hash for an asset path, e.g. setVersion('/css/styles.css', 'a1b2c3d4'). */
function setVersion(pathname, hash) {
  versions[pathname] = hash;
}

/** Return the asset path with its cache-busting query, e.g. '/css/styles.css?v=a1b2c3d4'. */
function assetUrl(pathname) {
  return `${pathname}?v=${versions[pathname] || 'dev'}`;
}

module.exports = { setVersion, assetUrl };
