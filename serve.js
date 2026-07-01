/**
 * Minimal local dev/preview server. Serves the built site from /dist and
 * routes /api/* to the same handlers used in production (Vercel-style).
 *
 *   npm run build && npm run serve   →  http://localhost:3000
 *   npm run dev                      →  build, then serve
 *
 * Email only actually sends if SMTP_* env vars are set (see api/_lib/mailer.js).
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const DIST = path.join(__dirname, 'dist');
const PORT = process.env.PORT || 3000;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.json': 'application/json',
  '.woff2': 'font/woff2',
};

const apiHandlers = {
  '/api/contact': require('./api/contact'),
};

function send(res, status, body, type) {
  res.writeHead(status, { 'Content-Type': type || 'text/plain' });
  res.end(body);
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  // API routes.
  if (apiHandlers[pathname]) {
    try {
      return await apiHandlers[pathname](req, res);
    } catch (err) {
      console.error(err);
      return send(res, 500, JSON.stringify({ error: 'Server error' }), 'application/json');
    }
  }

  // Static files.
  let rel = decodeURIComponent(pathname);
  if (rel.endsWith('/')) rel += 'index.html';
  let filePath = path.join(DIST, rel);

  // Prevent path traversal.
  if (!filePath.startsWith(DIST)) return send(res, 403, 'Forbidden');

  fs.stat(filePath, (err, stat) => {
    // Try extensionless → .html (clean URLs), then fall back to 404 page.
    if (err || stat.isDirectory()) {
      const htmlGuess = filePath.replace(/\/?$/, '') + '.html';
      if (fs.existsSync(htmlGuess)) return stream(res, htmlGuess);
      return stream(res, path.join(DIST, '404.html'), 404);
    }
    stream(res, filePath);
  });
});

function stream(res, filePath, status) {
  fs.readFile(filePath, (err, data) => {
    if (err) return send(res, 404, 'Not found');
    const type = MIME[path.extname(filePath)] || 'application/octet-stream';
    res.writeHead(status || 200, { 'Content-Type': type });
    res.end(data);
  });
}

server.listen(PORT, () => {
  console.log(`\n  The Heights Handyman running at http://localhost:${PORT}\n`);
});
