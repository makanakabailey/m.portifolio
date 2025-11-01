# 📋 Manual Deployment Steps

## Step 1: GitHub Repository Setup

1. **Create a new repository on GitHub**:
   - Go to [github.com](https://github.com)
   - Click "New repository"
   - Name: `portfolio-nextjs` (or your preferred name)
   - Make it public or private
   - Don't initialize with README (we already have one)

2. **Push your code to GitHub**:
   ```bash
   cd portfolio-nextjs
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

## Step 2: Vercel Deployment

1. **Go to Vercel Dashboard**:
   - Visit [vercel.com](https://vercel.com)
   - Sign up/Sign in with GitHub

2. **Import Project**:
   - Click "New Project"
   - Select "Import Git Repository"
   - Choose your portfolio repository
   - Click "Import"

3. **Configure Project**:
   - **Project Name**: `portfolio-nextjs`
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)

## Step 3: Environment Variables

In Vercel Dashboard → Project Settings → Environment Variables, add these:

### Required Variables:
```
MONGODB_URI = mongodb+srv://Makanaka:7653mac843@cluster0.mebby4n.mongodb.net/portfolio?retryWrites=true&w=majority

ADMIN_PIN_HASH = $2b$12$4uOvi9R0xDby7pxgwXUNiOeBDIkJqRst7qRg4nGlw//NXqw6fBdGm

RESEND_API_KEY = re_JpzRtKns_MoGQyaSJETpNoa8SxQ3Fzwzc

ADMIN_EMAIL = mkanakabailey@gmail.com

NEXT_PUBLIC_BASE_URL = https://your-project-name.vercel.app
```

### Optional Variables:
```
NEXT_PUBLIC_GA_MEASUREMENT_ID = G-XXXXXXXXXX
```

**Important**: Replace `your-project-name` with your actual Vercel project URL.

## Step 4: Deploy

1. Click "Deploy" in Vercel
2. Wait for build to complete (2-3 minutes)
3. Your site will be live at `https://your-project-name.vercel.app`

## Step 5: Post-Deployment Testing

### Test these URLs:
1. **Homepage**: `https://your-domain.vercel.app/`
2. **Health Check**: `https://your-domain.vercel.app/api/health`
3. **Admin Panel**: `https://your-domain.vercel.app/admin` (PIN: 7653)
4. **Contact Form**: `https://your-domain.vercel.app/contact`
5. **Cases**: `https://your-domain.vercel.app/cases`

### Test Admin Functions:
1. Go to admin panel
2. Enter PIN: `7653`
3. Test contact inquiries view
4. Test posts management
5. Test cases management

## Step 6: MongoDB Atlas Configuration

1. **Network Access**:
   - Go to MongoDB Atlas Dashboard
   - Network Access → Add IP Address
   - Add `0.0.0.0/0` (allow all IPs)
   - Or add Vercel's IP ranges

2. **Database User**:
   - Ensure user `Makanaka` has read/write permissions
   - Password should match the connection string

## Step 7: Domain Configuration (Optional)

1. **Custom Domain**:
   - In Vercel Dashboard → Project → Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

2. **Update Environment Variable**:
   - Change `NEXT_PUBLIC_BASE_URL` to your custom domain
   - Redeploy the project

## Troubleshooting

### Build Failures:
- Check Vercel build logs
- Ensure all dependencies are in `package.json`
- Verify TypeScript compilation locally

### Database Connection Issues:
- Verify MongoDB Atlas network access
- Check connection string format
- Test connection string locally

### Email Issues:
- Verify Resend API key
- Check admin email address
- Test email functionality

### Environment Variables:
- Ensure all required variables are set
- Check for typos in variable names
- Verify values are correct

## Success Indicators

✅ **Build Status**: "Ready" in Vercel Dashboard  
✅ **Homepage**: Loads without errors  
✅ **API Health**: Returns 200 status  
✅ **Admin Access**: PIN authentication works  
✅ **Contact Form**: Submissions work  
✅ **Database**: Mock data displays correctly  

## Next Steps

1. **Content Management**: Add your actual portfolio content
2. **SEO**: Submit sitemap to Google Search Console
3. **Analytics**: Set up Google Analytics
4. **Monitoring**: Set up error tracking
5. **Backup**: Configure database backups
6. **Performance**: Monitor Core Web Vitals

## Support Resources

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Deployment**: [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
- **MongoDB Atlas**: [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com)

Your portfolio is now ready for production! 🚀