import axios from '../../helpers/axios';

import {
  ORDER_ALL_LIST_FAIL,
  ORDER_ALL_LIST_REQUEST,
  ORDER_ALL_LIST_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_MY_LIST_FAIL,
  ORDER_MY_LIST_REQUEST,
  ORDER_MY_LIST_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
} from '../constants/orderConstants';

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const { data } = await axios.post('/orders', order);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    const { data } = await axios.get(`/orders/${id}`);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// For Paypal
export const payOrder = (orderId, paymentResult) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
    });

    const { data } = await axios.put(`/orders/${orderId}/pay`, paymentResult);

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// for Khalti
export const payOrderFromKhalti = (orderId, paymentResult) => async (
  dispatch
) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
    });

    const { data } = await axios.post(
      `/config/khalti/${orderId}/pay`,
      paymentResult
    );

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listMyOrders = () => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_MY_LIST_REQUEST,
    });

    const { data } = await axios.get('/orders/myorders');

    dispatch({
      type: ORDER_MY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_MY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const allOrdersList = () => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_ALL_LIST_REQUEST,
    });

    const { data } = await axios.get('/orders');

    dispatch({
      type: ORDER_ALL_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_ALL_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const orderDeliver = (order) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_DELIVER_REQUEST,
    });

    const { data } = await axios.put(`/orders/${order._id}/deliver`);

    dispatch({
      type: ORDER_DELIVER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
