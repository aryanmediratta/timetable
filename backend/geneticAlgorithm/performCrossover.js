const { NUM_GENERATIONS, POPULATION_RATIO } = require('./constants');
const { costFunction, findHardClashingPeriods, findSoftClashingPeriods } = require('./calculateFitness');
// const { createRandomTimeTables } = require('./createRandomTimeTables');

// Receives two parents with the crossover point and mutation rate, returns the entire family.
function crossTwoParents (parent1, parent2, crossoverPoint, numClasses, numPeriods, hardClashingPeriods, softClashingPeriods, stopCrossover) {
  const family = [];
  let child1, child2;
  if (stopCrossover === true) {
    child1 = Array.from(Array(numPeriods), () => new Array(numClasses));
    child2 = Array.from(Array(numPeriods), () => new Array(numClasses));
    for (i = 0; i < numPeriods; i++) {
      for (j = 0; j < numClasses; j++) {
        child1[i][j] = parent2[i][j];
        child2[i][j] = parent1[i][j];
      }
    }
  } else {
    child1 = Array.from(Array(numPeriods), () => new Array(numClasses));
    child2 = Array.from(Array(numPeriods), () => new Array(numClasses));
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
  }
  // Mutating Child One.
  if (hardClashingPeriods && hardClashingPeriods.length > 0) {
    // console.log('HARD TARGETTING');
    const { el1, el2 } = hardClashingPeriods[Math.floor(Math.random() * hardClashingPeriods.length)];
    const x1 = Math.floor(Math.random() * numPeriods);
    const x2 = Math.floor(Math.random() * numClasses);
    const temp = child1[el1][el2];
    child1[el1][el2] = child1[x1][x2];
    child1[x1][x2] = temp;
  } else if (softClashingPeriods && softClashingPeriods.length > 0) {
    // console.log('SOFT TARGETTING');
    const { el1, el2 } = softClashingPeriods[Math.floor(Math.random() * softClashingPeriods.length)];
    const x1 = Math.floor(Math.random() * numPeriods);
    const x2 = Math.floor(Math.random() * numClasses);
    const temp = child1[el1][el2];
    child1[el1][el2] = child1[x1][x2];
    child1[x1][x2] = temp;
  } else {
    // console.log('NEVER hard ->', hardClashingPeriods.length, 'soft ->', softClashingPeriods.length);
    const i1 = Math.floor(Math.random() * numPeriods);
    const i2 = Math.floor(Math.random() * numPeriods);
    const j1 = Math.floor(Math.random() * numClasses);
    const j2 = Math.floor(Math.random() * numClasses);
    const temp = child1[i1][j1];
    child1[i1][j1] = child1[i2][j2];
    child1[i2][j2] = temp;
  }
  // Mutating Child Two.
  if (hardClashingPeriods && hardClashingPeriods.length > 0) {
    const { el1, el2 } = hardClashingPeriods[Math.floor(Math.random() * hardClashingPeriods.length)];
    const x1 = Math.floor(Math.random() * numPeriods);
    const x2 = Math.floor(Math.random() * numClasses);
    const temp = child2[el1][el2];
    child2[el1][el2] = child2[x1][x2];
    child2[x1][x2] = temp;
  } else if (softClashingPeriods && softClashingPeriods.length > 0) {
    const { el1, el2 } = softClashingPeriods[Math.floor(Math.random() * softClashingPeriods.length)];
    const x1 = Math.floor(Math.random() * numPeriods);
    const x2 = Math.floor(Math.random() * numClasses);
    const temp = child2[el1][el2];
    child2[el1][el2] = child2[x1][x2];
    child2[x1][x2] = temp;
  } else {
    const k1 = Math.floor(Math.random() * numPeriods);
    const k2 = Math.floor(Math.random() * numPeriods);
    const l1 = Math.floor(Math.random() * numClasses);
    const l2 = Math.floor(Math.random() * numClasses);
    const temp = child2[k1][l1];
    child2[k1][l1] = child2[k2][l2];
    child2[k2][l2] = temp;
  }
  family.push(parent1);
  family.push(parent2);
  family.push(child1);
  family.push(child2);
  return family;
}


