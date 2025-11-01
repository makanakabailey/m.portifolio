# Portfolio - Next.js Full-Stack Application

A professional portfolio website built with Next.js, featuring admin content management, contact forms, and dynamic case studies.

## 🚀 Features

- **Modern Stack**: Next.js 15, TypeScript, Tailwind CSS
- **Admin Panel**: PIN-based authentication with content management
- **Dynamic Content**: Case studies and daily posts management
- **Contact Forms**: Email integration with Resend
- **File Uploads**: Vercel Blob storage integration
- **SEO Optimized**: Sitemap, robots.txt, meta tags
- **Responsive Design**: Mobile-first approach
- **Performance**: 90+ Lighthouse scores

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **Database**: MongoDB Atlas
- **Authentication**: bcrypt PIN-based system
- **Email**: Resend API
- **File Storage**: Vercel Blob
- **Deployment**: Vercel
- **Analytics**: Vercel Analytics, Google Analytics 4

## 📁 Project Structure

```
portfolio-nextjs/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (routes)/          # Page routes
│   │   │   ├── about/
│   │   │   ├── cases/
│   │   │   ├── contact/
│   │   │   ├── estimate/
│   │   │   ├── services/
│   │   │   └── admin/
│   │   ├── api/               # API routes
│   │   │   ├── posts/         # Daily posts CRUD
│   │   │   ├── cases/         # Case studies CRUD
│   │   │   ├── contact/       # Contact form
│   │   │   └── upload/        # File upload
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx          # Homepage
│   │   ├── sitemap.ts        # SEO sitemap
│   │   └── robots.ts         # SEO robots
│   ├── components/            # React components
│   │   ├── ui/               # UI components
│   │   ├── admin/            # Admin components
│   │   └── Navigation.tsx    # Main navigation
│   └── lib/                  # Utilities
│       ├── mongodb.ts        # Database connection
│       ├── auth.ts          # Authentication
│       └── utils.ts         # Helper functions
├── public/                   # Static assets
│   └── assets/              # Images and media
├── .env.local               # Environment variables
├── .env.example            # Environment template
├── DEPLOYMENT.md           # Deployment guide
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- MongoDB Atlas account
- Resend account (for email)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio-nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your values:
   ```env
   MONGODB_URI=mongodb+srv://...
   ADMIN_PIN_HASH=$2b$12$4uOvi9R0xDby7pxgwXUNiOeBDIkJqRst7qRg4nGlw//NXqw6fBdGm
   RESEND_API_KEY=re_your_api_key
   ADMIN_EMAIL=your@email.com
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Admin Access

- **URL**: `/admin`
- **PIN**: `7653`
- **Features**:
  - Daily posts management
  - Case studies management
  - File uploads
  - Content editing

## 📝 API Endpoints

### Daily Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create new post
- `PATCH /api/posts/[id]` - Update post
- `DELETE /api/posts/[id]` - Delete post

### Case Studies
- `GET /api/cases` - Get all cases (with filtering)
- `POST /api/cases` - Create new case
- `GET /api/cases/[slug]` - Get single case
- `PATCH /api/cases/[slug]` - Update case
- `DELETE /api/cases/[slug]` - Delete case

### Contact & Upload
- `POST /api/contact` - Submit contact form
- `POST /api/upload` - Upload files to Vercel Blob

## 🎨 Customization

### Design System
The application uses a custom design system defined in `src/app/globals.css`:

- **Colors**: Pure black and white with yellow accent
- **Typography**: Inter font with custom scales
- **Components**: Pill buttons, card rounded corners
- **Utilities**: Custom hover effects and animations

### Adding New Pages
1. Create page in `src/app/your-page/page.tsx`
2. Add navigation link in `src/components/Navigation.tsx`
3. Update sitemap in `src/app/sitemap.ts`

### Modifying Admin Panel
Admin components are in `src/components/admin/`:
- `DailyPostsAdmin.tsx` - Posts management
- `CasesAdmin.tsx` - Case studies management

## 🚀 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Add environment variables
   - Deploy

3. **Set up MongoDB Atlas**
   - Create free cluster
   - Add connection string to Vercel env vars

## 📊 Performance

- **Lighthouse Scores**: 90+ across all metrics
- **Core Web Vitals**: Optimized for speed
- **SEO**: Comprehensive meta tags and structured data
- **Accessibility**: WCAG compliant components

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `ADMIN_PIN_HASH` | Bcrypt hash of admin PIN | Yes |
| `RESEND_API_KEY` | Resend email API key | Yes |
| `ADMIN_EMAIL` | Admin email address | Yes |
| `NEXT_PUBLIC_BASE_URL` | Base URL for the app | Yes |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics ID | No |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Email: mkanakabailey@gmail.com
- WhatsApp: +263 78 883 9065

---

**Built with ❤️ using Next.js and modern web technologies.**