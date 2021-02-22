import { TIMETABLE_TYPES } from '../actions/timetable.types';
import { allEntityTypes } from '../components/utils';

const selectedEntityId = {
  entityNumber: '',
  periodNumber: '',
  entityId: '',
  label: '',
};

const initialState = {
  schoolTimetable: [],
  filteredEntityIds: [],
  timetable: [],
  numPeriods: '',
  entityId: '',
  entityType: allEntityTypes[0],
  loading: false,
  showPopup: false,
  success: false,
  errorMessage: '',
  showEditTimetableModal: false,
  ...selectedEntityId,
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
  case TIMETABLE_TYPES.POPULATE_ENTITY_IDS:
    return {
      ...state,
      filteredEntityIds: action.payload,
    };
  case TIMETABLE_TYPES.SET_ENTITY_ID:
    return {
      ...state,
      entityId: action.payload,
    };
  case TIMETABLE_TYPES.TOGGLE_EDIT_TIMETABLE_MODAL:
    return {
      ...state,
      showEditTimetableModal: Boolean(action.payload),
      selectedEntityId: action.payload,
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
  case TIMETABLE_TYPES.TOGGLE_TIMETABLE_POPUP:
    if (action.payload === null) {
      return {
        ...state,
        showPopup: false,
        errorMessage: '',
        success: false,
      };
    }
    return {
      ...state,
      showPopup: true,
      errorMessage: action.payload,
      success: action.success,
    };
  case TIMETABLE_TYPES.CLEAR_STATE:
    return initialState;
  default:
    return state;
  }
}
