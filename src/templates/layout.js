/** Base HTML shell: SEO head, header with logo mark, nav, footer. */
const site = require('../data/site');
const { assetUrl } = require('../lib/assets');

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
  { label: 'POS Violations', href: '/pos-violations.html' },
  { label: 'Service Areas', href: '/service-areas.html' },
  { label: 'Contact', href: '/contact.html' },
];

// Lightweight, image-free brand mark: "HH" initials in a gold house badge.
// Drop a real logo into public/images/ and swap this block if desired.
function brandMark() {
  return `<span class="brand-badge" aria-hidden="true">HH</span>`;
}

function header(activePath) {
  const links = NAV.map((n) => {
    const active = n.href === activePath ? ' aria-current="page"' : '';
    return `<li><a href="${n.href}"${active}>${n.label}</a></li>`;
  }).join('');

  return `<header class="site-header" id="top">
  <div class="container header-inner">
    <a class="brand" href="/index.html" aria-label="${esc(site.name)} home">
      ${brandMark()}
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
      <p class="footer-blurb">Handyman services, small renovations, and point-of-sale inspection violation repair across ${esc(site.serviceCities.join(', '))}, Ohio.</p>
      <p class="footer-trust">Licensed · Insured · Bonded</p>
    </div>
    <nav class="footer-col" aria-label="Site">
      <h2>Explore</h2>
      <ul>
        <li><a href="/index.html">Home</a></li>
        <li><a href="/services.html">Services</a></li>
        <li><a href="/pos-violations.html">POS Violations</a></li>
        <li><a href="/service-areas.html">Service Areas</a></li>
        <li><a href="/contact.html">Contact</a></li>
      </ul>
    </nav>
    <div class="footer-col">
      <h2>Get in Touch</h2>
      <ul class="footer-contact">
        <li><a href="tel:${site.phoneHref}">Call or text: ${esc(site.phone)}</a></li>
        <li>${esc(site.serviceCities.join(', '))}, OH</li>
        <li>${esc(site.hours)}</li>
      </ul>
      ${socialLinks ? `<div class="footer-social">${socialLinks}</div>` : ''}
    </div>
  </div>
  <div class="footer-bottom">
    <div class="container">
      <p class="footer-fineprint">${esc(site.tagline)}</p>
      <p class="footer-parent">${esc(site.parentCompany)}</p>
    </div>
  </div>
  <div class="footer-legal">
    <div class="container">
      <p>&copy; 2026 ${esc(site.legalName)}. All Rights Reserved. ${esc(site.name)} is a division of ${esc(site.legalName)}.</p>
      <p class="footer-legal-links"><a href="/terms.html">Terms of Service</a> · <a href="/privacy.html">Privacy Policy</a></p>
    </div>
  </div>
</footer>`;
}

// Sticky bottom action bar — mobile only (hidden on desktop via CSS).
// Keeps "Call" and "Free Estimate" one tap away on long pages.
function mobileBar() {
  const phoneIcon =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.4 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2Z"/></svg>';
  return `<div class="mobile-bar" aria-label="Quick actions">
    <a class="mobile-bar-call" href="tel:${site.phoneHref}">${phoneIcon}<span>Call</span></a>
    <a class="btn btn-accent mobile-bar-cta" href="${site.primaryCta.href}">${site.primaryCta.label}</a>
  </div>`;
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
  <meta name="theme-color" content="#12233F">
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
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=Manrope:wght@600;700;800&display=swap">
  <link rel="stylesheet" href="${assetUrl('/css/styles.css')}">
  ${jsonLd}
</head>
<body class="${bodyClass}">
  <a class="skip-link" href="#main">Skip to content</a>
  ${header(path)}
  <main id="main">
${body}
  </main>
  ${footer()}
  ${mobileBar()}
  <script src="${assetUrl('/js/main.js')}" defer></script>
</body>
</html>`;
}

module.exports = { layout, esc, NAV, site };
