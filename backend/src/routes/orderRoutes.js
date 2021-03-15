const express = require('express');
const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getAllOrders,
  updateOrderToDelivered,
} = require('../controllers/orderController');

const { protect, restrictTo } = require('../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .post(protect, addOrderItems)
  .get(protect, restrictTo('admin', 'seller'), getAllOrders);
router.route('/myorders').get(protect, getMyOrders); // this route must be above the router.route('/:id').get(protect, getOrderById);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router
  .route('/:id/deliver')
  .put(protect, restrictTo('admin', 'seller'), updateOrderToDelivered);

module.exports = router;
