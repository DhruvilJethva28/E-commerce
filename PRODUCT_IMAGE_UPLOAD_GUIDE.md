# Product Image Upload Feature Guide

## Overview
This guide explains how to upload and manage product images through the Admin Dashboard.

---

## ✅ Implementation Summary

The product image upload feature has been successfully implemented with the following components:

### **Backend Changes**

#### 1. **File Upload Middleware** (`src/middleware/fileUpload.js`)
- Uses **Multer** to handle file uploads
- Stores uploaded images in `uploads/products/` directory
- **File size limit**: 5MB
- **Supported formats**: JPEG, PNG, GIF, WebP
- Auto-generates unique filenames with timestamps

#### 2. **Updated Product Controller** (`src/controllers/productController.js`)
- **createProduct()**: Now accepts image files via FormData
- **updateProduct()**: Supports image updates
- Image path stored as `/uploads/products/filename`
- Falls back to placeholder if no image provided

#### 3. **Updated Routes** (`src/routes/productRoutes.js`)
```javascript
router.post('/', protect, authorize('admin'), upload.single('image'), createProduct);
router.put('/:id', protect, authorize('admin'), upload.single('image'), updateProduct);
```

#### 4. **Static File Serving** (`src/server.js`)
```javascript
app.use('/uploads', express.static('uploads'));
```

#### 5. **Environment Configuration** (.gitignore)
- Added `uploads/` to .gitignore to prevent uploading user-generated files to git

---

### **Frontend Changes**

#### 1. **Updated API Utility** (`src/utils/api.js`)
- Enhanced `productAPI.create()` and `productAPI.update()` to handle FormData
- Automatically sets `Content-Type: multipart/form-data` for file uploads

#### 2. **Updated Admin Products Page** (`src/pages/AdminProducts.jsx`)
- Added **file input field** for image selection
- Added **image preview** before upload
- Updated form submission to use FormData
- Improved UX with preview functionality

---

## 🚀 How to Use

### **For Admins - Adding/Uploading Product Images**

1. **Navigate to Admin Dashboard** → Products Management
2. **Click "Add Product"** button
3. **Fill in Product Details**:
   - Name
   - Description
   - Price
   - Category
   - Stock Quantity
4. **Upload Image**:
   - Click on "Product Image" file input
   - Select an image file (JPEG, PNG, GIF, WebP)
   - Image preview will appear below
5. **Create Product** - Click submit button

### **For Updating Product Images**

1. Future enhancement: Edit button can allow re-uploading images
2. Currently supports initial image upload on creation

---

## 📁 Project Structure

```
backend/
├── uploads/
│   └── products/           # All product images stored here
├── src/
│   ├── middleware/
│   │   └── fileUpload.js   # Multer configuration (NEW)
│   ├── controllers/
│   │   └── productController.js (UPDATED)
│   ├── routes/
│   │   └── productRoutes.js (UPDATED)
│   └── server.js (UPDATED)

frontend/
└── src/
    ├── utils/
    │   └── api.js (UPDATED)
    └── pages/
        └── AdminProducts.jsx (UPDATED)
```

---

## 🔧 Technical Details

### **Image Upload Process**

1. **Admin selects image** → React FileReader creates preview
2. **Form submitted with FormData** → Image file + product data
3. **Backend receives multipart/form-data** → Multer processes file
4. **File stored** → `uploads/products/product-[timestamp].ext`
5. **DB saved** → Image path stored in Product.image field
6. **Static serving** → Express serves images at `/uploads/products/filename`

### **File Upload Constraints**

| Parameter | Value |
|-----------|-------|
| **Max File Size** | 5MB |
| **Allowed Formats** | JPEG, PNG, GIF, WebP |
| **Storage Location** | `/uploads/products/` |
| **URL Pattern** | `http://localhost:5000/uploads/products/[filename]` |

---

## 🛡️ Security Features

- ✅ Admin-only access (JWT authentication required)
- ✅ File type validation (MIME type checking)
- ✅ File size limits (5MB max)
- ✅ Unique filenames to prevent overwrites
- ✅ Server-side validation

---

## 📝 Example API Requests

### **Create Product with Image (Using FormData)**

```javascript
const formData = new FormData();
formData.append('name', 'Product Name');
formData.append('description', 'Product Description');
formData.append('price', 29.99);
formData.append('category', 'Electronics');
formData.append('stock', 50);
formData.append('image', fileInput.files[0]);

await productAPI.create(formData);
```

### **Response**

```json
{
  "success": true,
  "message": "Product created successfully",
  "product": {
    "_id": "...",
    "name": "Product Name",
    "image": "/uploads/products/product-1234567890.jpg",
    "price": 29.99,
    ...
  }
}
```

---

## 🚀 Future Enhancements

1. **Multiple Images Upload** - Support multiple images per product
2. **Image Optimization** - Auto-compress and resize images
3. **Cloud Storage** - Use AWS S3, Cloudinary, or similar
4. **Edit/Update Images** - Allow admins to update product images
5. **Image Deletion** - Clean up old images when products are deleted
6. **Image Gallery** - Show multiple product images on product detail page
7. **Drag & Drop Upload** - Better UX for file uploads

---

## 🔍 Troubleshooting

### **Issue: "Invalid file type" Error**
- **Cause**: Uploading non-image files
- **Solution**: Only use JPEG, PNG, GIF, or WebP files

### **Issue: "File too large" Error**
- **Cause**: File exceeds 5MB limit
- **Solution**: Compress image before uploading

### **Issue: Images not displaying**
- **Cause**: Backend not serving static files properly
- **Solution**: Ensure `app.use('/uploads', express.static('uploads'));` is in server.js

### **Issue: CORS errors on image loading**
- **Solution**: Images are served from same server, no CORS issues expected

---

## 📞 Support

For issues or questions about the image upload feature, check:
1. Backend console logs for file upload errors
2. Network tab in browser DevTools for failed requests
3. File permissions in `uploads/products/` directory

---

## ✨ Summary

The product image upload feature is now fully integrated into your e-commerce platform. Admins can easily upload product images when creating new products with a user-friendly interface including image preview functionality.
