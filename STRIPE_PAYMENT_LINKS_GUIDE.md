# 🔗 How to Update Stripe Payment Links

## 📍 Location of Payment Links

Your Stripe payment links are located in **ONE FILE**:

### `/src/app/components/ProductDetailPage.tsx`

**Lines 189-191:**

```tsx
<StripeCheckoutButton 
  paymentLink="https://buy.stripe.com/fZu8wIf6rgcO4Fe2ZPa7C02"
  subscriptionPaymentLink="https://buy.stripe.com/3cIaEQbUf1hUc7G9oda7C01"
  isSubscription={isSubscription}
  className="w-full" 
/>
```

---

## 🛠️ How to Update Payment Links

### Step 1: Get New Links from Stripe
1. Go to your [Stripe Dashboard](https://dashboard.stripe.com/)
2. Navigate to **Products** → **Payment Links**
3. Create or edit your payment links
4. Copy the full URL (e.g., `https://buy.stripe.com/xxxxxxxxxxxxx`)

### Step 2: Update the Code
Open `/src/app/components/ProductDetailPage.tsx` and find these lines (around line 189-191):

```tsx
<StripeCheckoutButton 
  paymentLink="YOUR_NEW_ONE_TIME_LINK_HERE"
  subscriptionPaymentLink="YOUR_NEW_SUBSCRIPTION_LINK_HERE"
  isSubscription={isSubscription}
  className="w-full" 
/>
```

### Step 3: Push to GitHub
```bash
git add .
git commit -m "Updated Stripe payment links"
git push origin main
```

Vercel will automatically deploy the changes!

---

## 💡 Current Payment Structure

- **One-Time Purchase:** $39 AUD
- **Subscribe & Save:** $31 AUD (delivered every 10 days)
- **Discount:** 20% off for subscription

---

## ⚠️ Important Notes

1. **Only one file to edit** - Just update ProductDetailPage.tsx
2. **Test your links** - Click the button on your site after deployment to ensure checkout works
3. **Keep links secure** - These are public payment links, which is fine for Stripe
4. **Vercel auto-deploys** - Changes go live automatically after pushing to GitHub

---

## 🆘 Troubleshooting

**Payment button not working?**
- Check the Stripe links are complete URLs starting with `https://buy.stripe.com/`
- Verify the links in your Stripe Dashboard are active
- Check browser console for errors

**Need to change prices?**
- Update prices in Stripe Dashboard
- The payment links will automatically reflect the new prices
- No code changes needed unless you want to update the displayed price on the page

---

Last Updated: February 2026
