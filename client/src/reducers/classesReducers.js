import { CLASSES_TYPE } from '../actions/classes.actions';

const initialState = {
  classesList: [],
  classesForDropdown: [],
  showPopup: false,
  success: false,
  errorMessage: '',
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
  case CLASSES_TYPE.TOGGLE_CLASS_POPUP:
    if (action.payload === null) {
      return {
        ...state,
        showPopup: false,
        errorMessage: '',
        success: false,
      };
    }
    return {
      ...state,
      showPopup: true,
      errorMessage: action.payload,
      success: action.success,
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
