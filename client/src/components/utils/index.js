const DAYS_OF_WEEK = [' ', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const PERIOD_NUMBER = ['1st Period', '2nd Period', '3rd Period', '4th Period', '5th Period', '6th Period'];

function getTimetableForEntity(timetable, entityId) {
  const myTable = [];
  let index = 1;
  timetable.forEach((period) => {
    let flag = false;
    period.forEach((tuple) => {
      const {
        classId, teacherId, className, teacherName, subject,
      } = tuple;
      let tempEntity = null; let otherTempEntity; let objId;
      let teacherClassCombo;
      if (entityId === classId) {
        otherTempEntity = teacherName;
        tempEntity = subject;
        objId = teacherId;
      } else if (entityId === teacherId) {
        tempEntity = className;
        objId = classId;
      }
      // If we find it, then we push it. otherwise we dont :)
      if (tempEntity !== null) {
        teacherClassCombo = `${otherTempEntity ? `${otherTempEntity} -- ` : ''} ${tempEntity}`;
        myTable.push({ cell: teacherClassCombo, id: `${objId}` });
        flag = true;
        index < 6 ? index++ : index = 1;
      }
    });
    if (flag === false) {
      myTable.push({ cell: ' ' });
      index < 6 ? index++ : index = 1;
    }
  });
  return myTable;
}

function showAllSections(numberOfSections) {
  const alphabets = [];
  for (let i = 0; i < numberOfSections; i++) {
    alphabets.push((i + 10).toString(36).toUpperCase());
  }
  return alphabets;
}

function createTimetableForRendering(timetable, numPeriods) {
  numPeriods /= 5;
  const result = [];
  for (let i = 0; i < numPeriods; i++) {
    const periodRow = [];
    for (let j = i; j < timetable.length; j += numPeriods) {
      if (j === i) {
        periodRow.push(PERIOD_NUMBER[i]);
      }
      periodRow.push(timetable[j]);
    }
    result.push(periodRow);
  }
  result.unshift(DAYS_OF_WEEK);
  return result;
}

function getSpecificTimetable(schoolTimetable, entityId, numPeriods) {
  const tempTimetable = getTimetableForEntity(schoolTimetable, entityId);
  const timetable = createTimetableForRendering(tempTimetable, numPeriods);
  return timetable;
}

module.exports = {
  get: (url) => fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
  }).then((response) => response.json()),
  post: (url, data) => fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  }),
  put: (url, data, signal) => fetch(url, {
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT',
    signal,
  }),
  rawPost: (url, data) => fetch(url, {
    body: data,
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  }),
  showAllSections,
  getSpecificTimetable,
};
