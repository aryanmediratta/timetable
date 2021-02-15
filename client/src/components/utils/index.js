const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const PERIOD_NUMBER = [' ', '1st Period', '2nd Period', '3rd Period', '4th Period', '5th Period', '6th Period', '7th Period', '8th Period'];

function getTimetableForEntity(timetable, entityId) {
  const myTable = [];
  timetable.forEach((period) => {
    let flag = false;
    period.forEach((tuple) => {
      const {
        classId, teacherId, className, teacherName, color,
      } = tuple;
      let tempEntity = null; let objId;
      let teacherClassCombo;
      if (entityId === classId) {
        tempEntity = teacherName;
        objId = teacherId;
      } else if (entityId === teacherId) {
        tempEntity = className;
        objId = classId;
      }
      // If we find it, then we push it. otherwise we dont :)
      if (tempEntity !== null) {
        teacherClassCombo = `${tempEntity}`;
        myTable.push({ cell: teacherClassCombo, id: `${objId}`, color });
        flag = true;
      }
    });
    if (flag === false) {
      myTable.push({ cell: ' ', color: 'white' });
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
  const days = [];
  for (let k = 0; k < numPeriods + 1; k++) {
    days.push({ cell: PERIOD_NUMBER[k] });
  }
  result.push(days);
  let temp = [];
  let j = 0;
  for (let i = 0; i < timetable.length; i++) {
    temp.push(timetable[i]);
    if ((i + 1) % numPeriods === 0) {
      temp.unshift({ cell: DAYS_OF_WEEK[j] });
      j++;
      result.push(temp);
      temp = [];
    }
  }
  return result;
}

function getSpecificTimetable(schoolTimetable, entityId, numPeriods) {
  const tempTimetable = getTimetableForEntity(schoolTimetable, entityId);
  const timetable = createTimetableForRendering(tempTimetable, numPeriods);
  return timetable;
}

const allEntityTypes = [
  { value: 'Teacher', label: 'Teacher' },
  { value: 'Class', label: 'Class' },
];

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
  allEntityTypes,
  DAYS_OF_WEEK,
  PERIOD_NUMBER,
};
