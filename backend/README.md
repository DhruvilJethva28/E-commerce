# ShopHub E-Commerce Platform - Backend Documentation

## Backend Overview

The backend is built with Node.js, Express, and MongoDB. It provides a complete REST API for the e-commerce platform.

## Directory Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js         # MongoDB connection
│   ├── models/
│   │   ├── User.js             # User schema
│   │   ├── Product.js          # Product schema
│   │   ├── Cart.js             # Cart schema
│   │   └── Order.js            # Order schema
│   ├── controllers/
│   │   ├── authController.js   # Auth logic
│   │   ├── productController.js# Product CRUD
│   │   ├── cartController.js   # Cart operations
│   │   └── orderController.js  # Order operations
│   ├── routes/
│   │   ├── authRoutes.js       # Auth endpoints
│   │   ├── productRoutes.js    # Product endpoints
│   │   ├── cartRoutes.js       # Cart endpoints
│   │   └── orderRoutes.js      # Order endpoints
│   ├── middleware/
│   │   ├── auth.js             # JWT verification & authorization
│   │   └── errorHandler.js     # Error handling
│   └── server.js               # Express app setup
├── .env.example                # Environment variables template
├── .gitignore
└── package.json
```

## Key Features

### Authentication
- JWT-based token authentication
- User registration with password hashing (bcryptjs)
- Login with email/password
- Profile management

### Product Management
- CRUD operations for products
- Category filtering
- Search functionality
- Product ratings and reviews

### Cart System
- Add/remove items
- Update quantities
- Calculate total price
- Cart persistence per user

### Order Management
- Order creation from cart
- Order status tracking
- Payment status management
- Order history retrieval

### Payment Simulation
- Mock payment processing
- 90% success rate simulation
- Transaction ID generation

## Running the Backend

### Development Mode (with hot-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

### Health Check
```bash
curl http://localhost:5000/api/health
```

## API Response Format

All API responses follow a consistent format:

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": {} // Only in development
}
```

## Middleware

### Authentication Middleware
Verifies JWT token in Authorization header:
```
Authorization: Bearer <token>
```

### Authorization Middleware
Checks user role (user/admin) for protected routes.

### Error Handling Middleware
Catches and formats all errors with appropriate status codes.

## Database Models

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  address: {
    street, city, state, zipCode, country
  },
  role: 'user' | 'admin',
  profilePicture: String,
  isActive: Boolean,
  timestamps: true
}
```

### Product
```javascript
{
  name: String,
  description: String,
  price: Number,
  image: String,
  images: [String],
  category: String,
  stock: Number,
  rating: Number,
  reviews: [{
    userId, userName, rating, comment, createdAt
  }],
  createdBy: ObjectId (User),
  timestamps: true
}
```

### Order
```javascript
{
  user: ObjectId (User),
  items: [{
    product: ObjectId,
    quantity: Number,
    price: Number
  }],
  totalAmount: Number,
  shippingAddress: {
    street, city, state, zipCode, country
  },
  paymentMethod: String,
  paymentStatus: 'pending' | 'completed' | 'failed',
  orderStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled',
  transactionId: String,
  timestamps: true
}
```

### Cart
```javascript
{
  user: ObjectId (User),
  items: [{
    product: ObjectId,
    quantity: Number,
    price: Number
  }],
  totalPrice: Number,
  timestamps: true
}
```

## Environment Configuration

Required environment variables in `.env`:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## Error Codes

- **400**: Bad Request - Invalid input
- **401**: Unauthorized - Missing/invalid token
- **403**: Forbidden - Insufficient permissions
- **404**: Not Found - Resource not found
- **500**: Internal Server Error - Server error

## Testing

### Create Test Admin User
```bash
# Use the register endpoint with email: admin@example.com
# Then manually update the role in MongoDB to 'admin'
```

### Test Products
Create test products via the admin panel before testing orders.

## Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT authentication
- **cors**: Cross-origin requests
- **dotenv**: Environment variables
- **express-validator**: Input validation
- **multer**: File uploads (optional)

## Best Practices

1. **Input Validation**: Always validate incoming data
2. **Error Handling**: Use try-catch in async operations
3. **Security**: Never expose passwords in responses
4. **Database Indexes**: Index frequently queried fields
5. **Logging**: Log important operations for debugging

---

**Backend is running on port 5000**
