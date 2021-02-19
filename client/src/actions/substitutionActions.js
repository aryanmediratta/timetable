import { SUB_TYPE } from './substitution.actions';

import { post } from '../utils';

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

// export default createNewSub;
