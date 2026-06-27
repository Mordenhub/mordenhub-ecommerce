/* ============================================================================
   MODERNHUB E-COMMERCE PLATFORM - COMPLETE PRODUCTION SETUP GUIDE
   ============================================================================
   
   This guide covers:
   1. Vercel Deployment (Step-by-step)
   2. Real Stripe Integration
   3. Email Notifications (Mailgun/SendGrid)
   4. Admin Dashboard
   5. Database Setup (Optional)
   6. Performance Optimization
   
   ========================================================================== */

// ============================================================================
// PART 1: VERCEL DEPLOYMENT GUIDE
// ============================================================================

/*
STEP 1: PREPARE YOUR PROJECT LOCALLY
────────────────────────────────────

Create a folder structure:
```
my-ecommerce-store/
├── package.json
├── .env.local
├── vercel.json
├── pages/
│   ├── index.js (your main store)
│   └── api/
│       ├── stripe.js
│       ├── email.js
│       └── orders.js
├── public/
└── lib/
    ├── stripe.js
    └── database.js
```

STEP 2: INSTALL DEPENDENCIES
────────────────────────────

npm init -y

npm install \
  react \
  react-dom \
  lucide-react \
  stripe \
  @stripe/react-stripe-js \
  @stripe/js \
  mailgun.js \
  nodemailer \
  axios \
  dotenv

STEP 3: CREATE package.json
──────────────────────────

{
  "name": "modernhub-ecommerce",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "export": "next export",
    "lint": "next lint"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "next": "^14.0.0",
    "stripe": "^13.0.0",
    "@stripe/react-stripe-js": "^2.0.0",
    "@stripe/js": "^3.0.0",
    "lucide-react": "latest",
    "mailgun.js": "^9.0.0",
    "nodemailer": "^6.9.0",
    "axios": "latest",
    "dotenv": "latest"
  }
}

STEP 4: CREATE .env.local (LOCAL TESTING)
─────────────────────────────────────────

STRIPE_PUBLIC_KEY=pk_test_YOUR_TEST_PUBLIC_KEY
STRIPE_SECRET_KEY=sk_test_YOUR_TEST_SECRET_KEY
MAILGUN_API_KEY=your_mailgun_api_key
MAILGUN_DOMAIN=your-domain.mailgun.org
EMAIL_FROM=noreply@your-domain.com
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_YOUR_TEST_PUBLIC_KEY

STEP 5: CREATE vercel.json
──────────────────────────

{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm ci",
  "framework": "nextjs",
  "env": {
    "STRIPE_SECRET_KEY": "@stripe_secret_key",
    "STRIPE_PUBLIC_KEY": "@stripe_public_key",
    "MAILGUN_API_KEY": "@mailgun_api_key",
    "MAILGUN_DOMAIN": "@mailgun_domain",
    "EMAIL_FROM": "@email_from",
    "DATABASE_URL": "@database_url"
  }
}

STEP 6: DEPLOY TO VERCEL
────────────────────────

Option A: Using Git (Recommended)
1. Initialize Git: git init
2. Commit files: git add . && git commit -m "Initial commit"
3. Push to GitHub: git push origin main
4. Go to vercel.com
5. Click "New Project"
6. Select your GitHub repository
7. Import project
8. Add environment variables in Vercel dashboard
9. Click "Deploy"

Option B: Using Vercel CLI
1. Install: npm i -g vercel
2. Deploy: vercel
3. Follow prompts
4. Add environment variables in dashboard

Option C: Manual Upload
1. Zip project folder
2. Drag & drop to vercel.com
3. Configure environment variables

STEP 7: ADD CUSTOM DOMAIN
─────────────────────────

1. Buy domain on Namecheap/GoDaddy
2. In Vercel dashboard → Settings → Domains
3. Add your domain
4. Follow DNS setup instructions
5. Update nameservers with your registrar
6. Wait 24-48 hours for DNS propagation

Test: Visit yourdomain.com

TROUBLESHOOTING:
- Build fails? Check Node version matches
- Env variables not working? Restart deployment
- Domain not resolving? Check DNS records
*/

