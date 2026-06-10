# DeeCart - E-Commerce Platform

A complete, production-ready e-commerce platform built with the MERN stack (MongoDB, Express, React, Node.js).

## 📚 Quick Links to Documentation

- 🚀 **[PRODUCTS_SETUP.md](./PRODUCTS_SETUP.md)** - Step-by-step setup guide to see products
- ✨ **[FEATURES_COMPLETE.md](./FEATURES_COMPLETE.md)** - Complete feature list & architecture
- 🗺️ **[VISUAL_GUIDE.md](./VISUAL_GUIDE.md)** - Visual UI mockups and navigation flow
- 📖 **[QUICKSTART.md](./QUICKSTART.md)** - Quick reference commands

---

## 🎯 Features

### User Features
- ✅ **User Authentication**: Sign up, login, profile management
- ✅ **Product Browsing**: Search, filter by category and price
- ✅ **Shopping Cart**: Add, remove, update quantities
- ✅ **Checkout**: Complete order process with shipping address
- ✅ **Order Management**: View order history and details
- ✅ **Product Reviews**: Rate and review products
- ✅ **Responsive Design**: Works on desktop, tablet, and mobile
- ✅ **Beautiful Product Details**: Flipkart/Amazon-style product pages

### Admin Features
- ✅ **Product Management**: Create, update, delete products
- ✅ **Order Management**: View all orders and update status
- ✅ **Payment Status Tracking**: Monitor payment completion
- ✅ **Inventory Management**: Track product stock

### Technical Features
- ✅ **JWT Authentication**: Secure token-based authentication
- ✅ **Role-based Access Control**: User vs Admin roles
- ✅ **Simulated Payments**: Mock payment processing (90% success rate)
- ✅ **Database**: MongoDB with Mongoose ODM
- ✅ **Error Handling**: Comprehensive error management
- ✅ **State Management**: Zustand for frontend state
- ✅ **Styling**: Tailwind CSS for modern UI
- ✅ **API Documentation**: RESTful API design

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)
- Git

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ecommerce-platform
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your configuration
# - MongoDB connection string
# - JWT secret
# - Port number
```

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Update API base URL if needed (in src/utils/api.js)
```

## 🏃 Running the Application

### Terminal 1 - Backend Server
```bash
cd backend
npm start

# or for development with hot-reload
npm run dev
```

The backend will run on `http://localhost:5000`

### Terminal 2 - Frontend Application
```bash
cd frontend
npm start
```

The frontend will run on `http://localhost:3000`

## 📁 Project Structure

```
ecommerce-platform/
├── backend/
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── models/          # MongoDB schemas
│   │   ├── controllers/     # Business logic
│   │   ├── routes/          # API endpoints
│   │   ├── middleware/      # Auth, error handling
│   │   ├── utils/           # Helper functions
│   │   └── server.js        # Main server file
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── context/         # Zustand stores
│   │   ├── utils/           # API client, helpers
│   │   ├── styles/          # CSS files
│   │   ├── App.jsx
│   │   └── index.js
│   ├── public/
│   ├── package.json
│   └── tailwind.config.js
│
└── README.md
```

## 🔐 Database Setup

### MongoDB Local Setup
```bash
# Install MongoDB Community Edition
# https://docs.mongodb.com/manual/installation/

# Start MongoDB service
mongod
```

### MongoDB Atlas (Cloud)
1. Create account on https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update in `.env` file

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/logout` - Logout user

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)
- `POST /api/products/:id/review` - Add product review

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/:productId` - Update cart item
- `DELETE /api/cart/:productId` - Remove from cart
- `DELETE /api/cart` - Clear cart

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/status` - Update order status (Admin)
- `POST /api/orders/payment/process` - Process payment

## 👤 Test Credentials

### Regular User
```
Email: user@example.com
Password: password123
```

### Admin User
```
Email: admin@example.com
Password: admin123
```

*Note: You can create your own accounts through the registration page.*

## 🧪 Testing Features

### 1. Browse Products
- Visit home page to see all products
- Use search and category filters
- Click products to view details

### 2. Shopping Flow
- Add products to cart
- View cart and adjust quantities
- Proceed to checkout
- Enter shipping address
- Choose payment method
- Place order

### 3. Admin Features
- Login as admin
- Navigate to Admin Panel
- Create, update, delete products
- View and manage orders
- Update order status

### 4. Payment Simulation
- Orders are created with "pending" status
- Payment processing simulates with 90% success rate
- Check order details to see payment status

## ⚙️ Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Frontend
- Update API base URL in `src/utils/api.js` if needed

## 📱 Responsive Design

The application is fully responsive with breakpoints for:
- Mobile (< 640px)
- Tablet (640px - 1024px)
- Desktop (> 1024px)

## 🎨 UI/UX Design

- Clean and intuitive interface
- Consistent color scheme (Blue primary)
- Real-time feedback with toast notifications
- Loading states for better UX
- Form validation
- Accessibility best practices

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcryptjs
- CORS enabled
- Error handling without exposing sensitive info
- Role-based access control

## 🚀 Deployment

### Backend (Heroku)
```bash
cd backend
heroku create your-app-name
git push heroku main
```

### Frontend (Netlify)
```bash
cd frontend
npm run build
# Deploy build folder to Netlify
```

## 📝 Code Quality Standards

- Clean code structure
- Consistent naming conventions
- Proper error handling
- Code comments where necessary
- Modular components
- DRY (Don't Repeat Yourself) principle

## 🐛 Common Issues & Solutions

### Port Already in Use
```bash
# Find process using port 5000
lsof -i :5000
kill -9 <PID>
```

### MongoDB Connection Failed
- Check MongoDB service is running
- Verify connection string in .env
- Check firewall settings for MongoDB Atlas

### CORS Errors
- Ensure backend CORS is configured
- Check frontend proxy settings
- Verify API URL matches backend URL

## 📖 Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [JWT Documentation](https://jwt.io/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see LICENSE.md file for details.

## 👨‍💻 Author

Your Name - [Your GitHub](https://github.com)

---

**Happy Coding! 🎉**
