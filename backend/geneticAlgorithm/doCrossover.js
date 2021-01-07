const { NUM_PERIODS, NUM_CLASSES } = require('./constants');
const { costFunction } = require('./calculateFitness');
const { createTimeTables } = require('./generateRandomTimetables');

function crossingOver () {

    let iterator = 0;
    let parents  = createTimeTables();
    // let fakeParents = realParents;
    // let childTable = [];


    while (iterator < 10) {
        // const CROSSOVER_POINT = 2;
        // const CROSSOVER_POINT = Math.floor(Math.random()*NUM_CLASSES)
        // let [ parents, th ]  = createPeriods();
        const childTable = [];
        let tableEnd = parents.length - 1;
        let tableStart = 0;

        while (tableStart<tableEnd) {
            parents[tableStart].forEach((e, index) => {
                let CROSSOVER_POINT = Math.floor(Math.random()*NUM_CLASSES)
                for (i = CROSSOVER_POINT; i < NUM_CLASSES; i++) {
                    [e[i], parents[tableEnd][index][i]] =  [parents[tableEnd][index][i], e[i]]
                }
            })
            tableStart++;
            tableEnd--;
        } 
        
        let numArrays = 0;
        let avgCost = 0;

        parents.forEach(period => {
            const totalCost = costFunction(period);
            avgCost = avgCost + totalCost;
            console.log(`TOTAL COST of Child ${iterator + 1} ->`, totalCost);
            childTable.push(period);
            numArrays = numArrays + 1;
        });
        avgCost = avgCost/numArrays;
        console.log('Avg cost of', numArrays, `children ${iterator + 1} is`, avgCost);
        parents = childTable
        iterator++;
    }
}

crossingOver();
