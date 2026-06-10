# ShopHub - E-Commerce Platform

A complete, production-ready MERN stack e-commerce platform with user authentication, product management, shopping cart, order processing, and admin dashboard.

## 📊 Project Overview

This project implements a full-featured e-commerce platform similar to Amazon or Flipkart. It demonstrates:

- **Modern Web Development**: React, Node.js, Express, MongoDB
- **Real-world Architecture**: Separation of concerns, modular design
- **Best Practices**: Clean code, security, error handling
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Authentication**: JWT-based secure authentication
- **State Management**: Zustand for frontend state
- **API Design**: RESTful API endpoints

## 🎯 Key Features

### For Users
✅ User authentication (signup, login, logout)
✅ Product browsing with search and filtering
✅ Product details with ratings and reviews
✅ Shopping cart management
✅ Secure checkout process
✅ Order tracking
✅ Profile management
✅ Order history

### For Admins
✅ Product management (CRUD operations)
✅ Inventory management
✅ Order management and status updates
✅ Payment tracking
✅ User order analytics

### Technical Features
✅ JWT authentication
✅ Role-based access control
✅ Simulated payment processing
✅ Input validation and sanitization
✅ Comprehensive error handling
✅ CORS enabled for development
✅ Database indexing
✅ Responsive design

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: express-validator
- **Security**: bcryptjs for password hashing
- **CORS**: CORS middleware

### Frontend
- **Framework**: React 18
- **Routing**: React Router v6
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS
- **UI Components**: React Icons
- **Notifications**: React Hot Toast

### DevTools
- **Backend**: Nodemon for hot-reload
- **Frontend**: React Scripts with Webpack
- **Linting**: ESLint
- **Formatting**: Prettier
- **Database**: MongoDB

## 📁 Project Structure

```
ecommerce-platform/
├── backend/
│   ├── src/
│   │   ├── config/           # Database configuration
│   │   ├── controllers/      # Business logic
│   │   ├── middleware/       # Auth, error handling
│   │   ├── models/           # MongoDB schemas
│   │   ├── routes/           # API routes
│   │   ├── utils/            # Helper functions
│   │   └── server.js         # Entry point
│   ├── .env.example
│   ├── .eslintrc
│   ├── .gitignore
│   ├── Dockerfile
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── context/          # Zustand stores
│   │   ├── pages/            # Page components
│   │   ├── utils/            # API client
│   │   ├── styles/           # CSS files
│   │   ├── App.jsx
│   │   └── index.js
│   ├── public/               # Static files
│   ├── Dockerfile
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   └── README.md
│
├── .github/
│   └── copilot-instructions.md
├── .prettierrc                # Code formatting
├── docker-compose.yml         # Docker configuration
├── QUICKSTART.md              # Quick start guide
├── DEVELOPMENT.md             # Development setup
├── DEPLOYMENT.md              # Deployment guide
├── README.md                  # Project documentation
└── .gitignore                 # Git ignore file
```

## 🚀 Quick Start

### Prerequisites
- Node.js v14+
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd ecommerce-platform
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   npm run dev
   ```

3. **Frontend Setup** (new terminal)
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Access Application**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000
   - API Health: http://localhost:5000/api/health

## 📖 Documentation

- **[QUICKSTART.md](QUICKSTART.md)** - 5-minute setup guide
- **[README.md](README.md)** - Full project documentation
- **[DEVELOPMENT.md](DEVELOPMENT.md)** - Development environment setup
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Production deployment guide
- **[backend/README.md](backend/README.md)** - Backend documentation
- **[frontend/README.md](frontend/README.md)** - Frontend documentation

## 🔐 Test Credentials

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

**Note**: Create your own accounts via registration page.

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `POST /api/auth/logout` - Logout user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)
- `POST /api/products/:id/review` - Add review

### Cart
- `GET /api/cart` - Get cart
- `POST /api/cart/add` - Add to cart
- `PUT /api/cart/:productId` - Update cart item
- `DELETE /api/cart/:productId` - Remove from cart
- `DELETE /api/cart` - Clear cart

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/status` - Update status (Admin)
- `POST /api/orders/payment/process` - Process payment

## 🧪 Testing Workflow

1. **Browse Products** → Home page shows all products
2. **Search & Filter** → Use search and category filters
3. **View Details** → Click product to see details
4. **Add to Cart** → Add products to shopping cart
5. **Checkout** → Enter shipping address and payment method
6. **Place Order** → Complete the purchase
7. **Track Order** → View order status
8. **Admin Features** → Manage products and orders

## 🔒 Security Features

- JWT authentication with expiry
- Password hashing with bcryptjs
- Input validation and sanitization
- CORS protection
- Role-based access control
- Error handling without exposing sensitive info
- Database query validation

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach
- **Intuitive Navigation**: Clear user flow
- **Real-time Feedback**: Toast notifications
- **Loading States**: User-friendly loading indicators
- **Error Messages**: Clear error communication
- **Accessibility**: Semantic HTML and ARIA labels

## 📈 Performance Optimizations

- **Code Splitting**: React Router lazy loading
- **Image Optimization**: Placeholder images
- **Bundle Size**: Optimized dependencies
- **Database Indexing**: Indexed frequently queried fields
- **Caching**: Strategic cache headers
- **Compression**: Gzip compression enabled

## 🚢 Deployment Options

### Backend
- **Heroku**: Simplified deployment with Git push
- **AWS**: EC2 or Elastic Beanstalk
- **DigitalOcean**: Droplets or App Platform
- **Railway**: Modern hosting platform
- **Docker**: Containerized deployment

### Frontend
- **Netlify**: GitHub integration for auto-deployment
- **Vercel**: Optimized for Next.js (can use React)
- **GitHub Pages**: Static hosting
- **AWS S3 + CloudFront**: CDN distribution
- **Docker**: Containerized with Nginx

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 Code Quality Standards

- ✅ Clean, readable code
- ✅ Consistent naming conventions
- ✅ Proper error handling
- ✅ DRY principle
- ✅ Modular architecture
- ✅ Documented complex logic
- ✅ Responsive design
- ✅ Security best practices

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000
lsof -i :5000 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

### MongoDB Connection Failed
- Verify MongoDB is running
- Check connection string
- Verify firewall settings

### Frontend won't load
- Check backend is running
- Clear browser cache
- Check console for errors

## 📚 Learning Resources

- [Node.js Documentation](https://nodejs.org/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Your Name

---

## 🎓 Learning Outcomes

After completing this project, you'll understand:

✅ Full-stack web development with MERN
✅ Database design and MongoDB operations
✅ RESTful API design and implementation
✅ User authentication and authorization
✅ State management in React
✅ Responsive web design
✅ Error handling and validation
✅ Software architecture and best practices
✅ Git version control
✅ Deployment and DevOps basics

---

**Happy Coding! 🚀**

*For questions or issues, please open an issue on GitHub.*
