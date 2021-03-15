import { SUB_TYPE } from './substitution.actions';

import { get, post, constructURL } from '../utils';

import { openErrorsPopup } from './errorActions';
import { logoutUser } from './authActions';

export const setSubDate = (date) => (dispatch) => {
  dispatch({
    type: SUB_TYPE.SET_DATE,
    payload: date,
  });
};

export const setSubId = (_id) => ({
  type: SUB_TYPE.SET_SUB_ID,
  payload: _id,
});

export const createNewSub = (data) => (dispatch) => {
  post('/api/create_new_substitution/', data)
    .then((response) => {
      if (response.status === 401) {
        dispatch(logoutUser());
      }
      return response.json();
    })
    .then((res) => {
      if (res.success === true) {
        const update = {
          success: res.success,
          message: 'Absent List Updated. Please Create New Sub Chart.',
        };
        dispatch(openErrorsPopup(update));
        dispatch(setSubId(res._id));
      } else {
        dispatch(openErrorsPopup(res));
        dispatch(setSubId(res._id));
      }
    });
};

export const saveSubChart = (subData) => (dispatch) => {
  post('/api/create_new_substitution/', subData)
    .then((response) => {
      if (response.status === 401) {
        dispatch(logoutUser());
      }
      return response.json();
    })
    .then((res) => {
      if (res.success === true) {
        const update = {
          success: res.success,
          message: 'New Substitution Chart Created.',
        };
        dispatch(openErrorsPopup(update));
        dispatch(setSubId(res._id));
      } else {
        dispatch(openErrorsPopup(res));
        dispatch(setSubId(res._id));
      }
    });
};

export const getSubstitutions = (email, date) => (dispatch) => {
  const URL = constructURL('/api/get_substitutions', { email, date });
  dispatch({
    type: SUB_TYPE.SET_SUB_ID,
    payload: null,
  });
  dispatch({
    type: SUB_TYPE.SET_SUB_CHART,
    payload: [],
  });
  dispatch({
    type: SUB_TYPE.TOGGLE_LOADER,
    payload: true,
  });
  get(URL)
    .then((response) => {
      if (response.status === 401) {
        dispatch(logoutUser());
      }
      return response.json();
    })
    .then((res) => {
      dispatch(openErrorsPopup(res));
      dispatch({
        type: SUB_TYPE.SET_ABSENT_LIST,
        payload: res.absentList,
      });
      dispatch({
        type: SUB_TYPE.SET_SUB_ID,
        payload: res._id,
      });
      dispatch({
        type: SUB_TYPE.SET_SUB_CHART,
        payload: res.subChart,
      });
    })
    .finally(() => dispatch({
      type: SUB_TYPE.TOGGLE_LOADER,
      payload: null,
    }));
};

export const generateSubstitutions = (email, date) => (dispatch) => {
  const URL = constructURL('/api/generate_substitutions', { email, date });
  dispatch({
    type: SUB_TYPE.SET_SUB_CHART,
    payload: [],
  });
  dispatch({
    type: SUB_TYPE.TOGGLE_LOADER,
    payload: true,
  });
  get(URL)
    .then((response) => {
      if (response.status === 401) {
        dispatch(logoutUser());
      }
      return response.json();
    })
    .then((res) => {
      dispatch(openErrorsPopup(res));
      dispatch({
        type: SUB_TYPE.SET_SUB_CHART,
        payload: res.subChart,
      });
    })
    .finally(() => dispatch({
      type: SUB_TYPE.TOGGLE_LOADER,
      payload: null,
    }));
};
