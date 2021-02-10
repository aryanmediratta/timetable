const { HARD_CLASH_WEIGHT } = require("./constants");

// Returns the number of clashes in a given timetable.
// teacherClashes is a list of teacherIds showing availability of teachers. Only required when breaking timetable into different groups.
function costFunction (timetable, numPeriods, teacherClashes) {
  let costForClasses = 0;
  let costForTeachers = 0;
  let costForLabels = 0;
  let uniqueClashesPerWeek = 0;
  const allLabels = [];
  let clashPerWeek = [];
  timetable.forEach((period, periodNumber) => {
    const allClasses = [];
    let allTeachers;
    if (!teacherClashes || teacherClashes.length === 0) {
      allTeachers = [];
    } else {
      allTeachers = [...teacherClashes[periodNumber]];
    }
    // Resetting Soft Clashes.
    if (((periodNumber+1) % (numPeriods/5) === 0) && periodNumber !== 0) {
      clashPerWeek = [];
    }
    period.forEach((tuple) => {
      const { teacherId, classId, label, uniqueIndex } = tuple;
      allTeachers.indexOf(teacherId) > -1 ? costForTeachers += HARD_CLASH_WEIGHT : allTeachers.push(teacherId);
      allClasses.indexOf(classId) > -1 ? costForClasses += HARD_CLASH_WEIGHT : allClasses.push(classId);
      allLabels.indexOf(label) > -1 ? costForLabels += HARD_CLASH_WEIGHT * 3000 : allLabels.push(label);
      clashPerWeek.indexOf(uniqueIndex) > -1 ? uniqueClashesPerWeek++ : clashPerWeek.push(uniqueIndex);
    });
  });
  const hardClashes = (costForClasses + costForTeachers) / HARD_CLASH_WEIGHT;
  const softClashes = uniqueClashesPerWeek;
  return [(costForClasses + costForTeachers + costForLabels + uniqueClashesPerWeek), hardClashes, softClashes];
}

// Returns a list of clash objects
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
    // const missingClasses = allClassIds.filter((o) => allClasses.indexOf(o) === -1);
    // if (missingClasses.length > 0) {
    //   for (let i = 0; i < missingClasses.length; i++) {
    //     clashes[clashes.length - 1 - i] = { ...clashes[clashes.length - 1 - i], missingClassId: missingClasses };
    //   }
    // }
  });
  return clashes;
}

// Returns a list of periods having hard clashed entities.
function findHardClashingPeriods(timetable, teacherClashes) {
  let clashes = [];
  timetable.forEach((period, periodNumber) => {
    const allClasses = [];
    let allTeachers;
    if (!teacherClashes || teacherClashes.length === 0) {
      allTeachers = [];
    } else {
      allTeachers = [...teacherClashes[periodNumber]];
    }
    period.forEach((tuple, elementID) => {
      const { teacherId, classId } = tuple;
      allTeachers.indexOf(teacherId) > -1 ? clashes.push({ el1: periodNumber, el2: elementID }) : allTeachers.push(teacherId);
      allClasses.indexOf(classId) > -1 ? clashes.push({ el1: periodNumber, el2: elementID }) : allClasses.push(classId);
    });
  });
  return clashes;
}

// Returns a list of periods having soft clashed entities.
function findSoftClashingPeriods (timetable) {
  let clashes = [];
  timetable.forEach((period, periodNumber) => {
    if ((periodNumber) % (6) === 0) {
      clashPerWeek = [];
    }
    period.forEach((tuple, elementID) => {
      const { uniqueIndex, allowDoublePeriods } = tuple;
      findSoftClashes(clashPerWeek, uniqueIndex, allowDoublePeriods) ?
        clashes.push({ el1: periodNumber, el2: elementID }) && clashPerWeek.push(uniqueIndex)
      :
        clashPerWeek.push(uniqueIndex);
    });
  });
  return clashes;
}

// Helper function which returns true for CLASHING Entities.
function findSoftClashes(array, element, allowDoublePeriods) {
  if (array.length === 0) return false;
  if (array[array.length-1] === element) {
    return !allowDoublePeriods;
  }
  if (array.indexOf(element) > -1) return true;
}

module.exports = {
  costFunction,
  findClashes,
  findHardClashingPeriods,
  findSoftClashingPeriods,
};
