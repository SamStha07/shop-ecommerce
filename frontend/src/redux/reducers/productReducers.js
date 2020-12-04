import {
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_RESET,
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
        subCategory: action.payload,
      };
    case CREATE_PRODUCT_FAIL:
      return { ...state, loading: false, error: action.payload };
    case CREATE_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};
