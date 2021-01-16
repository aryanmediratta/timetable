import jwt_decode from 'jwt-decode';

import {
    GET_ERRORS,
    SET_CURRENT_USER,
    UNSET_CURRENT_USER,
} from './types';

import { post } from '../utils';

// Register User
export const registerUser = (userData, history) => dispatch => {
    post('/api/signup', userData)
        .then(_res => history.push('/login')) // re-direct to login on successful register
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            })
        );
};


// Login - get user token
export const loginUser = (userData) => async (dispatch) => {
    const req = await post('/api/signin', userData);
    const statusCode = req.status;
    const res = await req.json();
    if (statusCode === 422 || statusCode === 404 || statusCode === 400 || statusCode === 500) {
        dispatch({
            type: GET_ERRORS,
            payload: res.errors,
        })
    } else if (statusCode === 200) {
        const { token } = res;
            // Set token to Auth header
            // setAuthToken(token);
            // localStorage.setItem('jwtToken',token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setCurrentUser(decoded));
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
    dispatch({
        type: UNSET_CURRENT_USER,
        payload: null,
    });
};
