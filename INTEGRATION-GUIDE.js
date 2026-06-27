/* ============================================================================
   COMPLETE MODERNHUB E-COMMERCE PLATFORM - INTEGRATION GUIDE
   ============================================================================
   
   This guide shows how to integrate:
   ✓ Frontend Store
   ✓ Admin Dashboard
   ✓ Stripe Payments
   ✓ Email Notifications
   ✓ Database
   ✓ Authentication
   
   Total setup time: 2-3 hours
   
   ========================================================================== */

// ============================================================================
// PART 1: PROJECT STRUCTURE
// ============================================================================

/*
RECOMMENDED FOLDER STRUCTURE:
────────────────────────────

modernhub-ecommerce/
│
├── pages/
│   ├── index.js                    (Store Homepage)
│   ├── products.js                 (Product listing)
│   ├── checkout.js                 (Checkout page)
│   ├── orders/
│   │   ├── [id].js                 (Order tracking)
│   │   └── confirmation.js         (Success page)
│   ├── admin/
│   │   ├── login.js                (Admin login)
│   │   ├── dashboard.js            (Main dashboard)
│   │   ├── orders.js               (Order management)
│   │   ├── products.js             (Product management)
│   │   ├── customers.js            (Customer list)
│   │   └── settings.js             (Configuration)
│   └── api/
│       ├── stripe/
│       │   ├── create-intent.js    (Payment intent)
│       │   ├── webhook.js          (Stripe webhook)
│       │   └── confirm-payment.js  (Confirm payment)
│       ├── email/
│       │   ├── send-confirmation.js
│       │   ├── send-shipping.js
│       │   └── send-reminder.js
│       ├── orders/
│       │   ├── create.js           (Create order)
│       │   ├── list.js             (Get orders)
│       │   ├── [id].js             (Get single order)
│       │   └── update.js           (Update order)
│       ├── products/
│       │   ├── list.js
│       │   ├── create.js
│       │   ├── [id].js
│       │   └── delete.js
│       ├── customers/
│       │   ├── list.js
│       │   └── [id].js
│       └── auth/
│           ├── login.js
│           └── signup.js
│
├── lib/
│   ├── stripe.js                   (Stripe utilities)
│   ├── email.js                    (Email utilities)
│   ├── database.js                 (DB connection)
│   ├── auth.js                     (Authentication)
│   └── middleware.js               (Custom middleware)
│
├── components/
│   ├── Store/
│   │   ├── Header.jsx
│   │   ├── ProductGrid.jsx
│   │   ├── Cart.jsx
│   │   └── Checkout.jsx
│   ├── Admin/
│   │   ├── Dashboard.jsx
│   │   ├── OrdersList.jsx
│   │   ├── ProductsList.jsx
│   │   └── Analytics.jsx
│   └── Common/
│       ├── Navbar.jsx
│       ├── Footer.jsx
│       └── Loading.jsx
│
├── models/
│   ├── Product.js                  (Mongoose schema)
│   ├── Order.js
│   ├── Customer.js
│   └── Admin.js
│
├── middleware/
│   ├── auth.js                     (Check authentication)
│   ├── adminAuth.js                (Check admin role)
│   └── errorHandler.js             (Global error handling)
│
├── public/
│   ├── images/
│   ├── icons/
│   └── favicon.ico
│
├── styles/
│   ├── globals.css
│   └── variables.css
│
├── .env.local                      (Local secrets)
├── .env.production                 (Production secrets)
├── vercel.json                     (Vercel config)
├── package.json
├── next.config.js
└── README.md

*/

// ============================================================================
// PART 2: COMPLETE API ROUTES (Next.js)
// ============================================================================

/*
FILE: pages/api/stripe/create-intent.js
─────────────────────────────────────
*/

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount, currency, cartItems, email } = req.body;

    // Validate amount
    if (!amount || amount < 1) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency || 'usd',
      receipt_email: email,
      description: `Order for ${email}`,
      metadata: {
        items_count: cartItems.length,
        timestamp: new Date().toISOString()
      }
    });

    // Return client secret
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (error) {
    console.error('Payment intent error:', error);
    res.status(500).json({ error: error.message });
  }
}

