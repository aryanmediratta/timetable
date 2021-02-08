const Timetable = require('../models/Timetables');
const Teacher = require('../models/Teachers');
const Classes = require('../models/Classes');

const { createStepwiseTimetables } = require('../geneticAlgorithm/performStepwiseGA');

// Generates a new timetable 
generateNewTimetable = (req, res, next) => {
  const url = new URL(`https://anyrandomwebsite.com/${req.originalUrl}`);
  const email = url.searchParams.get('email');
  let numPeriods = url.searchParams.get('numPeriods');
  const classesList = [];
  numPeriods = parseInt(numPeriods, 10);
  Classes.find({ userEmail: email })
    .then(classData => {
      classData && classData.forEach((obj) => {
        classesList.push({_id: obj._id.toString(), label: obj.label, periodsPerWeek: 0, class: obj.class, teachersList: []});
      });
    })
  Teacher.find({ userEmail: email })
    .then((teacherData) => {
      classesList.forEach((parentClass) => {
        teacherData && teacherData.forEach((teacher) => {
          teacher.classesTaught.forEach((classObject) => {
            if (parentClass._id === classObject._id.toString()) {
              parentClass.periodsPerWeek = parentClass.periodsPerWeek + classObject.periodsPerWeek;
              parentClass.teachersList = [
                ...parentClass.teachersList,
                {
                  teacherId: teacher._id,
                  teacherName: teacher.teacherName,
                  subject: teacher.teacherSubject,
                  periodsPerWeek: classObject.periodsPerWeek,
                }
              ];
            }
          });
        });
      });
      classesList.forEach((cl) => {
        if (cl.periodsPerWeek !== numPeriods) {
          return res.status(200).json({
            success: false,
            message: `Number of Periods for Class ${cl.label} is ${cl.periodsPerWeek} while it should be ${numPeriods}`,
          });
        }
      });
      const allData = {
        classesList,
        numPeriods,
      };
      const myData = createStepwiseTimetables(allData);
      // Functionality To AutoSave newly generated timetable.

      // const tt = generateTimetable(allData);
      // Timetable.findOneAndUpdate({ userEmail: email }, {$set:  {timetable: tt }}, { new: true })
      //   .then((resp) => {
      //     // console.log('Did You Try?', resp);
      //     res.status(200).json({
      //     success: true,
      //     message: 'Timetable saved successfully',
      //   });
      // })
      return res.send({
        success: true,
        timetable: myData,
        message: 'Timetable Generated successfully',
      });
    })
    .catch((err) => {
      console.log('err', err);
      res.send({
        success: false,
        message: 'Unable To create Timetable. Please try again later.',
      })
    })
}

saveTimetable = (req, res, next) => {
  const { schoolTimetable, email } = req.body;
  Timetable.findOneAndUpdate({ userEmail: email }, {$set:  {timetable: schoolTimetable }}, { new: true })
    .then((resp) => {
      return res.status(200).json({
      success: true,
      message: 'Timetable saved successfully',
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
}

fetchTimetable = (req, res, next) => {
  const url = new URL(`https://anyrandomwebsite.com/${req.originalUrl}`);
  const email = url.searchParams.get('email');
  Timetable.findOne({ userEmail: email })
    .then((data) => {
      return res.status(200).json({
        success: true,
        numPeriods: data.numPeriods,
        schoolTimetable: data.timetable,
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
  generateNewTimetable,
  saveTimetable,
  fetchTimetable,
};
