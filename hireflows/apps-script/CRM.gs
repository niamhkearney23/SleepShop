/**
 * CRM.gs
 * Runs every Monday at 08:00 (installed by installTriggers()).
 * Exports newly opted-in candidates from the CRM sheet as a CSV
 * and emails it to CRM_EXPORT_EMAIL.
 */

function weeklyCrmExport() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const crm = ss.getSheetByName(CRM_SHEET_NAME);
  const lastRow = crm.getLastRow();
  if (lastRow < 2) return;

  const headerRow = crm.getRange(1, 1, 1, crm.getLastColumn()).getValues()[0];
  let exportedCol = headerRow.indexOf('Exported') + 1;
  if (exportedCol === 0) {
    exportedCol = crm.getLastColumn() + 1;
    crm.getRange(1, exportedCol).setValue('Exported')
       .setFontWeight('bold').setBackground('#1A1A1A').setFontColor('#F4EFE4');
  }

  const range = crm.getRange(2, 1, lastRow - 1, exportedCol);
  const values = range.getValues();

  const fresh = [];
  const rowsToMark = [];
  for (let i = 0; i < values.length; i++) {
    if (!values[i][exportedCol - 1]) {
      fresh.push(values[i].slice(0, 4));
      rowsToMark.push(i + 2);
    }
  }
  if (!fresh.length) {
    console.log('No new CRM opt-ins this week.');
    return;
  }

  const csv = 'Timestamp,Name,Email,Phone\n' +
    fresh.map(r => r.map(csvField).join(',')).join('\n');

  const dest = PropertiesService.getScriptProperties().getProperty('CRM_EXPORT_EMAIL');
  if (!dest) {
    console.error('CRM_EXPORT_EMAIL not set in Script Properties');
    return;
  }

  const stamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');
  const blob = Utilities.newBlob(csv, 'text/csv', 'crm-optins-' + stamp + '.csv');

  MailApp.sendEmail({
    to: dest,
    subject: 'Hireflows: weekly CRM opt-ins (' + fresh.length + ')',
    body: 'Attached: ' + fresh.length + ' new opt-ins from the past week.',
    attachments: [blob],
  });

  rowsToMark.forEach(r => crm.getRange(r, exportedCol).setValue(new Date()));
  console.log('CRM export sent: ' + fresh.length + ' rows.');
}

function csvField(v) {
  const s = String(v == null ? '' : v);
  if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
  return s;
}
