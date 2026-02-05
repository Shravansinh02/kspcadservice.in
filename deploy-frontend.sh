#!/bin/bash

# Cloudflare Pages Frontend Deployment Script

echo "🚀 Preparing Frontend for Cloudflare Pages Deployment..."

cd frontend

# Check if wrangler CLI is installed
if ! command -v wrangler &> /dev/null; then
    echo "⚠️  Wrangler CLI not found. Installing..."
    npm install -g wrangler
fi

# Login to Cloudflare
echo "🔑 Login to Cloudflare..."
wrangler login

# Get backend URL
echo "🔗 Enter your Railway backend URL (e.g., https://your-app.railway.app):"
read BACKEND_URL

# Update .env file
echo "REACT_APP_BACKEND_URL=$BACKEND_URL" > .env.production

# Build the project
echo "🔨 Building frontend..."
yarn build

# Deploy to Cloudflare Pages
echo "🚢 Deploying to Cloudflare Pages..."
wrangler pages deploy build --project-name=ksp-cad-service

echo "✅ Frontend deployment complete!"
echo "📋 Your site is now live on Cloudflare Pages"
