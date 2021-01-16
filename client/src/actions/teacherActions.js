import {
    GET_ERRORS,
    SET_ALL_TEACHERS,
    ADD_NEW_TEACHER,
} from './types';

import { post, get, constructURL } from '../utils';

// Modify Teachers
export const addNewTeacher = (userData) => dispatch => {
    post('/api/add_teacher', userData)
        .then(res => res.json())
        .then(res => {
            console.log('res',res);
            if (res.success === true) {
                dispatch({
                    type: ADD_NEW_TEACHER,
                    payload: res.newTeacher,
                });    
            }
        })
};

export const getAllTeachers = (email) => dispatch => {
    const URL = constructURL('/api/get_all_teachers', {email: email});
    get(URL)
        .then(res => {
            console.log('res', res);
            dispatch({
                type: SET_ALL_TEACHERS,
                payload: res.teachers,
            });
        });
}
