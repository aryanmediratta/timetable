const { specificClassData1,
    specificClassData2,
    specificClassData3,
    specificClassData4,
    specificClassData5,
    specificClassData6 } = require('./constants');

// Returns A list of objects and index of last object.
function createTuplesForClass (specificClassData, population, index) {
    const { classId, teachersList } = specificClassData;
    teachersList.forEach(teacher => {
        for (i = 0; i < teacher.periodsPerWeek ; i++) {
            index++
            population.push({
                label: index,
                teacherId: teacher.teacherId,
                classId: classId,
            });
        }
    });
    return [
        population,
        index,
    ]
}


// Returns the final population using a helper function: `createTuplesForClass()`. 
function createAllTuples () {
    let population = [];
    let index = 0;
    [ population, index ] = createTuplesForClass(specificClassData1, population, index);
    [ population, index ] = createTuplesForClass(specificClassData2, population, index);
    [ population, index ] = createTuplesForClass(specificClassData3, population, index);
    [ population, index ] = createTuplesForClass(specificClassData4, population, index);
    [ population, index ] = createTuplesForClass(specificClassData5, population, index);
    [ population, index ] = createTuplesForClass(specificClassData6, population, index);
    return population;
}

module.exports = {
    createAllTuples,
};
