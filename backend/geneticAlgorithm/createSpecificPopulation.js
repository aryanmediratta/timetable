const { specificClassData1,
    specificClassData2,
    specificClassData3,
    specificClassData4,
    specificClassData5,
    specificClassData6,
    specificClassData7, } = require('./constants');

// Returns A list of objects and index of last object.
function createTuplesForClass (specificClassData, population, index, uniqueIndex) {
    const { classId, teachersList } = specificClassData;
    teachersList.forEach(teacher => {
        uniqueIndex++;
        for (i = 0; i < teacher.periodsPerWeek ; i++) {
            index++;
            population.push({
                label: index,
                teacherId: teacher.teacherId,
                classId: classId,
                uniqueIndex,
            });
        }
    });
    return [
        population,
        index,
        uniqueIndex,
    ];
}


// Returns the final population using a helper function: `createTuplesForClass()`. 
function createAllTuples () {
    let population = [];
    let index = 0;
    let uniqueIndex = 0;
    [ population, index, uniqueIndex ] = createTuplesForClass(specificClassData1, population, index, uniqueIndex);
    [ population, index, uniqueIndex ] = createTuplesForClass(specificClassData2, population, index, uniqueIndex);
    [ population, index, uniqueIndex ] = createTuplesForClass(specificClassData3, population, index, uniqueIndex);
    [ population, index, uniqueIndex ] = createTuplesForClass(specificClassData4, population, index, uniqueIndex);
    [ population, index, uniqueIndex ] = createTuplesForClass(specificClassData5, population, index, uniqueIndex);
    [ population, index, uniqueIndex ] = createTuplesForClass(specificClassData6, population, index, uniqueIndex);
    [ population, index, uniqueIndex ] = createTuplesForClass(specificClassData7, population, index, uniqueIndex);
    return population;
}

module.exports = {
    createAllTuples,
};
