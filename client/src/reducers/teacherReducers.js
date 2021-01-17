import { SET_ALL_TEACHERS, ADD_NEW_TEACHER, ADD_NEW_CLASSES } from '../actions/types';

const initialState = {
  teachersList: [],
  classList: [],
};

export default function teacherReducer(state = initialState, action) {
  switch (action.type) {
  case SET_ALL_TEACHERS:
    return {
      ...state,
      teachersList: action.payload,
    };
  case ADD_NEW_TEACHER:
    return {
      ...state,
      teachersList: [...state.teachersList, action.payload],
    };
    // Modify this
  case ADD_NEW_CLASSES:
    return {
      ...state,
      classList,
    };
  default:
    return state;
  }
}
