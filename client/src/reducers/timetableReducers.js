import { TIMETABLE_TYPES } from '../actions/timetable.actions';

const initialState = {
  schoolTimetable: [],
  timetable: [],
  numPeriods: '',
  entityId: '',
  entityType: '',
  loading: false,
  showPopup: false,
  errorMessage: '',
};

export default function timetableReducer(state = initialState, action) {
  switch (action.type) {
  case TIMETABLE_TYPES.SET_SCHOOL_TIMETABLE:
    return {
      ...state,
      schoolTimetable: action.payload,
    };
  case TIMETABLE_TYPES.SET_TIMETABLE:
    return {
      ...state,
      timetable: action.payload,
    };
  case TIMETABLE_TYPES.SET_NUM_PERIODS:
    return {
      ...state,
      numPeriods: action.payload,
    };
  case TIMETABLE_TYPES.SET_ENTITY_TYPE:
    return {
      ...state,
      entityType: action.payload,
    };
  case TIMETABLE_TYPES.SET_ENTITY_ID:
    return {
      ...state,
      entityId: action.payload,
    };
  case TIMETABLE_TYPES.TOGGLE_LOADING:
    if (action.payload === null) {
      return {
        ...state,
        loading: false,
      };
    }
    return {
      ...state,
      loading: true,
      schoolTimetable: [],
      timetable: [],
    };
  case TIMETABLE_TYPES.TOGGLE_POPUP:
    if (action.payload === null) {
      return {
        ...state,
        showPopup: false,
        errorMessage: '',
      };
    }
    return {
      ...state,
      showPopup: true,
      errorMessage: action.payload,
    };
  case TIMETABLE_TYPES.CLEAR_STATE:
    return initialState;
  default:
    return state;
  }
}
