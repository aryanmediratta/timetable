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
  showEditTimetableModal: false,
  suggestions: [],
  suggestionsFound: true,
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
  case TIMETABLE_TYPES.SET_SUGGESTIONS:
    return {
      ...state,
      suggestions: action.payload,
      suggestionsFound: action.payload.length > 0,
    };
  case TIMETABLE_TYPES.RESET_SUGGESTIONS:
    return {
      ...state,
      suggestionsFound: true,
      suggestions: [],
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
  case TIMETABLE_TYPES.CLEAR_STATE:
    return initialState;
  default:
    return state;
  }
}
