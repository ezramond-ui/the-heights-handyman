/**
 * TEMPORARY diagnostic endpoint — token-gated. Tests SMTP connection + auth
 * against the live Vercel env vars and reports the exact failure WITHOUT
 * ever returning the password. Remove this file after diagnosis.
 *
 *   GET /api/diag?token=csh-diag-7f3a9c2e1b
 */
const nodemailer = require('nodemailer');

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
  const env = {
    SMTP_HOST: process.env.SMTP_HOST || null,
    SMTP_PORT: process.env.SMTP_PORT || null,
    SMTP_USER_present: Boolean(process.env.SMTP_USER),
    SMTP_USER_domain: process.env.SMTP_USER ? String(process.env.SMTP_USER).split('@')[1] || '(no @)' : null,
    SMTP_PASS_present: Boolean(pass),
    SMTP_PASS_length: pass.length,            // Gmail app password = 16 chars (no spaces)
    SMTP_PASS_has_spaces: /\s/.test(pass),
    MAIL_FROM: process.env.MAIL_FROM || null, // if set + != SMTP_USER, Gmail may reject envelope
    MAIL_TO: process.env.MAIL_TO || null,
  };

  const port = Number(process.env.SMTP_PORT || 587);
  const out = { env, computed: { port, secure: port === 465 }, verify: null, testSend: null };

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

  try {
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: process.env.SMTP_USER, pass },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
    });

    try {
      await transport.verify();
      out.verify = { ok: true };
    } catch (e) {
      out.verify = errInfo(e);
    }

    if (out.verify.ok) {
      try {
        const info = await transport.sendMail({
          from: process.env.MAIL_FROM || process.env.SMTP_USER,
          to: process.env.MAIL_TO || 'support@clevelandsmarthomesolutions.com',
          subject: 'CSHS SMTP diagnostic',
          text: 'This is a diagnostic test send. If you received this, SMTP works.',
        });
        out.testSend = { ok: true, messageId: info.messageId, accepted: info.accepted, rejected: info.rejected, response: info.response };
      } catch (e) {
        out.testSend = errInfo(e);
      }
    }
  } catch (e) {
    out.fatal = errInfo(e);
  }

  res.statusCode = 200;
  return res.end(JSON.stringify(out, null, 2));
};
