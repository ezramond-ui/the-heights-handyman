/**
 * POST /api/contact — emails a contact-form submission to the owner.
 * Works as a Vercel serverless function (and via the local dev server).
 */
const { isConfigured, sendMail, readBody, esc, validEmail } = require('./_lib/mailer');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    return res.end(JSON.stringify({ error: 'Method not allowed' }));
  }

  const body = await readBody(req);
  const { name, email, phone, city, tier, message, company } = body;

  // Honeypot: bots fill this hidden field. Pretend success, send nothing.
  if (company) {
    res.statusCode = 200;
    return res.end(JSON.stringify({ ok: true }));
  }

  if (!name || !validEmail(email) || !message) {
    res.statusCode = 400;
    return res.end(
      JSON.stringify({ error: 'Please provide your name, a valid email, and a message.' })
    );
  }

  if (!isConfigured()) {
    // Email backend not set up yet (e.g. before go-live).
    res.statusCode = 503;
    return res.end(
      JSON.stringify({
        error:
          'Our online form isn’t connected yet. Please call or text us directly and we’ll respond right away.',
      })
    );
  }

  const subject = `New quote request — ${name}${city ? ' (' + city + ')' : ''}`;
  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    city ? `City/Area: ${city}` : null,
    tier ? `Interested in: ${tier}` : null,
    '',
    'Message:',
    message,
  ].filter((l) => l !== null);

  const html = `
    <h2 style="font-family:Georgia,serif">New quote request</h2>
    <table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">
      <tr><td><strong>Name</strong></td><td>${esc(name)}</td></tr>
      <tr><td><strong>Email</strong></td><td>${esc(email)}</td></tr>
      ${phone ? `<tr><td><strong>Phone</strong></td><td>${esc(phone)}</td></tr>` : ''}
      ${city ? `<tr><td><strong>City/Area</strong></td><td>${esc(city)}</td></tr>` : ''}
      ${tier ? `<tr><td><strong>Interested in</strong></td><td>${esc(tier)}</td></tr>` : ''}
    </table>
    <p style="font-family:Arial,sans-serif;font-size:14px"><strong>Message:</strong><br>${esc(message).replace(/\n/g, '<br>')}</p>`;

  try {
    await sendMail({ subject, text: lines.join('\n'), html, replyTo: email });
    res.statusCode = 200;
    return res.end(JSON.stringify({ ok: true }));
  } catch (err) {
    console.error('contact send failed:', err);
    res.statusCode = 500;
    return res.end(
      JSON.stringify({ error: 'We couldn’t send your message. Please call or email us directly.' })
    );
  }
};
