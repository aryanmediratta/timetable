const Teacher = require('../models/Teachers');
const Classes = require('../models/Classes');
const { showAllSections } = require('../utils/teachers');

addTeacher = (req, res, next) => {
    const { newTeacher, email } = req.body;
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

addClasses = (req, res, next) => {
  let { classesList, email } = req.body;
  classesList.forEach(myClass => {
    const allSections = showAllSections(myClass.numberOfSections);
    allSections.forEach(section => {
      const label = `${myClass.label} - ${section}`;
      const classToBeSaved = new Classes({
        label,
        userEmail: email,
        class: myClass.value,
      });
      classToBeSaved.save()
        .then(response => {
          console.log('Saved', response);
        })
        .catch(err => {
          res.status(200).json({
            success: true,
            message: 'Classes Saved',
            errors: err,
          });
        })
    });
  });
  res.status(200).json({
    success: true,
    message: 'Classes Saved',
  });
}

getAllClasses = (req, res, next) => {
  const url = new URL(`https://anyrandomwebsite.com/${req.originalUrl}`);
  const email = url.searchParams.get('email');
  Classes.find({ userEmail: email })
    .then(data => {
      res.status(200).json({
        success: true,
        classes: data,
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
    addClasses,
    getAllClasses,
};
