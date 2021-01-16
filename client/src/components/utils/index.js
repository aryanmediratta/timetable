const DAYS_OF_WEEK = [' ', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const PERIOD_NUMBER = ['1st Period', '2nd Period', '3rd Period', '4th Period', '5th Period', '6th Period'];

function getTimetableForEntity (timetable, entityType, entityId) {
    const myTable = [];
    let index = 1;
    timetable.forEach(period => {
        let flag = false;
        period.forEach(tuple => {
            const { classId, teacherId, label } = tuple;
            let tempEntity = null;
            if (entityType === 'class' && entityId === classId) {
                tempEntity = teacherId;
            } else if (entityType === 'teacher' && entityId === teacherId) {
                tempEntity = classId;
            }
            // If we find it, then we push it. otherwise we dont :)
            if (tempEntity !== null) {
                myTable.push({
                    entityId: tempEntity,
                    label: label,
                    periodNo: index,
                });
                flag = true;
                index < 6 ? index++ : index = 1;
            }
        });
        if (flag == false) {
            myTable.push({
                entityId: ' ',
                label:' ',
                periodNo: index,
            });
            index < 6 ? index++ : index = 1;
        }
    });
    return myTable;
}

function createTimetableForRendering (timetable, numPeriods) {
    const result = [];
    for (let i = 0; i < numPeriods; i++) {
        let periodRow = [];
        for (let j = i; j < timetable.length; j=j+numPeriods) {
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

module.exports = {
    get: (url) => fetch(url, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
    }).then(response => response.json()),
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
    getTimetableForEntity,
    createTimetableForRendering,
};