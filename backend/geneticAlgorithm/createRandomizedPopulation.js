const NUM_TEACHERS = 9;
const NUM_CLASSES = 8;
const SIZE_OF_POPULATION = NUM_TEACHERS * NUM_CLASSES;

// DEPRECATED CODE, NOT BEING USED ANYWHERE.

// Returns Random population based on number of teachers and number of classes.
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
        map = resp.list;
    }
    console.log(map);
    return map;
}


// Randomizer which adds unique key value pairs to a List
function _randomizer(teachersList, classesList, list) {
    const key = teachersList[Math.floor(Math.random() * teachersList.length)];
    const value = classesList[Math.floor(Math.random() * classesList.length)];
    if (!_hasKeyValuePair(list, key, value) === true) {
        list.push({
            key: key,
            value: value,
        });
    }
    return {
        teachersList, classesList, list
    };
}

// createRandomizedPopulation();
