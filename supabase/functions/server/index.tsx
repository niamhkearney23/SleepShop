import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-e1013b8c/health", (c) => {
  return c.json({ status: "ok" });
});

// Email subscription endpoint
app.post("/make-server-e1013b8c/subscribe", async (c) => {
  try {
    const { email } = await c.req.json();

    if (!email || !email.includes('@')) {
      return c.json({ error: "Invalid email address" }, 400);
    }

    // Store email with timestamp
    const subscriptionData = {
      email,
      subscribedAt: new Date().toISOString(),
    };

    const key = `newsletter_subscription_${email}`;
    await kv.set(key, subscriptionData);

    console.log(`New subscription: ${email}`);

    // Send email notification to admin
    try {
      const resendApiKey = Deno.env.get('RESEND_API_KEY');
      
      if (resendApiKey) {
        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: 'Sleep Shop <onboarding@resend.dev>',
            to: ['neevy2000@hotmail.com'],
            subject: '🌙 New Sleep Shop Newsletter Subscription',
            html: `
              <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #2C3E50; font-family: 'Playfair Display', serif;">New Newsletter Subscription</h2>
                <p style="color: #333; font-size: 16px;">Someone just subscribed to your Sleep Shop newsletter!</p>
                <div style="background: #F7F7F7; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <p style="margin: 0; color: #2C3E50;"><strong>Email:</strong> ${email}</p>
                  <p style="margin: 10px 0 0 0; color: #666; font-size: 14px;"><strong>Subscribed at:</strong> ${new Date().toLocaleString()}</p>
                </div>
                <p style="color: #666; font-size: 14px; margin-top: 30px;">
                  You can view all subscriptions by checking your Supabase dashboard or calling the /subscriptions endpoint.
                </p>
              </div>
            `,
          }),
        });

        if (!emailResponse.ok) {
          const errorData = await emailResponse.json();
          console.error('Failed to send email notification:', errorData);
        } else {
          console.log('Email notification sent successfully');
        }
      } else {
        console.warn('RESEND_API_KEY not set - skipping email notification');
      }
    } catch (emailError) {
      console.error('Error sending email notification:', emailError);
      // Don't fail the subscription if email fails
    }

    return c.json({ 
      success: true, 
      message: "Successfully subscribed!" 
    });
  } catch (error) {
    console.error("Subscription error:", error);
    return c.json({ 
      error: "Failed to subscribe. Please try again." 
    }, 500);
  }
});

// Get all subscriptions (for admin use)
app.get("/make-server-e1013b8c/subscriptions", async (c) => {
  try {
    const subscriptions = await kv.getByPrefix("newsletter_subscription_");
    return c.json({ subscriptions });
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    return c.json({ error: "Failed to fetch subscriptions" }, 500);
  }
});

Deno.serve(app.fetch);