/*
FILE: pages/api/stripe/webhook.js
──────────────────────────────────
Handles Stripe events (payment confirmed, failed, etc.)
*/

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { sendOrderConfirmation } = require('../../../lib/email');
const Order = require('../../../models/Order');

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      endpointSecret
    );
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle events
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      
      // Update order status
      await Order.findOneAndUpdate(
        { paymentIntentId: paymentIntent.id },
        { 
          status: 'processing',
          paymentStatus: 'completed',
          paidAt: new Date()
        }
      );

      // Send confirmation email
      const order = await Order.findOne({ paymentIntentId: paymentIntent.id });
      await sendOrderConfirmation(order.email, order);
      
      console.log('✓ Payment succeeded:', paymentIntent.id);
      break;

    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      
      await Order.findOneAndUpdate(
        { paymentIntentId: failedPayment.id },
        { paymentStatus: 'failed' }
      );
      
      console.log('✗ Payment failed:', failedPayment.id);
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).json({ received: true });
}

/*
FILE: pages/api/email/send-confirmation.js
───────────────────────────────────────────
*/

const { sendOrderConfirmation } = require('../../../lib/email');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, order } = req.body;

    if (!email || !order) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    await sendOrderConfirmation(email, order);

    res.status(200).json({ success: true, message: 'Email sent' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: error.message });
  }
}

/*
FILE: pages/api/orders/create.js
────────────────────────────────
*/

const Order = require('../../../models/Order');
const connectDB = require('../../../lib/database');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDB();

    const { 
      customer, 
      email, 
      items, 
      subtotal, 
      tax, 
      shipping, 
      total,
      shippingAddress,
      paymentIntentId
    } = req.body;

    // Validate
    if (!customer || !email || !items || items.length === 0) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create order
    const order = new Order({
      orderId: `ORD-${Date.now()}`,
      customer,
      email,
      items,
      subtotal,
      tax,
      shipping,
      total,
      shippingAddress,
      paymentIntentId,
      status: 'pending',
      createdAt: new Date()
    });

    await order.save();

    res.status(201).json({
      success: true,
      orderId: order.orderId,
      message: 'Order created successfully'
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ error: error.message });
  }
}

/*
FILE: pages/api/orders/list.js
──────────────────────────────
*/

const Order = require('../../../models/Order');
const connectDB = require('../../../lib/database');

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDB();

    const { email, status, limit = 10, skip = 0 } = req.query;

    let query = {};
    if (email) query.email = email;
    if (status) query.status = status;

    const orders = await Order.find(query)
      .limit(Number(limit))
      .skip(Number(skip))
      .sort({ createdAt: -1 });

    const total = await Order.countDocuments(query);

    res.status(200).json({
      orders,
      total,
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Order fetch error:', error);
    res.status(500).json({ error: error.message });
  }
}

*/

// ============================================================================
// PART 3: DATABASE MODELS (Mongoose/MongoDB)
// ============================================================================

/*
FILE: models/Product.js
──────────────────────
*/

const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  category: { type: String, required: true },
  image: { type: String },
  stock: { type: Number, default: 0 },
  sku: { type: String, unique: true },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  sales: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Product || mongoose.model('Product', ProductSchema);

/*
FILE: models/Order.js
────────────────────
*/

const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  orderId: { type: String, unique: true, required: true },
  customer: { type: String, required: true },
  email: { type: String, required: true },
  items: [{
    productId: String,
    name: String,
    price: Number,
    quantity: Number,
    image: String
  }],
  subtotal: Number,
  tax: Number,
  shipping: Number,
  total: { type: Number, required: true },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentIntentId: String,
  trackingNumber: String,
  estimatedDelivery: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Order || mongoose.model('Order', OrderSchema);

/*
FILE: models/Customer.js
───────────────────────
*/

const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: String,
  password: { type: String, required: true }, // Hashed with bcryptjs
  addresses: [{
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String,
    isDefault: Boolean
  }],
  totalSpent: { type: Number, default: 0 },
  orderCount: { type: Number, default: 0 },
  favoriteProducts: [String],
  newsletter: { type: Boolean, default: false },
  joinDate: { type: Date, default: Date.now },
  lastLogin: Date,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Customer || mongoose.model('Customer', CustomerSchema);

