import { NextResponse } from "next/server";
import { Resend } from "resend";

interface ContactBody {
  name: string;
  firm: string;
  email: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const body: ContactBody = await request.json();

    // Validate required fields
    if (!body.name?.trim()) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    if (!body.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    const contactEmail = process.env.CONTACT_EMAIL || "hello@merritt.co";

    await resend.emails.send({
      from: fromEmail,
      to: contactEmail,
      subject: `Enquiry from ${body.name}${body.firm ? ` — ${body.firm}` : ""}`,
      replyTo: body.email,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; color: #1A1A1A;">
          <h2 style="font-size: 18px; font-weight: 600; margin-bottom: 24px; border-bottom: 1px solid #e5e5e5; padding-bottom: 12px;">
            New enquiry via merritt.co
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 100px; vertical-align: top;">Name</td>
              <td style="padding: 8px 0;">${escapeHtml(body.name)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; vertical-align: top;">Firm</td>
              <td style="padding: 8px 0;">${escapeHtml(body.firm || "—")}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; vertical-align: top;">Email</td>
              <td style="padding: 8px 0;">
                <a href="mailto:${escapeHtml(body.email)}" style="color: #2D3E2C;">${escapeHtml(body.email)}</a>
              </td>
            </tr>
            ${body.message ? `
            <tr>
              <td style="padding: 8px 0; color: #666; vertical-align: top;">Message</td>
              <td style="padding: 8px 0;">${escapeHtml(body.message)}</td>
            </tr>
            ` : ""}
          </table>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
