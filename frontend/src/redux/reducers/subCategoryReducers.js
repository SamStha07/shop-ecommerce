import {
  CREATE_SUB_CATEGORY_FAIL,
  CREATE_SUB_CATEGORY_REQUEST,
  CREATE_SUB_CATEGORY_RESET,
  CREATE_SUB_CATEGORY_SUCCESS,
  DELETE_SUB_CATEGORY_FAIL,
  DELETE_SUB_CATEGORY_REQUEST,
  DELETE_SUB_CATEGORY_RESET,
  DELETE_SUB_CATEGORY_SUCCESS,
  EDIT_SUB_CATEGORY_FAIL,
  EDIT_SUB_CATEGORY_REQUEST,
  EDIT_SUB_CATEGORY_RESET,
  EDIT_SUB_CATEGORY_SUCCESS,
  GET_ALL_SUB_CATEGORY_FAIL,
  GET_ALL_SUB_CATEGORY_REQUEST,
  GET_ALL_SUB_CATEGORY_RESET,
  GET_ALL_SUB_CATEGORY_SUCCESS,
} from '../constants/categoryConstants';

export const getAllSubCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_SUB_CATEGORY_REQUEST:
      return { ...state, loading: true };
    case GET_ALL_SUB_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        subCategory: action.payload,
      };
    case GET_ALL_SUB_CATEGORY_FAIL:
      return { ...state, loading: false, error: action.payload };
    case GET_ALL_SUB_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};

export const createSubCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_SUB_CATEGORY_REQUEST:
      return { ...state, loading: true };
    case CREATE_SUB_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        subCategory: action.payload,
      };
    case CREATE_SUB_CATEGORY_FAIL:
      return { ...state, loading: false, error: action.payload };
    case CREATE_SUB_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};

export const editSubCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_SUB_CATEGORY_REQUEST:
      return { ...state, loading: true };
    case EDIT_SUB_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        subCategory: action.payload,
      };
    case EDIT_SUB_CATEGORY_FAIL:
      return { ...state, loading: false, error: action.payload };
    case EDIT_SUB_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteSubCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_SUB_CATEGORY_REQUEST:
      return { ...state, loading: true };
    case DELETE_SUB_CATEGORY_SUCCESS:
      return { loading: false, success: true };
    case DELETE_SUB_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_SUB_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};
