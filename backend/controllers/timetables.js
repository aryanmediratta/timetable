const Timetable = require('../models/Timetables');
const Teacher = require('../models/Teachers');
const Classes = require('../models/Classes');

const { generateTimetable } = require('../geneticAlgorithm/performCrossover');
const { NUM_PERIODS } = require('../geneticAlgorithm/constants');

// Generates a new timetable 
generateNewTimetable = (req, res, next) => {
  const url = new URL(`https://anyrandomwebsite.com/${req.originalUrl}`);
  const email = url.searchParams.get('email');
  const numClasses = url.searchParams.get('numClasses');
  const numTeachers = url.searchParams.get('numTeachers');
  const numPeriods = url.searchParams.get('numPeriods');
  const classesList = [];
  Classes.find({ userEmail: email })
    .then(classData => {
      classData && classData.forEach((obj) => {
        classesList.push({_id: obj._id.toString(), label: obj.label, periodsPerWeek: 0});
      });
    })
  Teacher.find({ userEmail: email })
  .then((teacherData) => {
    let flag = false;
    classesList.forEach((parentClass) => {
      let total = 0;
      teacherData && teacherData.forEach((teacher) => {
        teacher.classesTaught.forEach((classObject) => {
          if (parentClass._id === classObject._id.toString()) {
            total = total + classObject.periodsPerWeek;
          }
        });
      });
      if (total !== 30 && flag !== true) {
        flag = true;
        res.send({
          success: false,
          message: `Number of classes for ${parentClass.label} are ${total} while it should be ${numPeriods}.`,
        })
      }
    });
    if (flag === false) {
      const allData = {
        teachersList: teacherData,
        numClasses: parseInt(numClasses, 10),
        numTeachers: parseInt(numTeachers, 10),
        numPeriods: parseInt(numPeriods, 10),
      };
      const tt = generateTimetable(allData);
      res.send({
        success: true,
        timetable: tt,
        numPeriods: parseInt(numPeriods, 10),
      });
    }
  })
  .catch(err => {
    res.send({
      success: false,
      message: err,
    })
  })
}

saveTimetable = (req, res, next) => {
  const { schoolTimetable, email } = req.body;
  Timetable.findOneAndUpdate({ userEmail: email }, {$set:  {timetable: schoolTimetable }}, { new: true })
    .then((resp) => {
      res.status(200).json({
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
      res.status(200).json({
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