// Receives all children + parents, return the average of new gen AND fittest members from the old generation.
function speciesPropogation (generation, teacherClashes, numPeriods) {
  const tempGeneration = [];
  let bestFamilyMember;
  generation.forEach(parent => {
    const [cost, hardClashes, softClashes] = costFunction(parent, numPeriods, teacherClashes);
    tempGeneration.push({
      cost,
      parent,
      hardClashes,
      softClashes,
    });
  });
  tempGeneration.sort((a,b) => a.cost - b.cost);
  const costOfBestMemberInFamily = tempGeneration[0].cost;
  const leastHardClashes = tempGeneration[0].hardClashes;
  const leastSoftClashes = tempGeneration[0].softClashes;
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
  if (costOfBestMemberInFamily < 2000) {
    bestFamilyMember = fittestMembers[0];
  }
  return {
    averageCostOfGeneration: total/fittestMembers.length,
    newGeneration: fittestMembers,
    costOfBestMemberInFamily: costOfBestMemberInFamily,
    bestFamilyMember: bestFamilyMember,
    leastHardClashes,
    leastSoftClashes,
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
    const cost = costFunction(parent)[0];
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

function generateTimetable (data, count) {
  console.log('-------------------------------------------------------------------------------');
  // let population = createRandomTimeTables(data);
  let stopCrossover = false;
  let leastSoftClashes = 1, bestFamilyMember, avg, maxHardClashes = 1, index = 2, crossoverPoint = null, costOfBestMemberInFamily = 10;
  while ((costOfBestMemberInFamily > 0) && (index <= NUM_GENERATIONS) && (((leastSoftClashes > 0) || maxHardClashes > 0))) {
    //
    const tempGeneration = [];
    let hardClashingPeriods, softClashingPeriods;
    const targetedMutationForHardClashes = maxHardClashes !== 0 ? true : false;
    if (targetedMutationForHardClashes) {
      hardClashingPeriods = findHardClashingPeriods(population[0], data.teacherClashes);
    } else {
      stopCrossover = true;
      softClashingPeriods = findSoftClashingPeriods(population[0]);
    }
    for (k = 0; k < population.length/2; k++) {
      const randomMember1 = population[Math.floor(Math.random() * population.length)];
      // Fixing crossover point for an entire generation.
      // crossoverPoint = Math.floor(Math.random() * data.numClasses);
      const family = crossTwoParents(randomMember1, population[k], crossoverPoint, data.numClasses, data.numPeriods, hardClashingPeriods, softClashingPeriods, stopCrossover);
      tempGeneration.push(...family);
    }
    // teacherClashes is an array of which teacher is not available during which period based on other timetables.
    const newGen = speciesPropogation(tempGeneration, data.teacherClashes, data.numPeriods);
    avg = newGen.averageCostOfGeneration;
    population = newGen.newGeneration;
    costOfBestMemberInFamily = newGen.costOfBestMemberInFamily;
    bestFamilyMember = newGen.bestFamilyMember;
    leastSoftClashes = newGen.leastSoftClashes;
    maxHardClashes = newGen.leastHardClashes;
    // console.log(`Avg of ${population.length} parents in ${index} Gen is -> ${avg} with BEST as ${costOfBestMemberInFamily} having ${maxHardClashes} hard and ${leastSoftClashes} soft clashes for class-${count}`);
    index++;
  }
  console.log(`Average of ${population.length} parents in ${index} Generation is -> ${avg} with BEST as ${costOfBestMemberInFamily} for class- ${count}.`);
  console.log('HARD CLASHES', maxHardClashes, ' SOFT CLASHES', leastSoftClashes);
  console.log('-------------------------------------------------------------------------------');
  return bestFamilyMember;
}

module.exports = {
  generateTimetable,
};
