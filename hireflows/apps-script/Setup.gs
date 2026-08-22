/**
 * Setup.gs
 * Run initSheet() ONCE from the Apps Script editor after pasting these files.
 * It creates the Applications sheet with all columns and validation.
 */

const SHEET_NAME = 'Applications';
const CRM_SHEET_NAME = 'CRM';

const HEADERS = [
  'Timestamp',           //  A
  'Name',                //  B
  'Email',               //  C
  'Phone',               //  D
  'Q1: About',           //  E
  'Q2: Deadline',        //  F
  'Q3: Partner mistake', //  G
  'Q4: Legal news',      //  H
  'Q5: Qualities',       //  I
  'Q6: Own mistake',     //  J
  'Q7: Client email',    //  K
  'Resume URL',          //  L
  'AI Score',            //  M
  'AI Rationale',        //  N
  'AI Decision',         //  O   SHORTLIST / DECLINE
  'Override',            //  P   blank / ACCEPT / DECLINE / CANCEL
  'Send At',             //  Q   ISO timestamp
  'Email Status',        //  R   QUEUED / SENT / CANCELLED
  'Post-Interview',      //  S   blank / ACCEPT / REJECT
  'Diviya Notified',     //  T   blank / SENT
  'CRM Opt-in',          //  U   Yes / No
];

function initSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);

  sheet.clear();
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS])
       .setFontWeight('bold').setBackground('#1A1A1A').setFontColor('#F4EFE4');
  sheet.setFrozenRows(1);

  sheet.setColumnWidth(1, 150);
  sheet.setColumnWidth(2, 160);
  sheet.setColumnWidth(3, 200);
  sheet.setColumnWidth(4, 130);
  for (let c = 5; c <= 11; c++) sheet.setColumnWidth(c, 220);
  sheet.setColumnWidth(12, 220);
  sheet.setColumnWidth(13, 80);
  sheet.setColumnWidth(14, 320);
  sheet.setColumnWidth(15, 110);
  sheet.setColumnWidth(16, 110);
  sheet.setColumnWidth(17, 150);
  sheet.setColumnWidth(18, 110);
  sheet.setColumnWidth(19, 130);
  sheet.setColumnWidth(20, 130);
  sheet.setColumnWidth(21, 90);

  const overrideRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['', 'ACCEPT', 'DECLINE', 'CANCEL'], true).build();
  sheet.getRange('P2:P').setDataValidation(overrideRule);

  const postRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['', 'ACCEPT', 'REJECT'], true).build();
  sheet.getRange('S2:S').setDataValidation(postRule);

  const shortlist = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('SHORTLIST').setBackground('#E4EFDF').setRanges([sheet.getRange('O2:O')]).build();
  const decline = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('DECLINE').setBackground('#F8DDD5').setRanges([sheet.getRange('O2:O')]).build();
  sheet.setConditionalFormatRules([shortlist, decline]);

  let crm = ss.getSheetByName(CRM_SHEET_NAME);
  if (!crm) crm = ss.insertSheet(CRM_SHEET_NAME);
  crm.clear();
  crm.getRange(1, 1, 1, 4).setValues([['Timestamp', 'Name', 'Email', 'Phone']])
     .setFontWeight('bold').setBackground('#1A1A1A').setFontColor('#F4EFE4');
  crm.setFrozenRows(1);

  SpreadsheetApp.getUi().alert('Setup complete. Now: set CLAUDE_API_KEY in Project Settings > Script Properties, then deploy as Web App.');
}

function installTriggers() {
  ScriptApp.getProjectTriggers().forEach(t => ScriptApp.deleteTrigger(t));

  ScriptApp.newTrigger('sendQueuedEmails').timeBased().everyMinutes(15).create();

  ScriptApp.newTrigger('onEditHandler')
    .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
    .onEdit().create();

  ScriptApp.newTrigger('weeklyCrmExport').timeBased()
    .onWeekDay(ScriptApp.WeekDay.MONDAY).atHour(8).create();

  SpreadsheetApp.getUi().alert('Triggers installed. You may need to authorise permissions on first run.');
}
