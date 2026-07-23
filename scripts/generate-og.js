/**
 * Rasterize the social-share image: og-default.svg → og-default.png (1200×630).
 *
 * Google, Facebook, and Twitter don't render SVG previews, so the og:image
 * must be a raster format. Run whenever og-default.svg changes:
 *
 *   node scripts/generate-og.js
 *
 * The PNG is written to /public so the normal build copies it into /dist.
 */
const path = require('path');
const sharp = require('sharp');

const SRC = path.join(__dirname, '..', 'public', 'images', 'og-default.svg');
const OUT = path.join(__dirname, '..', 'public', 'images', 'og-default.png');

sharp(SRC, { density: 96 })
  .resize(1200, 630)
  .png()
  .toFile(OUT)
  .then((info) => console.log(`✓ ${path.relative(process.cwd(), OUT)} (${info.width}×${info.height}, ${(info.size / 1024).toFixed(1)} KB)`))
  .catch((err) => {
    console.error('Failed to generate OG image:', err.message);
    process.exit(1);
  });
