const { NUM_CLASSES, NUM_PERIODS, NUM_GENERATIONS, MUTATION_RATE } = require('./constants');
const { easy } = require('./performCrossover');

const timeTable = easy();

function extractionClasses(id) {

    const searchId = id;
    const classById = [];
    let periodNo = 1;

    timeTable.forEach(period => {
        const innerClasses = [];
        period.forEach(tuple => {
            const { classId, teacherId } = tuple;
            if (classId === searchId) { 
                const classData = {'period': periodNo,'teacher': teacherId};
                innerClasses.push(classData); 
            }
        });
        classById.push(innerClasses);
        periodNo < 5 ? periodNo++ : periodNo = 1;
    }); 
    console.log(`Timetable for class ${id}`)
    console.log(classById);
    return classById;
}

function extractionTeachers(id) {

    const searchId = id;
    const teacherById = [];
    let periodNo = 1;

    timeTable.forEach(period => {
        const innerTeacher = [];
        period.forEach(tuple => {
            const { classId, teacherId } = tuple;
            if (teacherId === searchId) {
                const teacherData = {'period': periodNo,'class':classId};
                innerTeacher.push(teacherData); 
            }
        });
        periodNo < 5 ? periodNo++ : periodNo = 1;
        teacherById.push(innerTeacher);
    });
    console.log(`Timetable for Teacher ${id}`) 
    console.log(teacherById);
    return teacherById;
}

extractionClasses(1);
extractionTeachers(2);

