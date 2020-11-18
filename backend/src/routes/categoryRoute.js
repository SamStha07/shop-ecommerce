const express = require('express');
const {
  createCategory,
  createSubCategory,
  categoryList,
  subCategoryList,
  childCategoryList,
  createChildCategory,
} = require('../controllers/categoryController');
const { protect, restrictTo } = require('../middlewares/auth');

const router = express.Router();

// Category Route
router.post(
  '/main/create',
  protect,
  restrictTo('admin', 'seller'),
  createCategory,
);
router.get('/main/list', protect, restrictTo('admin', 'seller'), categoryList);

// Sub-category
router.post(
  '/subcategory/create',
  protect,
  restrictTo('admin', 'seller'),
  createSubCategory,
);
router.get(
  '/subcategory/list',
  protect,
  restrictTo('admin', 'seller'),
  subCategoryList,
);

// Child-category
router.post(
  '/childcategory/create',
  protect,
  restrictTo('admin', 'seller'),
  createChildCategory,
);
router.get(
  '/childcategory/list',
  protect,
  restrictTo('admin', 'seller'),
  childCategoryList,
);

module.exports = router;
