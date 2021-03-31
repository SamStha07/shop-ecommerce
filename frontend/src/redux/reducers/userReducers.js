import {
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_RESET,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_UPDATE_PASSWORD_REQUEST,
  USER_UPDATE_PASSWORD_SUCCESS,
  USER_UPDATE_PASSWORD_FAIL,
  USER_NEW_REGISTER_REQUEST,
  USER_NEW_REGISTER_FAIL,
  USER_NEW_REGISTER_SUCCESS,
  USER_NEW_REGISTER_RESET,
  USERS_LIST_REQUEST,
  USERS_LIST_SUCCESS,
  USERS_LIST_FAIL,
  USERS_EDIT_REQUEST,
  USERS_EDIT_SUCCESS,
  USERS_EDIT_FAIL,
  USERS_EDIT_RESET,
  USERS_DELETE_REQUEST,
  USERS_DELETE_SUCCESS,
  USERS_DELETE_FAIL,
  USERS_DELETE_RESET,
  GET_USER_BY_ID_REQUEST,
  GET_USER_BY_ID_SUCCESS,
  GET_USER_BY_ID_FAIL,
  GET_USER_BY_ID_RESET,
} from '../constants/userConstants';

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        userInfo: action.payload,
      };
    case USER_LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true };
    case USER_REGISTER_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { ...state, loading: false, error: action.payload };
    case USER_REGISTER_RESET:
      return {};
    default:
      return state;
  }
};

// new user from admin
export const registerNewUserReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_NEW_REGISTER_REQUEST:
      return { ...state, loading: true };
    case USER_NEW_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        userInfo: action.payload,
      };
    case USER_NEW_REGISTER_FAIL:
      return { ...state, loading: false, error: action.payload };
    case USER_NEW_REGISTER_RESET:
      return {};
    default:
      return state;
  }
};

export const userDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_SUCCESS:
      return { ...state, loading: false, userInfoDetails: action.payload };
    case USER_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case USER_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { ...state, loading: true };
    case USER_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        userInfoUpdated: action.payload,
      };
    case USER_UPDATE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case USER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const userUpdatePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PASSWORD_REQUEST:
      return { ...state, loading: true };
    case USER_UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        userPasswordUpdated: action.payload,
      };
    case USER_UPDATE_PASSWORD_FAIL:
      return { ...state, loading: false, error: action.payload };
    case USER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const usersListReducer = (state = {}, action) => {
  switch (action.type) {
    case USERS_LIST_REQUEST:
      return { ...state, loading: true };
    case USERS_LIST_SUCCESS:
      return { ...state, loading: false, usersList: action.payload };
    case USERS_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const usersEditReducer = (state = {}, action) => {
  switch (action.type) {
    case USERS_EDIT_REQUEST:
      return { ...state, loading: true };
    case USERS_EDIT_SUCCESS:
      return { ...state, loading: false, success: true, user: action.payload };
    case USERS_EDIT_FAIL:
      return { ...state, loading: false, error: action.payload };
    case USERS_EDIT_RESET:
      return {};
    default:
      return state;
  }
};

export const usersDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USERS_DELETE_REQUEST:
      return { ...state, loading: true };
    case USERS_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case USERS_DELETE_FAIL:
      return { ...state, loading: false, error: action.payload };

    case USERS_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const getUserByIDReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USER_BY_ID_REQUEST:
      return { ...state, loading: true };
    case GET_USER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case GET_USER_BY_ID_FAIL:
      return { ...state, loading: false, error: action.payload };

    case GET_USER_BY_ID_RESET:
      return {};
    default:
      return state;
  }
};
