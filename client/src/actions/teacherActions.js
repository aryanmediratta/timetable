import { post, get, constructURL } from '../utils';
import { TEACHER_TYPES } from './teacher.types';
import { logoutUser } from './authActions';
import { openErrorsPopup } from './errorActions';

// Toggle Teacher Modal
export const toggleTeacherModal = (payload) => ({
  type: TEACHER_TYPES.TOGGLE_TEACHER_MODAL,
  payload,
});

// Sets table data.
export const setTableData = (teachersList) => (dispatch) => {
  const data = [];
  teachersList && teachersList.length > 0 && teachersList.forEach((teacher) => {
    const obj = {};
    obj.name = teacher.teacherName;
    obj.subject = teacher.teacherSubject;
    obj._id = teacher._id;
    obj.classesList = teacher.classesTaught;
    const classesForTeacher = [];
    let totalClasses = 0;
    teacher.classesTaught.forEach((classObject) => {
      classesForTeacher.push(classObject.label);
      totalClasses += classObject.periodsPerWeek && parseInt(classObject.periodsPerWeek, 10);
    });
    obj.allClassesTaught = classesForTeacher.join(', ');
    obj.classesPerWeek = totalClasses;
    data.push(obj);
  });
  dispatch({
    type: TEACHER_TYPES.SET_TEACHERS_FOR_TABLE,
    payload: data,
  });
};

export const addNewTeacher = (userData, teachersList) => (dispatch) => {
  post('/api/add_teacher', userData)
    .then((response) => {
      if (response.status === 401) {
        dispatch(logoutUser());
      }
      return response.json();
    })
    .then((res) => {
      if (res.success === true) {
        // Successfully updated teacher.
        if (res.updated === true) {
          const updatedTeachersList = [];
          teachersList.forEach((teacher) => {
            if (teacher._id !== res.newTeacher._id) {
              updatedTeachersList.push(teacher);
            } else {
              updatedTeachersList.push(res.newTeacher);
            }
          });
          dispatch(setTableData(updatedTeachersList));
          dispatch({
            type: TEACHER_TYPES.SET_ALL_TEACHERS,
            payload: updatedTeachersList,
          });
        // Successfully Created teacher.
        } else {
          teachersList = [...teachersList, res.newTeacher];
          dispatch(setTableData(teachersList));
          dispatch({
            type: TEACHER_TYPES.SET_ALL_TEACHERS,
            payload: teachersList,
          });
        }
        dispatch({
          type: TEACHER_TYPES.TOGGLE_TEACHER_MODAL,
          payload: {},
        });
        dispatch(openErrorsPopup(res));
      // Failed to perform Action
      } else {
        dispatch(openErrorsPopup(res));
      }
    })
    .catch(() => null);
};

export const getAllTeachers = (email) => (dispatch) => {
  const URL = constructURL('/api/get_all_teachers', { email });
  get(URL)
    .then((response) => {
      if (response.status === 401) {
        dispatch(logoutUser());
      }
      return response.json();
    })
    .then((res) => {
      dispatch({
        type: TEACHER_TYPES.SET_ALL_TEACHERS,
        payload: res.teachers,
      });
      dispatch(setTableData(res.teachers));
    })
    .catch(() => null);
};
