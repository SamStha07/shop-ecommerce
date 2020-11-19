import axios from '../../helpers/axios';

import {
  CREATE_CATEGORY_FAIL,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
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

    console.log(data);

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
