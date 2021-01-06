const { NUM_PERIODS, NUM_CLASSES, NUM_CHROMOSOMES } = require('./constants');
const { createDefaultPopulation } = require('./createStaticPopulation');
const { costOfParent } = require('./calculateFitness');
const { createEntirePopulation } = require('./createSpecificPopulation');

function createPeriods () {
    // const population = createDefaultPopulation();
    // console.log('Population', population);
    let numArrays = 0;
    let avgCost = 0;
    const timeTable = [];
    while (numArrays < NUM_CHROMOSOMES) {
        const population = createEntirePopulation();
        const period = Array.from(Array(NUM_PERIODS), () => new Array(NUM_CLASSES));
        for (i = 0; i < NUM_PERIODS; i++) {
            for (j = 0; j < NUM_CLASSES; j++) {
                const randomTuple = population[Math.floor(Math.random() * population.length)];
                period[i][j] = randomTuple;
                population.splice(population.indexOf(randomTuple), 1);
            }
        }
        let costForClasses = 0;
        let costForTeachers = 0;
        resp = costOfParent(period, costForClasses, costForTeachers);
        const totalCost = resp.costForClasses + resp.costForTeachers;
        avgCost = avgCost + totalCost;
        console.log('TOTAL COST of Parent ->', totalCost);
        timeTable.push(period);
        numArrays = numArrays + 1;
    }
    avgCost = avgCost/numArrays;
    console.log('Avg cost of', numArrays, 'parents is', avgCost);
}

createPeriods();
