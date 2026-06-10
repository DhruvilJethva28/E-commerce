# 🌟 Dark Mode, Profile Pictures, Discounts & Sales Features

This guide covers all the new features that have been added to DeeCart e-commerce platform.

---

## ✨ New Features Overview

### 1. 🌙 Dark Mode
- Toggle dark/light theme from navbar
- Persistent theme preference (saved in localStorage)
- Applied to all pages and components
- Smooth transitions between modes

### 2. 📸 User Profile Picture Upload
- Upload custom profile picture during profile editing
- Image preview before saving
- Supports JPEG, PNG, GIF, WebP formats
- File size limit: 5MB
- Default placeholder if no image provided

### 3. 🏷️ Product Discount System
- Admins can set discount percentage (0-100%)
- Discounted price automatically calculated
- Savings amount displayed to customers
- Shows original price with strikethrough

### 4. ⭐ Featured Products
- Mark products as featured on creation
- Featured badge displayed on product cards
- Easy way to highlight best sellers

### 5. 🎉 Sales Banner
- Eye-catching sales banner on homepage
- Animated discount tags on discounted products
- Promotional messaging

### 6. 💎 Improved CSS & UI
- Dark mode compatible all pages
- Better shadows and spacing
- Smooth transitions and animations
- Enhanced responsive design
- Better visual hierarchy
- More modern look and feel

---

## 🎯 Feature Details

### Dark Mode Usage
**For Users:**
1. Look for the moon/sun icon in navbar
2. Click to toggle between dark and light modes
3. Preference is saved automatically

**For Developers:**
- Uses Zustand store: `useThemeStore()`
- State stored in localStorage as 'darkMode'
- Applied via `isDarkMode` variable in components

```javascript
import useThemeStore from '../context/themeStore';

const { isDarkMode, toggleDarkMode } = useThemeStore();
```

---

### Profile Picture Upload
**How to Upload:**
1. Go to Profile page → Click "Edit Profile"
2. Click camera icon on profile picture
3. Select image file
4. See preview before saving
5. Click "Save Changes"

**Backend Endpoint:**
```
PUT /api/auth/profile (with file upload)
```

**Technical Details:**
- Uses Multer for file handling
- Images stored in `/uploads/products/`
- Served via Express static middleware
- Uses FormData for file transmission

---

### Product Discount System
**For Admins:**
1. Go to Admin Products page
2. Click "Add Product"
3. Enter discount percentage (0-100)
4. Mark as "Featured" if desired
5. Create product

**For Customers:**
- See discounted price in red
- View original price with strikethrough
- See savings amount
- Discount badge on product card

**Example Calculation:**
- Original Price: $100
- Discount: 20%
- Discounted Price: $80
- Savings: $20

---

### Database Schema Updates

**Product Model:**
```javascript
{
  // ...existing fields...
  discount: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
}
```

**User Model:**
```javascript
{
  // ...existing fields...
  profilePicture: {
    type: String,
    default: 'https://via.placeholder.com/150',
  },
}
```

---

## 🎨 Component Changes

### Navbar Updates
```jsx
// Added:
- Dark mode toggle button (Moon/Sun icon)
- Profile picture display (if available)
- Dynamic styling based on isDarkMode
```

### Home Page Updates
```jsx
// Added:
- SalesBanner component at top
- Dark mode styling for all sections
- Enhanced visual hierarchy
```

### ProductCard Updates
```jsx
// Added:
- Discount badge with animation
- Featured badge
- Discounted price display
- Strikethrough original price
- Savings amount
- Stock status color coding
- Hover animations
```

### Profile Page Updates
```jsx
// Added:
- Profile picture display with border
- Image upload with camera icon
- Image preview before saving
- Form validation
- Dark mode support
```

### AdminProducts Page Updates
```jsx
// Added:
- Discount input field (0-100%)
- Featured checkbox
- Discount display in table
- Featured status display
- Enhanced styling with dark mode
```

---

## 🚀 API Endpoints

### Updated Endpoints

**Create Product (with discount & featured)**
```
POST /api/products
Body: {
  name: string,
  description: string,
  price: number,
  category: string,
  stock: number,
  discount: number (0-100),
  isFeatured: boolean,
  image: File
}
```

