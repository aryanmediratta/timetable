import { get, constructURL, post } from '../utils';
import { TIMETABLE_TYPES } from './timetable.actions';
import { getSpecificTimetable } from '../components/utils';

// Set Num Periods
export const setNumPeriods = (num) => ({
  type: TIMETABLE_TYPES.SET_NUM_PERIODS,
  payload: num,
});

// Set Local Timetable
export const setTimetable = (timetable) => ({
  type: TIMETABLE_TYPES.SET_TIMETABLE,
  payload: timetable,
});

// Set Entity Type
export const setEntityType = (option) => ({
  type: TIMETABLE_TYPES.SET_ENTITY_TYPE,
  payload: option,
});

// Set Entity ID
export const setEntityId = (option) => ({
  type: TIMETABLE_TYPES.SET_ENTITY_ID,
  payload: option,
});

// Set/Unset Errors
export const toggleErrorPopup = (message) => ({
  type: TIMETABLE_TYPES.TOGGLE_POPUP,
  payload: message,
});

// Populate Entity ID Dropdown & setting entity ID
export const populateEntityIdDropdown = (allEntities) => (dispatch) => {
  dispatch({
    type: TIMETABLE_TYPES.POPULATE_ENTITY_IDS,
    payload: allEntities,
  });
  // if (allEntities && allEntities.length > 0) {
  //   dispatch({
  //     type: TIMETABLE_TYPES.SET_ENTITY_ID,
  //     payload: allEntities[0],
  //   });
  // }
};

export const generateNewTimetable = (timetableData) => (dispatch) => {
  const {
    email, numPeriods, entityId,
  } = timetableData;
  const URL = constructURL('/api/generate_timetable', {
    email, numPeriods,
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
          success: res.success,
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
          success: res.success,
        });
      } else {
        dispatch({
          type: TIMETABLE_TYPES.TOGGLE_POPUP,
          payload: res.message,
        });
      }
    })
    .catch(() => null);
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
        dispatch({
          type: TIMETABLE_TYPES.SET_NUM_PERIODS,
          payload: res.numPeriods,
        });
      }
    });
};
