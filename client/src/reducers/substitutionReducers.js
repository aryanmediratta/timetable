import { SUB_TYPE } from '../actions/substitution.actions';

const initialState = {
  date: new Date(),
  absentList: [],
  _id: '',
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
  case SUB_TYPE.SET_SUB_ID:
    return {
      ...state,
      _id: action.payload,
    };
  default:
    return state;
  }
}
