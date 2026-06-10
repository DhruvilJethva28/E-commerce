const express = require('express');
const { register, login, getCurrentUser, updateProfile, logout } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/fileUpload');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getCurrentUser);
router.put('/profile', protect, upload.single('profilePicture'), updateProfile);
router.post('/logout', protect, logout);

module.exports = router;
