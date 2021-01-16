const express = require('express');
const router = express.Router();

const { signup, signin } = require('../controllers/auth');
const { addTeacher, fetchTeachers, addClasses } = require('../controllers/teachers');

router.post('/add_teacher', addTeacher);
router.get('/get_all_teachers', fetchTeachers);
router.post('/signup', signup);
router.post('/signin', signin);
router.post('/add_new_class', addClasses);

module.exports = router;