// ============================================================================
// PART 2: STRIPE INTEGRATION (PRODUCTION)
// ============================================================================

/*
STRIPE SETUP STEPS:
───────────────────

1. Go to stripe.com
2. Sign up for account
3. Complete verification (business info, payout details)
4. Get API keys:
   - Publishable key (starts with pk_live_)
   - Secret key (starts with sk_live_)
5. Set up webhook endpoint:
   Endpoint URL: https://yourdomain.com/api/webhook
   Events: payment_intent.succeeded, payment_intent.failed
6. Add redirect URLs for payment:
   - Success: https://yourdomain.com/success
   - Cancel: https://yourdomain.com/cancel

PRODUCTION CHECKLIST:
─────────────────────
✓ SSL certificate enabled (Vercel auto)
✓ Environment variables set to LIVE keys (not test keys)
✓ Webhook endpoint configured
✓ Email confirmations set up
✓ Test with real card (small amount like $1)
✓ Monitor Stripe dashboard for transactions
✓ Set up fraud detection
✓ Enable 3D Secure for higher success rates
*/

// lib/stripe.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function createPaymentIntent(amount, currency = 'usd') {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      metadata: {
        timestamp: new Date().toISOString()
      }
    });
    return paymentIntent;
  } catch (error) {
    console.error('Stripe error:', error);
    throw new Error('Failed to create payment intent');
  }
}

export async function retrievePaymentIntent(paymentIntentId) {
  return await stripe.paymentIntents.retrieve(paymentIntentId);
}

export async function listCustomerPayments(customerId) {
  return await stripe.charges.list({ limit: 10, customer: customerId });
}

// ============================================================================
// PART 3: EMAIL NOTIFICATIONS
// ============================================================================

/*
EMAIL SERVICE OPTIONS:
──────────────────────

1. MAILGUN (Recommended - Free tier: 5000 emails/month)
   - Reliability: Excellent
   - Ease of use: Easy
   - Cost: $0-35+/month
   - Setup time: 10 minutes

2. SendGrid (Free tier: 100 emails/day)
   - Reliability: Excellent
   - Ease of use: Very Easy
   - Cost: $0-80+/month
   - Setup time: 5 minutes

3. Nodemailer + Gmail (Free)
   - Reliability: Good
   - Ease of use: Moderate
   - Cost: Free (but limited)
   - Setup time: 15 minutes

MAILGUN SETUP:
──────────────
1. Sign up at mailgun.com
2. Verify domain or use sandbox domain
3. Copy API Key and Domain
4. Add to .env.local
5. Done!

SENDGRID SETUP:
───────────────
1. Sign up at sendgrid.com
2. Create API key
3. Add to .env.local
4. Done!
*/

// lib/email.js - Mailgun Integration
const mailgun = require('mailgun.js');
const FormData = require('form-data');

const mg = new mailgun(FormData);
const domain = process.env.MAILGUN_DOMAIN;
const apiKey = process.env.MAILGUN_API_KEY;

const client = mg.client({username: 'api', key: apiKey});

