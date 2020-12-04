import axios from '../../helpers/axios';
import {
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
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
