import axios from '../../helpers/axios';
import {
  CREATE_SUB_CATEGORY_FAIL,
  CREATE_SUB_CATEGORY_REQUEST,
  CREATE_SUB_CATEGORY_SUCCESS,
  DELETE_SUB_CATEGORY_REQUEST,
  DELETE_SUB_CATEGORY_RESET,
  DELETE_SUB_CATEGORY_SUCCESS,
  EDIT_SUB_CATEGORY_REQUEST,
  EDIT_SUB_CATEGORY_RESET,
  EDIT_SUB_CATEGORY_SUCCESS,
  GET_ALL_SUB_CATEGORY_FAIL,
  GET_ALL_SUB_CATEGORY_REQUEST,
  GET_ALL_SUB_CATEGORY_SUCCESS,
  GET_SUBCAT_OF_MAINCAT_FAIL,
  GET_SUBCAT_OF_MAINCAT_REQUEST,
  GET_SUBCAT_OF_MAINCAT_SUCCESS,
} from '../constants/categoryConstants';

export const getAllSubCategories = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_SUB_CATEGORY_REQUEST,
    });

    const { data } = await axios.get('/category/subcategory/list');

    dispatch({
      type: GET_ALL_SUB_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_SUB_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createSubCategory = (name, categoryID) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_SUB_CATEGORY_REQUEST,
    });

    const { data } = await axios.post('/category/subcategory/create', {
      name,
      categoryID,
    });

    dispatch({
      type: CREATE_SUB_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_SUB_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const editSubCategory = (id, name, categoryID) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_SUB_CATEGORY_REQUEST,
    });

    const { data } = await axios.patch(`/category/subcategory/${id.id}`, {
      name,
      categoryID,
    });

    dispatch({
      type: EDIT_SUB_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EDIT_SUB_CATEGORY_RESET,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteSubCategory = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_SUB_CATEGORY_REQUEST,
    });

    await axios.delete(`/category/subcategory/${id}`);

    dispatch({
      type: DELETE_SUB_CATEGORY_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: DELETE_SUB_CATEGORY_RESET,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getSubCatUnderMainCatID = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SUBCAT_OF_MAINCAT_REQUEST,
    });

    const { data } = await axios.get(`/category/subs/${id}`);

    dispatch({
      type: GET_SUBCAT_OF_MAINCAT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SUBCAT_OF_MAINCAT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