export async function sendOrderConfirmation(email, order) {
  const emailData = {
    from: `ModernHub <noreply@${domain}>`,
    to: email,
    subject: `Order Confirmation #${order.id}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <h2 style="color: #6366f1;">Thank you for your order!</h2>
        
        <p>Hi ${order.customerName},</p>
        
        <p>We're excited to confirm your order #<strong>${order.id}</strong></p>
        
        <h3>Order Details:</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="background: #f3f4f6;">
            <th style="padding: 10px; text-align: left;">Product</th>
            <th style="padding: 10px;">Qty</th>
            <th style="padding: 10px;">Price</th>
          </tr>
          ${order.items.map(item => `
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 10px;">${item.name}</td>
              <td style="padding: 10px; text-align: center;">${item.quantity}</td>
              <td style="padding: 10px; text-align: right;">$${item.price.toFixed(2)}</td>
            </tr>
          `).join('')}
        </table>
        
        <div style="background: #f3f4f6; padding: 15px; margin-top: 20px; border-radius: 8px;">
          <p style="margin: 5px 0;"><strong>Subtotal:</strong> $${order.subtotal.toFixed(2)}</p>
          <p style="margin: 5px 0;"><strong>Shipping:</strong> $${order.shipping.toFixed(2)}</p>
          <p style="margin: 5px 0;"><strong>Tax:</strong> $${order.tax.toFixed(2)}</p>
          <p style="margin: 10px 0; font-size: 18px; color: #6366f1;">
            <strong>Total: $${order.total.toFixed(2)}</strong>
          </p>
        </div>
        
        <h3 style="margin-top: 20px;">Shipping Address:</h3>
        <p style="background: #f9fafb; padding: 15px; border-left: 4px solid #6366f1;">
          ${order.shippingAddress.name}<br/>
          ${order.shippingAddress.street}<br/>
          ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zip}<br/>
          ${order.shippingAddress.country}
        </p>
        
        <h3 style="margin-top: 20px;">What's Next?</h3>
        <p>
          📦 Your order will be processed within 24 hours<br/>
          🚚 You'll receive a tracking number via email<br/>
          ⏱️ Estimated delivery: ${order.estimatedDelivery}
        </p>
        
        <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
          Questions? Reply to this email or visit our support page.<br/>
          Track your order: <a href="https://yourdomain.com/orders/${order.id}">View Order</a>
        </p>
      </div>
    `
  };

  try {
    await client.messages.create(domain, emailData);
    console.log('Order confirmation sent to:', email);
  } catch (error) {
    console.error('Email send failed:', error);
  }
}

export async function sendShippingNotification(email, order) {
  const emailData = {
    from: `ModernHub Shipping <shipping@${domain}>`,
    to: email,
    subject: `Your package is on the way! #${order.id}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <h2 style="color: #059669;">📦 Your package is on the way!</h2>
        
        <p>Hi ${order.customerName},</p>
        
        <p>Great news! Your order #<strong>${order.id}</strong> has shipped.</p>
        
        <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0;"><strong>Tracking Number:</strong></p>
          <p style="font-size: 20px; color: #059669; margin: 10px 0;">
            ${order.trackingNumber}
          </p>
          <p style="margin: 10px 0;">
            <a href="https://yourdomain.com/track/${order.trackingNumber}" 
               style="background: #059669; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Track Package
            </a>
          </p>
        </div>
        
        <p>Estimated delivery: <strong>${order.estimatedDelivery}</strong></p>
        
        <p style="margin-top: 30px; color: #6b7280; font-size: 12px;">
          Questions? <a href="mailto:support@yourdomain.com">Contact support</a>
        </p>
      </div>
    `
  };

  try {
    await client.messages.create(domain, emailData);
  } catch (error) {
    console.error('Shipping email failed:', error);
  }
}

