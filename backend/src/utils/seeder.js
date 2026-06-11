const Product = require('../models/Product');
const User = require('../models/User');
const Category = require('../models/Category');

const sampleProducts = [
  {
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless headphones with noise cancellation, 30-hour battery life, and superior sound quality.',
    price: 129.99,
    category: 'Electronics',
    stock: 50,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    rating: 4.5,
  },
  {
    name: 'Premium Cotton T-Shirt',
    description: 'Comfortable premium quality cotton t-shirt available in multiple colors and sizes.',
    price: 29.99,
    category: 'Fashion',
    stock: 100,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    rating: 4.0,
  },
  {
    name: 'Smart Watch Pro',
    description: 'Advanced smartwatch with fitness tracking, heart rate monitor, and 7-day battery life.',
    price: 299.99,
    category: 'Electronics',
    stock: 30,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    rating: 4.7,
  },
  {
    name: 'Stainless Steel Coffee Maker',
    description: 'Professional-grade coffee maker with programmable timer and thermal carafe for hot coffee.',
    price: 79.99,
    category: 'Home',
    stock: 25,
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02ae2a0e?w=400&h=400&fit=crop',
    rating: 4.3,
  },
  {
    name: 'Professional Yoga Mat',
    description: 'Non-slip yoga mat with extra padding for comfortable workouts and meditation sessions.',
    price: 39.99,
    category: 'Sports',
    stock: 60,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop',
    rating: 4.6,
  },
  {
    name: 'Running Sneakers',
    description: 'Lightweight and comfortable running shoes with cushioned sole and breathable mesh upper.',
    price: 89.99,
    category: 'Fashion',
    stock: 45,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    rating: 4.4,
  },
  {
    name: 'Organic Green Tea',
    description: 'Premium organic green tea from the mountains, packed with antioxidants and health benefits.',
    price: 15.99,
    category: 'Home',
    stock: 200,
    image: 'https://images.unsplash.com/photo-1597318972826-8da82ae90d84?w=400&h=400&fit=crop',
    rating: 4.2,
  },
  {
    name: 'Programming in Python',
    description: 'Complete guide to Python programming from basics to advanced concepts with practical examples.',
    price: 49.99,
    category: 'Books',
    stock: 80,
    image: 'https://images.unsplash.com/photo-1543002588-d0c8632d60c7?w=400&h=400&fit=crop',
    rating: 4.8,
  },
  {
    name: 'Portable Power Bank',
    description: '20000mAh portable charger with dual USB ports to charge multiple devices simultaneously.',
    price: 34.99,
    category: 'Electronics',
    stock: 120,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop',
    rating: 4.5,
  },
  {
    name: 'Ergonomic Office Chair',
    description: 'Comfortable office chair with lumbar support, adjustable height, and premium mesh material.',
    price: 249.99,
    category: 'Home',
    stock: 15,
    image: 'https://images.unsplash.com/photo-1505226613529-7b388b03e98a?w=400&h=400&fit=crop',
    rating: 4.6,
  },
  {
    name: 'Stainless Steel Water Bottle',
    description: 'Double-wall insulated water bottle keeps drinks hot for 12 hours and cold for 24 hours.',
    price: 24.99,
    category: 'Sports',
    stock: 150,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e9?w=400&h=400&fit=crop',
    rating: 4.7,
  },
  {
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with precision tracking and 18-month battery life.',
    price: 22.99,
    category: 'Electronics',
    stock: 200,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop',
    rating: 4.3,
  },
];

const sampleCategories = [
  {
    name: 'Electronics',
    description: 'Electronic devices and gadgets',
  },
  {
    name: 'Fashion',
    description: 'Clothing and fashion accessories',
  },
  {
    name: 'Home',
    description: 'Home and kitchen items',
  },
  {
    name: 'Sports',
    description: 'Sports and fitness equipment',
  },
  {
    name: 'Books',
    description: 'Books and reading materials',
  },
];

const sampleUsers = [
  {
    name: 'John User',
    email: 'user@example.com',
    password: 'password123',
    phone: '+1234567890',
    role: 'user',
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
    },
  },
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    phone: '+1234567891',
    role: 'admin',
    address: {
      street: '456 Admin Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
      country: 'USA',
    },
  },
];

const seedDatabaseIfNeeded = async () => {
  try {
    const productCount = await Product.countDocuments();
    if (productCount > 0) {
      console.log('✅ Database already has products, skipping auto-seed.');
      return;
    }

    console.log('🔄 Database is empty. Starting auto-seed...');

    // Clear existing data (to avoid duplicates or conflicts if tables partially populated)
    await Product.deleteMany({});
    await User.deleteMany({});
    await Category.deleteMany({});
    console.log('Cleared existing tables');

    // Create categories first
    const categories = [];
    for (const categoryData of sampleCategories) {
      const category = new Category({
        ...categoryData,
        createdBy: null,
        isActive: true,
      });
      await category.save();
      categories.push(category);
      console.log(`Created category: ${category.name}`);
    }

    // Create users
    const users = [];
    for (const userData of sampleUsers) {
      const user = new User(userData);
      await user.save();
      users.push(user);
      console.log(`Created user: ${user.email}`);
    }

    // Update categories with admin user
    for (const category of categories) {
      category.createdBy = users[1]._id; // Admin user
      await category.save();
    }

    // Create products
    for (const productData of sampleProducts) {
      const product = new Product({
        ...productData,
        createdBy: users[1]._id, // Admin user
        reviews: [
          {
            userId: users[0]._id,
            userName: users[0].name,
            rating: 5,
            comment: 'Excellent product! Highly recommended.',
          },
        ],
      });
      await product.save();
      console.log(`Created product: ${product.name}`);
    }

    console.log('✅ Database auto-seeded successfully!');
  } catch (error) {
    console.error('❌ Error in auto-seeding database:', error);
  }
};

module.exports = { seedDatabaseIfNeeded };
