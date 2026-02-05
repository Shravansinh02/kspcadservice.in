#!/bin/bash

# Railway Backend Deployment Script

echo "🚀 Preparing Backend for Railway Deployment..."

cd backend

# Check if railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "⚠️  Railway CLI not found. Installing..."
    npm i -g @railway/cli
fi

# Initialize Railway project
echo "📦 Initializing Railway project..."
railway login

# Link to existing project or create new
echo "🔗 Linking to Railway project..."
railway link

# Set environment variables
echo "⚙️  Setting environment variables..."
echo "Please enter your MongoDB connection URL:"
read MONGO_URL

railway variables set MONGO_URL="$MONGO_URL"
railway variables set DB_NAME="ksp_cad_service"
railway variables set CORS_ORIGINS="*"

# Deploy
echo "🚢 Deploying to Railway..."
railway up

echo "✅ Backend deployment complete!"
echo "📋 Get your backend URL from Railway dashboard"
