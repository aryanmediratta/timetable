const express = require('express');
const router = express.Router();

const { signup, signin } = require('../controllers/auth');
const { addTeacher, fetchTeachers, addClasses, postAllClasses, getAllClasses } = require('../controllers/teachers');

// APIs related to Authentication.
router.post('/signup', signup);
router.post('/signin', signin);

// APIs related to Teachers.
router.get('/get_all_teachers', fetchTeachers);
router.post('/add_teacher', addTeacher);

// APIs related to Classes.
router.post('/add_new_class', addClasses);
router.post('/post_all_classes', postAllClasses);
router.get('/get_all_classes', getAllClasses);

module.exports = router;
