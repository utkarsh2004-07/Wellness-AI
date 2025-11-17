# Deployment Guide - AI Wellness App

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Environment Variables**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your API keys
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

## 🔧 Environment Setup

### Required API Keys

1. **Gemini AI API Key**
   - Visit: https://makersuite.google.com/app/apikey
   - Create new API key
   - Add to `.env.local` as `GEMINI_API_KEY`

2. **MongoDB Connection**
   - Local: `mongodb://localhost:27017/ai-wellness-app`
   - Atlas: Get connection string from MongoDB Atlas
   - Add to `.env.local` as `MONGODB_URI`

3. **Cloudinary Setup**
   - Sign up at https://cloudinary.com
   - Get Cloud Name, API Key, API Secret
   - Add to `.env.local`

4. **USDA API Key (Optional)**
   - Get from: https://fdc.nal.usda.gov/api-guide.html
   - Add to `.env.local` as `USDA_API_KEY`

### Environment Variables Template

```env
GEMINI_API_KEY=your_gemini_api_key_here
MONGODB_URI=mongodb://localhost:27017/ai-wellness-app
NEXTAUTH_SECRET=your_secret_key_here
NEXTAUTH_URL=http://localhost:3000
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
USDA_API_KEY=your_usda_api_key
```

## 📦 Production Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your-repo-url
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Visit https://vercel.com
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard
   - Deploy automatically

3. **Configure Domain**
   - Add custom domain in Vercel settings
   - Update NEXTAUTH_URL in environment variables

### Manual Server Deployment

1. **Build Application**
   ```bash
   npm run build
   ```

2. **Start Production Server**
   ```bash
   npm start
   ```

3. **Configure Reverse Proxy (Nginx)**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## 🗄️ Database Setup

### MongoDB Local Setup

1. **Install MongoDB**
   ```bash
   # Ubuntu/Debian
   sudo apt-get install mongodb
   
   # macOS
   brew install mongodb-community
   
   # Windows
   # Download from https://www.mongodb.com/try/download/community
   ```

2. **Start MongoDB**
   ```bash
   mongod
   ```

3. **Create Admin User**
   ```bash
   npm run create-admin
   ```

### MongoDB Atlas (Cloud)

1. **Create Cluster**
   - Sign up at https://www.mongodb.com/atlas
   - Create new cluster
   - Get connection string

2. **Configure Network Access**
   - Add your IP address
   - Or allow access from anywhere (0.0.0.0/0)

3. **Create Database User**
   - Create user with read/write permissions
   - Use credentials in connection string

## 🔐 Admin Setup

### Create Initial Admin User

Run the admin creation script:

```bash
node -e "
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

async function createAdmin() {
  await mongoose.connect('your_mongodb_uri');
  
  const AdminSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String
  });
  
  const Admin = mongoose.model('Admin', AdminSchema);
  
  const hashedPassword = await bcrypt.hash('admin123', 12);
  
  const admin = new Admin({
    name: 'Admin User',
    email: 'admin@aiwellness.app',
    password: hashedPassword,
    role: 'admin'
  });
  
  await admin.save();
  console.log('Admin created: admin@aiwellness.app / admin123');
  process.exit(0);
}

createAdmin();
"
```

### Admin Access

- URL: `/admin/login`
- Email: `admin@aiwellness.app`
- Password: `admin123`
- **Change password after first login**

## 🎯 Buy Me a Coffee Setup

1. **Create Account**
   - Sign up at https://www.buymeacoffee.com
   - Set up your profile

2. **Update Payment Links**
   - Edit `/src/app/buy/page.js`
   - Replace `yourname` with your Buy Me a Coffee username
   - Test payment flow

3. **Configure Webhooks (Optional)**
   - Set up webhooks for automatic premium activation
   - Add webhook endpoint in Buy Me a Coffee settings

## 📱 PWA Configuration

### Service Worker

The app includes a service worker (`/public/sw.js`) that:
- Caches important pages for offline access
- Provides offline fallback page
- Enables app installation

### App Icons

Add app icons to `/public/icons/`:
- icon-72x72.png
- icon-96x96.png
- icon-128x128.png
- icon-144x144.png
- icon-152x152.png
- icon-192x192.png
- icon-384x384.png
- icon-512x512.png

### Manifest

The PWA manifest is configured in `/public/manifest.json`. Update:
- App name and description
- Theme colors
- Icon paths
- Start URL

## 🔍 SEO Optimization

### Meta Tags

Update meta tags in:
- `/src/app/layout.js` (global)
- `/src/app/page.js` (homepage)
- Individual page components

### Sitemap

Create `/public/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://yourdomain.com/login</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

### Robots.txt

Create `/public/robots.txt`:
```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: https://yourdomain.com/sitemap.xml
```

## 🚨 Security Checklist

- [ ] Environment variables secured
- [ ] Admin password changed
- [ ] HTTPS enabled
- [ ] CORS configured
- [ ] Rate limiting implemented
- [ ] Input validation in place
- [ ] File upload restrictions
- [ ] Database access secured

## 📊 Monitoring

### Error Tracking

Add error tracking service:
- Sentry
- LogRocket
- Bugsnag

### Analytics

Add analytics:
- Google Analytics
- Mixpanel
- Amplitude

### Performance

Monitor performance:
- Vercel Analytics
- Google PageSpeed Insights
- Lighthouse CI

## 🔄 Updates

### Updating Dependencies

```bash
npm update
npm audit fix
```

### Database Migrations

For schema changes, create migration scripts in `/migrations/`

### Backup Strategy

- Regular database backups
- Environment variable backups
- Code repository backups

## 🆘 Troubleshooting

### Common Issues

1. **Gemini API Errors**
   - Check API key validity
   - Verify API quotas
   - Check request format

2. **MongoDB Connection**
   - Verify connection string
   - Check network access
   - Confirm database exists

3. **Cloudinary Upload Fails**
   - Check API credentials
   - Verify file size limits
   - Check file format support

4. **PWA Not Installing**
   - Verify HTTPS
   - Check manifest.json
   - Ensure service worker registered

### Logs

Check application logs:
```bash
# Vercel
vercel logs

# Local
npm run dev

# Production
pm2 logs
```

## 📞 Support

For deployment issues:
- Check documentation
- Review error logs
- Contact support team
- Create GitHub issue