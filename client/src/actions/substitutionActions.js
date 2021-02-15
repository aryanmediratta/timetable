import { SUB_TYPE } from './substitution.actions';

const setSubDate = (date) => ({
  type: SUB_TYPE.SET_DATE,
  payload: date,
});

export default setSubDate;
