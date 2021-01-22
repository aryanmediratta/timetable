const { NUM_GENERATIONS, MUTATION_RATE, POPULATION_RATIO } = require('./constants');
const { costFunction, findClashes } = require('./calculateFitness');
const { probability } = require('./utils');
const { createTimeTables } = require('./generateRandomTimetables');


// Receives two parents with the crossover point, returns the entire family.
function crossTwoParents (parent1, parent2, crossoverPoint, mutationRate, numClasses, numPeriods) {
    const family = [];
    const child1 = Array.from(Array(numPeriods), () => new Array(numClasses));
    const child2 = Array.from(Array(numPeriods), () => new Array(numClasses));
    for (i = 0; i < numPeriods; i++) {
        for (j = 0; j < numClasses; j++) {
            if (j < crossoverPoint || Math.floor(Math.random() * numClasses)) {
                child1[i][j] = parent1[i][j];
                child2[i][j] = parent2[i][j];
            } else {
                child1[i][j] = parent2[i][j];
                child2[i][j] = parent1[i][j];
            }
        }
    }
    if (probability(mutationRate)) {
        const i1 = Math.floor(Math.random() * numPeriods);
        const i2 = Math.floor(Math.random() * numPeriods);
        const j1 = Math.floor(Math.random() * numClasses);
        const j2 = Math.floor(Math.random() * numClasses);
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
    const tempGeneration = [];
    let bestFamilyMember;
    generation.forEach(parent => {
        const cost = costFunction(parent);
        tempGeneration.push({
            cost: cost,
            parent: parent,
        });
    });
    tempGeneration.sort((a,b) => a.cost - b.cost);
    const costOfBestMemberInFamily = tempGeneration[0].cost;
    const fittestMembers = [];
    let total = 0;
    const sizeOfGoodPopulation = (tempGeneration.length/2) * POPULATION_RATIO;
    const sizeOfBadPopulation = tempGeneration.length/2;
    for (i = 0; i < tempGeneration.length-1; i++) {
        if (i < sizeOfGoodPopulation) {
            total = total + tempGeneration[i].cost;
            fittestMembers.push(tempGeneration[i].parent);
        } else if (i < sizeOfBadPopulation) {
            // Random member ->
            const randomMember1 = tempGeneration[Math.floor(Math.random() * tempGeneration.length)];
            total = total + randomMember1.cost;
            fittestMembers.push(randomMember1.parent);

            // One of Worst Members.
            // total = total + tempGeneration[tempGeneration.length-1-i].cost;
            // fittestMembers.push(tempGeneration[tempGeneration.length-1-i].parent);
        } else break;
    }
    if (costOfBestMemberInFamily < 200) {
        bestFamilyMember = fittestMembers[0];
    }
    return {
        averageCostOfGeneration: total/fittestMembers.length,
        newGeneration: fittestMembers,
        costOfBestMemberInFamily: costOfBestMemberInFamily,
        bestFamilyMember: bestFamilyMember,
    };
}


// Roulette Wheel Selection function. Selects member from population by probability of selection. Returns one member.
function pickAWinningItem (population) {
    const winner = Math.random();
    let threshold = 0;
    for (let i = 0; i < population.length; i++) {
        threshold += parseFloat(population[i].probabilityOfSelection);
        if (threshold > winner) {
            return population[i].data;
        }
    }
}


// Find probability of selection of each member in population, returns population. 
function addCostAndProbabilityOfSelectionToPopulation (population) {
    const populationWithCost = [];
    let sum = 0;
    population.forEach(parent => {
        const cost = costFunction(parent);
        sum = sum + cost;
        populationWithCost.push({
            cost: cost,
            data: parent,
        });
    });
    const populationWithProbability = [];
    populationWithCost.forEach(member => {
        populationWithProbability.push({
            cost: member.cost,
            data: member.data,
            probabilityOfSelection: (member.cost/sum), 
        });
    });
    return populationWithProbability;
}

function easy (data) {
    let [population, _avgCost] = createTimeTables(data);
    let index = 2;
    let avg;
    let costOfBestMemberInFamily = 10;
    let bestFamilyMember;
    let crossoverPoint = null;
    const mutationRate = (MUTATION_RATE/100);
    while ((costOfBestMemberInFamily > 0) && (index <= NUM_GENERATIONS)) {
        const tempGeneration = [];
        for (k = 0; k < population.length/2; k++) {
            const randomMember1 = population[Math.floor(Math.random() * population.length)];
            // Fixing crossover point for an entire generation.
            // crossoverPoint = Math.floor(Math.random() * data.numClasses);
            const family = crossTwoParents(randomMember1, population[k], crossoverPoint, mutationRate, data.numClasses, data.numPeriods);
            tempGeneration.push(...family);
        }
        const newGen = speciesPropogation(tempGeneration);
        avg = newGen.averageCostOfGeneration;
        population = newGen.newGeneration;
        costOfBestMemberInFamily = newGen.costOfBestMemberInFamily;
        bestFamilyMember = newGen.bestFamilyMember;
        console.log(`Average of ${population.length} parents in ${index} Generation is -> ${avg} with BEST as ${costOfBestMemberInFamily}`);
        index++;
    }
    // console.log('bestFamilyMember',bestFamilyMember);
    console.log('-------------------------------------------------------------------------------');
    console.log(`Average of ${population.length} parents in ${index} Generation is -> ${avg} with BEST as ${costOfBestMemberInFamily}`);
    myClashes = findClashes(bestFamilyMember);
    console.log('HARD CLASHES', myClashes[0], ' SOFT CLASHES', myClashes[1]);
    return bestFamilyMember;
}

// easy();

module.exports = {
    easy,
};
