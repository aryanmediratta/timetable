import { get, constructURL, post } from '../utils';
import { TIMETABLE_TYPES } from './timetable.actions';
import { getSpecificTimetable } from '../components/utils';

export const generateNewTimetable = (timetableData) => (dispatch) => {
  const {
    email, teachersList, classesList, numPeriods, entityId,
  } = timetableData;
  const numClasses = classesList.length;
  const numTeachers = teachersList.length;
  const URL = constructURL('/api/generate_timetable', {
    email, numClasses, numTeachers, numPeriods,
  });
  dispatch({
    type: TIMETABLE_TYPES.TOGGLE_LOADING,
    payload: true,
  });
  get(URL)
    .then((res) => {
      if (res.success === true) {
        dispatch({
          type: TIMETABLE_TYPES.SET_SCHOOL_TIMETABLE,
          payload: res.timetable,
        });
        const timetable = getSpecificTimetable(res.timetable, entityId.value, numPeriods);
        dispatch({
          type: TIMETABLE_TYPES.SET_TIMETABLE,
          payload: timetable,
        });
      } else {
        dispatch({
          type: TIMETABLE_TYPES.TOGGLE_POPUP,
          payload: res.message,
        });
      }
    })
    .finally(() => dispatch({
      type: TIMETABLE_TYPES.TOGGLE_LOADING,
      payload: null,
    }));
};

export const saveTimetable = (timetableData) => (dispatch) => {
  post('/api/save_timeable', timetableData)
    .then((res) => res.json())
    .then((res) => {
      if (res.success === true) {
        dispatch({
          type: TIMETABLE_TYPES.TOGGLE_POPUP,
          payload: res.message,
        });
      } else {
        dispatch({
          type: TIMETABLE_TYPES.TOGGLE_POPUP,
          payload: res.message,
        });
      }
    })
    .catch((res) => {
      dispatch({
        type: TIMETABLE_TYPES.TOGGLE_POPUP,
        payload: res.message,
      });
    });
};

export const getTimetable = (email) => (dispatch) => {
  const URL = constructURL('/api/get_saved_timetable', { email });
  get(URL)
    .then((res) => {
      if (res.success === true) {
        dispatch({
          type: TIMETABLE_TYPES.SET_SCHOOL_TIMETABLE,
          payload: res.schoolTimetable,
        });
      }
    });
};
