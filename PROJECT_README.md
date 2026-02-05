# KSP CAD Service - Full Stack Website

Modern, animated website for professional AutoCAD and architectural planning services.

## 🎨 Features

- **Dark Theme Design** with blue-cyan brand colors matching logo
- **Full Animations**: Smooth scroll, hover effects, fade-in transitions
- **Portfolio Gallery** with modal viewer and uploaded CAD drawings
- **Contact Form** with backend API and MongoDB storage
- **WhatsApp Integration** for direct client communication
- **Responsive Design** with mobile menu
- **Professional Sections**: Services, Portfolio, Process, Why Choose Us

## 🛠️ Tech Stack

### Frontend
- React 19.0.0
- Tailwind CSS with custom dark theme
- Lucide React icons
- Sonner for toast notifications
- Axios for API calls
- React Router DOM
- Shadcn UI components

### Backend
- FastAPI (Python)
- Motor (MongoDB async driver)
- Pydantic for validation
- CORS middleware
- Email validation

### Database
- MongoDB (Atlas or Railway)

## 📁 Project Structure

```
/app
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── App.js
│   │   └── App.css         # Dark theme styles
│   ├── package.json
│   ├── wrangler.toml       # Cloudflare config
│   └── cloudflare.json
│
├── backend/
│   ├── server.py           # FastAPI application
│   ├── requirements.txt    # Python dependencies
│   ├── railway.json        # Railway config
│   ├── Procfile
│   ├── nixpacks.toml
│   └── runtime.txt
│
├── DEPLOYMENT_GUIDE.md     # Detailed deployment steps
├── QUICK_DEPLOY.md         # Quick reference commands
└── PROJECT_README.md       # This file
```

## 🚀 Local Development

### Prerequisites
- Node.js v20
- Python 3.10+
- MongoDB (local or Atlas)

### Frontend Setup
```bash
cd frontend
yarn install
yarn start
```

Frontend runs on: http://localhost:3000

### Backend Setup
```bash
cd backend
pip install -r requirements.txt

# Create .env file
echo "MONGO_URL=mongodb://localhost:27017/" > .env
echo "DB_NAME=ksp_cad_service" >> .env
echo "CORS_ORIGINS=*" >> .env

# Run server
uvicorn server:app --reload --port 8001
```

Backend runs on: http://localhost:8001

## 🌐 Production Deployment

### Quick Steps:

1. **Backend on Railway:**
   ```bash
   cd backend
   railway login
   railway init
   railway up
   ```

2. **Frontend on Cloudflare Pages:**
   ```bash
   cd frontend
   wrangler login
   yarn build
   wrangler pages deploy build --project-name=ksp-cad-service
   ```

3. **MongoDB:**
   - Use MongoDB Atlas (free tier)
   - Or Railway MongoDB service

📖 **See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed instructions**

## 🔧 Environment Variables

### Backend (.env)
```env
MONGO_URL=mongodb+srv://user:password@cluster.mongodb.net/
DB_NAME=ksp_cad_service
CORS_ORIGINS=*
```

### Frontend (.env)
```env
REACT_APP_BACKEND_URL=https://your-backend.railway.app
```

## 📋 API Endpoints

### Contact Form
- **POST** `/api/contact` - Submit contact form
- **GET** `/api/contact` - Get all submissions

### Health Check
- **GET** `/api/` - API status check

## 🎨 Color Palette

```css
Primary Blue: #00B4D8
Secondary Blue: #0096C7
Active Blue: #0077B6
Background: #000000
Card Background: #121212
Text: #FFFFFF
```

## 📱 Contact Information

- **Email**: info@kspcadservice.in
- **Phone**: +91 7990245100
- **WhatsApp**: Direct link integration

## 🧪 Testing

Backend API testing:
```bash
# Test contact form submission
curl -X POST https://your-backend.railway.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+91 9876543210",
    "message": "Test message"
  }'
```

## 📦 Dependencies

### Frontend Key Packages
- react: ^19.0.0
- axios: ^1.8.4
- lucide-react: ^0.507.0
- sonner: ^2.0.3
- react-router-dom: ^7.5.1

### Backend Key Packages
- fastapi: 0.110.1
- motor: 3.3.1
- pydantic: ^2.6.4
- uvicorn: 0.25.0

## 🐛 Troubleshooting

### Common Issues:

1. **CORS Error**: Update CORS_ORIGINS in backend .env
2. **MongoDB Connection**: Check MONGO_URL and IP whitelist
3. **Build Fails**: Verify Node.js version (v20)
4. **API Not Working**: Check REACT_APP_BACKEND_URL

## 📄 License

© 2025 KSP CAD Service. All rights reserved.

## 🤝 Support

For issues or questions:
- Check DEPLOYMENT_GUIDE.md
- Review Railway/Cloudflare documentation
- Contact: info@kspcadservice.in

---

**Built with ❤️ for KSP CAD Service**
