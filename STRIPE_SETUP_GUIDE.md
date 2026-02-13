# 🔐 Stripe Payment Setup Guide for Sleep Shop

## Overview
Your Sleep Shop site already has Stripe integration ready! You just need to replace the test payment link with your real Stripe Payment Link.

---

## Step 1: Create Your Stripe Payment Links

### For One-Time Purchase ($65)
1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Click **Products** in the left sidebar
3. Click **+ Add Product**
4. Fill in product details:
   - **Name**: Dr Gut Pro-S (One-Time)
   - **Description**: A science-backed gut-brain supplement
   - **Price**: $65 AUD
   - **Recurring**: Leave unchecked
5. Click **Save product**
6. Click **Create payment link** button
7. Copy the payment link (it will look like: `https://buy.stripe.com/xxxxx`)

### For Subscription ($52/month)
1. Click **+ Add Product** again
2. Fill in product details:
   - **Name**: Dr Gut Pro-S (Subscription)
   - **Description**: Monthly subscription - Save 20%
   - **Price**: $52 AUD
   - **Recurring**: Check this and select "Monthly"
5. Click **Save product**
6. Click **Create payment link** button
7. Copy the payment link

---

## Step 2: Update Your Code

Open `/src/app/components/ProductDetailPage.tsx` and find line 148:

```tsx
<StripeCheckoutButton paymentLink="YOUR_STRIPE_PAYMENT_LINK_HERE" className="w-full" />
```

### Option A: Use Dynamic Links (Recommended)
Replace with:

```tsx
<StripeCheckoutButton 
  paymentLink={isSubscription 
    ? "https://buy.stripe.com/YOUR_SUBSCRIPTION_LINK" 
    : "https://buy.stripe.com/YOUR_ONE_TIME_LINK"
  } 
  className="w-full" 
/>
```

### Option B: Always Use One-Time Purchase
Replace with:

```tsx
<StripeCheckoutButton 
  paymentLink="https://buy.stripe.com/YOUR_ONE_TIME_LINK" 
  className="w-full" 
/>
```

---

## Step 3: Test Your Payment

1. Push your changes to GitHub:
   ```bash
   git add .
   git commit -m "Update Stripe payment links"
   git push
   ```

2. Wait for Vercel to deploy (usually 1-2 minutes)

3. Visit your site and click "Buy Now"

4. You'll be redirected to Stripe's secure checkout page

5. Use Stripe's test card numbers to test:
   - **Success**: 4242 4242 4242 4242
   - **Decline**: 4000 0000 0000 0002
   - Use any future expiry date and any 3-digit CVC

---

## Step 4: Handle Quantity (Optional Enhancement)

Currently, the quantity selector on your product page doesn't affect the Stripe checkout. To handle multiple quantities:

### Option 1: Use Stripe Checkout with Line Items
You'll need to implement a custom checkout session (more complex, but allows quantity selection)

### Option 2: Create Payment Links for Common Quantities
- Create separate products: "Dr Gut Pro-S (x1)", "Dr Gut Pro-S (x2)", etc.
- Update your code to select the appropriate link based on quantity

### Option 3: Remove Quantity Selector
Since most supplements are sold as single units, you could remove the quantity selector entirely.

---

## Important Settings in Stripe Dashboard

### Payment Settings
- Go to **Settings** → **Payment methods**
- Enable: Cards, Apple Pay, Google Pay
- Consider enabling: Afterpay, Klarna for installment payments

### Customer Emails
- Go to **Settings** → **Emails**
- Enable "Successful payments" to send customers receipts
- Customize email templates with your branding

### Tax Collection (For Australia)
- Go to **Settings** → **Tax**
- Enable automatic tax calculation
- Set your business location to Australia
- Stripe will handle GST automatically

### Subscriptions (If using subscriptions)
- Go to **Settings** → **Billing**
- Set up dunning management (retry failed payments)
- Configure cancellation settings
- Enable customer portal so customers can manage subscriptions

---

## After Customer Purchases

Stripe will:
✅ Process the payment securely
✅ Send customer a receipt email
✅ Handle failed payments (for subscriptions)
✅ Provide refund capabilities in your dashboard

You'll need to:
📦 Set up order fulfillment (ship products)
📧 Consider sending a welcome email
📊 Track orders in Stripe Dashboard

---

## Need Help?

**Stripe Support**: [https://support.stripe.com](https://support.stripe.com)
**Test Mode**: Always test with test payment links before going live!
**Switch to Live Mode**: Toggle in top right of Stripe Dashboard when ready

---

## Current Implementation

Your StripeCheckoutButton component is in:
`/src/app/components/StripeCheckoutButton.tsx`

It currently has a test link:
`https://buy.stripe.com/test_7sY6oG1wR9yE0TVefc53O00`

Just replace this with your real payment link!
