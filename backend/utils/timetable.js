const { costFunction, findSoftClashingPeriods } = require('../geneticAlgorithm/calculateFitness');

const NUM_STEPS = 3;

function getSuggestionsForEntity(entityId, selectedEntityId, timetable, entityType, period) {
  const tempTable = deepCopyTimetable(timetable);
  const [replacements, selectedElement] = getReplacementsForClass(entityId, selectedEntityId, timetable, entityType, period);
  console.log('repl', replacements.length);
  console.log('Broken', selectedElement);
  const moreTables = [];
  moreTables.push(tempTable);
  let tempGeneration = [];
  // const [cost, hardClashes, softClashes] = costFunction(timetable, timetable.length, null);
  // console.log('BESTT COST', cost, 'hardClashes', hardClashes, 'softClashes', softClashes);
  // const clashes = findSoftClashingPeriods(timetable);
  // console.log('SOFT CLAHSES', clashes.length);
  // return timetable;
// }
  for (let i = 0; i < replacements.length; i++) {
    const newTT = swapElementsInTimetable(tempTable, selectedElement, replacements[i]);
    moreTables.push(newTT);
  }
  moreTables.forEach((parent) => {
    const [cost, hardClashes, softClashes] = costFunction(parent, parent.length, null);
    console.log('COST', cost, 'hardClashes', hardClashes, 'softClashes', softClashes);
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
  console.log('BESTT COST', costOfBestMemberInFamily, 'hardClashes', leastHardClashes, 'softClashes', leastSoftClashes);
  return tempGeneration[0].parent;
};

function swapElementsInTimetable(timetable, selectedElement, replacement) {
  let oof = deepCopyTimetable(timetable);
  const { periodNumber, tupleId } = selectedElement;
  const { periodNumber: replacementPeriodNumber, tupleId: replacementTupleId } = replacement;
  oof[periodNumber][tupleId] = replacement;
  oof[replacementPeriodNumber][replacementTupleId] = selectedElement;
  return oof;
}

function getReplacementsForClass(entityId, selectedEntityId, timetable, entityType, myPeriodNumber) {
  const possibleReplacements = [];
  const selectedElement = [];
  timetable.forEach((period, periodNumber) => {
    period.forEach((tuple, tupleId) => {
      const { teacherId, classId } = tuple;
      if (entityType === 'Class') {
        (classId === entityId) && (myPeriodNumber - 1 !== periodNumber) ? possibleReplacements.push({ periodNumber, tupleId, ...tuple }) : null;
        (classId === entityId) && (myPeriodNumber - 1 === periodNumber) ? selectedElement.push({ periodNumber, tupleId, ...tuple }) : null;
      } else {
        (teacherId === entityId) && (myPeriodNumber - 1 !== periodNumber) ? possibleReplacements.push({ periodNumber, tupleId, ...tuple }) : null;
        (teacherId === entityId) && (myPeriodNumber - 1 === periodNumber) ? selectedElement.push({ periodNumber, tupleId, ...tuple }) : null;
      }
    });
  });
  console.log('selectedElement', selectedElement.length);
  return [possibleReplacements, selectedElement[0]];
}

function deepCopyTimetable (timetable) {
  if (!timetable || timetable.length === 0) {
    return [];
  }
  const numPeriods = timetable.length;
  const numClasses = timetable[0].length;
  let newTable = Array.from(Array(numPeriods), () => new Array(numClasses));
  for (i = 0; i < numPeriods; i++) {
    for (j = 0; j < numClasses; j++) {
      newTable[i][j] = timetable[i][j];
    }
  }
  return newTable;
};

module.exports = {
  getSuggestionsForEntity,
  deepCopyTimetable,
};
