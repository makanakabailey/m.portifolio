# Portfolio Deployment Guide

## 🚀 Production Deployment Checklist

### Prerequisites
- [x] Next.js application built and tested
- [x] All environment variables configured
- [ ] MongoDB Atlas cluster created
- [ ] Resend API key obtained
- [ ] Vercel account created

---

## Step 1: MongoDB Atlas Setup (5 minutes)

1. **Create Account & Project**
   - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free account
   - Create new project: "Portfolio"

2. **Create Database Cluster**
   - Click "Create Cluster"
   - Choose M0 (Free tier)
   - Select region closest to your users
   - Cluster name: `portfolio-cluster`

3. **Database Access**
   - Go to "Database Access"
   - Add new user: `portfolio_user`
   - Set strong password (save it!)
   - Grant "Read and write to any database"

4. **Network Access**
   - Go to "Network Access"
   - Add IP Address: `0.0.0.0/0` (Allow access from anywhere)
   - This is needed for Vercel serverless functions

5. **Get Connection String**
   - Go to "Clusters" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password

---

## Step 2: Resend Email Setup (3 minutes)

1. **Create Account**
   - Go to [resend.com](https://resend.com)
   - Sign up for free account

2. **Get API Key**
   - Go to API Keys
   - Create new API key
   - Copy the key (starts with `re_`)

3. **Verify Domain (Optional)**
   - For production, verify your domain
   - For testing, use the default domain

---

## Step 3: Vercel Deployment (5 minutes)

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Import your repository
   - Choose "portfolio-nextjs" folder

2. **Configure Environment Variables**
   ```
   MONGODB_URI=mongodb+srv://portfolio_user:YOUR_PASSWORD@portfolio-cluster.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
   ADMIN_PIN_HASH=$2b$12$4uOvi9R0xDby7pxgwXUNiOeBDIkJqRst7qRg4nGlw//NXqw6fBdGm
   RESEND_API_KEY=re_your_resend_api_key_here
   ADMIN_EMAIL=mkanakabailey@gmail.com
   NEXT_PUBLIC_BASE_URL=https://your-app-name.vercel.app
   ```

3. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live at `https://your-app-name.vercel.app`

---

## Step 4: Custom Domain Setup (Optional)

1. **Add Domain in Vercel**
   - Go to your project settings
   - Click "Domains"
   - Add your custom domain

2. **Configure DNS**
   - Add CNAME record: `www` → `cname.vercel-dns.com`
   - Add A record: `@` → `76.76.19.61`

3. **Update Environment Variables**
   - Update `NEXT_PUBLIC_BASE_URL` to your custom domain

---

## Step 5: Testing Checklist

### Functionality Tests
- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Cases page displays and filters work
- [ ] Individual case study pages load
- [ ] Contact form submits successfully
- [ ] Admin panel login works (PIN: 7653)
- [ ] Daily posts management works
- [ ] Case studies management works
- [ ] File uploads work (if MongoDB connected)

### Performance Tests
- [ ] Lighthouse score 90+ (Performance)
- [ ] Lighthouse score 90+ (SEO)
- [ ] Lighthouse score 90+ (Accessibility)
- [ ] Page load times < 3 seconds
- [ ] Mobile responsiveness verified

### SEO Tests
- [ ] Sitemap accessible: `/sitemap.xml`
- [ ] Robots.txt accessible: `/robots.txt`
- [ ] Meta tags on all pages
- [ ] Open Graph tags working
- [ ] Google Search Console setup

---

## Step 6: Post-Deployment Setup

### Analytics Setup
1. **Google Analytics 4**
   - Create GA4 property
   - Add tracking ID to environment variables
   - Verify tracking is working

2. **Google Search Console**
   - Add your domain
   - Submit sitemap: `https://yourdomain.com/sitemap.xml`
   - Monitor indexing status

### Monitoring
1. **Vercel Analytics** (Built-in)
   - Automatically enabled
   - View in Vercel dashboard

2. **Error Monitoring**
   - Check Vercel function logs
   - Monitor API response times
   - Set up alerts for errors

---

## Environment Variables Reference

### Required for Production
```env
MONGODB_URI=mongodb+srv://...
ADMIN_PIN_HASH=$2b$12$...
RESEND_API_KEY=re_...
ADMIN_EMAIL=your@email.com
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

### Optional
```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

## Troubleshooting

### Common Issues

**Database Connection Failed**
- Check MongoDB URI format
- Verify network access (0.0.0.0/0)
- Confirm user permissions

**Email Not Sending**
- Verify Resend API key
- Check email address format
- Review Vercel function logs

**Admin Panel Not Working**
- Verify PIN hash is correct
- Check browser localStorage
- Clear cache and cookies

**Images Not Loading**
- Verify Vercel Blob is enabled
- Check file upload permissions
- Confirm image URLs are correct

### Support
- Vercel Documentation: https://vercel.com/docs
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com
- Resend Documentation: https://resend.com/docs

---

## Success! 🎉

Your portfolio is now live and ready for production use. The application includes:

- ✅ Professional portfolio website
- ✅ Admin content management
- ✅ Contact form with email notifications
- ✅ SEO optimization
- ✅ Mobile responsive design
- ✅ Fast loading performance
- ✅ Secure authentication

**Next Steps:**
1. Share your new portfolio URL
2. Set up Google Analytics tracking
3. Submit to search engines
4. Start creating content through the admin panel
5. Monitor performance and user engagement

**Admin Access:** `https://yourdomain.com/admin` (PIN: 7653)