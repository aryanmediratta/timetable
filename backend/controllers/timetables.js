const Timetable = require('../models/Timetables');
const Teacher = require('../models/Teachers');
const Classes = require('../models/Classes');

const { addTeachersToClasses } = require('../utils/classes');
const { createStepwiseTimetables } = require('../geneticAlgorithm/performStepwiseGA');
// const { removeBusinessLogic } = require('../geneticAlgorithm/cleanTimetable');
const { getSuggestionsForEntity } = require('../utils/timetable');
const { main } = require('../targetedSearch');

// Generates a new timetable 
generateNewTimetable = async (req, res, next) => {
  const url = new URL(`https://anyrandomwebsite.com/${req.originalUrl}`);
  const email = url.searchParams.get('email');
  let numPeriods = url.searchParams.get('numPeriods');
  let allClasses;
  let allTeachers;
  numPeriods = parseInt(numPeriods, 10);
  await Classes.find({ userEmail: email })
    .then((classData) => {
      allClasses = classData;
    })
    .catch((err) => {
      console.log('err', err);
      res.send({
        success: false,
        message: 'Unable To create Timetable. Please try again later.',
      })
    });
  await Teacher.find({ userEmail: email })
    .then((teacherData) => {
      allTeachers = teacherData;
    })
    .catch((err) => {
      console.log('err', err);
      res.send({
        success: false,
        message: 'Unable To create Timetable. Please try again later.',
      })
    });
  const classesList = addTeachersToClasses(allClasses, allTeachers);
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

  // Timetable.findOneAndUpdate({ userEmail: email }, {$set:  {timetable: myData }}, { new: true })
  //   .then((resp) => {
  //     // console.log('Did You Try?', resp);
  //     res.status(200).json({
  //     success: true,
  //     message: 'Timetable saved successfully',
  //   });
  // })
  res.send({
    success: true,
    timetable: myData,
    message: 'Timetable Generated successfully',
  });
}

saveTimetable = (req, res, next) => {
  const { schoolTimetable, email } = req.body;
  Timetable.findOneAndUpdate({ userEmail: email }, {$set:  { timetable: schoolTimetable }}, { new: true })
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

getSuggestions = async (req, res) => {
  const url = new URL(`https://anyrandomwebsite.com/${req.originalUrl}`);
  const email = url.searchParams.get('email');
  const entityId = url.searchParams.get('entityId');
  const entityToBeReplaced = url.searchParams.get('entityToBeReplaced');
  const entityType = url.searchParams.get('entityType');
  const period = url.searchParams.get('period');
  
  let timetable;
  await Timetable.findOne({ userEmail: email })
    .then((data) => {
      timetable = data.timetable;
    })
    .catch(err => {
      res.status(200).json({
        success: false,
        response: err,
        message: 'Could not fetch data, please try again',
      });
    });
  const newTimetable = getSuggestionsForEntity(entityId, entityToBeReplaced, timetable, entityType, period);
  // const newTimetable = main(timetable);
  return res.status(200).json({
    success: true,
    message: '',
    timetable: newTimetable,
  })
}

module.exports = {
  generateNewTimetable,
  saveTimetable,
  fetchTimetable,
  getSuggestions,
};
