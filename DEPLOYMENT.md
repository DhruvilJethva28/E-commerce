# Deployment Guide

## 🚀 Deploying ShopHub E-Commerce Platform

This guide covers deploying both backend and frontend to production environments.

## Prerequisites for Deployment

- Git repository (GitHub)
- Heroku account (for backend)
- MongoDB Atlas account (for database)
- Netlify account (for frontend)
- Environment variables configured

## 1️⃣ Database Setup (MongoDB Atlas)

### Step 1: Create MongoDB Atlas Cluster
1. Go to https://www.mongodb.com/cloud/atlas
2. Create account and login
3. Create a new cluster
4. Choose free tier (M0)
5. Select region close to your users

### Step 2: Get Connection String
1. Go to Database → Connect
2. Choose "Connect your application"
3. Copy connection string
4. Replace `<password>` and `<username>`
5. Save for backend configuration

### Step 3: Create Database User
1. Go to Database Access
2. Click "Add New Database User"
3. Create username and password
4. Grant Atlas admin role

## 2️⃣ Backend Deployment (Heroku)

### Step 1: Install Heroku CLI
```bash
# Windows - use installer
# Mac
brew install heroku

# Linux
curl https://cli.heroku.com/install.sh | sh
```

### Step 2: Login to Heroku
```bash
heroku login
# Opens browser to login
```

### Step 3: Create Heroku App
```bash
cd backend
heroku create your-app-name
```

### Step 4: Set Environment Variables
```bash
heroku config:set PORT=5000
heroku config:set MONGODB_URI=your_mongodb_connection_string
heroku config:set JWT_SECRET=your_secret_key_here
heroku config:set NODE_ENV=production
heroku config:set FRONTEND_URL=https://your-frontend-url.com
```

### Step 5: Deploy
```bash
git push heroku main
# or
git push heroku master
```

### Step 6: Monitor Logs
```bash
heroku logs --tail
```

### Verify Deployment
```bash
heroku open  # Opens your app
```

Visit `https://your-app-name.herokuapp.com/api/health`

---

## 3️⃣ Frontend Deployment (Netlify)

### Option A: Deploy via Netlify CLI

#### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

#### Step 2: Build Frontend
```bash
cd frontend
npm run build
```

#### Step 3: Deploy
```bash
netlify deploy --prod --dir=build
```

#### Step 4: Configure Environment
Update `src/utils/api.js` with production backend URL:
```javascript
baseURL: 'https://your-app-name.herokuapp.com/api'
```

### Option B: Deploy via GitHub (Recommended)

#### Step 1: Push to GitHub
```bash
git push origin main
```

#### Step 2: Connect to Netlify
1. Go to https://netlify.com
2. Click "New site from Git"
3. Choose GitHub
4. Select your repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `build`

#### Step 3: Add Environment Variables
In Netlify dashboard:
1. Go to Site settings → Build & deploy → Environment
2. Add environment variables:
   - `REACT_APP_API_URL=https://your-app-name.herokuapp.com/api`

#### Step 4: Deploy
- Push to main branch to trigger automatic deployment

---

## 4️⃣ Environment Variables

### Backend (.env - Heroku Config Vars)
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
JWT_SECRET=your_long_secure_key_here
JWT_EXPIRE=7d
NODE_ENV=production
FRONTEND_URL=https://your-frontend-url.com
```

### Frontend (.env - Netlify Env Vars)
```
REACT_APP_API_URL=https://your-backend-url.com/api
```

---

## 5️⃣ Custom Domain Setup

### For Heroku Backend
1. Buy domain from GoDaddy, Namecheap, etc.
2. In Heroku dashboard: Settings → Domains
3. Add custom domain
4. Point domain DNS to Heroku

### For Netlify Frontend
1. In Netlify dashboard: Site settings → Domain management
2. Add custom domain
3. Update DNS records if needed

---

## 6️⃣ SSL/HTTPS Setup

### Heroku
- Automatic SSL via *.herokuapp.com
- Free SSL with custom domain via Heroku SSL

### Netlify
- Automatic SSL included
- Works with custom domains

---

## 7️⃣ Monitoring & Maintenance

### Backend Monitoring
```bash
# View logs
heroku logs --tail

# Monitor app status
heroku status

# Check dynos
heroku ps
```

### Frontend Monitoring
- Netlify analytics dashboard
- Performance monitoring
- Deploy history

---

## 8️⃣ Database Backups

### MongoDB Atlas Backup
1. Go to Database → Backup
2. Enable Automated Backup
3. Create snapshots before major changes
4. Export collections if needed

---

## 9️⃣ Performance Optimization

### Backend
```javascript
// Add caching
// Use database indexes
// Implement compression
// Use CDN for static files
```

### Frontend
```bash
# Build optimization
npm run build

# Check bundle size
npm install -g webpack-bundle-analyzer
```

---

## 🔟 Troubleshooting

### Backend Not Starting
```bash
heroku logs --tail  # Check logs
heroku restart      # Restart app
```

### Cannot Connect to MongoDB
- Check connection string
- Verify IP whitelist in MongoDB Atlas
- Check firewall settings

### Frontend Build Fails
- Check Node version compatibility
- Verify all dependencies installed
- Clear npm cache: `npm cache clean --force`

---

## ✅ Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Database migrations run
- [ ] Frontend build succeeds locally
- [ ] Backend health check works
- [ ] API endpoints tested in production
- [ ] CORS configured correctly
- [ ] Error handling implemented
- [ ] Logging configured
- [ ] Performance tested
- [ ] Security headers added
- [ ] Authentication tokens working
- [ ] File uploads working (if applicable)

---

## 📚 Additional Resources

- [Heroku Documentation](https://devcenter.heroku.com/)
- [Netlify Documentation](https://docs.netlify.com/)
- [MongoDB Atlas Guide](https://docs.atlas.mongodb.com/)
- [Express Production Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)
- [React Deployment Guide](https://create-react-app.dev/docs/deployment/)

---

## 🎯 Production Best Practices

1. **Security**
   - Use environment variables for secrets
   - Enable HTTPS
   - Set security headers
   - Validate all inputs

2. **Performance**
   - Use CDN for static assets
   - Enable gzip compression
   - Implement caching strategies
   - Optimize images

3. **Reliability**
   - Set up monitoring
   - Configure automated backups
   - Implement error tracking (Sentry)
   - Set up alerting

4. **Scalability**
   - Use database indexing
   - Implement pagination
   - Use horizontal scaling
   - Load balancing

---

**Your application is now production-ready! 🎉**
