# 🛒 ShopHub Setup & Product Loading Guide

Follow these steps to see products on your e-commerce platform!

## Step 1: Backend Setup ✅

### 1.1 Install Dependencies
```bash
cd backend
npm install
```

### 1.2 Configure Environment Variables

Check your `.env` file:
```bash
cat .env
```

**If MongoDB is NOT installed locally**, update `.env` with MongoDB Atlas:

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**Or use local MongoDB:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

---

## Step 2: Seed Products Database 🌱

### 2.1 Start Backend Server (Terminal 1)
```bash
cd backend
npm run dev
```

You should see:
```
Server running on port 5000
```

### 2.2 Seed Products (Terminal 2)
```bash
cd backend
npm run seed
```

You should see:
```
Connected to MongoDB
Cleared existing data
Created user: user@example.com
Created user: admin@example.com
Created product: Wireless Bluetooth Headphones
Created product: Premium Cotton T-Shirt
... (12 sample products total)

✅ Database seeded successfully!

Test Credentials:
User: user@example.com / password123
Admin: admin@example.com / admin123
```

---

## Step 3: Start Frontend 🚀

### 3.1 Install Dependencies (Terminal 3)
```bash
cd frontend
npm install
```

### 3.2 Start React App
```bash
npm start
```

The app should open at `http://localhost:3000`

---

## Step 4: View Products 👀

### 4.1 Browse Products
1. Open http://localhost:3000
2. You should now see **12 sample products** on the home page

### 4.2 Click Product to See Details
1. Click any product card
2. You'll see a beautiful product details page with:
   - High-quality product image
   - Product rating and reviews
   - Price and stock info
   - Quantity selector (- and + buttons)
   - Add to Cart button
   - Buy Now button
   - Customer reviews section
   - Review submission form

This looks like **Flipkart and Amazon product pages**!

---

## Step 5: Test Shopping Flow 🛍️

### 5.1 Register Account
1. Click "Register" in navbar
2. Fill in details:
   - Name: Your Name
   - Email: your@email.com
   - Password: any password

### 5.2 Browse & Add to Cart
1. Click product to view details
2. Adjust quantity using - and + buttons
3. Click "Add to Cart"
4. See toast notification "Added to cart!"

### 5.3 Checkout
1. Click cart icon in navbar
2. Review items
3. Click "Proceed to Checkout"
4. Enter shipping address
5. Choose payment method
6. Click "Place Order"

### 5.4 Track Order
1. Click "My Orders" in navbar
2. View order status
3. See payment status

---

## Step 6: Admin Features 👨‍💼

### 6.1 Login as Admin
1. Click "Login"
2. Use credentials:
   - Email: `admin@example.com`
   - Password: `admin123`

### 6.2 Manage Products
1. Click "Admin Panel" in navbar
2. Click "Add Product"
3. Fill in product details:
   - Name
   - Description
   - Price
   - Category
   - Stock quantity
4. Click "Create Product"

### 6.3 Manage Orders
1. Go to "Orders" in Admin Panel
2. See all customer orders
3. Update order status (pending → processing → shipped → delivered)

---

## 🎨 Product Details Page Features

✅ Professional layout like Amazon/Flipkart
✅ High-resolution product images
✅ Star ratings with review count
✅ Price display
✅ Stock availability indicator
✅ Quantity selector with +/- buttons
✅ "Add to Cart" button
✅ "Buy Now" button for quick checkout
✅ Product description
✅ Category and SKU info
✅ Free delivery banner
✅ Customer reviews section
✅ Review submission form
✅ Star rating for reviews
✅ Breadcrumb navigation
✅ Responsive design (mobile, tablet, desktop)

---

## 📊 Sample Products Included

1. **Wireless Bluetooth Headphones** - $129.99 ⚡
2. **Premium Cotton T-Shirt** - $29.99 👕
3. **Smart Watch Pro** - $299.99 ⌚
4. **Stainless Steel Coffee Maker** - $79.99 ☕
5. **Professional Yoga Mat** - $39.99 🧘
6. **Running Sneakers** - $89.99 👟
7. **Organic Green Tea** - $15.99 🍵
8. **Programming in Python** - $49.99 📚
9. **Portable Power Bank** - $34.99 🔌
10. **Ergonomic Office Chair** - $249.99 🪑
11. **Stainless Steel Water Bottle** - $24.99 💧
12. **Wireless Mouse** - $22.99 🖱️

---

## ⚡ Quick Commands

```bash
# Backend
cd backend
npm run dev          # Start backend
npm run seed         # Seed products
npm run lint         # Check code quality

# Frontend
cd frontend
npm start            # Start React app
npm run build        # Build for production
npm test             # Run tests
```

---

## 🐛 Troubleshooting

### "No products found" on home page
**Solution:**
1. Make sure backend is running: `npm run dev`
2. Run seed script: `npm run seed`
3. Refresh page (Ctrl+R)

### MongoDB connection error
**Solution:**
- Make sure MongoDB is running
- Check connection string in `.env`
- Try MongoDB Atlas (cloud) for easier setup

### Port 5000 already in use
**Solution:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill process (replace PID)
taskkill /PID <PID> /F
```

### Frontend doesn't show products after seeding
**Solution:**
1. Clear browser cache (Ctrl+Shift+Delete)
2. Refresh page (Ctrl+R)
3. Check browser console (F12) for errors

---

## 📸 What You Should See

### Home Page
```
🛍️ ShopHub
[Search Box] [Category Filter]

Product Cards in Grid (4 columns on desktop):
[Product 1] [Product 2] [Product 3] [Product 4]
[Product 5] [Product 6] [Product 7] [Product 8]
...and more
```

### Product Details Page
```
Navigation: Home / Category / Product Name

[Large Product Image]  |  Product Details
                       |  ⭐⭐⭐⭐⭐ (4.5/5)
                       |  $129.99
                       |  In Stock (50 units)
                       |  Description...
                       |  
                       |  [- Qty +]
                       |  [Add to Cart] [Buy Now]
                       |
                       |  Free Delivery
                       |  Usually 3-5 days

Reviews Section:
Customer Name: ⭐⭐⭐⭐⭐
"Great product! Highly recommended."

[Write Your Review]
[Rate: ⭐⭐⭐⭐⭐]
[Comment: ________]
[Submit Review]
```

---

## ✅ Verification Checklist

- [ ] Backend running on port 5000
- [ ] MongoDB connected
- [ ] Products seeded to database
- [ ] Frontend running on port 3000
- [ ] Home page shows 12 products
- [ ] Product details page works
- [ ] Cart functionality works
- [ ] Checkout process complete
- [ ] Orders page shows orders
- [ ] Admin panel accessible
- [ ] Product management working

---

## 🚀 Next Steps

1. Customize branding and colors
2. Add your own products
3. Set up payment gateway
4. Deploy to production
5. Monitor and optimize

---

**Happy Shopping! 🎉**

For more help, see the main README.md or QUICKSTART.md
