const { NUM_PERIODS, NUM_CLASSES, NUM_CHROMOSOMES } = require('./constants');
const { costFunction } = require('./calculateFitness');
const { createAllTuples } = require('./createSpecificPopulation');

function createTimeTables () {
    let numArrays = 0;
    let avgCost = 0;
    const allTimeTables = [];
    while (numArrays < NUM_CHROMOSOMES) {
        const population = createAllTuples();
        const timetable = Array.from(Array(NUM_PERIODS), () => new Array(NUM_CLASSES));
        for (i = 0; i < NUM_PERIODS; i++) {
            for (j = 0; j < NUM_CLASSES; j++) {
                const randomTuple = population[Math.floor(Math.random() * population.length)];
                timetable[i][j] = randomTuple;
                population.splice(population.indexOf(randomTuple), 1);
            }
        }
        const totalCost = costFunction(timetable);
        avgCost = avgCost + totalCost;
        // console.log('TOTAL COST of Parent ->', totalCost);
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