*/

// ============================================================================
// PART 4: AUTHENTICATION SETUP
// ============================================================================

/*
OPTION 1: NextAuth.js (Recommended)
────────────────────────────────────

Installation:
npm install next-auth

FILE: pages/api/auth/[...nextauth].js
────────────────────────────────────
*/

import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

export const authOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // Check admin credentials
        const adminPassword = process.env.ADMIN_PASSWORD;
        
        if (
          credentials.email === process.env.ADMIN_EMAIL &&
          bcrypt.compareSync(credentials.password, adminPassword)
        ) {
          return {
            id: 'admin',
            email: credentials.email,
            role: 'admin'
          };
        }

        throw new Error('Invalid credentials');
      }
    })
  ],
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    }
  }
};

export default NextAuth(authOptions);

/*
OPTION 2: Auth0 (Enterprise)
────────────────────────────

Setup:
1. Create Auth0 account: https://auth0.com
2. Create application
3. Add environment variables:
   AUTH0_SECRET=your_secret
   AUTH0_BASE_URL=https://yourdomain.com
   AUTH0_ISSUER_BASE_URL=https://your-tenant.auth0.com
   AUTH0_CLIENT_ID=your_client_id
   AUTH0_CLIENT_SECRET=your_client_secret

4. Install: npm install @auth0/nextjs-auth0
5. Add routes as per documentation

*/

// ============================================================================
// PART 5: ENVIRONMENT VARIABLES SETUP
// ============================================================================

/*
FILE: .env.local (Development)
─────────────────────────────

# Stripe (Test Keys)
STRIPE_PUBLIC_KEY=pk_test_YOUR_KEY
STRIPE_SECRET_KEY=sk_test_YOUR_KEY
STRIPE_WEBHOOK_SECRET=whsec_test_YOUR_KEY
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_YOUR_KEY

# Email (Mailgun)
MAILGUN_API_KEY=your_api_key
MAILGUN_DOMAIN=sandboxxxx.mailgun.org
EMAIL_FROM=noreply@yourdomain.com
ADMIN_EMAIL=admin@yourdomain.com

# Database
DATABASE_URL=mongodb+srv://user:password@cluster.mongodb.net/dbname
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/dbname

# Authentication
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
ADMIN_PASSWORD=$2a$10$... (bcrypt hash)

# Optional
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
SENTRY_DSN=your_sentry_dsn


FILE: .env.production (Production)
──────────────────────────────────

# Stripe (Live Keys)
STRIPE_PUBLIC_KEY=pk_live_YOUR_KEY
STRIPE_SECRET_KEY=sk_live_YOUR_KEY
STRIPE_WEBHOOK_SECRET=whsec_live_YOUR_KEY
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_live_YOUR_KEY

# Email (Mailgun)
MAILGUN_API_KEY=prod_api_key
MAILGUN_DOMAIN=yourdomain.mailgun.org
EMAIL_FROM=noreply@yourdomain.com
ADMIN_EMAIL=admin@yourdomain.com

# Database
DATABASE_URL=mongodb+srv://prod_user:prod_pass@prod-cluster.mongodb.net/modernhub

# Authentication
NEXTAUTH_SECRET=your-production-secret-key
NEXTAUTH_URL=https://yourdomain.com
ADMIN_PASSWORD=$2a$10$... (bcrypt hash)

# Google Analytics
GOOGLE_ANALYTICS_ID=G-PRODUCTION_ID

*/

// ============================================================================
// PART 6: VERCEL DEPLOYMENT COMPLETE GUIDE
// ============================================================================

