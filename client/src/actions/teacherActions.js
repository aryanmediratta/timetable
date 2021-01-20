import {
  GET_ERRORS,
  SET_ALL_TEACHERS,
  ADD_NEW_TEACHER,
  ADD_NEW_CLASSES,
  POST_CLASSES,
  GET_ALL_CLASSES,
} from './types';

import { post, get, constructURL } from '../utils';

// Modify Teachers
export const addNewTeacher = (userData) => (dispatch) => {
  post('/api/add_teacher', userData)
    .then((res) => res.json())
    .then((res) => {
      if (res.success === true) {
        dispatch({
          type: ADD_NEW_TEACHER,
          payload: res.newTeacher,
        });
      }
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

export const postClasses = (sectionData) => (dispatch) => {
  post('/api/post_all_classes', sectionData)
    .then((res) => res.json())
    .then((res) => {
      if (res.success === true) {
        dispatch({
          type: POST_CLASSES,
          payload: res.sections,
        });
      }
    });
}

export const getAllClasses = (email) => (dispatch) => {
  const URL = constructURL('/api/get_all_classes', { email });
  get(URL)
    .then((res) => {
      dispatch({
        type: GET_ALL_CLASSES,
        payload: res.classes,
      });
    });
};
