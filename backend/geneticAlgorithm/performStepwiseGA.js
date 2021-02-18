const { NUM_CLASSES_CLUBBED_TOGETHER } = require('./constants');
const { generateTimetable } = require('./performCrossover');
const { modifyClassesData } = require('../utils/classes');
const { costFunction, findClashes } = require('./calculateFitness');
const { createTuples } = require('./createRandomTimetables');

function createStepwiseTimetables(allData) {
  const { classesList, numPeriods } = allData;
  const classData = modifyClassesData(classesList);
  const allTuples = createTuples(classesList);
  classData.sort((a,b) => a.value - b.value);
  const allTimetables = [];
  let teacherClashes = [];
  let count = 1;
  while (classData.length > 0) {
    const tempSelectedClasses = [];
    for (let i = 0; i < NUM_CLASSES_CLUBBED_TOGETHER; i++) {
      const tempClass = classData.length > 0 ? classData.pop() : null;
      tempClass !== null ? tempSelectedClasses.push(tempClass) : null;
    }
    const allSelectedClassIds = [];
    tempSelectedClasses.forEach((myClass) => {
      classesList.forEach((tempClasses) => {
        if (myClass.value === tempClasses.class.toString()) {
          allSelectedClassIds.push(tempClasses._id);
        }
      });
    });
    const allSelectedClasses = [];
    const allSelectedTeachers = [];
    allSelectedClassIds.forEach((classId) => {
      allTuples.forEach((tempClasses) => {
        if (classId === tempClasses.classId) {
          allSelectedClasses.push(tempClasses);
          allSelectedTeachers.push(tempClasses.teacherId);
        }
      });
    });
    const finalDataForTimetable = {
      ...allData,
      numClasses: allSelectedClassIds.length,
      teacherClashes,
      population: allSelectedClasses,
    };
    const tt = generateTimetable(finalDataForTimetable, count);
    const tempClashes = findTeachersInPeriods(tt, allSelectedTeachers);
    teacherClashes = mergeTwoTimetables(teacherClashes, tempClashes, numPeriods);
    allTimetables.push(tt);
    count++;
  }
  // End of While Loop.
  let finalTimetable = [];
  for (let i = 0; i < allTimetables.length; i++) {
    finalTimetable = mergeTwoTimetables(finalTimetable, allTimetables[i], numPeriods)
    const things = costFunction(finalTimetable, numPeriods, null);
    console.log('COST for', i, 'is', things[0],'Hard Clashes', things[1], 'Soft Clashes', things[2]);
  }
  const clashes = findClashes(finalTimetable);
  console.log('Hard Teacher Clashes', clashes.filter((cl) => cl.type === 'teacher').length);
  console.log('Hard Classes Clashes', clashes.filter((cl) => cl.type === 'class').length);
  return finalTimetable;
}

// Given a timetable, returns an array of num periods showing which teacher teaches in which period.
function findTeachersInPeriods(timetable, allSelectedTeachers) {
  const numPeriods = timetable.length;
  const allTeachers = new Array(numPeriods);
  timetable.forEach((period, periodNumber) => {
    let tempArr = [];
    period.forEach((ctMap) => {
      const { teacherId } = ctMap;
      allSelectedTeachers.indexOf(teacherId) > -1 ? tempArr.push(teacherId) : null;
    });
    allTeachers[periodNumber] = tempArr;
    tempArr = [];
  });
  return allTeachers;
}

function mergeTwoTimetables (finalArray, timetableOne, numPeriods) {
  if (finalArray.length === 0) {
    finalArray = timetableOne;
  } else {
    for (let i = 0; i < numPeriods; i++) {
      finalArray[i] = [
        ...finalArray[i],
        ...timetableOne[i],
      ];
    }
  }
  return finalArray;
}

module.exports = {
  createStepwiseTimetables,
};
