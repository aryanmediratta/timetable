import { combineReducers } from 'redux';

import authReducer from './authReducers';
import teacherReducer from './teacherReducers';
import classesReducer from './classesReducers';
import timetableReducer from './timetableReducers';
import substitutionReducer from './substitutionReducers';

export default combineReducers({
  auth: authReducer,
  teachers: teacherReducer,
  classes: classesReducer,
  timetables: timetableReducer,
  substitution: substitutionReducer,
});
