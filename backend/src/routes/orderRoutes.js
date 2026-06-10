const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const {
  createOrder,
  getUserOrders,
  getOrder,
  updateOrderStatus,
  processPayment,
  getAllOrders,
} = require('../controllers/orderController');

const router = express.Router();

// Specific routes first (before :id parameter)
router.post('/payment/process', protect, processPayment);
router.get('/admin/all', protect, authorize('admin'), getAllOrders);

// Generic routes last (with parameters)
router.post('/', protect, createOrder);
router.get('/', protect, getUserOrders);
router.get('/:id', protect, getOrder);
router.put('/:id/status', protect, authorize('admin'), updateOrderStatus);

module.exports = router;
