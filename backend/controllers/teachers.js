const Teacher = require('../models/Teachers');

addTeacher = (req, res, next) => {
  const { newTeacher, email } = req.body;
  let errors = [];
  if (!newTeacher.name) {
    errors.push('Teacher name is required');
  }
  if (!newTeacher.subject) {
    errors.push('Subject taught is required');
  }
  if (newTeacher.classesList.length === 0) {
    errors.push('Select atleast one class.');
  }
  if (errors.length > 0) {
    return res.status(200).json({
      success: false,
      message: errors[0],
    });
  } else {
    const replacement = {
      _id: newTeacher._id,
      teacherName: newTeacher.name,
      teacherSubject: newTeacher.subject,
      userEmail: email,
      classesTaught: newTeacher.classesList,
    };
    if (newTeacher._id) {
      Teacher.findOneAndReplace({ userEmail: email, _id: newTeacher._id }, replacement, { returnNewDocument: true })
        .then(_teacher => {
              res.status(200).json({
                success: true,
                newTeacher: replacement,
                message: 'Save Successful',
                updated: true,
            });
        })
        .catch(err => {
          console.log('Errorrr', err);
          res.status(200).json({
            success: false,
            response: err,
            message: 'Save Unsuccessful'
          });
        });
    } else {
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
            message: 'Save Successful',
            updated: false,
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
  }
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
        res.status(200).json({
          success: false,
          response: err,
          message: 'Could not fetch data, please try again',
        });
      });
}

module.exports = {
  addTeacher,
  fetchTeachers,
};
