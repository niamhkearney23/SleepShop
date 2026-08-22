/**
 * PostInterview.gs
 * Fires on any edit. When someone sets column S (Post-Interview) to
 * ACCEPT or REJECT, emails the offer coordinator with the candidate's
 * full details so they can send the offer or rejection letter.
 */

function onEditHandler(e) {
  const range = e.range;
  const sheet = range.getSheet();
  if (sheet.getName() !== SHEET_NAME) return;
  if (range.getColumn() !== 19) return;
  if (range.getRow() < 2) return;

  const value = String(range.getValue()).trim().toUpperCase();
  if (value !== 'ACCEPT' && value !== 'REJECT') return;

  const rowIdx = range.getRow();
  const rowData = sheet.getRange(rowIdx, 1, 1, HEADERS.length).getValues()[0];

  if (rowData[19] === 'SENT') return;

  const coordinator = PropertiesService.getScriptProperties()
    .getProperty('OFFER_COORDINATOR_EMAIL');
  if (!coordinator) {
    console.error('OFFER_COORDINATOR_EMAIL not set in Script Properties');
    return;
  }

  try {
    if (value === 'ACCEPT') {
      sendOfferHandoffEmail(coordinator, rowData);
    } else {
      sendRejectionHandoffEmail(coordinator, rowData);
    }
    sheet.getRange(rowIdx, 20).setValue('SENT');
  } catch (err) {
    console.error('Post-interview handoff failed: ' + err);
  }
}
