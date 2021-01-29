const { HARD_CLASH_WEIGHT } = require("./constants");

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
      allTeachers.indexOf(teacherId) > -1 ? costForTeachers += HARD_CLASH_WEIGHT : allTeachers.push(teacherId);
      allClasses.indexOf(classId) > -1 ? costForClasses += HARD_CLASH_WEIGHT : allClasses.push(classId);
      allLabels.indexOf(label) > -1 ? costForLabels += HARD_CLASH_WEIGHT * 1000 : allLabels.push(label);
      clashPerWeek.indexOf(uniqueIndex) > -1 ? uniqueClashesPerWeek++ : clashPerWeek.push(uniqueIndex);
    });
  });
  const hardClashes = (costForClasses + costForTeachers) / HARD_CLASH_WEIGHT;
  const softClashes = uniqueClashesPerWeek;
  return [(costForClasses + costForTeachers + costForLabels + uniqueClashesPerWeek), hardClashes, softClashes];
}

function findClashes (timetable, allClassIds) {
  let clashes = [];
  timetable.forEach((period, periodNumber) => {
    const allClasses = [];
    const allTeachers = [];
    period.forEach(tuple => {
      const { teacherId, classId } = tuple;
      allTeachers.indexOf(teacherId) > -1 ? clashes.push({ period: periodNumber, ...tuple, type: 'teacher' }) : allTeachers.push(teacherId);
      allClasses.indexOf(classId) > -1 ? clashes.push({ period: periodNumber, ...tuple, type: 'class' }) : allClasses.push(classId);
    });
    const missingClasses = allClassIds.filter((o) => allClasses.indexOf(o) === -1);
    if (missingClasses.length > 0) {
      for (let i = 0; i < missingClasses.length; i++) {
        clashes[clashes.length - 1 - i] = { ...clashes[clashes.length - 1 - i], missingClassId: missingClasses };
      }
    }
  });
  return clashes;
}

module.exports = {
    costFunction,
    findClashes,
};
