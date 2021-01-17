import { GET_ERRORS, SET_RANDOM_ERRORS } from '../actions/types';

const initialState = {
  message: '',
  otherErrors: {},
};

export default function errorReducer(state = initialState, action) {
  switch (action.type) {
  case GET_ERRORS:
    return {
      ...state,
      message: action.payload,
    };
  case SET_RANDOM_ERRORS:
    return {
      ...state,
      otherErrors: action.payload,
    };
  default:
    return state;
  }
}
