import { CLASSES_TYPE } from './classes.types';

import {
  post, get, constructURL, put,
} from '../utils';
import { logoutUser } from './authActions';
import { openErrorsPopup } from './errorActions';

export const setClassesData = (classesForDropdown) => ({
  type: CLASSES_TYPE.SET_FIELD_DATA_FOR_CLASS,
  payload: classesForDropdown,
});

export const addNewClasses = (classesData) => (dispatch) => {
  post('/api/add_new_class', classesData)
    .then((response) => {
      if (response.status === 401) {
        dispatch(logoutUser());
      }
      return response.json();
    })
    .then((res) => {
      if (res.success === true) {
        dispatch({
          type: CLASSES_TYPE.ADD_NEW_CLASSES,
          payload: res.classes,
        });
        dispatch(openErrorsPopup(res));
      } else {
        dispatch(openErrorsPopup(res));
      }
    })
    .catch(() => null);
};

export const getAllClasses = (email) => (dispatch) => {
  const URL = constructURL('/api/get_all_classes', { email });
  get(URL)
    .then((response) => {
      if (response.status === 401) {
        dispatch(logoutUser());
      }
      return response.json();
    })
    .then((res) => {
      dispatch({
        type: CLASSES_TYPE.SET_ALL_CLASSES,
        payload: res.allClasses,
      });
      dispatch({
        type: CLASSES_TYPE.SET_FIELD_DATA_FOR_CLASS,
        payload: res.numSectionsPerClass,
      });
      dispatch(openErrorsPopup(res));
    });
};

export const updateClasses = (classesData) => (dispatch) => {
  put('/api/update_classes', classesData)
    .then((response) => {
      if (response.status === 401) {
        dispatch(logoutUser());
      }
      return response.json();
    })
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
        dispatch(openErrorsPopup(res));
      }
    })
    .catch(() => null);
};
