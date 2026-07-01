/**
 * Shared email helper for the contact form handler.
 *
 * Configure these environment variables in your host (Vercel/Netlify/etc.):
 *   SMTP_HOST       e.g. smtp.gmail.com
 *   SMTP_PORT       e.g. 465 (SSL) or 587 (STARTTLS)
 *   SMTP_USER       SMTP username / login
 *   SMTP_PASS       SMTP password or app password
 *   MAIL_FROM       (optional) From address; defaults to SMTP_USER
 *   MAIL_TO         Inbox that receives contact-form submissions
 *
 * If SMTP is not configured, the handler responds 503 with a friendly message
 * so the site still works and the form degrades gracefully.
 */
const nodemailer = require('nodemailer');

function isConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

let cachedTransport = null;
function getTransport() {
  if (cachedTransport) return cachedTransport;
  const port = Number(process.env.SMTP_PORT || 587);
  cachedTransport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465, // true for 465, false for other ports
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  return cachedTransport;
}

// Default recipient for form submissions when MAIL_TO isn't set in the host env.
const DEFAULT_MAIL_TO = 'ezra@theheightshandyman.com';

async function sendMail({ subject, text, html, replyTo }) {
  const to = process.env.MAIL_TO || DEFAULT_MAIL_TO;
  const from = process.env.MAIL_FROM || process.env.SMTP_USER;
  return getTransport().sendMail({ from, to, subject, text, html, replyTo });
}

/* --------------------------- helpers --------------------------- */

function readBody(req) {
  // Vercel parses JSON bodies automatically; fall back to manual parse.
  return new Promise((resolve) => {
    if (req.body && typeof req.body === 'object') return resolve(req.body);
    let raw = '';
    req.on('data', (c) => (raw += c));
    req.on('end', () => {
      try { resolve(raw ? JSON.parse(raw) : {}); }
      catch { resolve({}); }
    });
    req.on('error', () => resolve({}));
  });
}

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function validEmail(s) {
  return typeof s === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

module.exports = { isConfigured, sendMail, readBody, esc, validEmail };
