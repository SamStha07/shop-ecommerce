import axios from '../../helpers/axios';

import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_RESET,
  USER_DETAILS_RESET,
  USER_UPDATE_RESET,
  USER_UPDATE_PASSWORD_RESET,
} from '../constants/userConstants';
import history from '../../history';

export const login = (email, password) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const { data } = await axios.post('/users/login', { email, password });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    const { token } = data;
    localStorage.setItem('token', token);
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
  const {
    userLogin: { userInfo },
  } = getState();

  {
    userInfo &&
      (userInfo.user.role === 'admin' || userInfo.user.role === 'seller') &&
      history.push('/dashboard');
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_REGISTER_RESET });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: USER_UPDATE_RESET });
  dispatch({ type: USER_UPDATE_PASSWORD_RESET });
  history.push('/');
};

export const register = (name, email, password, passwordConfirm) => async (
  dispatch,
) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const { data } = await axios.post('/users/signup', {
      name,
      email,
      password,
      passwordConfirm,
    });

    console.log(data);

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    const { token } = data;
    localStorage.setItem('token', token);
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
