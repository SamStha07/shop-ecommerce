import { combineReducers } from 'redux';
import { cartReducer } from './cartReducers';

import {
  createCategoryReducer,
  deleteCategoryReducer,
  editCategoryReducer,
  getAllCategoryReducer,
  getCategoryByIdReducer,
} from './categoryReducers';
import {
  createChildCategoryReducer,
  deleteChildCategoryReducer,
  editChildCategoryReducer,
  getAllChildCategoryReducer,
  getChildCategoryByIdReducer,
  getChildCatOfSubCat,
} from './childCategoryReducers';
import {
  createProductReducer,
  deleteProductReducer,
  editProductReducer,
  filterProductsReducer,
  getAllProductsReducer,
  getProductByIDReducer,
  searchProductsReducer,
} from './productReducers';
import {
  createSubCategoryReducer,
  deleteSubCategoryReducer,
  editSubCategoryReducer,
  getAllSubCategoryReducer,
  getSubCategoryByIdReducer,
  getSubCatOfMainCat,
} from './subCategoryReducers';

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userUpdatePasswordReducer,
} from './userReducers';

export default combineReducers({
  // User
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdated: userUpdateProfileReducer,
  userUpdatedPassword: userUpdatePasswordReducer,
  // Category
  createCategory: createCategoryReducer,
  getAllCategory: getAllCategoryReducer,
  editCategory: editCategoryReducer,
  deleteCategory: deleteCategoryReducer,
  // Sub-Category
  getAllSubCategory: getAllSubCategoryReducer,
  createSubCategory: createSubCategoryReducer,
  editSubCategory: editSubCategoryReducer,
  deleteSubCategory: deleteSubCategoryReducer,

  // Child-Category
  createChildCategory: createChildCategoryReducer,
  getAllChildCategory: getAllChildCategoryReducer,
  editChildCategory: editChildCategoryReducer,
  deleteChildCategory: deleteChildCategoryReducer,

  // get sub-category under certain main category
  getSubCatWithCategoryID: getSubCatOfMainCat,

  // get Child Category under sub category ID
  getChildCatWithSubCategoryID: getChildCatOfSubCat,

  //get all types of categories with ID
  getCategoryByID: getCategoryByIdReducer,
  getSubCategoryByID: getSubCategoryByIdReducer,
  getChildCategoryByID: getChildCategoryByIdReducer,

  // Product
  createProduct: createProductReducer,
  getAllProducts: getAllProductsReducer,
  editProduct: editProductReducer,
  deleteProduct: deleteProductReducer,
  getProductByID: getProductByIDReducer,

  // Search
  searchProduct: searchProductsReducer,

  // Filter
  filterProduct: filterProductsReducer,

  // Add To Cart
  cart: cartReducer,
});
