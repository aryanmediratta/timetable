function generateSub(date, timetable, absentList, teachersList) {
  let subTable = [];
  let subReplacements = [];
  let absentLookup = {};
  let presentLookup = {};
  let subDate = new Date(date);
  let day = subDate.getDay();
  let numPeriods = timetable.length;
  const [dayStart, dayEnd] = getSubDay(day, numPeriods);
  if (dayStart >= 0 && dayEnd > 0) {
    for (i = dayStart; i < dayEnd; i++) {
      subTable.push(timetable[i]);
    }
  }

  absentList.forEach((teacher) => {
    absentLookup[teacher._id] = teacher;
  })

  teachersList.forEach((teacher) => {
    if (absentLookup[teacher._id]) {
      console.log(`${teacher.teacherName} is Absent`);
    } else {
      presentLookup[teacher._id] = teacher;
    }
  })

  subTable.forEach((period, index) => {
    let replacements = {};
    let checkReplacements = {...presentLookup};
    period.forEach((tuple) => {
      if (absentLookup[tuple.teacherId]) {
        console.log(tuple.teacherName, tuple.className, 'Period No. ', index + 1);
      }
      if (checkReplacements[tuple.teacherId]) {
        delete checkReplacements[tuple.teacherId];
      }
    })
    replacements = {...checkReplacements};
    subReplacements.push(replacements);
  })
  // subTable.forEach((period, index))
  // return subTable;
  console.log(subReplacements);
  // console.log(presentTeachers);
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

module.exports = {
  generateSub,
  getSubDay,
};