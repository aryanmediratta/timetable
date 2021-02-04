import { post, get, constructURL } from '../utils';
import { TEACHER_TYPES } from './teacher.actions';

// Toggle Error Popup
export const toggleErrorPopup = (message) => ({
  type: TEACHER_TYPES.TOGGLE_POPUP,
  payload: message,
  success: false,
});

// Toggle Error Popup
export const toggleTeacherModal = (payload) => ({
  type: TEACHER_TYPES.TOGGLE_TEACHER_MODAL,
  payload,
});

export const addNewTeacher = (userData) => (dispatch) => {
  post('/api/add_teacher', userData)
    .then((res) => res.json())
    .then((res) => {
      if (res.success === true) {
        if (res.updated === true) {
          dispatch({
            type: TEACHER_TYPES.UPDATE_EXISTING_TEACHER,
            payload: res.newTeacher,
          });
        } else {
          dispatch({
            type: TEACHER_TYPES.ADD_NEW_TEACHER,
            payload: res.newTeacher,
          });
        }
        dispatch({
          type: TEACHER_TYPES.TOGGLE_TEACHER_MODAL,
          payload: {},
        });
        dispatch({
          type: TEACHER_TYPES.TOGGLE_POPUP,
          payload: res.message,
          success: res.success,
        });
      } else {
        dispatch({
          type: TEACHER_TYPES.TOGGLE_POPUP,
          payload: res.message,
          success: res.success,
        });
      }
    })
    .catch(() => null);
};

export const getAllTeachers = (email) => (dispatch) => {
  const URL = constructURL('/api/get_all_teachers', { email });
  get(URL)
    .then((res) => {
      dispatch({
        type: TEACHER_TYPES.SET_ALL_TEACHERS,
        payload: res.teachers,
      });
    })
    .catch(() => null);
};
