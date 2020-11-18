import {
  CREATE_CATEGORY_FAIL,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_RESET,
  CREATE_CATEGORY_SUCCESS,
  GET_ALL_CATEGORY_REQUEST,
  GET_ALL_CATEGORY_SUCCESS,
  GET_ALL_CATEGORY_FAIL,
  GET_ALL_CATEGORY_RESET,
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
