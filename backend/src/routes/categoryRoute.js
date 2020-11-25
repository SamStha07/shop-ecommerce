const express = require('express');
const {
  createCategory,
  createSubCategory,
  categoryList,
  subCategoryList,
  childCategoryList,
  createChildCategory,
  updateCategory,
  deleteCategory,
  updateSubCategory,
  deleteSubCategory,
  updateChildCategory,
  deleteChildCategory,
  getAllCategories,
} = require('../controllers/categoryController');
const { protect, restrictTo } = require('../middlewares/auth');

const router = express.Router();

////////////////////////////////////////////////////////////////////
// Category Route
router.post(
  '/main/create',
  protect,
  restrictTo('admin', 'seller'),
  createCategory,
);
router.get('/main/list', protect, restrictTo('admin', 'seller'), categoryList);
router.patch(
  '/main/:id',
  protect,
  restrictTo('admin', 'seller'),
  updateCategory,
);
router.delete(
  '/main/:id',
  protect,
  restrictTo('admin', 'seller'),
  deleteCategory,
);

/////////////////////////////////////////////
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
router.patch(
  '/subcategory/:id',
  protect,
  restrictTo('admin', 'seller'),
  updateSubCategory,
);
router.delete(
  '/subcategory/:id',
  protect,
  restrictTo('admin', 'seller'),
  deleteSubCategory,
);

/////////////////////////////////////////////////////////
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
router.patch(
  '/childcategory/:id',
  protect,
  restrictTo('admin', 'seller'),
  updateChildCategory,
);
router.delete(
  '/childcategory/:id',
  protect,
  restrictTo('admin', 'seller'),
  deleteChildCategory,
);

// Get all the sub-category with that main category id
router.get(
  '/subs/:id',
  protect,
  restrictTo('admin', 'seller'),
  getAllCategories,
);

module.exports = router;
