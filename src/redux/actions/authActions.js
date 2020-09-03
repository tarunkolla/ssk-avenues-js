import axios from 'axios';

import { returnErrors } from './errorActions';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from './types';

// Check for token and get user
const loadUser = () => (dispatch, getState) => {
  //dispatch, getState
  // user loading
  dispatch({ type: USER_LOADING });
  axios
    .get('/api/auth/user', tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    )
    .catch((error) => {
      dispatch(returnErrors(error.response?.data, error.response?.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

// Register User
const register = ({ firstName, lastName, email, password }) => (
  dispatch,
  getState
) => {
  const body = JSON.stringify({ firstName, lastName, email, password });

  axios
    .post('/api/auth/register', body, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((error) => {
      dispatch(
        returnErrors(
          error.response.data,
          error.response.status,
          'REGISTER_FAIL'
        )
      );
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

// Login User
const login = ({ email, password }) => (dispatch, getState) => {
  const body = JSON.stringify({ email, password });

  axios
    .post('/api/auth/login', body, tokenConfig(getState))
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch(
        returnErrors(error.response?.data, error.response?.status, 'LOGIN_FAIL')
      );
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

// Logout User
const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

// Setup headers and token
const tokenConfig = (getState) => {
  // Get token from localstorage (reboot, browser relaunch)
  const token = getState().auth.token;

  // Add headers to req
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};

export { loadUser, login, register, logout, tokenConfig };
