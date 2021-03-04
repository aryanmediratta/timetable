/* eslint-disable camelcase */
/* eslint-disable no-undef */
import jwt_decode from 'jwt-decode';

import { AUTH_TYPES } from './auth.types';
import { TEACHER_TYPES } from './teacher.types';
import { CLASSES_TYPE } from './classes.types';
import { TIMETABLE_TYPES } from './timetable.types';
import { post } from '../utils';
import { openErrorsPopup } from './errorActions';

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

// Set user name
export const setUserName = (name) => ({
  type: AUTH_TYPES.SET_USER_NAME,
  payload: name,
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
        // Set token to Auth header
        localStorage.setItem('jwtToken', token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // Set current user
        dispatch(setCurrentUser(decoded));
      } else {
        dispatch(openErrorsPopup(res));
      }
    });
};

// Login - get user token
export const loginUser = (userData) => async (dispatch) => {
  const req = await post('/api/signin', userData);
  const statusCode = req.status;
  const res = await req.json();
  if (statusCode === 200) {
    if (res.success === true) {
      const { token } = res;
      // Set token to Auth header
      localStorage.setItem('jwtToken', token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
      dispatch(setSchoolName(res.user.schoolName));
      dispatch(setUserName(res.userName));
    } else {
      dispatch(openErrorsPopup(res));
    }
  }
};

export const setNewPass = (passData) => async (dispatch) => {
  const req = await post('/api/change_password', passData);
  const statusCode = req.status;
  const res = await req.json();
  if (statusCode === 200) {
    if (res.success === true) {
      console.log(res);
    } else {
      dispatch(openErrorsPopup(res));
    }
  }
};
