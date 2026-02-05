# KSP CAD Service - Deployment Guide

## 🚀 Deployment Instructions

### Prerequisites
- Railway account (https://railway.app)
- Cloudflare account (https://cloudflare.com)
- MongoDB Atlas account (https://www.mongodb.com/cloud/atlas) or Railway MongoDB
- Git repository (GitHub, GitLab, or Bitbucket)

---

## Part 1: Backend Deployment on Railway

### Step 1: Create MongoDB Database

**Option A: MongoDB Atlas (Recommended)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Create a database user
4. Whitelist all IPs (0.0.0.0/0)
5. Get your connection string:
   ```
   mongodb+srv://<username>:<password>@cluster.xxxxx.mongodb.net/<dbname>?retryWrites=true&w=majority
   ```

**Option B: Railway MongoDB**
1. In Railway dashboard, click "New Project"
2. Click "Add MongoDB" service
3. Copy the MongoDB connection URL

### Step 2: Deploy Backend to Railway

1. **Push code to GitHub:**
   ```bash
   cd /app/backend
   git init
   git add .
   git commit -m "Backend for KSP CAD Service"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy on Railway:**
   - Go to https://railway.app
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your backend repository
   - Railway will auto-detect Python and deploy

3. **Set Environment Variables in Railway:**
   Go to your Railway project → Variables tab and add:
   ```
   MONGO_URL=mongodb+srv://username:password@cluster.xxxxx.mongodb.net/
   DB_NAME=ksp_cad_service
   CORS_ORIGINS=*
   ```

4. **Get Railway Backend URL:**
   - After deployment, Railway will give you a URL like:
   - `https://your-app.railway.app`
   - Copy this URL (you'll need it for frontend)

---

## Part 2: Frontend Deployment on Cloudflare Pages

### Step 1: Update Backend URL

1. Create a production `.env` file:
   ```bash
   cd /app/frontend
   ```

2. Update REACT_APP_BACKEND_URL to your Railway URL:
   ```
   REACT_APP_BACKEND_URL=https://your-app.railway.app
   ```

### Step 2: Push Frontend to GitHub

```bash
cd /app/frontend
git init
git add .
git commit -m "Frontend for KSP CAD Service"
git remote add origin <your-frontend-github-repo-url>
git push -u origin main
```

### Step 3: Deploy on Cloudflare Pages

1. **Login to Cloudflare:**
   - Go to https://dash.cloudflare.com
   - Navigate to Pages

2. **Create New Project:**
   - Click "Create a project"
   - Connect your GitHub account
   - Select your frontend repository

3. **Configure Build Settings:**
   ```
   Framework preset: Create React App
   Build command: yarn build
   Build output directory: build
   Node.js version: 20
   ```

4. **Set Environment Variables:**
   In Cloudflare Pages settings, add:
   ```
   REACT_APP_BACKEND_URL=https://your-app.railway.app
   NODE_VERSION=20
   ```

5. **Deploy:**
   - Click "Save and Deploy"
   - Wait for build to complete
   - Your site will be available at: `https://your-project.pages.dev`

### Step 4: Update CORS (Important!)

Go back to Railway backend environment variables and update:
```
CORS_ORIGINS=https://your-project.pages.dev,https://kspcadservice.in
```

---

## Part 3: Custom Domain Setup (Optional)

### For Cloudflare Pages:
1. Go to Pages → Your Project → Custom domains
2. Add your domain: `kspcadservice.in`
3. Update DNS records as instructed by Cloudflare

### For Railway Backend:
1. Go to Railway Project → Settings → Domains
2. Add custom domain if needed

---

## 📋 Verification Checklist

After deployment, verify:

- [ ] Backend API accessible: `https://your-app.railway.app/api/`
- [ ] Frontend loads properly: `https://your-project.pages.dev`
- [ ] WhatsApp buttons work correctly
- [ ] Contact form submits successfully
- [ ] Portfolio images load properly
- [ ] MongoDB connection working

---

## 🔧 Environment Variables Summary

### Backend (Railway)
```
MONGO_URL=<your-mongodb-connection-string>
DB_NAME=ksp_cad_service
CORS_ORIGINS=*
```

### Frontend (Cloudflare Pages)
```
REACT_APP_BACKEND_URL=<your-railway-backend-url>
NODE_VERSION=20
```

---

## 🐛 Troubleshooting

### Backend Issues:
1. **Build fails:** Check requirements.txt and Python version
2. **MongoDB connection error:** Verify MONGO_URL and whitelist IPs
3. **CORS error:** Update CORS_ORIGINS with frontend URL

### Frontend Issues:
1. **Build fails:** Check Node.js version (should be 20)
2. **API calls fail:** Verify REACT_APP_BACKEND_URL is correct
3. **Assets not loading:** Check build output directory

---

## 📞 Support

For deployment issues:
- Railway: https://railway.app/help
- Cloudflare: https://developers.cloudflare.com/pages/
- MongoDB Atlas: https://www.mongodb.com/docs/atlas/

---

## 🎉 Post-Deployment

Once deployed:
1. Test all functionality thoroughly
2. Monitor Railway logs for errors
3. Set up custom domain if needed
4. Configure analytics (optional)
5. Set up monitoring and alerts

**Your KSP CAD Service website is now live! 🚀**
