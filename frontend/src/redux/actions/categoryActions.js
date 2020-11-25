import axios from '../../helpers/axios';

import {
  CREATE_CATEGORY_FAIL,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  EDIT_CATEGORY_FAIL,
  EDIT_CATEGORY_REQUEST,
  EDIT_CATEGORY_SUCCESS,
  GET_ALL_CATEGORY_FAIL,
  GET_ALL_CATEGORY_REQUEST,
  GET_ALL_CATEGORY_SUCCESS,
} from '../constants/categoryConstants';

export const getAllCategories = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_CATEGORY_REQUEST,
    });

    const { data } = await axios.get('/category/main/list');

    // console.log(data);

    dispatch({
      type: GET_ALL_CATEGORY_SUCCESS,
      payload: data.categoriesList,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createCategory = (name) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_CATEGORY_REQUEST,
    });

    const { data } = await axios.post('/category/main/create', {
      name,
    });

    // console.log(data);

    dispatch({
      type: CREATE_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const editCategory = (category) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_CATEGORY_REQUEST,
    });

    const { data } = await axios.patch(
      `/category/main/${category.id}`,
      category,
    );

    // console.log(data);

    dispatch({
      type: EDIT_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EDIT_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_CATEGORY_REQUEST,
    });

    await axios.delete(`/category/main/${id}`);

    dispatch({
      type: DELETE_CATEGORY_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: DELETE_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
