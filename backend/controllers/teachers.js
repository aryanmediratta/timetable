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
    let errors = [];
    if (!replacement.teacherName) {
      errors.push('Teacher Name required');
    }
    if (!replacement.teacherSubject) {
      errors.push('Subject Taught is Required');
    }
    if (replacement.classesTaught.length === 0) {
      errors.push('Select Atleast One Class');
    } else {
      replacement.classesTaught.forEach( section => {
        if (!section.periodsPerWeek) {
          errors.push(`Please specify periods for ${section.label}`);
        }
      });
    }
    if (errors.length > 0) {
      return res.status(200).json({
          success: false,
          message: errors[0],
      });
    }
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
      errors = [];
      const teacher = new Teacher({
        teacherName: newTeacher.name,
        userEmail: email,
        teacherSubject: newTeacher.subject,
        classesTaught: newTeacher.classesList,
      });
      if (!teacher.teacherName) {
        errors.push('Teacher Name required');
      }
      if (!teacher.teacherSubject) {
        errors.push('Subject Taught is Required');
      }
      if (teacher.classesTaught.length === 0) {
        errors.push('Select Atleast One Class');
      } else {
        teacher.classesTaught.forEach( section => {
          if (!section.periodsPerWeek) {
            errors.push(`Please specify periods for ${section.label}`);
          }
        });
      }
      if (errors.length > 0) {
        return res.status(200).json({
            success: false,
            message: errors[0],
        });
      }
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
