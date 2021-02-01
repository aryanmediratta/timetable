const express = require('express');
const router = express.Router();

const { signup, signin } = require('../controllers/auth');
const { addTeacher, fetchTeachers } = require('../controllers/teachers');
const { generateNewTimetable } = require('../controllers/timetables');
const { addClasses, getAllClasses } = require('../controllers/classes');

// APIs related to Authentication.
router.post('/signup', signup);
router.post('/signin', signin);

// APIs related to Teachers.
router.get('/get_all_teachers', fetchTeachers);
router.post('/add_teacher', addTeacher);

// APIs related to Classes.
router.post('/add_new_class', addClasses);
router.get('/get_all_classes', getAllClasses);

// APIs related to Timetables.
router.get('/generate_timetable', generateNewTimetable);

module.exports = router;
