import {
  CREATE_CATEGORY_FAIL,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_RESET,
  CREATE_CATEGORY_SUCCESS,
  GET_ALL_CATEGORY_REQUEST,
  GET_ALL_CATEGORY_SUCCESS,
  GET_ALL_CATEGORY_FAIL,
  GET_ALL_CATEGORY_RESET,
  EDIT_CATEGORY_REQUEST,
  EDIT_CATEGORY_SUCCESS,
  EDIT_CATEGORY_FAIL,
  EDIT_CATEGORY_RESET,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
  DELETE_CATEGORY_RESET,
  GET_ID_SINGLE_CATEGORY_REQUEST,
  GET_ID_SINGLE_CATEGORY_SUCCESS,
  GET_ID_SINGLE_CATEGORY_FAIL,
  GET_ID_SINGLE_CATEGORY_RESET,
} from '../constants/categoryConstants';

export const createCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_CATEGORY_REQUEST:
      return { ...state, loading: true };
    case CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        category: action.payload,
      };
    case CREATE_CATEGORY_FAIL:
      return { ...state, loading: false, error: action.payload };
    case CREATE_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};

export const getAllCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_CATEGORY_REQUEST:
      return { ...state, loading: true };
    case GET_ALL_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        category: action.payload,
      };
    case GET_ALL_CATEGORY_FAIL:
      return { ...state, loading: false, error: action.payload };
    case GET_ALL_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};

export const getCategoryByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ID_SINGLE_CATEGORY_REQUEST:
      return { ...state, loading: true };
    case GET_ID_SINGLE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        category: action.payload,
      };
    case GET_ID_SINGLE_CATEGORY_FAIL:
      return { ...state, loading: false, error: action.payload };
    case GET_ID_SINGLE_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};

export const editCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_CATEGORY_REQUEST:
      return { ...state, loading: true };
    case EDIT_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        category: action.payload,
      };
    case EDIT_CATEGORY_FAIL:
      return { ...state, loading: false, error: action.payload };
    case EDIT_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_CATEGORY_REQUEST:
      return { ...state, loading: true };
    case DELETE_CATEGORY_SUCCESS:
      return { loading: false, success: true };
    case DELETE_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};
