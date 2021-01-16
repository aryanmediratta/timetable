const Teacher = require('../models/Teachers');

addTeacher = (req, res, next) => {
    let { newTeacher, email } = req.body;
    console.log('BODY', req.body);
    console.log('newTeacher', newTeacher);
    console.log('email', email);
    const teacher = new Teacher({
        teacherName: newTeacher.name,
        userEmail: email,
        teacherSubject: newTeacher.subject,
        classesTaught: newTeacher.classesList,
    });
    teacher.save()
        .then(response => {
            res.status(200).json({
                success: true,
                newTeacher: response,
                message: 'Save Successful'
            });
        })
        .catch(err => {
            res.status(200).json({
                success: false,
                response: err,
                message: 'Save Unsuccessful'
            });
        })
}

fetchTeachers = (req, res, next) => {
    const url = new URL(`https://anyrandomwebsite.com/${req.originalUrl}`);
    const email = url.searchParams.get('email');
    Teacher.find({ userEmail: email })
        .then(data => {
            res.status(200).json({
                success: true,
                teachers: data,
            });
        })
        .catch(err => {
            res.status(500).json({
                errors: [{ error: err }]
            });
        });
}

module.exports = {
    addTeacher,
    fetchTeachers,
};