/*
STEP-BY-STEP DEPLOYMENT:
────────────────────────

STEP 1: PREPARE YOUR CODE (5 min)
─────────────────────────────────
1. Create GitHub account (if not already)
2. Initialize Git:
   git init
   git add .
   git commit -m "Initial commit"

3. Create repository on GitHub (https://github.com/new)
4. Push code:
   git branch -M main
   git remote add origin https://github.com/yourusername/modernhub.git
   git push -u origin main


STEP 2: VERCEL DEPLOYMENT (5 min)
─────────────────────────────────
1. Go to https://vercel.com
2. Click "New Project"
3. Select GitHub repository
4. Click "Import"
5. Configure build settings (auto-detected)
6. Click "Deploy"

→ Your store is now live at: modernhub.vercel.app


STEP 3: SETUP ENVIRONMENT VARIABLES (10 min)
──────────────────────────────────────────
1. In Vercel dashboard, go to Project Settings
2. Click "Environment Variables"
3. Add each variable:
   - STRIPE_PUBLIC_KEY = pk_live_...
   - STRIPE_SECRET_KEY = sk_live_...
   - MAILGUN_API_KEY = your_key
   - MAILGUN_DOMAIN = your_domain
   - DATABASE_URL = mongodb+srv://...
   - NEXTAUTH_SECRET = generate_random_key
   - ADMIN_PASSWORD = bcrypt_hash

4. Click "Save"
5. Redeploy from Deployments tab


STEP 4: CONNECT CUSTOM DOMAIN (10 min)
──────────────────────────────────────
1. Buy domain on Namecheap/GoDaddy
2. In Vercel Settings → Domains
3. Enter your domain (e.g., modernhub.com)
4. Vercel shows DNS records
5. In your registrar (Namecheap), add DNS records
6. Wait 24-48 hours for propagation
7. Verify domain shows "Valid Configuration"


STEP 5: SETUP STRIPE WEBHOOK (10 min)
────────────────────────────────────
1. Go to Stripe Dashboard → Webhooks
2. Click "Add endpoint"
3. URL: https://yourdomain.com/api/stripe/webhook
4. Events: 
   - payment_intent.succeeded
   - payment_intent.payment_failed
5. Click "Add endpoint"
6. Copy webhook signing secret
7. Add to env variables: STRIPE_WEBHOOK_SECRET


STEP 6: SETUP EMAIL SERVICE (10 min)
────────────────────────────────────
1. Go to Mailgun.com
2. Create account
3. Add your domain (or use sandbox domain)
4. Copy API Key and Domain
5. Add to Vercel env variables


STEP 7: SETUP DATABASE (5 min)
──────────────────────────────
1. Go to MongoDB.com
2. Create cluster
3. Create database user
4. Get connection string
5. Add to Vercel env variables: DATABASE_URL


TOTAL DEPLOYMENT TIME: ~1 hour


TROUBLESHOOTING:
────────────────

Build fails?
→ Check build logs in Vercel
→ Ensure all imports are correct
→ Run: npm run build locally first

Payments not working?
→ Check Stripe keys match environment
→ Verify webhook is set up
→ Check browser console for errors

Emails not sending?
→ Verify Mailgun domain is verified
→ Check spam folder
→ Enable test mode in Mailgun first

Database connection error?
→ Check DATABASE_URL is correct
→ Verify IP whitelist in MongoDB
→ Test connection locally

*/

// ============================================================================
// PART 7: FEATURES CHECKLIST
// ============================================================================

/*
TIER 1: ESSENTIAL (DONE ✓)
──────────────────────────
✓ Store homepage with product grid
✓ Shopping cart functionality
✓ Stripe payment integration
✓ Email order confirmations
✓ Basic admin dashboard
✓ Order management
✓ Vercel deployment
✓ Custom domain setup

TIER 2: IMPORTANT (Week 2-3)
─────────────────────────────
☐ User authentication & accounts
☐ Order history for customers
☐ Product reviews & ratings
☐ Coupon code system
☐ Inventory management alerts
☐ SMS notifications (Twilio)
☐ Advanced analytics
☐ Customer support chat

TIER 3: ADVANCED (Week 4+)
──────────────────────────
☐ AI product recommendations
☐ Live chat with support team
☐ Multi-currency support
☐ Social login (Google, Facebook)
☐ Subscription products
☐ Affiliate program
☐ Email marketing automation
☐ Advanced inventory management

TIER 4: PREMIUM (Month 2+)
──────────────────────────
☐ Mobile app version
☐ AR product preview
☐ AI chatbot support
☐ Predictive analytics
☐ Dynamic pricing
☐ White-label solution
☐ Multi-vendor marketplace
☐ Blockchain loyalty rewards

*/

