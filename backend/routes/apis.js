const express = require('express');
const router = express.Router();

const { signup, signin } = require('../controllers/auth');
const { addTeacher, fetchTeachers } = require('../controllers/teachers');
const { generateNewTimetable, saveTimetable, fetchTimetable, getSuggestions } = require('../controllers/timetables');
const { addClasses, getAllClasses, updateClasses } = require('../controllers/classes');
const { createNewSubstitution } = require('../controllers/substitutions');

// APIs related to Authentication.
router.post('/signup', signup);
router.post('/signin', signin);

// APIs related to Teachers.
router.get('/get_all_teachers', fetchTeachers);
router.post('/add_teacher', addTeacher);

// APIs related to Classes.
router.post('/add_new_class', addClasses);
router.get('/get_all_classes', getAllClasses);
router.put('/update_classes', updateClasses);

// APIs related to Timetables.
router.get('/generate_timetable', generateNewTimetable);
router.post('/save_timeable', saveTimetable)
router.get('/get_saved_timetable', fetchTimetable);
router.get('/get_suggestions', getSuggestions)

//APIs related to Substitution
router.post('/create_new_substitution', createNewSubstitution);

module.exports = router;
