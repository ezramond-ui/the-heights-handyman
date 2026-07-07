/**
 * Static site generator for The Heights Handyman.
 * Renders every page into /dist, copies /public assets, and writes
 * sitemap.xml + robots.txt. Run with: npm run build
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = __dirname;
const DIST = path.join(ROOT, 'dist');
const PUBLIC = path.join(ROOT, 'public');

const site = require('./src/data/site');
const { layout } = require('./src/templates/layout');
const { setVersion } = require('./src/lib/assets');

// Page builders.
const home = require('./src/templates/pages/home');
const services = require('./src/templates/pages/services');
const contact = require('./src/templates/pages/contact');
const posViolations = require('./src/templates/pages/posViolations');
const serviceAreas = require('./src/templates/pages/serviceAreas');
const locationPages = require('./src/templates/pages/location');

/* ───────────────────────────── helpers ───────────────────────────── */
function rmrf(dir) {
  // Best-effort clean. On Windows (esp. OneDrive-synced folders) a handle may
  // be held on the dist directory itself, causing EPERM. In that case we clear
  // the *contents* and reuse the directory rather than failing the build.
  if (!fs.existsSync(dir)) return;
  try {
    fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 150 });
  } catch (err) {
    if (err.code !== 'EPERM' && err.code !== 'EBUSY' && err.code !== 'ENOTEMPTY') throw err;
    for (const entry of fs.readdirSync(dir)) {
      try {
        fs.rmSync(path.join(dir, entry), { recursive: true, force: true, maxRetries: 5, retryDelay: 150 });
      } catch (e) {
        if (e.code !== 'EPERM' && e.code !== 'EBUSY') throw e;
      }
    }
  }
}
function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}
function writeFile(relPath, contents) {
  const full = path.join(DIST, relPath);
  ensureDir(path.dirname(full));
  fs.writeFileSync(full, contents);
}
function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  ensureDir(dest);
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

/* ───────────────────────────── 404 page ──────────────────────────── */
function notFoundPage() {
  const body = `
  <section class="page-hero center" style="min-height:50vh;display:flex;align-items:center;">
    <div class="container">
      <span class="eyebrow">404</span>
      <h1>We couldn’t find that page</h1>
      <p class="lead">The page you’re looking for moved or doesn’t exist — but help is still one tap away.</p>
      <div class="hero-actions" style="justify-content:center;">
        <a class="btn btn-accent btn-lg" href="/index.html">Back to home</a>
        <a class="btn btn-outline btn-lg" href="/contact.html">Get a free estimate</a>
      </div>
    </div>
  </section>`;
  return layout({
    title: `Page not found | ${site.name}`,
    description: 'The page you’re looking for could not be found.',
    path: '/404.html',
    body,
  });
}

/* ───────────────────────────── build ─────────────────────────────── */
console.log('Building The Heights Handyman…');
rmrf(DIST);
ensureDir(DIST);

// Copy static assets first (css, js, images, etc.).
copyDir(PUBLIC, DIST);

// Hash the cache-busted assets so their `?v=` changes only when they change.
// Must run before pages render, since layout reads these versions.
for (const asset of ['/css/styles.css', '/js/main.js']) {
  const full = path.join(DIST, asset);
  if (!fs.existsSync(full)) continue;
  const hash = crypto.createHash('sha1').update(fs.readFileSync(full)).digest('hex').slice(0, 10);
  setVersion(asset, hash);
}

// Collect all rendered pages.
const pages = [
  home(),
  services(),
  posViolations(),
  contact(),
  serviceAreas(),
  ...locationPages(),
];

for (const page of pages) {
  writeFile(page.path, page.html);
}
writeFile('404.html', notFoundPage());

console.log(`  ✓ ${pages.length} pages rendered (+ 404).`);

/* ─────────────────────── sitemap.xml + robots ────────────────────── */
const today = new Date().toISOString().slice(0, 10);
const urls = pages.map((p) => {
  const loc = site.url + '/' + p.path;
  // Home, the POS focus page, and area pages get higher priority.
  let priority = '0.7';
  if (p.path === 'index.html') priority = '1.0';
  else if (p.path === 'pos-violations.html') priority = '0.9';
  else if (p.path.startsWith('areas/')) priority = '0.8';
  else if (['services.html', 'contact.html'].includes(p.path)) priority = '0.9';
  return `  <url><loc>${loc}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>${priority}</priority></url>`;
});
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;
writeFile('sitemap.xml', sitemap);

const robots = `User-agent: *
Allow: /

Sitemap: ${site.url}/sitemap.xml
`;
writeFile('robots.txt', robots);

console.log('  ✓ sitemap.xml + robots.txt written.');
console.log(`Done. Output in /dist (${pages.length + 1} HTML files).`);
