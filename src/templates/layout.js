/** Base HTML shell: SEO head, header with logo placeholder, nav, footer. */
const site = require('../data/site');

const esc = (s = '') =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

// Primary navigation, reused everywhere.
const NAV = [
  { label: 'Home', href: '/index.html' },
  { label: 'Services', href: '/services.html' },
  { label: 'Landlords', href: '/landlords.html' },
  { label: 'Service Areas', href: '/service-areas.html' },
  { label: 'Reviews', href: '/reviews.html' },
  { label: 'Contact', href: '/contact.html' },
];

function header(activePath) {
  const links = NAV.map((n) => {
    const active = n.href === activePath ? ' aria-current="page"' : '';
    return `<li><a href="${n.href}"${active}>${n.label}</a></li>`;
  }).join('');

  return `<header class="site-header" id="top">
  <div class="container header-inner">
    <a class="brand" href="/index.html" aria-label="${esc(site.name)} home">
      <img class="brand-logo" src="/images/logo-mark.png?v=6" width="89" height="76" alt="">
      <span class="brand-name">${esc(site.name)}</span>
    </a>
    <button class="nav-toggle" aria-expanded="false" aria-controls="primary-nav" aria-label="Toggle menu">
      <span class="nav-toggle-bar"></span>
      <span class="nav-toggle-bar"></span>
      <span class="nav-toggle-bar"></span>
    </button>
    <nav class="primary-nav" id="primary-nav" aria-label="Primary">
      <ul>${links}</ul>
      <a class="btn btn-accent nav-cta" href="${site.primaryCta.href}">${site.primaryCta.label}</a>
    </nav>
  </div>
</header>`;
}

function footer() {
  const s = site.social;
  const socialLinks = [
    s.facebook && `<a href="${s.facebook}" rel="noopener">Facebook</a>`,
    s.instagram && `<a href="${s.instagram}" rel="noopener">Instagram</a>`,
    s.google && `<a href="${s.google}" rel="noopener">Google</a>`,
  ]
    .filter(Boolean)
    .join('');

  return `<footer class="site-footer">
  <div class="container footer-grid">
    <div class="footer-brand">
      <span class="brand-name">${esc(site.name)}</span>
      <p class="footer-tag">${esc(site.tagline)}</p>
      <p class="footer-blurb">Clean, simple, elegant smart home installs across ${esc(site.serviceAreaLabel)} — no major construction, no mess, no stress.</p>
      <p class="footer-trust">Locally owned &amp; operated · Licensed &amp; insured</p>
    </div>
    <nav class="footer-col" aria-label="Site">
      <h2>Explore</h2>
      <ul>
        <li><a href="/index.html">Home</a></li>
        <li><a href="/services.html">Services</a></li>
        <li><a href="/landlords.html">For Landlords</a></li>
        <li><a href="/reviews.html">Reviews</a></li>
        <li><a href="/service-areas.html">Service Areas</a></li>
        <li><a href="/contact.html">Contact</a></li>
      </ul>
    </nav>
    <div class="footer-col">
      <h2>Get in Touch</h2>
      <ul class="footer-contact">
        <li><a href="tel:${site.phoneHref}">${esc(site.phone)}</a></li>
        <li><a href="mailto:${site.salesEmail}">${esc(site.salesEmail)}</a></li>
        <li>${esc(site.address.locality)}, ${esc(site.address.region)} — serving ${esc(site.serviceAreaLabel)}</li>
        <li>${esc(site.hours)}</li>
      </ul>
      ${socialLinks ? `<div class="footer-social">${socialLinks}</div>` : ''}
    </div>
  </div>
  <div class="footer-bottom">
    <div class="container">
      <p class="footer-fineprint">${esc(site.tagline)}</p>
    </div>
  </div>
  <div class="footer-legal">
    <div class="container">
      <p>&copy; 2026 North Coast Residential Services LLC. All Rights Reserved. Cleveland Smart Home Solutions&trade; is a registered trade name of North Coast Residential Services LLC.</p>
    </div>
  </div>
</footer>`;
}

/**
 * Render a full HTML document.
 * @param {object} opts
 * @param {string} opts.title       – <title> (unique per page)
 * @param {string} opts.description – meta description (unique per page)
 * @param {string} opts.path        – canonical path, e.g. "/services.html"
 * @param {string} opts.body        – page body HTML
 * @param {string} [opts.jsonLd]    – JSON-LD structured data block(s)
 * @param {string} [opts.bodyClass] – extra class on <body>
 * @param {string} [opts.ogType]    – Open Graph type (default "website")
 */
function layout({ title, description, path, body, jsonLd = '', bodyClass = '', ogType = 'website' }) {
  const canonical = site.url + path;
  const og = site.url + site.ogImage;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${canonical}">
  <meta name="theme-color" content="#0f1d2e">
  <meta name="format-detection" content="telephone=no">

  <meta property="og:type" content="${ogType}">
  <meta property="og:site_name" content="${esc(site.name)}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${og}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${og}">

  <link rel="icon" href="/images/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/images/favicon.svg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&family=Manrope:wght@600;700;800&display=swap">
  <link rel="stylesheet" href="/css/styles.css?v=9">
  ${jsonLd}
</head>
<body class="${bodyClass}">
  <a class="skip-link" href="#main">Skip to content</a>
  ${header(path)}
  <main id="main">
${body}
  </main>
  ${footer()}
  <script src="/js/main.js?v=2" defer></script>
</body>
</html>`;
}

module.exports = { layout, esc, NAV, site };
