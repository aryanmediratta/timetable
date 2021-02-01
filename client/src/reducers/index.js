import { combineReducers } from 'redux';

import authReducer from './authReducers';
import teacherReducer from './teacherReducers';

export default combineReducers({
  auth: authReducer,
  teachers: teacherReducer,
});
