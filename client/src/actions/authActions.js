import jwt_decode from 'jwt-decode';

import {
    GET_ERRORS,
    SET_CURRENT_USER,
    UNSET_CURRENT_USER,
    SET_RANDOM_ERRORS,
} from './types';

import { post } from '../utils';

// Register User
export const registerUser = (userData, history) => dispatch => {
    post('/api/signup', userData)
        .then(res => res.json())
        .then(res => {
            if (res.success === true) {
                const { token } = res;
                // Set token to Auth header
                // setAuthToken(token);
                localStorage.setItem('jwtToken',token);
                // Decode token to get user data
                const decoded = jwt_decode(token);
                // Set current user
                dispatch(setCurrentUser(decoded));
                history.push('/classes');
            } else {
                dispatch({
                    type: GET_ERRORS,
                    payload: res.message,
                })
            }
        })
        .catch(err =>
            dispatch({
                type: SET_RANDOM_ERRORS,
                payload: err,
            })
        );
};


// Login - get user token
export const loginUser = (userData) => async (dispatch) => {
  const req = await post('/api/signin', userData);
  const statusCode = req.status;
  const res = await req.json();
  if (statusCode !== 200) {
    dispatch({
      type: SET_RANDOM_ERRORS,
      payload: res.errors,
    })
  } else if (statusCode === 200) {
    if (res.success === true) {
      const { token } = res;
      // Set token to Auth header
      // setAuthToken(token);
      localStorage.setItem('jwtToken',token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));  
    } else {
      dispatch({
        type: GET_ERRORS,
        payload: res.message,
      });
    }
  }
};


// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

// Log user out
export const logoutUser = () => dispatch => {
    // setAuthToken(false);
    localStorage.removeItem('jwtToken');
    dispatch({
        type: UNSET_CURRENT_USER,
        payload: null,
    });
};
