const { NUM_PERIODS } = require("./constants");

// Returns the number of clashes in a given timetable.
function costFunction (timetable) {
  let costForClasses = 0;
  let costForTeachers = 0;
  let costForLabels = 0;
  let uniqueClashesPerWeek = 0;
  const allLabels = [];
  let clashPerWeek = [];
  timetable.forEach((period, periodNumber) => {
    const allClasses = [];
    const allTeachers = [];
    if ((periodNumber) % (6) === 0) {
      clashPerWeek = [];
    }
    period.forEach(tuple => {
      const { teacherId, classId, label, uniqueIndex } = tuple;
      allTeachers.indexOf(teacherId) > -1 ? costForTeachers+=7 : allTeachers.push(teacherId);
      allClasses.indexOf(classId) > -1 ? costForClasses+=7 : allClasses.push(classId);
      allLabels.indexOf(label) > -1 ? costForLabels+=7000 : allLabels.push(label);
      clashPerWeek.indexOf(uniqueIndex) > -1 ? uniqueClashesPerWeek++ : clashPerWeek.push(uniqueIndex);
    });
  });
  return (costForClasses + costForTeachers + costForLabels + uniqueClashesPerWeek);
}

function findClashes (timetable) {
  let costForClasses  = 0;
  let costForTeachers  = 0;
  let uniqueClashesPerWeek  = 0;
  let clashPerWeek = [];
  timetable.forEach((period, periodNumber) => {
    const allClasses = [];
    const allTeachers = [];
    if ((periodNumber) % (6) === 0) {
      clashPerWeek = [];
    }
    period.forEach(tuple => {
      const { teacherId, classId, uniqueIndex } = tuple;
      allTeachers.indexOf(teacherId) > -1 ? costForTeachers+=1 : allTeachers.push(teacherId);
      allClasses.indexOf(classId) > -1 ? costForClasses+=1 : allClasses.push(classId);
      clashPerWeek.indexOf(uniqueIndex) > -1 ? uniqueClashesPerWeek++ : clashPerWeek.push(uniqueIndex);
    });
  });
  return [costForClasses + costForTeachers, uniqueClashesPerWeek];
}

module.exports = {
    costFunction,
    findClashes,
};
