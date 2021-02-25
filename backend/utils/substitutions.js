function generateSub(date, timetable, absentList, teachersList) {
  let substitutions = [];
  let subTable = [];
  let absentLookup = {};
  let presentLookup = {};
  let subDate = new Date(date);
  let day = subDate.getDay();
  let numPeriods = timetable.length;
  const [dayStart, dayEnd] = getSubDay(day, numPeriods);
  // Extracting Specific Day's Timetable
  if (dayStart >= 0 && dayEnd > 0) {
    for (i = dayStart; i < dayEnd; i++) {
      subTable.push(timetable[i]);
    }
  }
  // Creating Lookup list for Absent Teachers, Not Necessary, Better Optimize
  absentList.forEach((teacher) => {
    absentLookup[teacher._id] = teacher;
  })
  // Creating Lookup list for Present Teachers
  teachersList.forEach((teacher) => {
    if (absentLookup[teacher._id]) {
      console.log(`${teacher.teacherName} is Absent`);
    } else {
      presentLookup[teacher._id] = { teacherId: teacher._id, teacher: teacher.teacherName };
    }
  })
  console.log('');
  // Looping Over Day's Timetable, Finding Absent Teachers
  // And Removing Teacher From Present List if they already have a class
  subTable.forEach((period, index) => {
    let totalPeriodsToReplace = 0;
    let checkReplacements = {...presentLookup};
    let periodAbsentees = {};
    let subAssignments = [];
    period.forEach((tuple) => {
      const { className, classId } = tuple;
      if (absentLookup[tuple.teacherId]) {
        totalPeriodsToReplace++;
        periodAbsentees[tuple.teacherId] = { ...absentLookup[tuple.teacherId], className: className, classID: classId };
      }
      if (checkReplacements[tuple.teacherId]) {
        delete checkReplacements[tuple.teacherId];
      }
    })
    // Randomly Assigning An Absent Teachers's Class
    // A teacher from Free Teachers
    while (periodAbsentees && Object.keys(periodAbsentees).length !== 0
    && periodAbsentees.constructor === Object) {
      let absent = randomKey(periodAbsentees);
      let replacement = randomKey(checkReplacements);
      const { className, label, _id, classID } = periodAbsentees[absent];
      checkReplacements[replacement] = { ...checkReplacements[replacement],
        periodNo: (index + 1),
        substitutionClass: className,
        substitutionClassId: classID,
        absentTeacher: label,
        absentTeacherId: _id,
       };
      subAssignments.push(checkReplacements[replacement]);
      delete checkReplacements[replacement];
      delete periodAbsentees[absent];
    }
    substitutions.push(subAssignments);
    if (checkReplacements && Object.keys(checkReplacements).length!==0) {
      Object.keys(checkReplacements).map((key) => {
        console.log(`${checkReplacements[key].teacher} still free for period no ${index+1}`);
        return checkReplacements[key];
      });
    } else {
      console.log(`No Free Teacher for period ${index + 1}`);
    }
    // if (index === 0) {
    //   console.log(substitutions);
    // }
    // let repCount = Object.keys(checkReplacements).map(key => {
    //   return checkReplacements[key];
    // })
    // subReplacements.push(repCount);
    // console.log(`Total periods to replace in period ${index + 1} are ${totalPeriodsToReplace}`);
    // console.log(`Available teachers for replacements are ${repCount.length}`);
    console.log(subAssignments);
    console.log('  ')
  })
  // console.log(substitutions);
  return 0;
}

function getSubDay(day, numPeriods) {
  let dayStart = 0;
  let dayEnd = 0;

  dayEnd = (day === 1) ? Math.floor((day)*Math.floor((numPeriods/5))): dayEnd;
  dayEnd = (day === 2) ? Math.floor((day)*Math.floor((numPeriods/5))): dayEnd;
  dayEnd = (day === 3) ? Math.floor((day)*Math.floor((numPeriods/5))): dayEnd;
  dayEnd = (day === 4) ? Math.floor((day)*Math.floor((numPeriods/5))): dayEnd;
  dayEnd = (day === 5) ? Math.floor((day)*Math.floor((numPeriods/5))): dayEnd;
  if (dayEnd > 0) {
    dayStart = Math.floor(dayEnd - Math.floor(numPeriods/5));
  }
  return [dayStart, dayEnd];
}

function randomKey(obj) {
let keys = Object.keys(obj);
return keys[keys.length * Math.random() << 0];
};

module.exports = {
  generateSub,
};