**Update Profile (with profile picture)**
```
PUT /api/auth/profile
Body: FormData {
  name: string,
  phone: string,
  address: {
    street: string,
    city: string,
    state: string,
    zipCode: string,
    country: string
  },
  profilePicture: File (optional)
}
```

---

## 📱 Responsive Design

All features are fully responsive:
- ✅ Mobile devices
- ✅ Tablets
- ✅ Desktop screens
- ✅ Large displays

---

## 🎓 Code Examples

### Using Dark Mode in Components
```javascript
import useThemeStore from '../context/themeStore';

function MyComponent() {
  const { isDarkMode } = useThemeStore();
  
  const bgColor = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const textColor = isDarkMode ? 'text-gray-100' : 'text-gray-900';
  
  return (
    <div className={`${bgColor} ${textColor}`}>
      {/* content */}
    </div>
  );
}
```

### Upload Profile Picture
```javascript
const handleImageChange = (e) => {
  const file = e.target.files[0];
  setFormData({ ...formData, profilePicture: file });
};

const handleSubmit = async () => {
  const formData = new FormData();
  formData.append('profilePicture', file);
  await authAPI.updateProfile(formData);
};
```

### Create Product with Discount
```javascript
const submitData = new FormData();
submitData.append('name', 'Product Name');
submitData.append('price', 100);
submitData.append('discount', 20); // 20% off
submitData.append('isFeatured', true);
submitData.append('image', imageFile);

await productAPI.create(submitData);
```

---

## ⚙️ Configuration

### Dark Mode Persistence
- Stored in `localStorage.darkMode`
- Survives page refresh
- Loaded on app startup

### File Upload Settings
- Max file size: 5MB
- Allowed types: JPEG, PNG, GIF, WebP
- Storage location: `/uploads/products/`
- URL format: `http://localhost:5000/uploads/products/[filename]`

---

## 🔍 Troubleshooting

**Q: Dark mode not saving?**
- Check localStorage is enabled
- Ensure browser allows storage

**Q: Profile picture not uploading?**
- Check file is an image (JPEG, PNG, GIF, WebP)
- File size must be under 5MB
- Ensure backend `/uploads` directory exists

**Q: Discount not showing on product?**
- Refresh page to see updated data
- Check discount is between 0-100
- Ensure product was created with discount value

**Q: Dark mode flickering on load?**
- App loads dark mode from localStorage
- This is normal on first page load

---

## 📊 Performance

All new features are optimized:
- ✅ Minimal re-renders
- ✅ Efficient state management
- ✅ Image compression support
- ✅ LocalStorage for theme
- ✅ CSS animations use GPU acceleration

---

## 🔐 Security

- ✅ File type validation
- ✅ File size limits
- ✅ Admin-only discount settings
- ✅ User authentication required for profile updates
- ✅ CORS properly configured

---

## 📝 Summary of Changes

| Component | Changes |
|-----------|---------|
| **Navbar** | Dark mode toggle, profile picture display |
| **Home** | Sales banner, dark mode support |
| **ProductCard** | Discount badges, featured status, pricing |
| **Profile** | Picture upload, image preview |
| **AdminProducts** | Discount field, featured checkbox |
| **Product Model** | discount, isFeatured fields |
| **User Model** | profilePicture field |
| **Auth Routes** | File upload middleware for profile |
| **Auth Controller** | Profile picture upload handling |

---

## 🎉 Next Steps

1. **Test dark mode** - Toggle on different pages
2. **Upload profile picture** - Try in Profile page
3. **Create products with discounts** - Use Admin panel
4. **Check responsive design** - View on different devices
5. **Verify sales banner** - See on homepage

---

## ✅ Feature Checklist

- [x] Dark mode toggle
- [x] Dark mode persistence
- [x] Profile picture upload
- [x] Product discounts
- [x] Featured products
- [x] Sales banner
- [x] Improved CSS styling
- [x] Dark mode for all components
- [x] Responsive design
- [x] Error handling
- [x] File validation
- [x] Image preview

All features are production-ready! 🚀
