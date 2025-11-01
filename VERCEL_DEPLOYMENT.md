# 🚀 Vercel Deployment Guide

## Quick Deployment Steps

### 1. Push to GitHub (if not already done)
```bash
# Create a new repository on GitHub first, then:
git remote add origin https://github.com/yourusername/your-repo-name.git
git branch -M main
git push -u origin main
```

### 2. Deploy to Vercel

#### Option A: Vercel CLI (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project directory
cd portfolio-nextjs
vercel

# Follow the prompts:
# - Link to existing project? No
# - What's your project's name? portfolio-nextjs
# - In which directory is your code located? ./
# - Want to override the settings? No
```

#### Option B: Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Configure settings (see below)

### 3. Environment Variables Setup

In Vercel Dashboard → Project → Settings → Environment Variables, add:

```env
MONGODB_URI=mongodb+srv://Makanaka:7653mac843@cluster0.mebby4n.mongodb.net/portfolio?retryWrites=true&w=majority
ADMIN_PIN_HASH=$2b$12$4uOvi9R0xDby7pxgwXUNiOeBDIkJqRst7qRg4nGlw//NXqw6fBdGm
RESEND_API_KEY=re_JpzRtKns_MoGQyaSJETpNoa8SxQ3Fzwzc
ADMIN_EMAIL=mkanakabailey@gmail.com
NEXT_PUBLIC_BASE_URL=https://your-vercel-domain.vercel.app
```

### 4. Build Settings (Auto-detected)
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### 5. Domain Configuration (Optional)
- Add custom domain in Vercel Dashboard
- Update `NEXT_PUBLIC_BASE_URL` environment variable

## Post-Deployment Checklist

### ✅ Test Core Functionality
1. **Homepage**: Visit your deployed URL
2. **API Health**: `https://your-domain.vercel.app/api/health`
3. **Contact Form**: Test form submission
4. **Admin Panel**: `https://your-domain.vercel.app/admin` (PIN: 7653)

### ✅ MongoDB Atlas Configuration
1. **Network Access**: Add `0.0.0.0/0` to IP whitelist
2. **Database User**: Ensure user has read/write permissions
3. **Connection String**: Verify it works in production

### ✅ Email Configuration
1. **Resend API**: Verify API key is active
2. **Domain Verification**: Add your domain to Resend (optional)
3. **Test Email**: Send test contact form

## Troubleshooting

### Common Issues

#### Build Failures
```bash
# Check build locally first
npm run build

# Check TypeScript errors
npm run type-check
```

#### Environment Variables
- Ensure all required variables are set
- Check for typos in variable names
- Verify MongoDB connection string format

#### Database Connection
- MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Database user has proper permissions
- Connection string is URL-encoded

#### Email Issues
- Resend API key is valid
- Admin email is correct
- Check Vercel function logs

### Vercel CLI Commands
```bash
# Check deployment status
vercel ls

# View logs
vercel logs

# Redeploy
vercel --prod

# Remove deployment
vercel rm project-name
```

## Performance Optimization

### Automatic Optimizations
- ✅ Static page generation
- ✅ API route optimization
- ✅ Image optimization (Next.js)
- ✅ Code splitting
- ✅ Compression

### Manual Optimizations
- Add custom domain for better performance
- Configure CDN settings
- Monitor Core Web Vitals in Vercel Analytics

## Security Considerations

### Environment Variables
- Never commit `.env.local` to Git
- Use strong admin PIN in production
- Rotate API keys regularly

### Database Security
- Use strong MongoDB passwords
- Limit database user permissions
- Enable MongoDB Atlas security features

### Rate Limiting
- Monitor API usage
- Adjust rate limits as needed
- Consider upgrading Vercel plan for higher limits

## Monitoring & Analytics

### Vercel Analytics
- Enable Web Analytics in project settings
- Monitor Core Web Vitals
- Track page performance

### Error Monitoring
- Check Vercel function logs
- Monitor API endpoint errors
- Set up alerts for critical issues

## Next Steps After Deployment

1. **Custom Domain**: Add your own domain
2. **SSL Certificate**: Automatic with Vercel
3. **Analytics**: Set up Google Analytics
4. **SEO**: Submit sitemap to search engines
5. **Content**: Add your actual portfolio content
6. **Backup**: Set up database backups

## Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **MongoDB Atlas**: [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com)
- **Resend Docs**: [resend.com/docs](https://resend.com/docs)