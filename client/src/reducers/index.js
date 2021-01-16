import { combineReducers } from 'redux';

import authReducer from './authReducers';
import errorReducer from './errorReducers';
import teacherReducer from './teacherReducers';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    teachers: teacherReducer,
});
