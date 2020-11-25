import { combineReducers } from 'redux';

import {
  createCategoryReducer,
  deleteCategoryReducer,
  editCategoryReducer,
  getAllCategoryReducer,
} from './categoryReducers';
import {
  createChildCategoryReducer,
  deleteChildCategoryReducer,
  editChildCategoryReducer,
  getAllChildCategoryReducer,
  getSubCatOfMainCat,
} from './childCategoryReducers';
import {
  createSubCategoryReducer,
  deleteSubCategoryReducer,
  editSubCategoryReducer,
  getAllSubCategoryReducer,
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
});
