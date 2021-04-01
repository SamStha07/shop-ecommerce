import {
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_RESET,
  GET_ALL_PRODUCTS_REQUEST,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_ALL_PRODUCTS_FAIL,
  GET_ALL_PRODUCTS_RESET,
  EDIT_PRODUCT_REQUEST,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_FAIL,
  EDIT_PRODUCT_RESET,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_RESET,
  GET_PRODUCT_BY_ID_REQUEST,
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_BY_ID_FAIL,
  GET_PRODUCT_BY_ID_RESET,
  SEARCH_PRODUCT_REQUEST,
  SEARCH_PRODUCT_FAIL,
  SEARCH_PRODUCT_RESET,
  SEARCH_PRODUCT_SUCCESS,
  FILTER_PRODUCT_REQUEST,
  FILTER_PRODUCT_SUCCESS,
  FILTER_PRODUCT_FAIL,
  FILTER_PRODUCT_RESET,
  PRODUCT_LIST_UNDER_BRAND_REQUEST,
  PRODUCT_LIST_UNDER_BRAND_SUCCESS,
  PRODUCT_LIST_UNDER_BRAND_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_CREATE_REVIEW_FAIL,
} from '../constants/productConstants';

export const createProductReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        product: action.payload,
      };
    case CREATE_PRODUCT_FAIL:
      return { ...state, loading: false, error: action.payload };
    case CREATE_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};

export const getAllProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS_REQUEST:
      return { ...state, loading: true };
    case GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        productsList: action.payload,
      };
    case GET_ALL_PRODUCTS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case GET_ALL_PRODUCTS_RESET:
      return {};
    default:
      return state;
  }
};

export const editProductReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        productEdit: action.payload,
      };
    case EDIT_PRODUCT_FAIL:
      return { ...state, loading: false, error: action.payload };
    case EDIT_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteProductReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case DELETE_PRODUCT_FAIL:
      return { ...state, loading: false, error: action.payload };
    case DELETE_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};

export const getProductByIDReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PRODUCT_BY_ID_REQUEST:
      return { ...state, loading: true };
    case GET_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        productID: action.payload,
      };
    case GET_PRODUCT_BY_ID_FAIL:
      return { ...state, loading: false, error: action.payload };
    case GET_PRODUCT_BY_ID_RESET:
      return {};
    default:
      return state;
  }
};

export const productReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case PRODUCT_CREATE_REVIEW_FAIL:
      return { ...state, loading: false, error: action.payload };
    case PRODUCT_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

export const getProductListUnderBrandReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_LIST_UNDER_BRAND_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_LIST_UNDER_BRAND_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        brandList: action.payload,
      };
    case PRODUCT_LIST_UNDER_BRAND_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export const searchProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case SEARCH_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case SEARCH_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        productsSearch: action.payload,
      };
    case SEARCH_PRODUCT_FAIL:
      return { ...state, loading: false, error: action.payload };
    case SEARCH_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};

export const filterProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case FILTER_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case FILTER_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        productsFilter: action.payload,
      };
    case FILTER_PRODUCT_FAIL:
      return { ...state, loading: false, error: action.payload };
    case FILTER_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};
