import { SUB_TYPE } from './substitution.actions';

import { get, post, constructURL } from '../utils';

export const setSubDate = (date) => (dispatch) => {
  dispatch({
    type: SUB_TYPE.SET_DATE,
    payload: date,
  });
};

export const setSubId = (_id) => ({
  type: SUB_TYPE.SET_SUB_ID,
  payload: _id,
});

export const createNewSub = (data) => (dispatch) => {
  post('/api/create_new_substitution/', data)
    .then((res) => res.json())
    .then((res) => {
      dispatch(setSubId(res._id));
    });
};

export const getSubstitutions = (email, date) => (dispatch) => {
  const URL = constructURL('/api/get_substitutions', { email, date });
  dispatch({
    type: SUB_TYPE.SET_SUB_ID,
    payload: null,
  });
  get(URL)
    .then((res) => {
      dispatch({
        type: SUB_TYPE.SET_ABSENT_LIST,
        payload: res.absentList,
      });
      dispatch({
        type: SUB_TYPE.SET_SUB_ID,
        payload: res._id,
      });
    });
};
