# 🧪 Quick Testing Guide

## Testing All New Features

### 1. Test Dark Mode 🌙
**Steps:**
1. Run frontend: `npm start` (in frontend folder)
2. Look at navbar - find Moon/Sun icon (top right)
3. Click the icon to toggle dark mode
4. Verify:
   - ✅ All pages switch color scheme
   - ✅ Text remains readable
   - ✅ Preference persists after page refresh
   - ✅ Navbar background changes
   - ✅ Cards and containers have dark backgrounds

**Expected Behavior:**
- Light mode: White backgrounds, dark text
- Dark mode: Dark gray backgrounds, light text
- Smooth transitions between modes

---

### 2. Test Profile Picture Upload 📸
**Steps:**
1. Login with: `user@example.com` / `password123`
2. Click on profile (top right navbar) → Go to Profile
3. Click "Edit Profile" button
4. Click the camera icon on profile picture
5. Select an image from your computer
6. See preview appear
7. Click "Save Changes"
8. Verify:
   - ✅ Picture displays in profile
   - ✅ Picture shows in navbar
   - ✅ Picture persists after refresh

**Files to Test With:**
- Any JPEG, PNG, GIF, or WebP image
- Maximum 5MB file size
- Recommended: 200x200px or larger

---

### 3. Test Product Discounts 🏷️
**Admin Steps:**
1. Login with: `admin@example.com` / `admin123`
2. Go to Admin Panel → Products Management
3. Click "Add Product"
4. Fill in details:
   - Name: "Test Product"
   - Price: 100
   - Stock: 50
   - **Discount: 25** (this is the new field!)
   - Check "Featured Product" checkbox
5. Create the product
6. Verify:
   - ✅ Product appears in table with discount showing
   - ✅ Product shows "25% OFF" on home page
   - ✅ Discount badge is animated (red pulsing)
   - ✅ Discounted price is $75 ($100 - 25%)
   - ✅ "Featured" label shows on product card

**Customer Steps:**
1. Go to home page (as regular user or logged out)
2. Look for products with red "OFF" badges
3. Verify:
   - ✅ Discounted price in red/green
   - ✅ Original price crossed out
   - ✅ Savings amount displayed
   - ✅ Featured badge visible if marked

---

### 4. Test Featured Products ⭐
**Steps:**
1. Admin: Create product with "Featured Product" checked
2. Customer: View on home page
3. Verify:
   - ✅ Yellow badge shows "⭐ FEATURED"
   - ✅ Badge appears on card
   - ✅ Multiple featured products can exist

---

### 5. Test Sales Banner 🎉
**Steps:**
1. Go to Home page
2. Look at top of products section
3. Verify:
   - ✅ Red/pink banner visible
   - ✅ "SPECIAL SALE!" text displays
   - ✅ "LIMITED TIME" badge is animated
   - ✅ Works in both light and dark mode
   - ✅ Text is readable

---

### 6. Test CSS Improvements 🎨
**Visual Checks:**
1. Check card hover effects:
   - ✅ Cards scale up slightly on hover
   - ✅ Shadows increase
   - ✅ Transitions are smooth

2. Check spacing:
   - ✅ Padding looks even on cards
   - ✅ Margins between items are consistent
   - ✅ Typography hierarchy is clear

3. Check colors:
   - ✅ Buttons have good contrast
   - ✅ Text is readable in both modes
   - ✅ Accent colors pop appropriately

4. Check responsive design:
   - ✅ Open DevTools (F12)
   - ✅ Toggle device toolbar (Ctrl+Shift+M)
   - ✅ Test on Mobile, Tablet, Desktop sizes
   - ✅ All features work on mobile

---

## Automated Testing Checklist

### Dark Mode
- [ ] Toggle works in navbar
- [ ] All pages support dark mode
- [ ] Preference saves to localStorage
- [ ] Text readable in both modes
- [ ] No console errors

### Profile Picture
- [ ] File input accepts images
- [ ] Preview shows before upload
- [ ] Upload succeeds (200 response)
- [ ] Picture displays in profile
- [ ] Picture shows in navbar
- [ ] Persists after refresh

### Product Discounts
- [ ] Discount field accepts 0-100
- [ ] Price calculation is correct
- [ ] Discount badge displays
- [ ] Strikethrough works
- [ ] Savings amount shows

### Featured Products
- [ ] Checkbox toggles state
- [ ] Featured badge displays
- [ ] Featured status persists

### Sales Banner
- [ ] Visible on home page
- [ ] Works in dark/light mode
- [ ] Animation runs smoothly
- [ ] Responsive on mobile

---

## Error Testing

### What Should NOT Happen
- ❌ Dark mode doesn't toggle
- ❌ Profile picture upload fails silently
- ❌ Discount allows negative values
- ❌ Images don't load
- ❌ Console shows errors

### Error Recovery
1. **Clear localStorage:**
   ```javascript
   localStorage.clear()
   location.reload()
   ```

2. **Check console for errors:**
   - Press F12 → Console tab
   - Look for red error messages
   - Report any errors found

3. **Verify backend running:**
   ```bash
   # In backend folder
   npm run dev
   ```

---

## Performance Testing

### Check in DevTools Network Tab
- [ ] Images load quickly
- [ ] No failed requests
- [ ] File sizes are reasonable
- [ ] No loading spinners stuck

### Check in DevTools Performance Tab
- [ ] Smooth 60 FPS on scroll
- [ ] No jank on dark mode toggle
- [ ] Animations run smoothly

---

## Browser Compatibility

Test on these browsers:
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

---

## Mobile Testing

Use Chrome DevTools or real device:
- [ ] Navbar responsive
- [ ] Cards stack properly
- [ ] Buttons clickable
- [ ] Images load
- [ ] No horizontal scroll
- [ ] Touch gestures work

---

## Final Verification

Complete this checklist:
- [ ] Dark mode works
- [ ] Profile picture uploads
- [ ] Discounts display correctly
- [ ] Featured products show badge
- [ ] Sales banner visible
- [ ] All pages responsive
- [ ] No console errors
- [ ] Mobile friendly

---

## Troubleshooting During Testing

**Images not loading?**
- Check backend is running: `npm run dev` in backend folder
- Check `/uploads` directory exists
- Verify CORS is configured

**Dark mode not saving?**
- Open DevTools → Application → LocalStorage
- Check 'darkMode' key exists
- Try clearing cache (Ctrl+Shift+Delete)

**Profile picture upload fails?**
- Check file is an image (JPEG/PNG)
- Check file is under 5MB
- Look at browser console for error messages

**Discount not showing?**
- Refresh the page (Ctrl+F5)
- Make sure discount is between 0-100
- Create a new product with discount

---

## Success Criteria

✅ All features work as expected
✅ No console errors
✅ Responsive on all devices
✅ Smooth animations
✅ Fast load times
✅ Readable text in both modes
✅ Images load properly
✅ Features persist after refresh

**All tests passed? Congrats! 🎉**

---

## Next Steps

1. Deploy to production
2. Monitor for any user-reported issues
3. Gather feedback on new features
4. Consider future enhancements:
   - Multiple profile pictures per product
   - Video uploads
   - Advanced discount rules
   - Seasonal featured products
   - Dark mode schedule (auto-switch)
