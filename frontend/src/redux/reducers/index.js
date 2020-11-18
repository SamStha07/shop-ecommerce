import { combineReducers } from 'redux';
import {
  createCategoryReducer,
  getAllCategoryReducer,
} from './categoryReducers';

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
});
