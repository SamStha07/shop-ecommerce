import axios from '../../helpers/axios';
import {
  GET_USER_BY_ID_FAIL,
  GET_USER_BY_ID_REQUEST,
  GET_USER_BY_ID_SUCCESS,
  USERS_DELETE_FAIL,
  USERS_DELETE_REQUEST,
  USERS_DELETE_SUCCESS,
  USERS_EDIT_FAIL,
  USERS_EDIT_REQUEST,
  USERS_EDIT_SUCCESS,
  USERS_LIST_FAIL,
  USERS_LIST_REQUEST,
  USERS_LIST_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_PASSWORD_FAIL,
  USER_UPDATE_PASSWORD_REQUEST,
  USER_UPDATE_PASSWORD_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from '../constants/userConstants';

export const getMyDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/users/me/${id}`, config);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userUpdateProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put('/users/update', user, config);

    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userUpdateProfilePassword = (password) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: USER_UPDATE_PASSWORD_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      '/users/updateMyPassword',
      password,
      config
    );

    dispatch({
      type: USER_UPDATE_PASSWORD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USERS_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('users/list', config);

    dispatch({
      type: USERS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USERS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userEdit = (id, name, email, role) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: USERS_EDIT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.patch(
      `users/${id.id}`,
      { name, email, role },
      config
    );

    dispatch({
      type: USERS_EDIT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USERS_EDIT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userDelete = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USERS_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`users/${id}`, config);

    dispatch({
      type: USERS_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: USERS_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserByID = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_USER_BY_ID_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`users/${id}`, config);

    dispatch({
      type: GET_USER_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
