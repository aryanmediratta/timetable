const { costFunction } = require('./calculateFitness');
const { NUM_CLASSES, NUM_PERIODS, NUM_GENERATIONS, MUTATION_RATE, DAYS_OF_WEEK } = require('./constants');
const { easy } = require('./performCrossover');

function extraction(string, id) {
    const timeTable = easy();
    const searchId = id;
    const classById = [];
    const teacherById = [];
    let periodNo = 1;

    timeTable.forEach(period => {
        const innerClass = [];
        const innerTeacher = [];
        period.forEach(tuple => {
            const { classId, teacherId } = tuple;

            if (string == 'class' || string == 'Class') {
                if (classId === searchId) { 
                    const classData = {'period': periodNo,'teacher': teacherId};
                    innerClass.push(classData); 
                }
            } else if (string == 'teacher' || string == 'Teacher') {
                if (teacherId === searchId) {
                    const teacherData = {'period': periodNo,'class':classId};
                    innerTeacher.push(teacherData); 
                }
            }
        });
        classById.push(innerClass);
        teacherById.push(innerTeacher);
        periodNo < 5 ? periodNo++ : periodNo = 1;
    });

    if (string == 'class' || string == 'Class') {
        console.log(`Timetable for class ${id}`);
        console.group(classById);
    } else if (string == 'teacher' || string == 'Teacher') {
        console.log(`Timetable for teacher ${id}`);
        console.group(teacherById);
        return teacherById;
    }
}

// extraction('teacher', 1);
// extraction('Class', 2);

function getTimetableForEntity (timetable, entityType, entityId) {
    const myTable = [];
    let index = 1;
    console.log('COST of generated Timetable?!', costFunction(timetable))
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
                index < NUM_PERIODS ? index++ : index = 1;
            }
        });
    });
    console.log('My Table', myTable);
    return myTable;
}

getTimetableForEntity(easy(), 'class', 3);


module.exports = {
    extraction,
    getTimetableForEntity,
};
