import {
  SET_ALL_TEACHERS,
  ADD_NEW_TEACHER,
  ADD_NEW_CLASSES,
  GET_ALL_CLASSES,
} from '../actions/types';

const initialState = {
  teachersList: [],
  classList: [],
  sectionList: [],
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
  case GET_ALL_CLASSES:
    return {
      ...state,
      sectionList: action.payload,
    };
  default:
    return state;
  }
}
