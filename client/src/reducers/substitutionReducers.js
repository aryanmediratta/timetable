import { SUB_TYPE } from '../actions/substitution.actions';

const initialState = {
  date: new Date(),
  absentList: [],
};

export default function substitutionReducer(state = initialState, action) {
  switch (action.type) {
  case SUB_TYPE.SET_DATE:
    return {
      ...state,
      date: action.payload,
    };
  case SUB_TYPE.SET_ABSENT_LIST:
    return {
      ...state,
      absentList: action.payload,
    };
  default:
    return state;
  }
}
