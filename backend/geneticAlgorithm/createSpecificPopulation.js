const { getMaxBits, pad } = require('./utils');
const { specificClassData1,
    specificClassData2,
    specificClassData3,
    specificClassData4,
    specificClassData5 } = require('./constants');

function createSpecificPopulationForClass (specificClassData, population) {
    const { classId, teachersList } = specificClassData;
    teachersList.forEach(teacher => {
        for (i = 0; i < teacher.periodsPerWeek ; i++) {
            population.push(`teacher_${teacher.teacherId}` + `class_${classId}`);
        }
    });
    // console.log('population', population);
    return population;
}

function createEntirePopulation () {
    let population = [];
    population = createSpecificPopulationForClass(specificClassData1, population);
    population = createSpecificPopulationForClass(specificClassData2, population);
    population = createSpecificPopulationForClass(specificClassData3, population);
    population = createSpecificPopulationForClass(specificClassData4, population);
    population = createSpecificPopulationForClass(specificClassData5, population);
    console.log('CREATED POPULATION WITH LENGTH', population.length);
    return population;
}

// createEntirePopulation();


module.exports = {
    createEntirePopulation,
};