import {
  SET_ALL_TEACHERS, ADD_NEW_TEACHER, ADD_NEW_CLASSES, SET_ALL_CLASSES, UPDATE_EXISTING_TEACHER,
} from '../actions/types';

const initialState = {
  teachersList: [],
  classesList: [],
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
      classesList: [...state.classesList, action.payload],
    };
  case SET_ALL_CLASSES:
    return {
      ...state,
      classesList: [...action.payload],
    };
  case UPDATE_EXISTING_TEACHER:
    const { teachersList } = state;
    const updatedTeachersList = [];
    teachersList.forEach((teacher) => {
      if (teacher._id !== action.payload._id) {
        updatedTeachersList.push(teacher);
      } else {
        updatedTeachersList.push(action.payload);
      }
    });
    return {
      ...state,
      teachersList: [...updatedTeachersList],
    };
  default:
    return state;
  }
}
