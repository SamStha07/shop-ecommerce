import axios from '../../helpers/axios';
import {
  CAROUSEL_BY_ID_FAIL,
  CAROUSEL_BY_ID_REQUEST,
  CAROUSEL_BY_ID_SUCCESS,
  CAROUSEL_CREATE_FAIL,
  CAROUSEL_CREATE_REQUEST,
  CAROUSEL_CREATE_SUCCESS,
  CAROUSEL_GET_FAIL,
  CAROUSEL_GET_REQUEST,
  CAROUSEL_GET_SUCCESS,
  CAROUSEL_UPDATE_FAIL,
  CAROUSEL_UPDATE_REQUEST,
  CAROUSEL_UPDATE_SUCCESS,
  CAROUSEL_DELETE_REQUEST,
  CAROUSEL_DELETE_FAIL,
  CAROUSEL_DELETE_SUCCESS,
} from '../constants/carouselConstants';

export const getAllCarousel = () => async (dispatch) => {
  try {
    dispatch({
      type: CAROUSEL_GET_REQUEST,
    });

    const { data } = await axios.get('/carousel/list');

    dispatch({
      type: CAROUSEL_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CAROUSEL_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createCarousel = (form) => async (dispatch) => {
  try {
    dispatch({
      type: CAROUSEL_CREATE_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const { data } = await axios.post('/carousel/create', form, config);

    // console.log(data);

    dispatch({
      type: CAROUSEL_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CAROUSEL_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getCarouselByID = (id) => async (dispatch) => {
  try {
    dispatch({
      type: CAROUSEL_BY_ID_REQUEST,
    });

    const { data } = await axios.get(`/carousel/${id}`);
    // console.log(data);

    dispatch({
      type: CAROUSEL_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CAROUSEL_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteCarousel = (id) => async (dispatch) => {
  try {
    dispatch({
      type: CAROUSEL_DELETE_REQUEST,
    });

    // console.log(id);

    await axios.delete(`/carousel/${id}`);

    dispatch({
      type: CAROUSEL_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: CAROUSEL_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const editCarousel = (id, form) => async (dispatch) => {
  try {
    dispatch({
      type: CAROUSEL_UPDATE_REQUEST,
    });

    console.log(id, form);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const { data } = await axios.put(`/carousel/${id}`, form, config);
    // console.log(data);

    dispatch({
      type: CAROUSEL_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CAROUSEL_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
