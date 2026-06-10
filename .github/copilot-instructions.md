# DeeCart E-Commerce Platform - Workspace Instructions

This is a complete MERN stack e-commerce platform with the following structure:

## Quick Start

### 1. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
npm run dev  # Development mode with auto-reload
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm start    # Runs on http://localhost:3000
```

## Project Structure
- **backend/**: Node.js Express server with MongoDB
- **frontend/**: React application with Tailwind CSS

## Key Technologies
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Frontend**: React, Tailwind CSS, Zustand, Axios
- **Authentication**: JWT tokens
- **State Management**: Zustand (frontend)
- **Database**: MongoDB

## Features Implemented
✅ User registration and login
✅ Product browsing and search
✅ Shopping cart management
✅ Order placement and tracking
✅ Admin dashboard for products
✅ Admin order management
✅ Payment simulation
✅ Responsive UI design
✅ Role-based access control

## API Server
Runs on: `http://localhost:5000`
Health check: `GET http://localhost:5000/api/health`

## Frontend Application
Runs on: `http://localhost:3000`

## Test Credentials
- **User**: user@example.com / password123
- **Admin**: admin@example.com / admin123

## Code Quality Standards
✅ Clean, maintainable code
✅ Consistent naming conventions
✅ Proper error handling
✅ DRY (Don't Repeat Yourself) principle
✅ Modular architecture
✅ Responsive design
✅ Security best practices

## File Structure Rules
- Keep components small and focused
- Separate concerns (controllers, models, routes)
- Use consistent naming conventions
- Maintain proper indentation (2 spaces)
- Add comments for complex logic

## Important Notes
- Update .env file with your MongoDB connection string
- Frontend proxies to backend at port 5000
- JWT tokens stored in localStorage
- Password hashing with bcryptjs
- CORS configured for development

## Troubleshooting
- If port 5000 is busy, update PORT in .env
- If MongoDB connection fails, check connection string
- Clear node_modules and reinstall if dependency issues
- Check browser console for frontend errors
