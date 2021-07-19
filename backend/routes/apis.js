const express = require('express');
const router = express.Router();

const { verifyToken } = require('../utils/auth');
const { signup, signin, changePassword, forgotPassword, resetLinkValid, resetPassword } = require('../controllers/auth');
const { addTeacher, fetchTeachers } = require('../controllers/teachers');
// const { generateNewTimetable, saveTimetable, fetchTimetable, getSuggestions } = require('../controllers/timetables');
const { addClasses, getAllClasses, updateClasses } = require('../controllers/classes');
const { createNewSubstitution, fetchSubstitution, generateSubstitutions } = require('../controllers/substitutions');

// APIs related to Authentication.
router.post('/signup', signup);
router.post('/signin', signin);
router.post('/forgot_password', forgotPassword);
router.post('/change_password', verifyToken, changePassword);
router.get('/reset_link_valid', resetLinkValid);
router.put('/reset_password', resetPassword);

// APIs related to Teachers.
router.get('/get_all_teachers', verifyToken, fetchTeachers);
router.post('/add_teacher', verifyToken, addTeacher);

// APIs related to Classes.
router.post('/add_new_class', verifyToken, addClasses);
router.get('/get_all_classes', verifyToken, getAllClasses);
router.put('/update_classes', verifyToken, updateClasses);

// APIs related to Timetables.
// router.get('/generate_timetable', verifyToken, generateNewTimetable);
// router.post('/save_timeable', verifyToken, saveTimetable);
// router.get('/get_saved_timetable', verifyToken, fetchTimetable);
// router.get('/get_suggestions', verifyToken, getSuggestions);

//APIs related to Substitution
router.post('/create_new_substitution', verifyToken, createNewSubstitution);
router.get('/get_substitutions', verifyToken, fetchSubstitution);
router.get('/generate_substitutions', verifyToken, generateSubstitutions);

module.exports = router;
