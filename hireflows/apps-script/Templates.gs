/**
 * Templates.gs
 * The email templates that go out. Edit the copy here to change what
 * candidates and the offer coordinator receive.
 *
 * Set these in Script Properties:
 *   FIRM_NAME               e.g. "Thomas Philip Advocates & Solicitors"
 *   FROM_NAME               e.g. "Thomas Philip Careers"
 *   CALENDLY_URL            e.g. "https://calendly.com/thomasphilip/paralegal-screening"
 *   OFFER_COORDINATOR_EMAIL e.g. "diviya@thomasphilip.com.my"
 *   CRM_EXPORT_EMAIL        e.g. "hello@thomasphilip.com.my"
 */

function prop(name) {
  return PropertiesService.getScriptProperties().getProperty(name) || '';
}

function sendShortlistEmail(to, name) {
  const firm = prop('FIRM_NAME') || 'our firm';
  const from = prop('FROM_NAME') || 'Careers Team';
  const calendly = prop('CALENDLY_URL') || '';

  const html = [
    '<p>Dear ' + escapeHtml(name || 'Applicant') + ',</p>',
    '<p>Thank you for completing our online assessment. We were impressed by your answers ',
    'and would like to invite you to a short screening call.</p>',
    '<p>Please book a 15-minute slot that suits you:<br>',
    '<a href="' + calendly + '">' + calendly + '</a></p>',
    '<p>The call will take place on Zoom or Google Meet, generated automatically once you book.</p>',
    '<p>We look forward to speaking with you.</p>',
    '<p>Kind regards,<br>' + escapeHtml(from) + '<br>' + escapeHtml(firm) + '</p>',
  ].join('\n');

  MailApp.sendEmail({
    to: to,
    subject: 'Next step: your ' + firm + ' paralegal application',
    htmlBody: html,
    name: from,
  });
}

function sendDeclineEmail(to, name) {
  const firm = prop('FIRM_NAME') || 'our firm';
  const from = prop('FROM_NAME') || 'Careers Team';

  const html = [
    '<p>Dear ' + escapeHtml(name || 'Applicant') + ',</p>',
    '<p>Thank you for taking the time to apply for a paralegal position with ' + escapeHtml(firm) + '.</p>',
    '<p>After careful review of your assessment, we will not be moving forward with your application at this time.</p>',
    '<p>We appreciate the effort you put in and encourage you to apply again in the future as your experience grows.</p>',
    '<p>With warm regards,<br>' + escapeHtml(from) + '<br>' + escapeHtml(firm) + '</p>',
  ].join('\n');

  MailApp.sendEmail({
    to: to,
    subject: 'Your application to ' + firm,
    htmlBody: html,
    name: from,
  });
}

function sendOfferHandoffEmail(coordinator, row) {
  const firm = prop('FIRM_NAME');
  const [ts, name, email, phone, q1, q2, q3, q4, q5, q6, q7, resumeUrl,
         score, rationale] = row;

  const html = [
    '<p>The screening call for the candidate below has resulted in an <b>ACCEPT</b>.',
    'Please send the offer letter using the details below.</p>',
    '<h3>' + escapeHtml(name) + '</h3>',
    '<p><b>Email:</b> ' + escapeHtml(email) + '<br>',
    '<b>Phone:</b> ' + escapeHtml(phone || '—') + '<br>',
    '<b>AI score:</b> ' + score + ' &nbsp; <b>Applied:</b> ' + escapeHtml(String(ts)) + '</p>',
    '<p><b>Resume:</b> <a href="' + resumeUrl + '">' + resumeUrl + '</a></p>',
    '<p><b>AI rationale:</b><br>' + escapeHtml(rationale || '') + '</p>',
  ].join('\n');

  MailApp.sendEmail({
    to: coordinator,
    subject: 'Send offer letter — ' + name,
    htmlBody: html,
  });
}

function sendRejectionHandoffEmail(coordinator, row) {
  const [ts, name, email, phone] = row;
  const html = [
    '<p>The screening call for the candidate below has resulted in a <b>REJECT</b>.',
    'Please send the post-interview rejection letter.</p>',
    '<h3>' + escapeHtml(name) + '</h3>',
    '<p><b>Email:</b> ' + escapeHtml(email) + '<br>',
    '<b>Phone:</b> ' + escapeHtml(phone || '—') + '</p>',
  ].join('\n');

  MailApp.sendEmail({
    to: coordinator,
    subject: 'Send post-interview rejection — ' + name,
    htmlBody: html,
  });
}

function escapeHtml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
