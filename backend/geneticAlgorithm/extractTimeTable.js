const { NUM_CLASSES, NUM_PERIODS, NUM_GENERATIONS, MUTATION_RATE } = require('./constants');
const { easy } = require('./performCrossover');

const timeTable = easy();

function extractionClasses(id) {

    const searchId = id;
    const classById = [];

    timeTable.forEach(period => {
        const innerClasses = [];
        period.forEach(tuple => {
            const { classId, teacherId, label } = tuple;
            if (classId === searchId) { innerClasses.push(tuple); }
        });
        classById.push(innerClasses);
    }); 
    console.log(classById);
    return classById;
}

function extractionTeachers(id) {

    const searchId = id;
    const teacherById = [];

    timeTable.forEach(period => {
        const innerTeacher = [];
        period.forEach(tuple => {
            const { classId, teacherId, label } = tuple;
            if (teacherId === searchId) { innerTeacher.push(classId); }
        });
        teacherById.push(innerTeacher);
    }); 
    console.log(teacherById);
    return teacherById;
}

extractionClasses(1);
extractionTeachers(2);

