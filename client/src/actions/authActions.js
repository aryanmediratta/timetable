/* eslint-disable camelcase */
/* eslint-disable no-undef */
import jwt_decode from 'jwt-decode';

import { AUTH_TYPES } from './auth.actions';
import { TEACHER_TYPES } from './teacher.actions';
import { CLASSES_TYPE } from './classes.actions';
import { TIMETABLE_TYPES } from './timetable.actions';
import { post } from '../utils';

// Toggle Error Popup
export const toggleErrorPopup = (message) => ({
  type: AUTH_TYPES.TOGGLE_POPUP,
  payload: message,
  success: false,
});

// Setting Login Fields
export const setLoginField = (data) => ({
  type: AUTH_TYPES.SET_LOGIN_FIELD,
  payload: data,
});

// Setting Register Fields
export const setRegisterField = (data) => ({
  type: AUTH_TYPES.SET_REGISTER_FIELD,
  payload: data,
});

// Set School Name
export const setSchoolName = (name) => ({
  type: AUTH_TYPES.SET_SCHOOL_NAME,
  payload: name,
});

// Toggle between different pages of register form
export const toggleRegisterForm = () => ({
  type: AUTH_TYPES.TOGGLE_REGISTER_FORM,
  payload: null,
});

// Set logged in user
export const setCurrentUser = (decoded) => ({
  type: AUTH_TYPES.SET_CURRENT_USER,
  payload: decoded,
});

// Log user out
export const logoutUser = () => (dispatch) => {
  // setAuthToken(false);
  localStorage.removeItem('jwtToken');
  dispatch({
    type: AUTH_TYPES.UNSET_CURRENT_USER,
    payload: null,
  });
  dispatch({
    type: TEACHER_TYPES.CLEAR_STATE,
    payload: null,
  });
  dispatch({
    type: CLASSES_TYPE.CLEAR_STATE,
    payload: null,
  });
  dispatch({
    type: TIMETABLE_TYPES.CLEAR_STATE,
    payload: null,
  });
};

// Register User
export const registerUser = (userData) => (dispatch) => {
  post('/api/signup', userData)
    .then((res) => res.json())
    .then((res) => {
      if (res.success === true) {
        const { token } = res;
        // Set token to Auth header
        // setAuthToken(token);
        localStorage.setItem('jwtToken', token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // Set current user
        dispatch(setCurrentUser(decoded));
      } else {
        dispatch({
          type: AUTH_TYPES.TOGGLE_POPUP,
          payload: res.message,
          success: false,
        });
      }
    });
};

// Login - get user token
export const loginUser = (userData) => async (dispatch) => {
  const req = await post('/api/signin', userData);
  const statusCode = req.status;
  const res = await req.json();
  if (statusCode !== 200) {
    dispatch({
      type: AUTH_TYPES.TOGGLE_POPUP,
      payload: res.errors,
    });
  } else if (statusCode === 200) {
    if (res.success === true) {
      const { token } = res;
      // Set token to Auth header
      // setAuthToken(token);
      localStorage.setItem('jwtToken', token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      // eslint-disable-next-line no-use-before-define
      dispatch(setCurrentUser(decoded));
    } else {
      dispatch({
        type: AUTH_TYPES.TOGGLE_POPUP,
        payload: res.message,
        success: false,
      });
    }
  }
};
