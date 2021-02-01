import {
  ADD_NEW_CLASSES,
  SET_ALL_CLASSES,
} from './types';

import { post, get, constructURL } from '../utils';
import { TEACHER_TYPES } from './teacher.actions';

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
          type: TEACHER_TYPES.TOGGLE_TEACHER_POPUP,
          payload: {},
        });
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: res.message,
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: SET_RANDOM_ERRORS,
        payload: err,
      });
    });
};

export const getAllTeachers = (email) => (dispatch) => {
  const URL = constructURL('/api/get_all_teachers', { email });
  get(URL)
    .then((res) => {
      dispatch({
        type: TEACHER_TYPES.SET_ALL_TEACHERS,
        payload: res.teachers,
      });
    });
};

export const addNewClasses = (classesData) => (dispatch) => {
  post('/api/add_new_class', classesData)
    .then((res) => res.json())
    .then((res) => {
      dispatch({
        type: ADD_NEW_CLASSES,
        payload: res.classes,
      });
    })
    .catch((res) => {
      dispatch({
        type: GET_ERRORS,
        payload: res.newTeacher,
      });
    });
};

export const getAllClasses = (email) => (dispatch) => {
  const URL = constructURL('/api/get_all_classes', { email });
  get(URL)
    .then((res) => {
      dispatch({
        type: SET_ALL_CLASSES,
        payload: res.classes,
      });
    });
};
