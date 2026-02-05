# Quick Deployment Commands

## Backend (Railway)

### Option 1: Using Railway CLI
```bash
cd backend
railway login
railway init
railway up
```

### Option 2: Using GitHub
1. Push backend folder to GitHub
2. Connect repository to Railway
3. Set environment variables in Railway dashboard

## Frontend (Cloudflare Pages)

### Option 1: Using Wrangler CLI
```bash
cd frontend
npm install -g wrangler
wrangler login
yarn build
wrangler pages deploy build --project-name=ksp-cad-service
```

### Option 2: Using GitHub
1. Push frontend folder to GitHub
2. Connect repository to Cloudflare Pages
3. Set build command: `yarn build`
4. Set build output: `build`
5. Set environment variable: `REACT_APP_BACKEND_URL=<your-railway-url>`

## Environment Variables

### Backend (.env on Railway)
```
MONGO_URL=mongodb+srv://user:pass@cluster.mongodb.net/
DB_NAME=ksp_cad_service
CORS_ORIGINS=*
```

### Frontend (.env on Cloudflare)
```
REACT_APP_BACKEND_URL=https://your-backend.railway.app
NODE_VERSION=20
```

## MongoDB Setup

### MongoDB Atlas (Free Tier)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create free M0 cluster
3. Create database user
4. Whitelist all IPs: 0.0.0.0/0
5. Get connection string

### Railway MongoDB
1. Add MongoDB service in Railway project
2. Copy connection URL from service variables

## Testing Deployment

```bash
# Test backend
curl https://your-backend.railway.app/api/

# Test frontend
curl https://ksp-cad-service.pages.dev
```

## Custom Domain

### Cloudflare Pages
- Add custom domain in Pages dashboard
- Update DNS records

### Railway
- Add custom domain in project settings
- Update DNS CNAME record

## Important Notes

1. Update CORS_ORIGINS in Railway after frontend deployment
2. Test WhatsApp links with production URLs
3. Verify contact form submissions
4. Check MongoDB connection from Railway
5. Monitor Railway logs for errors

## Support Links

- Railway: https://docs.railway.app
- Cloudflare Pages: https://developers.cloudflare.com/pages/
- MongoDB Atlas: https://docs.atlas.mongodb.com/