// ============================================================================
// PART 8: PERFORMANCE OPTIMIZATION
// ============================================================================

/*
IMAGE OPTIMIZATION:
───────────────────
// Use Vercel Image Optimization
import Image from 'next/image'

<Image
  src="/product.jpg"
  alt="Product"
  width={400}
  height={400}
  priority
  quality={80}
/>

// Or use Cloudinary
<img src="https://res.cloudinary.com/demo/image/fetch/w_400/..." />


CACHING STRATEGY:
─────────────────
// Cache product data (revalidate every 1 hour)
export async function getStaticProps() {
  return {
    props: { products },
    revalidate: 3600 // 1 hour
  };
}

// Cache API responses
app.get('/api/products', (req, res) => {
  res.setHeader('Cache-Control', 'public, s-maxage=3600');
  // Response
});


CODE SPLITTING:
───────────────
// Lazy load heavy components
const AdminDashboard = dynamic(() => import('./AdminDashboard'), {
  loading: () => <Loading />,
  ssr: false
});


DATABASE INDEXING:
──────────────────
// Create indexes for faster queries
db.orders.createIndex({ email: 1 })
db.orders.createIndex({ status: 1 })
db.orders.createIndex({ createdAt: -1 })
db.products.createIndex({ category: 1, price: 1 })

*/

// ============================================================================
// PART 9: SECURITY BEST PRACTICES
// ============================================================================

/*
IMPLEMENT:
──────────

1. HTTPS/SSL ✓ (Auto on Vercel)

2. Input Validation
   const validate = (email) => {
     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     return re.test(email);
   }

3. Rate Limiting
   npm install express-rate-limit
   
   const rateLimit = require('express-rate-limit');
   
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100 // limit each IP to 100 requests per windowMs
   });
   
   app.use('/api/', limiter);

4. CORS Configuration
   const cors = require('cors');
   
   app.use(cors({
     origin: 'https://yourdomain.com',
     credentials: true
   }));

5. Environment Variables (Vercel handles this)

6. Helmet.js for headers
   npm install helmet
   
   const helmet = require('helmet');
   app.use(helmet());

7. SQL Injection Prevention (Use parameterized queries)
   
8. XSS Prevention
   const sanitizeHtml = require('sanitize-html');
   const clean = sanitizeHtml(userInput);

9. CSRF Tokens
   npm install express-csrf
   
10. Regular Security Audits
    npm audit
    npm audit fix

*/

// ============================================================================
// PART 10: MONITORING & ANALYTICS
// ============================================================================

/*
SETUP MONITORING:
─────────────────

Vercel Analytics (Free):
1. Go to Project Settings
2. Click Analytics
3. View performance metrics

Google Analytics (Free):
npm install next-google-analytics

// In _document.js
import { GoogleAnalytics } from 'next-google-analytics';

<GoogleAnalytics strategy="lazyOnload" trackPageViews />

Sentry Error Tracking:
npm install @sentry/nextjs

// next.config.js
const withSentry = require("@sentry/nextjs/withSentry");

module.exports = withSentry({
  // Your config
});

Uptime Monitoring (UptimeRobot - Free):
1. Go to https://uptimerobot.com
2. Add monitor for your site
3. Get alerts if site goes down

*/

// ============================================================================
// PART 11: GROWTH ROADMAP
// ============================================================================

/*
MONTH 1: Foundation
────────────────────
Week 1-2: Launch basic store + admin
Week 3-4: Fix bugs, optimize performance

Target:
- 100+ visitors
- 5-10 orders
- 0 critical issues

MONTH 2: Growth
────────────────
Add:
- User accounts
- Product reviews
- Email marketing
- Social media integration
- SEO optimization

Target:
- 1000+ visitors
- 50+ orders
- 30% repeat customers

MONTH 3: Scale
───────────────
Add:
- Advanced analytics
- Affiliate program
- Customer support chat
- Multiple payment methods
- Subscription products

Target:
- 5000+ visitors
- 200+ orders
- $5000+ revenue

MONTH 6: Optimize
──────────────────
Add:
- Mobile app
- AI recommendations
- Dynamic pricing
- Marketplace features

Target:
- 20000+ visitors
- 1000+ orders
- $50000+ revenue

*/

