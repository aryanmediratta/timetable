// Returns the number of clashes in a given timetable.
function costFunction (timetable) {
    let costForClasses = 0;
    let costForTeachers = 0;
    let costForLabels = 0;
    const allLabels = [];
    timetable.forEach(period => {
        const allClasses = [];
        const allTeachers = [];
        period.forEach(tuple => {
            const { teacherId, classId, label } = tuple;
            allTeachers.indexOf(teacherId) > -1 ? costForTeachers++ : allTeachers.push(teacherId);
            allClasses.indexOf(classId) > -1 ? costForClasses++ : allClasses.push(classId);
            allLabels.indexOf(label) > -1 ? costForLabels+=100 : allLabels.push(label);
        });
    });
    // console.log('TOTAL', costForClasses + costForTeachers + costForLabels)
    return costForClasses + costForTeachers + costForLabels;
}


module.exports = {
    costFunction,
};
