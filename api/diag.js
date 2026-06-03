/**
 * TEMPORARY diagnostic endpoint — token-gated. Tests SMTP auth against the
 * live Vercel env vars on BOTH 587/STARTTLS and 465/SSL. Never returns the
 * password. Remove this file after diagnosis.
 *
 *   GET /api/diag?token=csh-diag-7f3a9c2e1b
 */
const nodemailer = require('nodemailer');

function errInfo(e) {
  return {
    ok: false,
    code: e && e.code,
    command: e && e.command,
    responseCode: e && e.responseCode,
    response: e && e.response,
    message: e && e.message,
  };
}

async function tryPort(port, secure) {
  const result = { port, secure };
  try {
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS || '' },
      connectionTimeout: 12000,
      greetingTimeout: 12000,
    });
    try {
      await transport.verify();
      result.verify = { ok: true };
    } catch (e) {
      result.verify = errInfo(e);
    }
  } catch (e) {
    result.verify = errInfo(e);
  }
  return result;
}

module.exports = async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  let token = null;
  try { token = new URL(req.url, 'http://x').searchParams.get('token'); } catch (e) {}
  if (!token && req.query) token = req.query.token;
  if (token !== 'csh-diag-7f3a9c2e1b') {
    res.statusCode = 403;
    return res.end(JSON.stringify({ error: 'forbidden' }));
  }

  const pass = process.env.SMTP_PASS || '';
  const out = {
    env: {
      SMTP_HOST: process.env.SMTP_HOST || null,
      SMTP_PORT: process.env.SMTP_PORT || null,
      SMTP_USER: process.env.SMTP_USER || null, // your own address; helps confirm it's ezra@
      SMTP_PASS_present: Boolean(pass),
      SMTP_PASS_length: pass.length,
      SMTP_PASS_has_spaces: /\s/.test(pass),
      MAIL_FROM: process.env.MAIL_FROM || null,
      MAIL_TO: process.env.MAIL_TO || null,
    },
    tests: [],
  };

  out.tests.push(await tryPort(587, false)); // STARTTLS
  out.tests.push(await tryPort(465, true));  // SSL

  res.statusCode = 200;
  return res.end(JSON.stringify(out, null, 2));
};
