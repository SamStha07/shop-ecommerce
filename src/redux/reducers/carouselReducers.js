import {
  CAROUSEL_CREATE_FAIL,
  CAROUSEL_CREATE_REQUEST,
  CAROUSEL_CREATE_RESET,
  CAROUSEL_CREATE_SUCCESS,
  CAROUSEL_GET_FAIL,
  CAROUSEL_GET_REQUEST,
  CAROUSEL_GET_RESET,
  CAROUSEL_GET_SUCCESS,
  CAROUSEL_UPDATE_REQUEST,
  CAROUSEL_UPDATE_SUCCESS,
  CAROUSEL_UPDATE_FAIL,
  CAROUSEL_UPDATE_RESET,
  CAROUSEL_DELETE_FAIL,
  CAROUSEL_DELETE_RESET,
  CAROUSEL_DELETE_SUCCESS,
  CAROUSEL_DELETE_REQUEST,
  CAROUSEL_BY_ID_REQUEST,
  CAROUSEL_BY_ID_SUCCESS,
  CAROUSEL_BY_ID_FAIL,
  CAROUSEL_BY_ID_RESET,
} from '../constants/carouselConstants';

export const createCarouselReducer = (state = {}, action) => {
  switch (action.type) {
    case CAROUSEL_CREATE_REQUEST:
      return { ...state, loading: true };
    case CAROUSEL_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        carousel: action.payload,
      };
    case CAROUSEL_CREATE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case CAROUSEL_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const getAllCarouselReducer = (state = {}, action) => {
  switch (action.type) {
    case CAROUSEL_GET_REQUEST:
      return { ...state, loading: true };
    case CAROUSEL_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        carousel: action.payload,
      };
    case CAROUSEL_GET_FAIL:
      return { ...state, loading: false, error: action.payload };
    case CAROUSEL_GET_RESET:
      return {};
    default:
      return state;
  }
};

export const updateCarouselReducer = (state = {}, action) => {
  switch (action.type) {
    case CAROUSEL_UPDATE_REQUEST:
      return { ...state, loading: true };
    case CAROUSEL_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        carousel: action.payload,
      };
    case CAROUSEL_UPDATE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case CAROUSEL_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const carouselByIDReducer = (state = {}, action) => {
  switch (action.type) {
    case CAROUSEL_BY_ID_REQUEST:
      return { ...state, loading: true };
    case CAROUSEL_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        carousel: action.payload,
      };
    case CAROUSEL_BY_ID_FAIL:
      return { ...state, loading: false, error: action.payload };
    case CAROUSEL_BY_ID_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteCarouselReducer = (state = {}, action) => {
  switch (action.type) {
    case CAROUSEL_DELETE_REQUEST:
      return { ...state, loading: true };
    case CAROUSEL_DELETE_SUCCESS:
      return { loading: false, success: true };
    case CAROUSEL_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case CAROUSEL_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
