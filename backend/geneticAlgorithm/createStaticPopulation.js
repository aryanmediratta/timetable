const { NUM_CLASSES, NUM_TEACHERS } = require('./constants');
const { getMaxBits, pad } = require('./utils');

function createDefaultPopulation () {
    let teachersList = [];
    let classesList = [];
    // const initialPopulation = creatHumanReadableTuples(teachersList, classesList);
    const initialPopulation = createBinaryTyples(teachersList, classesList);
    return initialPopulation;
}

function creatHumanReadableTuples (teachersList, classesList) {
    for (i = 0; i < NUM_TEACHERS; i++) {
        // Teacher Name -> Human Readable Format
        teachersList.push(`teacher_${i}`);
    }
    for (i = 0; i < NUM_CLASSES; i++) {
        classesList.push(`class_${i}`);
    }
    let initialPopulation = [];
    teachersList.forEach(teacher => {
        classesList.forEach(classes => {
            initialPopulation.push(teacher + ' ' + classes);
        });
    });
    return initialPopulation;
}

function createBinaryTyples (teachersList, classesList) {
    const bits = getMaxBits();
    for (i = 0; i < NUM_TEACHERS; i++) {
        // Minimum Bit Binary ->
        teachersList.push((i).toString(2));
    }
    for (i = 0; i < NUM_CLASSES; i++) {
        classesList.push((i).toString(2));
    }
    let initialPopulation = [];
    teachersList.forEach(teacher => {
        teacher = pad(teacher, bits);
        classesList.forEach(classes => {
            classes = pad(classes, bits);
            initialPopulation.push(teacher + classes);
        });
    });
    return initialPopulation;
}

module.exports = {
    createDefaultPopulation,
};
