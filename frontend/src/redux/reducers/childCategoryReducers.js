import {
  CREATE_CHILD_CATEGORY_FAIL,
  CREATE_CHILD_CATEGORY_REQUEST,
  CREATE_CHILD_CATEGORY_RESET,
  CREATE_CHILD_CATEGORY_SUCCESS,
  GET_ALL_CHILD_CATEGORY_REQUEST,
  GET_ALL_CHILD_CATEGORY_SUCCESS,
  GET_ALL_CHILD_CATEGORY_FAIL,
  GET_ALL_CHILD_CATEGORY_RESET,
  EDIT_CHILD_CATEGORY_REQUEST,
  EDIT_CHILD_CATEGORY_SUCCESS,
  EDIT_CHILD_CATEGORY_FAIL,
  EDIT_CHILD_CATEGORY_RESET,
  GET_SUBCAT_OF_MAINCAT_REQUEST,
  GET_SUBCAT_OF_MAINCAT_SUCCESS,
  GET_SUBCAT_OF_MAINCAT_FAIL,
  GET_SUBCAT_OF_MAINCAT_RESET,
  DELETE_CHILD_CATEGORY_REQUEST,
  DELETE_CHILD_CATEGORY_SUCCESS,
  DELETE_CHILD_CATEGORY_RESET,
  DELETE_CHILD_CATEGORY_FAIL,
  GET_CHILDCAT_OF_SUBCAT_REQUEST,
  GET_CHILDCAT_OF_SUBCAT_SUCCESS,
  GET_CHILDCAT_OF_SUBCAT_FAIL,
  GET_CHILDCAT_OF_SUBCAT_RESET,
  GET_ID_SINGLE_CHILD_CATEGORY_REQUEST,
  GET_ID_SINGLE_CHILD_CATEGORY_SUCCESS,
  GET_ID_SINGLE_CHILD_CATEGORY_FAIL,
  GET_ID_SINGLE_CHILD_CATEGORY_RESET,
} from '../constants/categoryConstants';

export const createChildCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_CHILD_CATEGORY_REQUEST:
      return { ...state, loading: true };
    case CREATE_CHILD_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        childCategory: action.payload,
      };
    case CREATE_CHILD_CATEGORY_FAIL:
      return { ...state, loading: false, error: action.payload };
    case CREATE_CHILD_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};

export const getAllChildCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_CHILD_CATEGORY_REQUEST:
      return { ...state, loading: true };
    case GET_ALL_CHILD_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        childCategory: action.payload,
      };
    case GET_ALL_CHILD_CATEGORY_FAIL:
      return { ...state, loading: false, error: action.payload };
    case GET_ALL_CHILD_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};

export const getChildCategoryByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ID_SINGLE_CHILD_CATEGORY_REQUEST:
      return { ...state, loading: true };
    case GET_ID_SINGLE_CHILD_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        childCategory: action.payload,
      };
    case GET_ID_SINGLE_CHILD_CATEGORY_FAIL:
      return { ...state, loading: false, error: action.payload };
    case GET_ID_SINGLE_CHILD_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};

export const editChildCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_CHILD_CATEGORY_REQUEST:
      return { ...state, loading: true };
    case EDIT_CHILD_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        childCategory: action.payload,
      };
    case EDIT_CHILD_CATEGORY_FAIL:
      return { ...state, loading: false, error: action.payload };
    case EDIT_CHILD_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteChildCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_CHILD_CATEGORY_REQUEST:
      return { ...state, loading: true };
    case DELETE_CHILD_CATEGORY_SUCCESS:
      return { loading: false, success: true };
    case DELETE_CHILD_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_CHILD_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};

// to find sub-cateory under main category
export const getChildCatOfSubCat = (state = {}, action) => {
  switch (action.type) {
    case GET_CHILDCAT_OF_SUBCAT_REQUEST:
      return { ...state, loading: true };
    case GET_CHILDCAT_OF_SUBCAT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        childCategory: action.payload,
      };
    case GET_CHILDCAT_OF_SUBCAT_FAIL:
      return { ...state, loading: false, error: action.payload };
    case GET_CHILDCAT_OF_SUBCAT_RESET:
      return {};
    default:
      return state;
  }
};
