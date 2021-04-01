import axios from '../../helpers/axios';
import {
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_RESET,
  DELETE_PRODUCT_SUCCESS,
  EDIT_PRODUCT_REQUEST,
  EDIT_PRODUCT_RESET,
  EDIT_PRODUCT_SUCCESS,
  FILTER_PRODUCT_FAIL,
  FILTER_PRODUCT_REQUEST,
  FILTER_PRODUCT_SUCCESS,
  GET_ALL_PRODUCTS_FAIL,
  GET_ALL_PRODUCTS_REQUEST,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_PRODUCT_BY_ID_FAIL,
  GET_PRODUCT_BY_ID_REQUEST,
  GET_PRODUCT_BY_ID_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_LIST_UNDER_BRAND_FAIL,
  PRODUCT_LIST_UNDER_BRAND_REQUEST,
  PRODUCT_LIST_UNDER_BRAND_SUCCESS,
  SEARCH_PRODUCT_FAIL,
  SEARCH_PRODUCT_REQUEST,
  SEARCH_PRODUCT_SUCCESS,
} from '../constants/productConstants';

export const createProduct = (form) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_PRODUCT_REQUEST,
    });

    const { data } = await axios.post('/product/create', form);

    dispatch({
      type: CREATE_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllProductsList = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_PRODUCTS_REQUEST,
    });

    const { data } = await axios.get('/product/list');

    dispatch({
      type: GET_ALL_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getProductByID = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_PRODUCT_BY_ID_REQUEST,
    });

    const { data } = await axios.get(`/product/${id}`);

    dispatch({
      type: GET_PRODUCT_BY_ID_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const editProduct = (
  id,
  category,
  subCategory,
  brand,
  name,
  price,
  quantity,
  description,
  images
) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_PRODUCT_REQUEST,
    });

    const { data } = await axios.patch(`/product/${id.id}`, {
      category,
      subCategory,
      brand,
      name,
      price,
      quantity,
      description,
      images,
    });

    // console.log(data);

    dispatch({
      type: EDIT_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EDIT_PRODUCT_RESET,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_PRODUCT_REQUEST,
    });

    await axios.delete(`/product/${id}`);

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_RESET,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getProductListOfBrand = (productId) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_LIST_UNDER_BRAND_REQUEST,
    });

    const { data } = await axios.get(`/product/brand/list/${productId}`);

    dispatch({
      type: PRODUCT_LIST_UNDER_BRAND_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_UNDER_BRAND_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const searchProducts = (keyword, pageNumber, filters) => async (
  dispatch
) => {
  try {
    dispatch({
      type: SEARCH_PRODUCT_REQUEST,
    });
    // console.log('Inside actions');
    // console.log(filters);

    const {
      data,
    } = await axios.post(
      `/product?keyword=${keyword}&pageNumber=${pageNumber}`,
      { filters }
    );
    // console.log(data);

    dispatch({
      type: SEARCH_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SEARCH_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getFilteredProducts = (skip, limit, filters = {}) => async (
  dispatch
) => {
  try {
    dispatch({
      type: FILTER_PRODUCT_REQUEST,
    });

    const { data } = await axios.post('/product/filters', {
      skip,
      limit,
      filters,
    });

    dispatch({
      type: FILTER_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FILTER_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProductReview = (productId, review) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_REQUEST,
    });

    await axios.post(`/product/${productId}/reviews`, review);

    dispatch({
      type: PRODUCT_CREATE_REVIEW_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
