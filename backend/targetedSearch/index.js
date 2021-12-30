const { findSoftClashingPeriods, costFunction, findClashes } = require('../geneticAlgorithm/calculateFitness');
const { MAXIMUM_POSSIBLE_VARIATIONS, NUM_STEPS } = require('./constants');
const { deepCopyTimetable } = require('../utils/timetable');

function main (timetable) {
  const numPeriodsPerWeek = timetable.length;
  let index = 0;
  while (index < NUM_STEPS) {
    index++;
    const softClashes = findSoftClashingPeriods(timetable);
    console.log('NUM clashes', softClashes.length);
    softClashes.forEach((cl) => {
      const { el1, el2, classId } = cl;
      let count = 0;
      let allTimetables = [];
      allTimetables.push(timetable);
      const possibleReplacementPeriods = getPeriodsForClass(timetable, classId);
      while (count < MAXIMUM_POSSIBLE_VARIATIONS) {
        let selectedReplacementTuple = possibleReplacementPeriods[Math.floor(Math.random() * possibleReplacementPeriods.length)];
        allTimetables = swapPeriods(timetable, el1, el2, selectedReplacementTuple, allTimetables)
        count++;
      }
      timetable = deepCopyTimetable(findBestTimetable(allTimetables, numPeriodsPerWeek));
    });
    const clashes = findClashes(timetable);
    console.log('Hard Teacher Clashes', clashes.filter((cl) => cl.type === 'teacher').length);
    console.log('Hard Classes Clashes', clashes.filter((cl) => cl.type === 'class').length);
    const [cost, hardClashes, softClashes1] = costFunction(timetable, numPeriodsPerWeek);
    console.log('Cost', cost, 'hardClashes', hardClashes, 'soft', softClashes1);
  }
  return timetable;
}

function swapPeriods (timetable, el1, el2, selectedReplacementTuple, allTimetables) {
  let newTimetable = deepCopyTimetable(timetable);
  let { rl1, rl2 } = selectedReplacementTuple;
  newTimetable[el1][el2] = selectedReplacementTuple;
  newTimetable[rl1][rl2] = timetable[el1][el2];
  allTimetables.push(newTimetable);
  return allTimetables
};

function findBestTimetable (generation, numPeriodsPerWeek) {
  const tempGeneration = [];
  generation.forEach((parent) => {
    const [cost, hardClashes, softClashes] = costFunction(parent, numPeriodsPerWeek);
    console.log('Cost', cost, 'hardClashes', hardClashes, 'soft', softClashes);
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
  const bestFamilyMember = tempGeneration[0].parent;
  console.log('COST FOR BEST', costOfBestMemberInFamily, 'hard clashes', leastHardClashes, 'soft clashes', leastSoftClashes);
  return bestFamilyMember;
};

function getPeriodsForClass (timetable, selectedClassId) {
  let classes = [];
  timetable.forEach((period, periodNumber) => {
    period.forEach((tuple, tupleNumber) => {
      const { classId } = tuple;
      classId === selectedClassId ? classes.push({ rl1: periodNumber, rl2: tupleNumber, ...tuple }) : null;
    });
  });
  return classes;
};

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
};

module.exports = {
  main,
  getRandomNumber,
};
