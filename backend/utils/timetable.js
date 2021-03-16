const { costFunction, findSoftClashingPeriods } = require('../geneticAlgorithm/calculateFitness');

const NUM_STEPS = 3;

function getSuggestionsForEntity(entityId, selectedEntityId, timetable, entityType, period) {
  const [initialCost, hardClashes, softClashes] = costFunction(timetable, timetable.length, null);
  const [replacements, selectedElement] = getReplacementsForClass(entityId, selectedEntityId, timetable, entityType, period);
  console.log('repl', replacements.length);
  console.log('Broken', selectedElement);
  let allReplacements = [];
  for (let i = 0; i < replacements.length; i++) {
    allReplacements = swapElementsInTimetable(timetable, selectedElement, replacements[i], initialCost, allReplacements);
  }
  return allReplacements;
};

function swapElementsInTimetable(timetable, selectedElement, replacement, initialCost, allReplacements) {
  let oof = deepCopyTimetable(timetable);
  const { periodNumber, tupleId } = selectedElement;
  const { periodNumber: replacementPeriodNumber, tupleId: replacementTupleId } = replacement;
  oof[periodNumber][tupleId] = replacement;
  oof[replacementPeriodNumber][replacementTupleId] = selectedElement;
  const [cost, hardClashes, softClashes] = costFunction(oof, oof.length, null);
  console.log('cost', cost, 'compare with', initialCost);
  if (cost <= initialCost && selectedElement.teacherId !== replacement.teacherId) {
    console.log('period num-', replacement.periodNumber+1, 'teacher -', replacement.teacherName, 'class -', replacement.className);
    allReplacements.push(replacement);
  }
  return allReplacements;
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
