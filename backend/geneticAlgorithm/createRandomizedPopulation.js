const NUM_TEACHERS = 9;
const NUM_CLASSES = 8;
const SIZE_OF_POPULATION = NUM_TEACHERS * NUM_CLASSES;

// All of this is testing code, not being used anywhere right now.

function createRandomizedPopulation () {
    let teachersList = [];
    let classesList = [];
    for (i = 0; i < NUM_TEACHERS; i++) {
        // teachersList.push(`teacher_${i}`);
        teachersList.push(createBinaryString(i));
        // teachersList.push((i).toString(2));
    }
    for (i = 0; i < NUM_CLASSES; i++) {
        // classesList.push(`class_${i}`);
        classesList.push(createBinaryString(i));
        // classesList.push((i).toString(2));
    }
    let map = [];

    while (map.length < SIZE_OF_POPULATION) {
        console.log('Size', map.length)
        const resp = _randomizer(teachersList, classesList, map);
        teachersList = resp.teachersList;
        classesList = resp.classesList;
        map = resp.map;
    }
    console.log(map);
    return map;
}

function _randomizer(teachersList, classesList, map) {
    const key = teachersList[Math.floor(Math.random() * teachersList.length)];
    const value = classesList[Math.floor(Math.random() * classesList.length)];
    if (!_hasKeyValuePair(map, key, value) === true) {
        map.push({
            key: key,
            value: value,
        });
    }
    return {
        teachersList, classesList, map
    };
}

function _hasKeyValuePair(map, key, value) {
    const allElementsWithSameKey = map.filter(el => el.key === key);
    if (allElementsWithSameKey.length > 0) {
        const found = allElementsWithSameKey.filter(el => el.value === value);
        if (found && found.length > 0) {
            return true;
        }
    }
    return false;
}

function createBinaryString (nMask) {
    for (var nFlag = 0, nShifted = nMask, sMask = ""; nFlag < 32;
        nFlag++, sMask += String(nShifted >>> 31), nShifted <<= 1);
    return sMask;
}

createRandomizedPopulation();

module.exports = {
    createRandomizedPopulation,
};
