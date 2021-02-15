const { HARD_CLASH_WEIGHT } = require("./constants");

// Returns the number of clashes in a given timetable.
// teacherClashes is a list of teacherIds showing availability of teachers. Only required when breaking timetable into different groups.
function costFunction (timetable, numPeriods, teacherClashes) {
  let costForClasses = 0;
  let costForTeachers = 0;
  let costForLabels = 0;
  // let uniqueClashesPerWeek = 0;
  let softClashWeight = 0;
  let numSoftClashes = 0;
  let softClashList = [];
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
    period.forEach((tuple) => {
      const { teacherId, classId, label, uniqueIndex, allowDoublePeriods } = tuple;
      allTeachers.indexOf(teacherId) > -1 ? costForTeachers += HARD_CLASH_WEIGHT : allTeachers.push(teacherId);
      allClasses.indexOf(classId) > -1 ? costForClasses += HARD_CLASH_WEIGHT : allClasses.push(classId);
      allLabels.indexOf(label) > -1 ? costForLabels += HARD_CLASH_WEIGHT * 1000 : allLabels.push(label);
      // clashPerWeek.indexOf(uniqueIndex) > -1 ? uniqueClashesPerWeek++ : clashPerWeek.push(uniqueIndex);
      softClashList.push({ periodNumber, uniqueIndex });
      const found = softClashList.filter((cl) => cl.uniqueIndex === uniqueIndex);
      if (found && found.length > 1) {
        if (allowDoublePeriods === false) {
          softClashWeight+=5;
          numSoftClashes++;
        } else {
          // Desirable condition -> double period.
          const twoSimultaneousPeriods = found.some((cl) => cl.periodNumber === periodNumber - 1);
          twoSimultaneousPeriods === true ? null : softClashWeight+=3;
          twoSimultaneousPeriods === true ? null : numSoftClashes+=1;
          // Non-Desirable condition -> triple period.
          if (twoSimultaneousPeriods === true && found.length > 2) {
            const threeSimultaneousPeriods = found.some((cl) => cl.periodNumber === periodNumber - 2);
            threeSimultaneousPeriods === true ? softClashWeight+=15 : softClashWeight+=9;
            numSoftClashes+=1;
          }
        }
      }
    });
    if (((periodNumber+1) % (numPeriods/5) === 0) && periodNumber !== 0) {
      clashPerWeek = [];
      softClashList = [];
    }
  });
  const hardClashes = (costForClasses + costForTeachers) / HARD_CLASH_WEIGHT;
  const softClashes = numSoftClashes;
  const totalCost = costForClasses + costForTeachers + costForLabels + softClashWeight;
  return [totalCost, hardClashes, softClashes];
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
  const numPeriodsPerDay = timetable.length / 5;
  let clashPerWeek = [];
  timetable.forEach((period, periodNumber) => {
    period.forEach((tuple, elementID) => {
      const { uniqueIndex, allowDoublePeriods, classId, className, teacherName } = tuple;
      // clashPerWeek.push(uniqueIndex);
      clashPerWeek.push({ el1: periodNumber, uniqueIndex, el2: elementID, classId, className, teacherName, allowDoublePeriods });
      const found = clashPerWeek.filter((cl) => cl.uniqueIndex === uniqueIndex);
      if (found && found.length > 1) {
        if (allowDoublePeriods === false) {
          // console.log('is this being called', found);
          clashes.push(...found);
        } else {
          // Desirable condition -> double period.
          const twoSimultaneousPeriods = found.some((cl) => cl.el1 === periodNumber - 1);
          twoSimultaneousPeriods === true ?
            null
            :
            (found.length > 2 ? clashes.push(found[found.length - 1]) : clashes.push(...found));
            // twoSimultaneousPeriods === true ? null : (found.length > 2 ? console.log('3rd period',found[found.length - 1]) : console.log('both',...found));
          // Non-Desirable condition -> triple period.
          if (twoSimultaneousPeriods === true && found.length > 2) {
            const threeSimultaneousPeriods = found.some((cl) => cl.el1 === periodNumber - 2);
            threeSimultaneousPeriods === true ? clashes.push(found[found.length - 1]) : null;
            // threeSimultaneousPeriods === true ? console.log('KKEKW', found[found.length - 1]) : null;
          }
        }
      }
    });
    if (((periodNumber + 1) % (numPeriodsPerDay) === 0) && periodNumber !== 0) {
      clashPerWeek = [];
    }
  });
  // console.log('num clashes', clashes.length);
  return clashes;
}

// function findDoublePeriods (timetable) {
//   const numPeriodsPerDay = timetable.length / 5;
//   let clashPerWeek = [];
//   const doublePeriods = [];
//   const triplePeriods = [];
//   timetable.forEach((period, periodNumber) => {
//     period.forEach((tuple, elementID) => {
//       const { uniqueIndex } = tuple;
//       clashPerWeek.push({ periodNumber, uniqueIndex });
//       const found = clashPerWeek.filter((cl) => cl.uniqueIndex === uniqueIndex);
//       if (found && found.length > 1) {
//         const twoSimultaneousPeriods = found.some((cl) => cl.periodNumber === periodNumber - 1);
//         // Non-Desirable condition -> triple period.
//         if (twoSimultaneousPeriods === true) {
//           const threeSimultaneousPeriods = found.some((cl) => cl.periodNumber === periodNumber - 2);
//           threeSimultaneousPeriods === true ? triplePeriods.push(found) : doublePeriods.push(found);
//         }
//       }
//     });
//     if (((periodNumber + 1) % (numPeriodsPerDay) === 0) && periodNumber !== 0) {
//       clashPerWeek = [];
//     }
//   });
//   console.log('double periods', doublePeriods.length);
//   console.log('triplePeriods', triplePeriods.length);
//   return doublePeriods.length;
// }

module.exports = {
  costFunction,
  findClashes,
  findHardClashingPeriods,
  findSoftClashingPeriods,
  // findDoublePeriods,
};
