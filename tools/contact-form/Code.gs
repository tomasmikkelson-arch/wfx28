/**
 * Contact form handler for isychenko.com — runs in YOUR Google account (free, no ads, no third party).
 *
 * Setup (5 minutes, once):
 *  1. Open https://script.google.com → New project → paste this file instead of the default code.
 *  2. Change TO_EMAIL below if needed. Save (Ctrl+S).
 *  3. Deploy → New deployment → type "Web app".
 *       Execute as: Me
 *       Who has access: Anyone
 *     → Deploy → allow access with your Google account.
 *  4. Copy the "Web app URL" (https://script.google.com/macros/s/…/exec)
 *     and put it into content/site.js → formEndpoint. Push — done.
 */
const TO_EMAIL = 'tomas.mikkelson@gmail.com';
const SITE_NAME = 'isychenko.com';

function doPost(e) {
  try {
    const d = JSON.parse((e && e.postData && e.postData.contents) || '{}');

    // Spam protection: hidden honeypot field must stay empty.
    if (d._honey) return json_({ ok: true });

    const name = clean_(d.name, 120);
    const email = clean_(d.email, 160);
    const phone = clean_(d.phone, 60);
    const message = clean_(d.message, 5000);
    if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json_({ ok: false, error: 'invalid' });

    // Basic rate limit: max 5 messages per sender email per hour.
    const cache = CacheService.getScriptCache();
    const key = 'rl_' + email.toLowerCase();
    const count = Number(cache.get(key) || 0);
    if (count >= 5) return json_({ ok: false, error: 'rate' });
    cache.put(key, String(count + 1), 3600);

    const rows = [
      ['Name', name],
      ['Email', email],
      ['Phone', phone || '—'],
      ['Language', clean_(d.lang, 10) || '—'],
      ['Page', clean_(d.page, 300) || '—'],
    ];
    const html =
      '<div style="font-family:Arial,sans-serif;font-size:15px;color:#1c1a1a">' +
      '<h2 style="color:#7d71f7;margin:0 0 16px">New message from ' + SITE_NAME + '</h2>' +
      '<table cellpadding="6" style="border-collapse:collapse">' +
      rows.map(function (r) { return '<tr><td style="color:#8a8a8a">' + r[0] + '</td><td><b>' + esc_(r[1]) + '</b></td></tr>'; }).join('') +
      '</table><p style="margin:18px 0 6px;color:#8a8a8a">Message:</p>' +
      '<div style="white-space:pre-wrap;background:#f6f5ff;border-radius:12px;padding:14px">' + esc_(message) + '</div></div>';

    MailApp.sendEmail({
      to: TO_EMAIL,
      replyTo: email, // press "Reply" in Gmail to answer the visitor directly
      name: SITE_NAME,
      subject: 'New message from ' + SITE_NAME + ' — ' + name,
      htmlBody: html,
      body: rows.map(function (r) { return r[0] + ': ' + r[1]; }).join('\n') + '\n\n' + message,
    });
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: 'server' });
  }
}

function doGet() {
  return json_({ ok: true, service: SITE_NAME + ' contact form' });
}

function clean_(v, max) { return String(v == null ? '' : v).trim().slice(0, max); }
function esc_(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
function json_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
