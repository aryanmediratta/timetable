const Teacher = require('../models/Teachers');
const Classes = require('../models/Classes');

addTeacher = (req, res, next) => {
    let { newTeacher, email } = req.body;
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
        res.status(200).json({
          success: false,
          response: err,
          message: 'Could not fetch data, please try again',
        });
      });
}

// MODIFY THIS
addClasses = (req, res, next) => {
    let { newTeacher, email } = req.body;
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


// Posting and Getting Sections

//Get All Classes
getAllClasses = (req, res, next) => {
  const url = new URL(`https://dukhadsamaachar.com/${req.originalUrl}`);
  const email = url.searchParams.get('email');
  Classes.find({ userEmail: email })
   .then(data => {
      res.status(200).json({
        success: true,
        classes: data,
        message:'FETCHED Classes And Sections'
      });
   })
   .catch(err => {
      res.status(200).json({
        success: false,
        response: err,
        message: 'Could Not Fetch Class/Section',
    });
  });
}

//Posting Classes As Objects of Label, Value and Section
postAllClasses = (req, res, next) => {
    console.log('BELLOOOOOOOOO')
    let { sections, email } = req.body;
    console.log(sections);
    const section = new Classes({
        addClasses: sections,
        userEmail: email,
    });
    section.save()
      .then(data => {
        res.status(200).json({
          success: true,
          sections: data,
          message: 'Section Post Request Recieved'
        });
      })
    .catch(err => {
        res.status(200).json({
            success: false,
            response: err,
            message: "Caught Error, Please Fix Code"
        });
    })
}

module.exports = {
    addTeacher,
    fetchTeachers,
    addClasses,
    getAllClasses,
    postAllClasses,
};
