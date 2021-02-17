import { SUB_TYPE } from './substitution.actions';

import { post } from '../utils';

const setSubDate = (data) => (dispatch) => {
  post('/api/substitution/', data)
    .then((res) => res.json())
    .then((res) => {
      dispatch({
        type: SUB_TYPE.SET_DATE,
        payload: res.data,
      });
    });
};

export default setSubDate;
