import { CLASSES_TYPE } from '../actions/classes.types';

const initialState = {
  classesList: [],
  classesForDropdown: [],
  updateData: false,
};

export default function classesReducer(state = initialState, action) {
  switch (action.type) {
  case CLASSES_TYPE.SET_FIELD_DATA_FOR_CLASS:
    return {
      ...state,
      classesForDropdown: action.payload,
    };
  case CLASSES_TYPE.ADD_NEW_CLASSES:
    return {
      ...state,
      classesList: action.payload,
      updateData: true,
    };

  case CLASSES_TYPE.SET_ALL_CLASSES:
    return {
      ...state,
      classesList: action.payload,
      updateData: true,
    };
  case CLASSES_TYPE.CLEAR_STATE:
    return initialState;
  default:
    return state;
  }
}