// ============================================================================
// PART 12: COMMON ISSUES & SOLUTIONS
// ============================================================================

/*
ISSUE 1: Stripe payment fails
SOLUTION:
- Check API keys match environment
- Verify webhook endpoint is accessible
- Test with 4242 card first
- Check browser console for errors
- Verify SSL certificate

ISSUE 2: Emails not sending
SOLUTION:
- Check Mailgun domain is verified
- Verify API key has correct permissions
- Check email format is valid
- Look in Mailgun logs
- Enable test mode for debugging

ISSUE 3: Database connection timeout
SOLUTION:
- Verify CONNECTION_STRING is correct
- Check IP whitelist in MongoDB
- Ensure database user has correct permissions
- Test connection locally first

ISSUE 4: Orders not appearing
SOLUTION:
- Check database query syntax
- Verify indexes are created
- Check order status filter
- Look at database logs
- Clear cache if using caching

ISSUE 5: Admin dashboard not loading
SOLUTION:
- Check authentication token
- Verify admin middleware is working
- Check browser cache
- Look at network tab for API errors
- Check NEXTAUTH_SECRET is set

ISSUE 6: Site slow/timing out
SOLUTION:
- Optimize images (use Next.js Image)
- Add caching headers
- Index database queries
- Enable compression
- Use CDN for static files
- Monitor database query performance

*/

// ============================================================================
// QUICK REFERENCE
// ============================================================================

console.log(`
╔═════════════════════════════════════════════════════════════════╗
║          MODERNHUB E-COMMERCE PLATFORM - QUICK REFERENCE       ║
╚═════════════════════════════════════════════════════════════════╝

IMPORTANT LINKS:
─────────────────
📝 Deploy:       https://vercel.com
💳 Payments:     https://stripe.com/dashboard
📧 Email:        https://mailgun.com
🗄️  Database:     https://mongodb.com
🔐 Auth:         https://next-auth.js.org
📊 Analytics:    https://vercel.com/analytics

KEY COMMANDS:
──────────────
npm run dev           → Start development server
npm run build         → Build for production
npm run start         → Start production server
npm audit            → Check security vulnerabilities
npm audit fix        → Fix vulnerabilities

REQUIRED ENV VARIABLES:
───────────────────────
STRIPE_PUBLIC_KEY          (pk_live_...)
STRIPE_SECRET_KEY          (sk_live_...)
STRIPE_WEBHOOK_SECRET      (whsec_...)
MAILGUN_API_KEY            (your_key)
MAILGUN_DOMAIN             (your_domain)
DATABASE_URL               (mongodb+srv://...)
NEXTAUTH_SECRET            (random_key)
ADMIN_PASSWORD             (bcrypt_hash)

DEPLOYMENT CHECKLIST:
──────────────────────
□ Code pushed to GitHub
□ Environment variables configured
□ Database created & indexed
□ Stripe webhook set up
□ Mailgun domain verified
□ Custom domain connected
□ SSL certificate active
□ First test order completed
□ Admin account created
□ Analytics configured
□ Monitoring set up
□ Backup strategy in place

SUPPORT RESOURCES:
──────────────────
Next.js Docs:      https://nextjs.org/docs
Vercel Help:       https://vercel.com/help
Stripe Support:    https://support.stripe.com
MongoDB Help:      https://docs.mongodb.com

SUCCESS METRICS TO TRACK:
──────────────────────────
✓ Conversion rate (target: 2-5%)
✓ Average order value (target: $50+)
✓ Customer retention (target: 30%+)
✓ Page load time (target: <2s)
✓ Mobile traffic (target: 60%+)
✓ Error rate (target: <1%)
✓ Email open rate (target: 20%+)

NEXT STEPS:
────────────
1. Start deployment to Vercel (now)
2. Set up Stripe account (today)
3. Configure Mailgun (today)
4. Create MongoDB cluster (today)
5. Launch store (this week)
6. Get first 10 customers (this month)
7. Optimize based on feedback (ongoing)

═════════════════════════════════════════════════════════════════
           You're ready to launch! 🚀 Let's go!
═════════════════════════════════════════════════════════════════
`);
