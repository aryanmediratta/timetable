const { NUM_CLASSES, NUM_PERIODS, NUM_GENERATIONS, MUTATION_RATE } = require('./constants');
const { easy } = require('./performCrossover');

const timeTable = easy();

function extraction(string, id) {

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
    }
}

extraction('teacher', 1);
extraction('Class', 2);

