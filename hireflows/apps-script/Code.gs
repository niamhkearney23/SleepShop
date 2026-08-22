/**
 * Code.gs
 * Web App entrypoint. Receives applicant submissions, scores via Claude,
 * writes a row to the Applications sheet, uploads the resume to Drive, and
 * queues the accept/decline email for 24 hours later.
 *
 * Deploy: Extensions > Apps Script > Deploy > New deployment > Web app
 *   Execute as: Me (the firm's account)
 *   Who has access: Anyone
 */

const QUEUE_DELAY_HOURS = 24;
const RESUME_FOLDER_NAME = 'Hireflows Resumes';
const SHORTLIST_THRESHOLD = 60;

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME);

    const resumeUrl = uploadResume(data.name, data.resumeBase64, data.resumeFilename);

    const scoring = scoreWithClaude({
      q1: data.q1, q2: data.q2, q3: data.q3, q4: data.q4,
      q5: data.q5, q6: data.q6, q7: data.q7,
    });

    const decision = scoring.total >= SHORTLIST_THRESHOLD ? 'SHORTLIST' : 'DECLINE';
    const sendAt = new Date(Date.now() + QUEUE_DELAY_HOURS * 3600 * 1000);

    const row = [
      new Date(),
      data.name || '',
      data.email || '',
      data.phone || '',
      data.q1 || '', data.q2 || '', data.q3 || '',
      data.q4 || '', data.q5 || '', data.q6 || '', data.q7 || '',
      resumeUrl,
      scoring.total,
      scoring.rationale,
      decision,
      '',
      sendAt,
      'QUEUED',
      '',
      '',
      data.crm_optin ? 'Yes' : 'No',
    ];
    sheet.appendRow(row);

    if (data.crm_optin) {
      const crm = ss.getSheetByName(CRM_SHEET_NAME);
      crm.appendRow([new Date(), data.name, data.email, data.phone || '']);
    }

    return jsonOut({ok: true});
  } catch (err) {
    console.error(err);
    return jsonOut({ok: false, error: String(err)}, 500);
  }
}

function doGet() {
  return jsonOut({ok: true, service: 'Hireflows', endpoint: 'POST JSON with candidate answers'});
}

function jsonOut(obj, code) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function uploadResume(name, base64, filename) {
  if (!base64) return '';
  const folder = getOrCreateFolder(RESUME_FOLDER_NAME);
  const bytes = Utilities.base64Decode(base64);
  const safeName = (name || 'candidate').replace(/[^\w\-]/g, '_');
  const cleanFilename = safeName + '_' + (filename || 'resume.pdf');
  const file = folder.createFile(Utilities.newBlob(bytes, 'application/pdf', cleanFilename));
  return file.getUrl();
}

function getOrCreateFolder(name) {
  const iter = DriveApp.getFoldersByName(name);
  if (iter.hasNext()) return iter.next();
  return DriveApp.createFolder(name);
}

function scoreWithClaude(answers) {
  const apiKey = PropertiesService.getScriptProperties().getProperty('CLAUDE_API_KEY');
  if (!apiKey) throw new Error('CLAUDE_API_KEY not set in Script Properties');

  const prompt = buildScoringPrompt(answers);

  const response = UrlFetchApp.fetch('https://api.anthropic.com/v1/messages', {
    method: 'post',
    contentType: 'application/json',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    payload: JSON.stringify({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 1200,
      messages: [{role: 'user', content: prompt}],
    }),
    muteHttpExceptions: true,
  });

  const body = JSON.parse(response.getContentText());
  if (response.getResponseCode() !== 200) {
    throw new Error('Claude API error: ' + JSON.stringify(body));
  }

  const text = body.content[0].text;
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('No JSON in Claude response: ' + text);
  const parsed = JSON.parse(jsonMatch[0]);

  return {
    total: parsed.total_score,
    rationale: parsed.rationale,
    dimensions: parsed.dimensions,
  };
}

function buildScoringPrompt(a) {
  return [
    'You are scoring a paralegal applicant for a law firm.',
    'Score each of the ten dimensions from 0 to 10, then sum for a total out of 100.',
    'Dimensions: critical_thinking, written_communication, judgement, self_awareness,',
    '  attitude_motivation, innovation, attention_to_detail, time_management,',
    '  resilience, professional_integrity.',
    'Return ONLY a JSON object with keys: dimensions (map of the ten scores),',
    '  total_score (integer 0-100), rationale (2-3 sentence written summary).',
    '',
    '--- APPLICANT ANSWERS ---',
    'Q1 (About): ' + a.q1,
    'Q2 (Deadline handling): ' + a.q2,
    'Q3 (Partner mistake): ' + a.q3,
    'Q4 (Legal news): ' + a.q4,
    'Q5 (Strong qualities): ' + a.q5,
    'Q6 (Own mistake): ' + a.q6,
    'Q7 (Client email declining a meeting): ' + a.q7,
  ].join('\n');
}
