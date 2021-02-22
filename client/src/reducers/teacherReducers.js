import { TEACHER_TYPES } from '../actions/teacher.types';

const initialState = {
  teachersList: [],
  allTeachersForTable: [],
  showModal: false,
  showPopup: false,
  success: false,
  errorMessage: '',
  newTeacher: {
    name: '',
    subject: '',
    classesList: [],
  },
};

export default function teacherReducer(state = initialState, action) {
  switch (action.type) {
  case TEACHER_TYPES.SET_ALL_TEACHERS:
    return {
      ...state,
      teachersList: action.payload,
    };
  case TEACHER_TYPES.SET_TEACHERS_FOR_TABLE:
    return {
      ...state,
      allTeachersForTable: action.payload,
    };
  case TEACHER_TYPES.TOGGLE_TEACHER_MODAL:
    return {
      ...state,
      showModal: !state.showModal,
      newTeacher: action.payload,
    };
  case TEACHER_TYPES.SET_FIELD_DATA_FOR_TEACHER:
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
  case TEACHER_TYPES.TOGGLE_TEACHER_POPUP:
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
  case TEACHER_TYPES.UPDATE_EXISTING_TEACHER:
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
  case TEACHER_TYPES.CLEAR_STATE:
    return initialState;
  default:
    return state;
  }
}
