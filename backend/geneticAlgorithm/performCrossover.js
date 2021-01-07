const { NUM_CLASSES, NUM_PERIODS, NUM_GENERATIONS, MUTATION_RATE } = require('./constants');
const { createTimeTables } = require('./generateRandomTimetables');
const { costFunction } = require('./calculateFitness');
const { probability } = require('./utils');


// Receives two parents with the crossover point, returns the entire family.
function crossTwoParents (parent1, parent2, crossoverPoint, performMutation) {
    const family = [];
    const child1 = Array.from(Array(NUM_PERIODS), () => new Array(NUM_CLASSES));
    const child2 = Array.from(Array(NUM_PERIODS), () => new Array(NUM_CLASSES));
    for (i = 0; i < NUM_PERIODS; i++) {
        for (j = 0; j < NUM_CLASSES; j++) {
            if (j < crossoverPoint || Math.floor(Math.random() * NUM_CLASSES)) {
                child1[i][j] = parent1[i][j];
                child2[i][j] = parent2[i][j];
            } else {
                child1[i][j] = parent2[i][j];
                child2[i][j] = parent1[i][j];
            }
        }
    }
    if (probability(performMutation)) {
        const i1 = Math.floor(Math.random() * NUM_PERIODS);
        const i2 = Math.floor(Math.random() * NUM_PERIODS);
        const j1 = Math.floor(Math.random() * NUM_CLASSES);
        const j2 = Math.floor(Math.random() * NUM_CLASSES);
        const temp = child1[i1][j1];
        child1[i1][j1] = child1[i2][j2];
        child1[i2][j2] = temp;
        // console.log('MUTATING THIS STRAIN HERE ----------------------');
    }
    family.push(parent1);
    family.push(parent2);
    family.push(child1);
    family.push(child2);
    return family;
}


// Receives all children + parents, return the average of new gen AND fittest members from the old generation.
function speciesPropogation (generation) {
    const costOfTempGeneration = [];
    generation.forEach((parent, index) => {
        const cost = costFunction(parent);
        costOfTempGeneration.push({
            index: index,
            cost: cost,
        });
    });
    costOfTempGeneration.sort((a,b) => a.cost - b.cost);
    const costOfBestMemberInFamily = costOfTempGeneration[0].cost;
    const fittestMembers = [];
    let total = 0;
    costOfTempGeneration.forEach((member, id) => {
        if (id < costOfTempGeneration.length/2) {
            total = total + member.cost;
            fittestMembers.push(member.index);
        }
    });
    const newGeneration = [];
    generation.forEach((gen, i) => {
        fittestMembers.indexOf(i) > -1 ? newGeneration.push(gen) : null;
    });
    const bestFamilyMember = newGeneration[0];
    const secondBestFamilyMember = newGeneration[1];
    return {
        averageCostOfGeneration: total/newGeneration.length,
        newGeneration: newGeneration,
        costOfBestMemberInFamily: costOfBestMemberInFamily,
        bestFamilyMember: bestFamilyMember,
        secondBestFamilyMember: secondBestFamilyMember,
    };
}


function easy () {
    let [population, avgCost] = createTimeTables();
    let index = 2;
    let avg;
    let costOfBestMemberInFamily = 10;
    let secondBestFamilyMember;
    let totalImprovement;
    let bestFamilyMember;
    const numberOfMutations = (MUTATION_RATE/100) * population.length;
    while (costOfBestMemberInFamily > 0) {
        const tempGeneration = [];
        for (k = 0; k < population.length; k+=2) {
            const family = crossTwoParents(population[k], population[k+1], null, numberOfMutations);
            tempGeneration.push(...family);
        }
        const newGen = speciesPropogation(tempGeneration);
        avg = newGen.averageCostOfGeneration;
        population = newGen.newGeneration;
        costOfBestMemberInFamily = newGen.costOfBestMemberInFamily;
        totalImprovement = avgCost - avg;
        bestFamilyMember = newGen.bestFamilyMember;
        secondBestFamilyMember = newGen.secondBestFamilyMember;
        console.log(`Average of ${population.length} parents in ${index} Generation is -> ${avg} with BEST as ${costOfBestMemberInFamily}`);
        index++;
    }
    console.log('Total improvement', totalImprovement);
    // console.log('bestFamilyMember',bestFamilyMember);
    console.log('-------------------------------------------------------------------------------');
    console.log(`Average of ${population.length} parents in ${index} Generation is -> ${avg} with BEST as ${costOfBestMemberInFamily}`);
}

easy();
