# Development Environment Setup

This guide helps you set up the e-commerce platform for development.

## Prerequisites

- Node.js v14 or higher
- npm or yarn
- MongoDB (local or cloud)
- Git
- VS Code (recommended)

## Installation Steps

### 1. Install Node.js and npm

**Windows/Mac:**
- Download from https://nodejs.org/
- Install LTS version
- Verify: `node --version` and `npm --version`

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install nodejs npm
```

### 2. Install MongoDB (Optional - use MongoDB Atlas instead)

**Local MongoDB:**
- Download from https://www.mongodb.com/try/download/community
- Follow installation guide for your OS
- Start service: `mongod`

**MongoDB Atlas (Cloud - Recommended):**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster
4. Get connection string
5. Update in `.env` file

### 3. Clone Repository

```bash
git clone <your-repo-url>
cd ecommerce-platform
```

### 4. Backend Setup

```bash
cd backend
npm install
cp .env.example .env

# Update .env with:
# - MongoDB connection string
# - JWT secret (keep secure)
# - Port (default 5000)
```

### 5. Frontend Setup

```bash
cd ../frontend
npm install

# Create .env file if needed
touch .env
```

### 6. Run Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

## Verify Installation

1. Backend health check:
   - Open: http://localhost:5000/api/health
   - Should see: `{"success": true, ...}`

2. Frontend:
   - Open: http://localhost:3000
   - Should see: ShopHub website

## VS Code Extensions (Recommended)

- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- Thunder Client (for API testing)
- MongoDB for VS Code

## Git Configuration

```bash
# Set your name
git config --global user.name "Your Name"

# Set your email
git config --global user.email "your@email.com"

# Verify
git config --global --list
```

## Development Workflow

1. Create feature branch: `git checkout -b feature/name`
2. Make changes
3. Commit: `git commit -m "Description"`
4. Push: `git push origin feature/name`
5. Create Pull Request

## Common Development Tasks

### Add a new npm package

**Backend:**
```bash
cd backend
npm install package-name
```

**Frontend:**
```bash
cd frontend
npm install package-name
```

### Update dependencies

```bash
npm update
```

### Clean install

```bash
rm -rf node_modules package-lock.json
npm install
```

## Environment Variables Template

**.env (Backend)**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## Debugging

### Backend Debugging

Add to backend/package.json:
```json
"debug": "node --inspect=9229 src/server.js"
```

Then run: `npm run debug`

### Frontend Debugging

- Open DevTools: F12 or Right-click → Inspect
- Use React DevTools browser extension
- Use Redux DevTools for state debugging

## Performance Tips

1. **Backend:**
   - Use nodemon for auto-reload
   - Keep middleware minimal
   - Index database fields frequently queried

2. **Frontend:**
   - Use React DevTools Profiler
   - Check bundle size: `npm install -g size-limit`
   - Lazy load components

## Troubleshooting

### Port already in use
```bash
# Find process
lsof -i :5000

# Kill process
kill -9 <PID>
```

### MongoDB connection failed
- Check if service is running
- Verify connection string
- Check firewall settings

### npm install fails
```bash
# Clear cache
npm cache clean --force

# Delete lock file
rm package-lock.json

# Reinstall
npm install
```

## Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [React Documentation](https://react.dev/)
- [Express Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)

## Support

For issues or questions:
1. Check the main README.md
2. Search GitHub issues
3. Ask in team chat
4. Create a new issue with details

---

**Happy Coding! 🚀**
