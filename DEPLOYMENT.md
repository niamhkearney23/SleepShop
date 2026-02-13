# Sleep Shop - Deployment Instructions

## 🚀 Quick Setup (15 minutes)

Your Sleep Shop React app is now ready to deploy with Stripe payments!

---

## Step 1: Set Up Stripe (5 minutes)

### Create Your Product in Stripe

1. **Sign up for Stripe** (if you haven't already)
   - Go to https://stripe.com
   - Click "Start now" and create an account
   - Complete the verification process

2. **Create Your Product**
   - Go to Stripe Dashboard → Products
   - Click "+ Add product"
   - Fill in:
     - **Name**: Sleep Shop - Gut-Brain Sleep Support
     - **Description**: Science-backed supplements for better sleep
     - **Price**: $XX.XX (your price)
     - **Currency**: AUD (or your currency)

3. **Generate Payment Link**
   - After creating the product, click "Create a payment link"
   - Configure settings:
     - ✅ Collect customer email
     - ✅ Collect shipping address
     - ✅ Allow quantity adjustments
   - Click "Create link"
   - **Copy the Payment Link URL** (looks like: `https://buy.stripe.com/test_XXXXX`)

4. **Update Your App**
   - Open `/src/app/components/StripeCheckoutButton.tsx`
   - Replace `YOUR_STRIPE_PAYMENT_LINK_HERE` with your actual Stripe Payment Link
   - Save the file

---

## Step 2: Deploy to Vercel (5 minutes)

### Prerequisites
- GitHub account (free)
- Vercel account (free - sign up at https://vercel.com)

### Deployment Steps

1. **Push Code to GitHub**
   ```bash
   # In your project directory
   git init
   git add .
   git commit -m "Initial commit - Sleep Shop"
   
   # Create a new repository on GitHub (github.com/new)
   # Then connect it:
   git remote add origin https://github.com/YOUR-USERNAME/sleep-shop.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to https://vercel.com and sign in
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Vercel will auto-detect it's a Vite app
   - Click "Deploy"
   - Wait 2-3 minutes ✨

3. **Your Site is Live!**
   - Vercel will give you a URL like: `https://sleep-shop-xxxx.vercel.app`
   - Click it to view your live site

---

## Step 3: Add Custom Domain (Optional - 5 minutes)

### In Vercel Dashboard

1. Go to your project → Settings → Domains
2. Enter your domain name (e.g., `sleepshop.com.au`)
3. Follow Vercel's DNS instructions
4. Wait for DNS propagation (5 minutes to 24 hours)

### Domain Providers
- **Namecheap** (recommended): $8-15/year
- **Google Domains**: ~$12/year
- **GoDaddy**: Variable pricing

---

## 💳 Payment Processing

### Transaction Flow

1. Customer clicks "Buy Now" on your site
2. They're redirected to Stripe's secure checkout page
3. They complete payment
4. Stripe handles:
   - Payment processing
   - Tax calculations (if configured)
   - Receipt emails
   - Fraud prevention
5. Customer is redirected back to a success page

### Stripe Fees
- **2.9% + $0.30** per transaction (standard rate)
- No monthly fees
- No setup fees

### Testing Mode
- Stripe starts in Test Mode
- Use test card: `4242 4242 4242 4242`
- Any future date for expiry
- Any 3-digit CVC

### Going Live
1. Complete Stripe account verification
2. Toggle "Test mode" OFF in Stripe Dashboard
3. Create a new Payment Link in Live Mode
4. Update your app with the new live Payment Link
5. Redeploy to Vercel (git push)

---

## 📊 Managing Orders

### In Stripe Dashboard

- **View payments**: Dashboard → Payments
- **Export orders**: Payments → Export
- **Customer data**: Customers → View all
- **Refunds**: Find payment → Refund
- **Email receipts**: Automatic (customers get them)

### Shipping Integration

Since you're using Stripe Payment Links, customers' shipping addresses are collected automatically. You can:

1. Export customer data daily/weekly
2. Use a fulfillment service integration
3. Or manually process from Stripe Dashboard

---

## 🔧 Advanced: Stripe Checkout Integration (Optional)

If you want more control over the checkout experience:

```tsx
// Install Stripe package (already installed)
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('YOUR_PUBLISHABLE_KEY');

// In your button component:
const handleCheckout = async () => {
  const stripe = await stripePromise;
  // Redirect to checkout
  const { error } = await stripe.redirectToCheckout({
    lineItems: [{ price: 'price_XXXXX', quantity: 1 }],
    mode: 'payment',
    successUrl: `${window.location.origin}/success`,
    cancelUrl: `${window.location.origin}`,
  });
};
```

For this setup, you'll need:
- A backend API (Vercel Serverless Functions, or separate backend)
- More development time
- Better for complex use cases

---

## 🎯 What You Get

### ✅ Fully Functional E-commerce Site
- Beautiful product page
- Secure payment processing
- Mobile responsive
- Fast loading times

### ✅ Zero Maintenance
- No server to manage
- Auto-scaling
- SSL certificate included
- CDN distribution worldwide

### ✅ Professional Features
- Stripe-handled PCI compliance
- Automatic tax calculations (if configured)
- Email receipts
- Refund management
- Fraud prevention

---

## 💰 Total Costs

| Item | Cost |
|------|------|
| Vercel Hosting | **FREE** (Hobby plan) |
| Stripe Account | **FREE** (pay-per-transaction) |
| Domain Name | ~$12/year (optional) |
| **Per Transaction** | **2.9% + $0.30** |

### Example:
- Product price: $50
- Stripe fee: $1.75
- You receive: $48.25

---

## 📞 Support & Next Steps

### Stripe Support
- Email: support@stripe.com
- Docs: https://stripe.com/docs

### Vercel Support
- Docs: https://vercel.com/docs
- Community: https://vercel.com/community

### Quick Wins After Launch

1. **Set up Google Analytics** (free traffic insights)
2. **Add Facebook Pixel** (retargeting ads)
3. **Enable Stripe Tax** (automatic tax calculation)
4. **Set up abandoned cart emails** (via Stripe)

---

## 🚨 Before You Go Live

### Checklist

- [ ] Stripe account fully verified
- [ ] Payment Link tested with test cards
- [ ] Switched to Stripe Live Mode
- [ ] Updated app with Live Payment Link
- [ ] Tested checkout flow end-to-end
- [ ] Privacy Policy page added (required by Stripe)
- [ ] Terms & Conditions page added
- [ ] Shipping policy clear to customers

---

## Need Help?

This setup is designed to be simple. But if you get stuck:

1. Stripe has 24/7 live chat support
2. Vercel has excellent documentation
3. Both platforms have active community forums

**Your store can be live in under 15 minutes. Let's go! 🚀**
