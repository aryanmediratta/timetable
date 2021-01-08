function getTimetableForEntity (timetable, entityType, entityId) {
    const myTable = [];
    let index = 1;
    timetable.forEach(period => {
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
                index < 6 ? index++ : index = 1;
            }
        });
    });
    console.log('My Table', myTable);
    return myTable;
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
};