export async function sendAbandonedCartReminder(email, cartItems, cartTotal) {
  const emailData = {
    from: `ModernHub <noreply@${domain}>`,
    to: email,
    subject: '👜 You left items in your cart',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <h2 style="color: #6366f1;">You left items in your cart!</h2>
        
        <p>Hi there,</p>
        <p>We noticed you didn't complete your purchase. Your items are waiting!</p>
        
        <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
          ${cartItems.map(item => `
            <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
              <span>${item.name} x${item.quantity}</span>
              <span>$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          `).join('')}
          <div style="padding: 10px 0; font-weight: bold;">
            <span>Total: $${cartTotal.toFixed(2)}</span>
          </div>
        </div>
        
        <p>
          <a href="https://yourdomain.com/cart" 
             style="background: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Complete Your Purchase
          </a>
        </p>
        
        <p style="color: #6b7280; font-size: 12px; margin-top: 30px;">
          This is a courtesy reminder. Your cart expires in 7 days.
        </p>
      </div>
    `
  };

  try {
    await client.messages.create(domain, emailData);
  } catch (error) {
    console.error('Abandoned cart email failed:', error);
  }
}

// ============================================================================
// PART 4: ADMIN DASHBOARD COMPONENTS
// ============================================================================

/*
ADMIN FEATURES TO ADD:
──────────────────────
✓ Product Management (CRUD)
✓ Order Management & Tracking
✓ Customer Management
✓ Sales Analytics & Reporting
✓ Inventory Tracking
✓ Email Template Management
✓ Settings & Configuration
✓ User/Staff Management
✓ Financial Reports
✓ Customer Support Tickets

DATABASE STRUCTURE:
───────────────────
Products:
  - id
  - name
  - description
  - price
  - originalPrice
  - category
  - image
  - stock
  - rating
  - reviews
  - createdAt
  - updatedAt

Orders:
  - id
  - customerId
  - items []
  - status (pending, processing, shipped, delivered)
  - total
  - shippingAddress
  - trackingNumber
  - createdAt
  - estimatedDelivery

Customers:
  - id
  - email
  - name
  - phone
  - addresses []
  - totalSpent
  - orderCount
  - joinDate

*/

// ============================================================================
// PART 5: ADDITIONAL FEATURES TO ADD
// ============================================================================

/*
TIER 1: ESSENTIAL (Week 1)
──────────────────────────
✓ Payment processing
✓ Email notifications
✓ Admin dashboard
✓ Order tracking
✓ Basic analytics

TIER 2: IMPORTANT (Week 2-3)
────────────────────────────
✓ User accounts & login
✓ Order history
✓ Wishlist persistence
✓ Product reviews
✓ Coupon codes
✓ Inventory alerts
✓ SMS notifications (Twilio)

TIER 3: ADVANCED (Week 4+)
──────────────────────────
✓ AI product recommendations
✓ Live chat support
✓ Multi-currency real-time conversion
✓ Social login (Google, Facebook)
✓ Subscription products
✓ Affiliate program
✓ Advanced analytics & heatmaps

TIER 4: PREMIUM (Month 2+)
──────────────────────────
✓ Mobile app version
✓ AR product preview
✓ AI chatbot support
✓ Predictive analytics
✓ Dynamic pricing
✓ White-label solution

DATABASE OPTIONS FOR PRODUCTION:
────────────────────────────────

1. MongoDB (Recommended for startups)
   - Free tier: 512MB
   - Flexible schema
   - Easy scaling
   - Cost: $0-500+/month
   - Setup: 10 minutes
   
   npm install mongoose
   
   Connection string:
   mongodb+srv://user:pass@cluster.mongodb.net/dbname

2. PostgreSQL (Better for complex data)
   - Free tier: Limited
   - Reliable & proven
   - Great for relationships
   - Cost: $0-300+/month
   - Setup: 20 minutes
   
   npm install pg
   
3. Supabase (PostgreSQL + Auth)
   - Free tier: Generous
   - Built-in authentication
   - Real-time capabilities
   - Cost: $0-100+/month
   - Setup: 5 minutes

4. Firebase (Google's solution)
   - Free tier: Very generous
   - Easy setup
   - Real-time database
   - Cost: $0-100+/month
   - Setup: 5 minutes

RECOMMENDED TECH STACK:
──────────────────────
Frontend: React + Next.js ✓ (already built)
Backend: Node.js + Express (on Vercel serverless)
Database: MongoDB or Supabase
Authentication: NextAuth.js or Auth0
Payments: Stripe ✓
Email: Mailgun ✓
Analytics: Vercel Analytics or Plausible
Images: Cloudinary or Vercel Image Optimization

*/

// ============================================================================
// PART 6: ENVIRONMENT VARIABLES CHECKLIST
// ============================================================================

/*
PRODUCTION ENVIRONMENT VARIABLES:

Critical (Stripe):
  ✓ STRIPE_PUBLIC_KEY (pk_live_...)
  ✓ STRIPE_SECRET_KEY (sk_live_...)
  ✓ STRIPE_WEBHOOK_SECRET
  ✓ NEXT_PUBLIC_STRIPE_PUBLIC_KEY

Email (Mailgun):
  ✓ MAILGUN_API_KEY
  ✓ MAILGUN_DOMAIN
  ✓ EMAIL_FROM
  ✓ ADMIN_EMAIL

Database:
  ✓ DATABASE_URL
  ✓ DB_USER
  ✓ DB_PASSWORD

Authentication:
  ✓ NEXTAUTH_SECRET
  ✓ NEXTAUTH_URL

Optional:
  ✓ GOOGLE_ANALYTICS_ID
  ✓ SENTRY_DSN (error tracking)
  ✓ SLACK_WEBHOOK (notifications)

*/

// ============================================================================
// PART 7: SECURITY CHECKLIST
// ============================================================================

/*
BEFORE GOING LIVE:
──────────────────

☐ SSL Certificate (Vercel: automatic)
☐ Environment variables secured (Vercel: automatic)
☐ API rate limiting configured
☐ CORS properly configured
☐ Input validation on all forms
☐ SQL injection protection (use parameterized queries)
☐ XSS protection enabled
☐ CSRF tokens implemented
☐ Password hashing (bcryptjs)
☐ JWT tokens for auth
☐ Stripe webhook verification
☐ Email validation
☐ Phone number validation
☐ Address validation
☐ Regular security audits
☐ Backup strategy in place
☐ Error logging configured
☐ Monitoring alerts set up

*/

// ============================================================================
// PART 8: MONITORING & MAINTENANCE
// ============================================================================

/*
ONGOING TASKS:

Daily:
  - Monitor payment failures
  - Check email delivery rates
  - Review new orders
  - Monitor error logs

Weekly:
  - Analyze sales data
  - Check customer feedback
  - Review performance metrics
  - Test payment system

Monthly:
  - Analyze revenue trends
  - Review customer satisfaction
  - Plan new features
  - Security audit
  - Database backup verification

TOOLS TO SET UP:
  - Vercel Analytics (free)
  - Google Analytics (free)
  - Stripe Dashboard
  - Mailgun Analytics
  - Error tracking: Sentry (free tier)
  - Uptime monitoring: UptimeRobot (free)

*/

// ============================================================================
// PART 9: COST BREAKDOWN
// ============================================================================

/*
MONTHLY COSTS (Starting):

Domain:                          ~$12/year  ($1/month)
Vercel Hosting:                  FREE       (up to $20)
Stripe Processing:               2.9% + $0.30 per transaction
Mailgun Email:                   FREE       (up to 5000 emails)
MongoDB/Database:                FREE       (starter tier)
SSL Certificate:                 FREE
CDN:                            FREE        (included in Vercel)
─────────────────────────────────────────────
TOTAL:                           ~$1-2/month + transaction fees

SCALE-UP COSTS (At $100K/year revenue):
─────────────────────────────────
Vercel:                          $100-500/month
Database:                        $50-200/month
Mailgun:                         $25-100/month
Stripe:                          ~$2,900 (2.9% of revenue)
Analytics tools:                 $50-200/month
Customer support software:       $50-200/month
─────────────────────────────────────────────
TOTAL:                           ~$3,000-6,000/month

*/

// ============================================================================
// PART 10: QUICK REFERENCE
// ============================================================================

/*
IMPORTANT LINKS:
────────────────
Vercel:                https://vercel.com
Stripe:                https://stripe.com
Mailgun:               https://mailgun.com
SendGrid:              https://sendgrid.com
MongoDB:               https://mongodb.com
Supabase:              https://supabase.com
NextAuth.js:           https://next-auth.js.org
Sentry (Error logging):https://sentry.io
Plausible Analytics:   https://plausible.io

DEPLOYMENT CHECKLIST:
─────────────────────
□ Code pushed to GitHub
□ Environment variables set in Vercel
□ Custom domain configured
□ SSL certificate verified
□ Payment processing tested
□ Email sending tested
□ Analytics configured
□ Error tracking enabled
□ Uptime monitoring active
□ Backups configured
□ Admin account created
□ First test order completed
□ Launch announcement ready

*/
