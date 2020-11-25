import axios from '../../helpers/axios';
import {
  CREATE_CHILD_CATEGORY_FAIL,
  CREATE_CHILD_CATEGORY_REQUEST,
  CREATE_CHILD_CATEGORY_SUCCESS,
  DELETE_CHILD_CATEGORY_FAIL,
  DELETE_CHILD_CATEGORY_REQUEST,
  DELETE_CHILD_CATEGORY_SUCCESS,
  EDIT_CHILD_CATEGORY_FAIL,
  EDIT_CHILD_CATEGORY_REQUEST,
  EDIT_CHILD_CATEGORY_SUCCESS,
  GET_ALL_CHILD_CATEGORY_FAIL,
  GET_ALL_CHILD_CATEGORY_REQUEST,
  GET_ALL_CHILD_CATEGORY_SUCCESS,
  GET_SUBCAT_OF_MAINCAT_FAIL,
  GET_SUBCAT_OF_MAINCAT_REQUEST,
  GET_SUBCAT_OF_MAINCAT_SUCCESS,
} from '../constants/categoryConstants';

export const getAllChildCategories = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_CHILD_CATEGORY_REQUEST,
    });

    const { data } = await axios.get('/category/childcategory/list');

    dispatch({
      type: GET_ALL_CHILD_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_CHILD_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createChildCategory = (name, categoryID, subCategoryID) => async (
  dispatch,
) => {
  try {
    dispatch({
      type: CREATE_CHILD_CATEGORY_REQUEST,
    });

    const { data } = await axios.post('/category/childcategory/create', {
      name,
      categoryID,
      subCategoryID,
    });

    dispatch({
      type: CREATE_CHILD_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_CHILD_CATEGORY_FAIL,
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

export const editChildCategory = (
  id,
  name,
  categoryID,
  subCategoryID,
) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_CHILD_CATEGORY_REQUEST,
    });

    const { data } = await axios.patch(`/category/childcategory/${id.id}`, {
      name,
      categoryID,
      subCategoryID,
    });

    dispatch({
      type: EDIT_CHILD_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EDIT_CHILD_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteChildCategory = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_CHILD_CATEGORY_REQUEST,
    });

    await axios.delete(`/category/childcategory/${id}`);

    dispatch({
      type: DELETE_CHILD_CATEGORY_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: DELETE_CHILD_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
