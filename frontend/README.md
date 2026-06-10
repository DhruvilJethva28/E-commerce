# ShopHub E-Commerce Platform - Frontend Documentation

## Frontend Overview

The frontend is built with React and Tailwind CSS, providing a modern and responsive user interface for the e-commerce platform.

## Directory Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation bar
│   │   └── ProductCard.jsx     # Product display card
│   ├── pages/
│   │   ├── Home.jsx            # Product listing
│   │   ├── Login.jsx           # Login page
│   │   ├── Register.jsx        # Registration page
│   │   ├── Cart.jsx            # Shopping cart
│   │   ├── Checkout.jsx        # Checkout process
│   │   ├── OrderDetails.jsx    # Order details
│   │   ├── AdminProducts.jsx   # Admin product management
│   │   └── AdminOrders.jsx     # Admin order management
│   ├── context/
│   │   ├── authStore.js        # Auth state management
│   │   └── cartStore.js        # Cart state management
│   ├── utils/
│   │   └── api.js              # API client
│   ├── styles/
│   │   └── index.css           # Global styles
│   ├── App.jsx                 # Main app component
│   └── index.js                # Entry point
├── public/
│   └── index.html              # HTML template
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS configuration
└── package.json
```

## Key Features

### User Authentication
- Registration with validation
- Login with JWT token storage
- Persistent authentication across sessions
- Logout functionality

### Product Browsing
- Display all products
- Search products by name/description
- Filter by category
- Product cards with ratings
- Stock availability display

### Shopping Cart
- Add/remove products
- Update quantities
- Real-time total calculation
- Cart item count in navbar
- Persistent cart state

### Checkout Process
- Shipping address form
- Payment method selection
- Order summary
- Order confirmation

### Order Management
- View order history
- Check order status
- Track payment status
- View order details

### Admin Dashboard
- Product management (Create, Read, Delete)
- Product form with validation
- Order management interface
- Order status updates
- Real-time order tracking

## State Management (Zustand)

### Auth Store
```javascript
useAuthStore: {
  user,           // Current user object
  token,          // JWT token
  isAuthenticated,// Login status
  loading,        // Loading state
  setUser,        // Set user
  setToken,       // Set token
  clearAuth       // Logout
}
```

### Cart Store
```javascript
useCartStore: {
  items,          // Cart items
  totalPrice,     // Total price
  addItem,        // Add item
  removeItem,     // Remove item
  updateQuantity, // Update quantity
  clearCart,      // Clear all items
  calculateTotal  // Recalculate total
}
```

## Components

### Navbar
- Logo/brand
- Navigation links
- Search (optional)
- Auth links
- Cart icon with count
- User info
- Logout button

### ProductCard
- Product image
- Product name
- Description (truncated)
- Rating stars
- Price
- Stock info
- Add to cart button

## Pages

### Home
- Product listing with grid layout
- Search functionality
- Category filter
- Loading states

### Login/Register
- Email/password forms
- Form validation
- Error messages
- Links to other pages

### Cart
- Product list in table
- Quantity controls
- Remove button
- Total calculation
- Continue shopping
- Checkout button

### Checkout
- Address form
- Payment method selection
- Order summary sidebar
- Form validation
- Place order button

### OrderDetails
- Order ID
- Order date
- Status
- Payment status
- Items list
- Shipping address
- Total amount

### Admin Products
- Product list table
- Create product form
- Delete functionality
- Loading states

### Admin Orders
- Orders table
- Customer info
- Amount display
- Payment status badge
- Order status dropdown
- Real-time updates

## API Integration

### API Client Setup (axios)
```javascript
// src/utils/api.js
- Base URL configuration
- Request interceptor for JWT token
- Endpoint definitions
```

### Endpoints Used
```javascript
authAPI.{register, login, getCurrentUser, updateProfile, logout}
productAPI.{getAll, getById, create, update, delete, addReview}
cartAPI.{get, add, update, remove, clear}
orderAPI.{create, getAll, getById, updateStatus, processPayment, getAllAdmin}
```

## Styling

### Tailwind CSS
- Responsive design system
- Mobile-first approach
- Utility classes
- Custom configuration

### Color Scheme
- Primary: Blue (#3B82F6)
- Secondary: Gray
- Success: Green
- Error: Red
- Warning: Yellow

### Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## Running the Frontend

### Development Mode
```bash
npm start
```
Runs on `http://localhost:3000` with hot-reload

### Production Build
```bash
npm run build
```
Creates optimized build in `build/` folder

### Testing
```bash
npm test
```

## Environment Setup

### Proxy Configuration (package.json)
```json
"proxy": "http://localhost:5000"
```

### API Base URL (src/utils/api.js)
```javascript
baseURL: 'http://localhost:5000/api'
```

## Routing Structure

```
/ → Home (Products listing)
/login → Login page
/register → Register page
/cart → Shopping cart (Protected)
/checkout → Checkout (Protected)
/orders/:id → Order details (Protected)
/admin/products → Product management (Protected, Admin only)
/admin/orders → Order management (Protected, Admin only)
```

## Form Validation

- Required field validation
- Email format validation
- Password confirmation matching
- Numeric field validation
- Address validation

## Error Handling

- API error responses displayed as toast
- Form validation errors
- Network error handling
- User-friendly error messages

## Dependencies

- **react**: UI library
- **react-router-dom**: Routing
- **axios**: HTTP client
- **tailwindcss**: CSS framework
- **zustand**: State management
- **react-hot-toast**: Notifications
- **react-icons**: Icon library

## Performance Optimizations

1. Code splitting with React Router
2. Lazy loading of components
3. Memoization of expensive computations
4. Efficient state management
5. Image optimization

## Best Practices

1. **Component Structure**: Keep components small and focused
2. **State Management**: Use Zustand for global state
3. **Reusability**: Create reusable components
4. **Responsive Design**: Mobile-first approach
5. **Accessibility**: Semantic HTML and ARIA labels
6. **Error Handling**: User-friendly error messages
7. **Loading States**: Show loading indicators
8. **Form Validation**: Validate on input

## Testing the Application

1. **Sign Up**: Create a new account
2. **Browse**: Search and filter products
3. **Cart**: Add products and manage cart
4. **Checkout**: Complete purchase flow
5. **Orders**: View order history
6. **Admin**: Manage products and orders

---

**Frontend runs on port 3000**
