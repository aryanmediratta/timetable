import { CLASSES_TYPE } from './classes.actions';

import {
  post, get, constructURL, put,
} from '../utils';

export const addNewClasses = (classesData) => (dispatch) => {
  post('/api/add_new_class', classesData)
    .then((res) => res.json())
    .then((res) => {
      if (res.success === true) {
        dispatch({
          type: CLASSES_TYPE.ADD_NEW_CLASSES,
          payload: res.classes,
        });
      } else {
        dispatch({
          type: CLASSES_TYPE.TOGGLE_POPUP,
          payload: res.message,
        });
      }
    })
    .catch((res) => {
      dispatch({
        type: CLASSES_TYPE.TOGGLE_POPUP,
        payload: res.errors,
      });
    });
};

export const getAllClasses = (email) => (dispatch) => {
  const URL = constructURL('/api/get_all_classes', { email });
  get(URL)
    .then((res) => {
      dispatch({
        type: CLASSES_TYPE.SET_ALL_CLASSES,
        payload: res.classes,
      });
    });
};

export const updateClasses = (classesData) => (dispatch) => {
  put('/api/update_classes', classesData)
    .then((res) => res.json())
    .then((res) => {
      if (res.success === true) {
        dispatch({
          type: CLASSES_TYPE.ADD_NEW_CLASSES,
          payload: res.classes,
        });
      } else {
        dispatch({
          type: CLASSES_TYPE.TOGGLE_POPUP,
          payload: res.message,
        });
      }
    })
    .catch((res) => {
      dispatch({
        type: CLASSES_TYPE.TOGGLE_POPUP,
        payload: res.errors,
      });
    });
};
