const { NUM_CHROMOSOMES } = require('./constants');
const { costFunction } = require('./calculateFitness');
const { createAllTuples } = require('./createSpecificPopulation');

function createTimeTables (data) {
  let numArrays = 0;
  let avgCost = 0;
  const allTimeTables = [];
  while (numArrays < NUM_CHROMOSOMES) {
    const population = createAllTuples(data.teachersList);
    const timetable = Array.from(Array(data.numPeriods), () => new Array(data.numClasses));
    for (i = 0; i < data.numPeriods; i++) {
      for (j = 0; j < data.numClasses; j++) {
        const randomTuple = population[Math.floor(Math.random() * population.length)];
        timetable[i][j] = randomTuple;
        population.splice(population.indexOf(randomTuple), 1);
      }
    }
    const totalCost = costFunction(timetable)[0];
    avgCost = avgCost + totalCost;
    allTimeTables.push(timetable);
    numArrays = numArrays + 1;
  }
  avgCost = avgCost/numArrays;
  console.log('Avg cost of 1st gen ->', numArrays, 'parents is', avgCost);
  return [
    allTimeTables,
    avgCost
  ];
}

// createTimeTables();

module.exports = {
  createTimeTables,
};
