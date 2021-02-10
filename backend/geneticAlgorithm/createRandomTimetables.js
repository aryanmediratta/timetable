const { NUM_CHROMOSOMES, colorNames, myColors } = require('./constants');

function createRandomTimeTables (data) {
  const allTimeTables = [];
  let numArrays = 0;
  while (numArrays < NUM_CHROMOSOMES) {
    const population = [...data.population];
    const timetable = Array.from(Array(data.numPeriods), () => new Array(data.numClasses));
    for (i = 0; i < data.numPeriods; i++) {
      for (j = 0; j < data.numClasses; j++) {
        const randomTuple = population[Math.floor(Math.random() * population.length)];
        timetable[i][j] = randomTuple;
        population.splice(population.indexOf(randomTuple), 1);
      }
    }
    numArrays++;
    allTimeTables.push(timetable);
  }
  return allTimeTables;
}

function createTuples(data) {
  let population = [];
  let index = 0;
  let uniqueIndex = 0;
  if (data && data.length > 0) {
    data.forEach((classData) => {
      [ population, index, uniqueIndex ] = createTuplesForClass(classData, population, index, uniqueIndex);
    });
  }
  return population;
}

// Helper Function. Returns A list of objects, uniqueIndex and index of last object.
function createTuplesForClass (classData, population, index, uniqueIndex) {
  const { _id, label, teachersList } = classData;
  teachersList.forEach((teacher) => {
    uniqueIndex++;
    if (teacher.periodsPerWeek <= 5) {
      for (i = 0; i < teacher.periodsPerWeek ; i++) {
        index++;
        population.push({
          label: index,
          classId: _id,
          teacherId: teacher.teacherId,
          uniqueIndex,
          className: label,
          teacherName: teacher.teacherName,
          subject: teacher.subject,
          color: myColors[uniqueIndex],
          allowDoublePeriods: false,
        });
      }
    } else {
      for (i = 0; i < teacher.periodsPerWeek ; i++) {
        index++;
        population.push({
          label: index,
          classId: _id,
          teacherId: teacher.teacherId,
          uniqueIndex,
          className: label,
          teacherName: teacher.teacherName,
          subject: teacher.subject,
          color: myColors[uniqueIndex],
          allowDoublePeriods: true,
        });
      }
    }
  });
  return [
    population,
    index,
    uniqueIndex,
  ];
}

module.exports = {
  createRandomTimeTables,
  createTuples,
};
