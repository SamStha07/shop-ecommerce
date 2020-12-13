const express = require('express');
const {
  createProduct,
  productList,
  updateProduct,
  deleteProduct,
  getProductByID,
} = require('../controllers/productController');
const { protect, restrictTo } = require('../middlewares/auth');

const router = express.Router();

router.post('/create', protect, restrictTo('admin', 'seller'), createProduct);
router.get('/list', protect, restrictTo('admin', 'seller'), productList);
router.patch('/:id', protect, restrictTo('admin', 'seller'), updateProduct);
router.delete('/:id', protect, restrictTo('admin', 'seller'), deleteProduct);
router.get('/:id', getProductByID);

module.exports = router;
