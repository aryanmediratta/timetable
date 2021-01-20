import {
  GET_ERRORS,
  SET_ALL_TEACHERS,
  ADD_NEW_TEACHER,
  ADD_NEW_CLASSES,
  SET_ALL_CLASSES,
  UPDATE_EXISTING_TEACHER,
  SET_RANDOM_ERRORS,
} from './types';

import { post, get, constructURL } from '../utils';

export const addNewTeacher = (userData) => (dispatch) => {
  post('/api/add_teacher', userData)
    .then((res) => res.json())
    .then((res) => {
      if (res.success === true) {
        if (res.updated === true) {
          dispatch({
            type: UPDATE_EXISTING_TEACHER,
            payload: res.newTeacher,
          });
        } else {
          dispatch({
            type: ADD_NEW_TEACHER,
            payload: res.newTeacher,
          });
        }
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
        type: SET_ALL_TEACHERS,
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
