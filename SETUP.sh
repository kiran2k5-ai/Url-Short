#!/usr/bin/env bash

# LinkNest - Complete Integration Setup & Run Script
# This script helps you set up and run both frontend and backend

echo "🔗 LinkNest - SaaS URL Shortener"
echo "================================="
echo ""

# Check if backend and frontend exist
if [ ! -d "url-shortener-backend" ] || [ ! -d "url-shortener-frontend" ]; then
    echo "❌ Error: Make sure you're in the root directory with both folders"
    exit 1
fi

echo "📦 Setting up Backend..."
echo ""

cd url-shortener-backend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
else
    echo "✓ Backend dependencies already installed"
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚠️  Create a .env file in url-shortener-backend with:"
    echo "   PORT=5000"
    echo "   MONGODB_URI=your_mongodb_connection"
    echo "   JWT_SECRET=your_jwt_secret"
    echo "   BASE_URL=http://localhost:5000"
fi

echo ""
echo "📱 Setting up Frontend..."
echo ""

cd ../url-shortener-frontend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
else
    echo "✓ Frontend dependencies already installed"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "🚀 To run both services:"
echo ""
echo "Terminal 1 (Backend):"
echo "  cd url-shortener-backend"
echo "  npm run dev"
echo ""
echo "Terminal 2 (Frontend):"
echo "  cd url-shortener-frontend"
echo "  npm run dev"
echo ""
echo "Then open: http://localhost:5173"
