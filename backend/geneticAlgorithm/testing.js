const { NUM_PERIODS, NUM_CLASSES, NUM_CHROMOSOMES } = require('./constants');
const { createEntirePopulation } = require('./createSpecificPopulation');

function justRun () {

    let numArrays = 0;
    while (numArrays<1) {
        const population = createEntirePopulation();
        console.log(population)
        const period = Array.from(Array(NUM_PERIODS), () => new Array(NUM_CLASSES));
        for (i = 0; i < NUM_PERIODS; i++) {
            for (j = 0; j < NUM_CLASSES; j++) {
                const randomTuple = population[Math.floor(Math.random() * population.length)];
                period[i][j] = randomTuple;
                population.splice(population.indexOf(randomTuple), 1);

                }
            }
            
        numArrays = numArrays + 1;
        }
}

// justRun();