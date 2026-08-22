/**
 * Send.gs
 * Time-triggered every 15 minutes. Finds rows whose queued email is due,
 * respects any human override, sends the appropriate email, marks status.
 */

function sendQueuedEmails() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return;

  const range = sheet.getRange(2, 1, lastRow - 1, HEADERS.length);
  const values = range.getValues();

  const now = new Date();
  let sent = 0, cancelled = 0;

  for (let i = 0; i < values.length; i++) {
    const row = values[i];
    const rowIdx = i + 2;
    const status = row[17];
    if (status !== 'QUEUED') continue;

    const override = row[15];
    if (override === 'CANCEL') {
      sheet.getRange(rowIdx, 18).setValue('CANCELLED');
      cancelled++;
      continue;
    }

    const sendAt = row[16];
    if (!(sendAt instanceof Date) || sendAt > now) continue;

    const decision = effectiveDecision(row[14], override);
    const name = row[1];
    const email = row[2];

    try {
      if (decision === 'SHORTLIST') {
        sendShortlistEmail(email, name);
      } else {
        sendDeclineEmail(email, name);
      }
      sheet.getRange(rowIdx, 18).setValue('SENT');
      sent++;
    } catch (err) {
      console.error('Failed to send for row ' + rowIdx + ': ' + err);
    }
  }

  console.log('sendQueuedEmails: sent=' + sent + ' cancelled=' + cancelled);
}

function effectiveDecision(aiDecision, override) {
  if (override === 'ACCEPT') return 'SHORTLIST';
  if (override === 'DECLINE') return 'DECLINE';
  return aiDecision;
}
