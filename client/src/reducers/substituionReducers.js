import { SUB_TYPE } from '../actions/substitution.actions';

const initialState = {
  subDate: Date(),
};

export default function substitutionReducer(state = initialState, action) {
  switch (action.type) {
  case SUB_TYPE.SET_DATE:
    return {
      ...state,
      subDate: action.payload,
    };
  default:
    return state;
  }
}
