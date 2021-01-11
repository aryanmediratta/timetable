const { NUM_PERIODS } = require("./constants");

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
        if ((periodNumber+1) % (6) === 0) {
            // console.log('Resetting clashes ----------------------------------------------');
            clashPerWeek = [];
        }
        period.forEach(tuple => {
            const { teacherId, classId, label, uniqueIndex } = tuple;
            allTeachers.indexOf(teacherId) > -1 ? costForTeachers+=3 : allTeachers.push(teacherId);
            allClasses.indexOf(classId) > -1 ? costForClasses+=3 : allClasses.push(classId);
            allLabels.indexOf(label) > -1 ? costForLabels+=100 : allLabels.push(label);
            clashPerWeek.indexOf(uniqueIndex) > -1 ? uniqueClashesPerWeek++ : clashPerWeek.push(uniqueIndex);
        });
    });
    // console.log('TOTAL', costForClasses + costForTeachers + costForLabels)
    return (costForClasses + costForTeachers + costForLabels + uniqueClashesPerWeek);
}


module.exports = {
    costFunction,
};
