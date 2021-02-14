import { CLASSES_TYPE } from './classes.actions';

import {
  post, get, constructURL, put,
} from '../utils';

export const setClassesData = (classesForDropdown) => ({
  type: CLASSES_TYPE.SET_FIELD_DATA_FOR_CLASS,
  payload: classesForDropdown,
});

export const toggleErrorPopup = (message) => ({
  type: CLASSES_TYPE.TOGGLE_CLASS_POPUP,
  payload: message,
});

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
          type: CLASSES_TYPE.TOGGLE_CLASS_POPUP,
          payload: res.message,
          success: false,
        });
      }
    })
    .catch(() => null);
};

export const getAllClasses = (email) => (dispatch) => {
  const URL = constructURL('/api/get_all_classes', { email });
  get(URL)
    .then((res) => {
      dispatch({
        type: CLASSES_TYPE.SET_ALL_CLASSES,
        payload: res.allClasses,
      });
      dispatch({
        type: CLASSES_TYPE.SET_FIELD_DATA_FOR_CLASS,
        payload: res.numSectionsPerClass,
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
          payload: res.allClasses,
        });
        dispatch({
          type: CLASSES_TYPE.SET_FIELD_DATA_FOR_CLASS,
          payload: res.numSectionsPerClass,
        });
      } else {
        dispatch({
          type: CLASSES_TYPE.TOGGLE_CLASS_POPUP,
          payload: res.message,
          success: false,
        });
      }
    })
    .catch(() => null);
};
