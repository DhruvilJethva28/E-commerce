const Product = require('../models/Product');
const { PLACEHOLDER_PRODUCT_IMAGE } = require('../utils/constants');

// Helper function to convert relative image paths to absolute URLs
const normalizeProductImage = (product) => {
  if (!product) return product;
  
  const productObj = product.toObject ? product.toObject() : product;
  if (productObj.image && !productObj.image.startsWith('http') && !productObj.image.startsWith('data:')) {
    productObj.image = `http://localhost:${process.env.PORT || 5000}${productObj.image}`;
  }
  return productObj;
};

// Get all products with filtering
exports.getAllProducts = async (req, res, next) => {
  try {
    const { category, minPrice, maxPrice, search } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = minPrice;
      if (maxPrice) filter.price.$lte = maxPrice;
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    let products = await Product.find(filter).populate('createdBy', 'name');
    
    // Normalize image paths
    products = products.map(normalizeProductImage);
    
    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    next(error);
  }
};

// Get single product
exports.getProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id).populate('createdBy', 'name');
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
    
    product = normalizeProductImage(product);
    
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

// Create product (Admin only)
exports.createProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, stock, discount, isFeatured } = req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    // Handle image upload
    let imagePath = PLACEHOLDER_PRODUCT_IMAGE;
    if (req.file) {
      // For local file storage: /uploads/products/filename
      imagePath = `/uploads/products/${req.file.filename}`;
    }

    const product = new Product({
      name,
      description,
      price,
      category,
      stock: stock || 0,
      image: imagePath,
      discount: discount || 0,
      isFeatured: isFeatured === 'true' || isFeatured === true ? true : false,
      createdBy: req.user.id,
    });

    await product.save();
    
    const normalizedProduct = normalizeProductImage(product);
    
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product: normalizedProduct,
    });
  } catch (error) {
    next(error);
  }
};

// Update product (Admin only)
exports.updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Handle image update if file is uploaded
    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = `/uploads/products/${req.file.filename}`;
    }

    // Ensure discount is a number
    if (updateData.discount !== undefined) {
      updateData.discount = parseInt(updateData.discount) || 0;
    }

    // Handle isFeatured as boolean
    if (updateData.isFeatured !== undefined) {
      updateData.isFeatured = updateData.isFeatured === 'true' || updateData.isFeatured === true ? true : false;
    }

    product = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    const normalizedProduct = normalizeProductImage(product);

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product: normalizedProduct,
    });
  } catch (error) {
    next(error);
  }
};

// Delete product (Admin only)
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Add product review
exports.addReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    const review = {
      userId: req.user.id,
      userName: req.user.name,
      rating,
      comment,
    };

    product.reviews.push(review);
    
    // Update rating
    const totalRating = product.reviews.reduce((sum, rev) => sum + rev.rating, 0);
    product.rating = totalRating / product.reviews.length;

    await product.save();

    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      product,
    });
  } catch (error) {
    next(error);
  }
};
