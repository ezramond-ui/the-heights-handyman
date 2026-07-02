// One-off image optimizer: compresses source photos from "Stock images/"
// into web-ready JPEGs in public/images/. Run with: node scripts/optimize-images.js
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const root = path.join(__dirname, '..');
const srcDir = path.join(root, 'Stock images');
const outDir = path.join(root, 'public', 'images');

// source file -> { out name, max longest edge in px }.
// Widths are generous (≈2x the largest CSS display size) so they stay crisp on retina.
const jobs = [
  { src: 'benjamin-lehman-EJU7A__krX0-unsplash.jpg', out: 'hero-tools.jpg', maxEdge: 1600 },
  { src: 'bermix-studio-iwz5tmhjl7o-unsplash.jpg',    out: 'services-tools.jpg', maxEdge: 1000 },
  { src: 'sam-clarke-ZEfFgaXVaV4-unsplash.jpg',        out: 'pos-tools.jpg', maxEdge: 1400 },
];

(async () => {
  for (const job of jobs) {
    const inPath = path.join(srcDir, job.src);
    const outPath = path.join(outDir, job.out);
    const before = fs.statSync(inPath).size;
    await sharp(inPath)
      .rotate() // respect EXIF orientation
      .resize({ width: job.maxEdge, height: job.maxEdge, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 80, mozjpeg: true, progressive: true })
      .toFile(outPath);
    const after = fs.statSync(outPath).size;
    const kb = (n) => (n / 1024).toFixed(0) + ' KB';
    console.log(`  ${job.out}: ${kb(before)} -> ${kb(after)} (${(100 - (after / before) * 100).toFixed(1)}% smaller)`);
  }
  console.log('Done.');
})().catch((err) => { console.error(err); process.exit(1); });
