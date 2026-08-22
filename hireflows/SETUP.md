# Hireflows — Firm Setup Guide

Everything runs inside the firm's own Google Workspace.
Hireflows keeps no candidate data.

Estimated time: **~30 minutes**.

## What you'll need before you start

- A Gmail address for the firm (e.g. `careers@thomasphilip.com.my`)
- A Google account signed in to Drive and Sheets
- An Anthropic (Claude) API key — sign up at https://console.anthropic.com
- A Netlify account (free tier) or any static host, to serve the applicant form

## 1. Create the Sheet

1. Go to https://sheets.new (this creates a new sheet in the firm's Drive).
2. Rename it `Hireflows — Applications` (or whatever you like).
3. `Extensions > Apps Script`. This opens the script editor for this sheet.

## 2. Paste the code

In the Apps Script editor:

1. Rename `Code.gs` to something clear. Delete its contents.
2. Create six script files with **File > New > Script**, one per file in `apps-script/`:
   - `Setup.gs`
   - `Code.gs`
   - `Send.gs`
   - `PostInterview.gs`
   - `CRM.gs`
   - `Templates.gs`
3. Copy the contents of each `.gs` file from this repo into the matching script file.
4. **Save** (Ctrl/Cmd-S).

## 3. Add the API key and firm settings

`Project Settings` (the gear icon) `> Script Properties > Add script property`.
Add all of these:

| Property | Example value |
|---|---|
| `CLAUDE_API_KEY` | `sk-ant-…` (from console.anthropic.com) |
| `FIRM_NAME` | `Thomas Philip Advocates & Solicitors` |
| `FROM_NAME` | `Thomas Philip Careers` |
| `CALENDLY_URL` | `https://calendly.com/thomasphilip/paralegal-screening` |
| `OFFER_COORDINATOR_EMAIL` | `diviya@thomasphilip.com.my` |
| `CRM_EXPORT_EMAIL` | `hello@thomasphilip.com.my` |

## 4. Initialise the sheet

Back in the editor, select `initSheet` from the function dropdown at the top and click **Run**.
Google will ask you to authorise permissions the first time — click through, using the firm's Google account.

The Applications sheet is now populated with all columns and validation.

## 5. Install the triggers

Same dropdown, now pick `installTriggers` and click **Run**.
This creates:
- Every 15 min → `sendQueuedEmails` (sends queued accept/decline emails past their queue time)
- On sheet edit → `onEditHandler` (fires the offer-coordinator handoff)
- Every Monday 08:00 → `weeklyCrmExport` (emails the CRM CSV)

## 6. Deploy as a Web App

`Deploy > New deployment > (gear) Web app`.

- Description: `Hireflows form endpoint`
- Execute as: **Me** (the firm's account)
- Who has access: **Anyone**

Click **Deploy**. Copy the **Web app URL** — it looks like `https://script.google.com/macros/s/AKfycb…/exec`.

## 7. Host the applicant form

1. Open `form/index.html` in this repo.
2. Find `const ENDPOINT = 'PASTE_WEB_APP_URL_HERE';` and paste the URL from step 6.
3. Drag `form/index.html` into https://app.netlify.com/drop — you get a live URL.
4. (Optional) Point `apply.thomasphilip.com.my` at the Netlify site.

## 8. Test it end-to-end

Submit a test application through the form. Within a minute you should see:
- A new row in the Sheet
- A score and rationale in columns M–O
- A resume file in the "Hireflows Resumes" Drive folder
- Email Status = `QUEUED`, Send At = 24h from now

To test the send loop without waiting 24h:
1. Open the row in the sheet
2. Change **Send At** (column Q) to a time in the past
3. Wait up to 15 min for `sendQueuedEmails` to fire (or run it manually from the editor)

## 9. Day-to-day operation

- **Override the AI**: set column P (Override) to `ACCEPT`, `DECLINE`, or `CANCEL`.
- **Send immediately**: change column Q (Send At) to a past timestamp.
- **After a screening call**: set column S (Post-Interview) to `ACCEPT` or `REJECT` — the offer coordinator gets the handoff email automatically.
- **Weekly CRM export**: arrives in `CRM_EXPORT_EMAIL` inbox every Monday morning.

## Rolling back / disconnecting

Everything belongs to the firm:
- Delete the Apps Script project → the whole system stops
- Rotate the Claude API key → the AI scoring stops but past data is untouched
- Take down the Netlify form → new applications stop; existing pipeline keeps running
- Revoke any editor access on the Apps Script project → Hireflows loses all access

Nothing lives outside the firm's Google account. There is no external database to purge.
