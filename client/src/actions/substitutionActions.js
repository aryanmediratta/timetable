import { SUB_TYPE } from './substitution.actions';

import { get, post, constructURL } from '../utils';

export const createNewSub = (data) => (dispatch) => {
  post('/api/create_new_substitution/', data)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    });
};

export const setSubDate = (date) => (dispatch) => {
  dispatch({
    type: SUB_TYPE.SET_DATE,
    payload: date,
  });
};

export const getSubstitutions = (email, date) => (dispatch) => {
  const URL = constructURL('/api/get_substitutions', { email, date });
  get(URL)
    .then((res) => {
      console.log(res.absentList);
      dispatch({
        type: SUB_TYPE.SET_ABSENT_LIST,
        payload: res.absentList,
      });
    })
}
