import {
  SET_ALL_CLASSES,
} from '../actions/types';

import { TEACHER_TYPES } from '../actions/teacher.actions';

const initialState = {
  teachersList: [],
  showModal: false,
  newTeacher: {
    name: '',
    subject: '',
    classesList: [],
  },
  classesList: [],
  timetable: [],
};

export default function teacherReducer(state = initialState, action) {
  switch (action.type) {
  case TEACHER_TYPES.SET_ALL_TEACHERS:
    return {
      ...state,
      teachersList: action.payload,
    };
  case TEACHER_TYPES.TOGGLE_TEACHER_POPUP:
    return {
      ...state,
      showModal: !state.showModal,
      newTeacher: action.payload,
    };
  case TEACHER_TYPES.SET_FIELD_DATA:
    return {
      ...state,
      teachersList: state.teachersList,
      newTeacher: {
        ...state.newTeacher,
        ...action.payload,
      },
    };
  case TEACHER_TYPES.ADD_NEW_TEACHER:
    return {
      ...state,
      teachersList: [...state.teachersList, action.payload],
    };
  // case SET_TIMETABLE:
  //   return {
  //     ...state,
  //     timetable: action.payload,
  //   };
  // case ADD_NEW_CLASSES:
  //   return {
  //     ...state,
  //     classesList: [...state.classesList, action.payload],
  //   };
  case SET_ALL_CLASSES:
    return {
      ...state,
      classesList: [...action.payload],
    };
  // case UPDATE_EXISTING_TEACHER:
  //   const { teachersList } = state;
  //   const updatedTeachersList = [];
  //   teachersList.forEach((teacher) => {
  //     if (teacher._id !== action.payload._id) {
  //       updatedTeachersList.push(teacher);
  //     } else {
  //       updatedTeachersList.push(action.payload);
  //     }
  //   });
  //   return {
  //     ...state,
  //     teachersList: [...updatedTeachersList],
  //   };
  default:
    return state;
  }
}
