const specificClassData1 = {
    classId: 1,
    name: '11-A',
    // Sum of periods per week should be number of periods per day * number of days per week (5).
    teachersList: [
        {
            teacherId: 1,
            periodsPerWeek: 4,
        },
        {
            teacherId: 10,
            periodsPerWeek: 3,
        },
        {
            teacherId: 3,
            periodsPerWeek: 4,
        },
        {
            teacherId: 4,
            periodsPerWeek: 5,
        },
        {
            teacherId: 5,
            periodsPerWeek: 3,
        },
        {
            teacherId: 7,
            periodsPerWeek: 4,
        },
        {
            teacherId: 9,
            periodsPerWeek: 4,
        },
        {
            teacherId: 8,
            periodsPerWeek: 3,
        },
    ]
};

const specificClassData2 = {
    classId: 2,
    name: '11-B',
    // Sum of periods per week should be number of periods per day * number of days per week (5).
    teachersList: [
        {
            teacherId: 1,
            periodsPerWeek: 4,
        },
        {
            teacherId: 2,
            periodsPerWeek: 3,
        },
        {
            teacherId: 3,
            periodsPerWeek: 4,
        },
        {
            teacherId: 4,
            periodsPerWeek: 3,
        },
        {
            teacherId: 5,
            periodsPerWeek: 5,
        },
        {
            teacherId: 6,
            periodsPerWeek: 4,
        },
        {
            teacherId: 7,
            periodsPerWeek: 4,
        },
        {
            teacherId: 8,
            periodsPerWeek: 3,
        },
    ]
};

const specificClassData3 = {
    classId: 3,
    name: '11-C',
    // Sum of periods per week should be number of periods per day * number of days per week (5).
    teachersList: [
        {
            teacherId: 10,
            periodsPerWeek: 3,
        },
        {
            teacherId: 2,
            periodsPerWeek: 4,
        },
        {
            teacherId: 9,
            periodsPerWeek: 5,
        },
        {
            teacherId: 4,
            periodsPerWeek: 4,
        },
        {
            teacherId: 5,
            periodsPerWeek: 4,
        },
        {
            teacherId: 6,
            periodsPerWeek: 3,
        },
        {
            teacherId: 7,
            periodsPerWeek: 3,
        },
        {
            teacherId: 8,
            periodsPerWeek: 4,
        },
    ]
};

const specificClassData4 = {
    classId: 4,
    name: '11-D',
    // Sum of periods per week should be number of periods per day * number of days per week (5).
    teachersList: [
        {
            teacherId: 1,
            periodsPerWeek: 5,
        },
        {
            teacherId: 2,
            periodsPerWeek: 4,
        },
        {
            teacherId: 3,
            periodsPerWeek: 3,
        },
        {
            teacherId: 4,
            periodsPerWeek: 4,
        },
        {
            teacherId: 5,
            periodsPerWeek: 4,
        },
        {
            teacherId: 10,
            periodsPerWeek: 3,
        },
        {
            teacherId: 7,
            periodsPerWeek: 3,
        },
        {
            teacherId: 8,
            periodsPerWeek: 4,
        },
    ]
};


const specificClassData5 = {
    classId: 5,
    name: '11-E',
    // Sum of periods per week should be number of periods per day * number of days per week (5).
    teachersList: [
        {
            teacherId: 1,
            periodsPerWeek: 3,
        },
        {
            teacherId: 2,
            periodsPerWeek: 4,
        },
        {
            teacherId: 3,
            periodsPerWeek: 3,
        },
        {
            teacherId: 10,
            periodsPerWeek: 4,
        },
        {
            teacherId: 5,
            periodsPerWeek: 4,
        },
        {
            teacherId: 6,
            periodsPerWeek: 5,
        },
        {
            teacherId: 7,
            periodsPerWeek: 3,
        },
        {
            teacherId: 9,
            periodsPerWeek: 4,
        },
    ]
};

const specificClassData6 = {
    classId: 6,
    name: '12-A',
    // Sum of periods per week should be number of periods per day * number of days per week (5).
    teachersList: [
        {
            teacherId: 1,
            periodsPerWeek: 3,
        },
        {
            teacherId: 10,
            periodsPerWeek: 5,
        },
        {
            teacherId: 3,
            periodsPerWeek: 3,
        },
        {
            teacherId: 2,
            periodsPerWeek: 4,
        },
        {
            teacherId: 9,
            periodsPerWeek: 4,
        },
        {
            teacherId: 6,
            periodsPerWeek: 4,
        },
        {
            teacherId: 7,
            periodsPerWeek: 3,
        },
        {
            teacherId: 8,
            periodsPerWeek: 4,
        },
    ]
};


const specificClassData7 = {
    classId: 7,
    name: '12-B',
    // Sum of periods per week should be number of periods per day * number of days per week (5).
    teachersList: [
        {
            teacherId: 2,
            periodsPerWeek: 3,
        },
        {
            teacherId: 9,
            periodsPerWeek: 4,
        },
        {
            teacherId: 3,
            periodsPerWeek: 3,
        },
        {
            teacherId: 4,
            periodsPerWeek: 4,
        },
        {
            teacherId: 5,
            periodsPerWeek: 4,
        },
        {
            teacherId: 6,
            periodsPerWeek: 4,
        },
        {
            teacherId: 10,
            periodsPerWeek: 3,
        },
        {
            teacherId: 8,
            periodsPerWeek: 5,
        },
    ]
};

module.exports = {
    NUM_CLASSES: 7,
    NUM_TEACHERS: 10,
    NUM_PERIODS: 30,
    NUM_CHROMOSOMES: 32,
    NUM_GENERATIONS: 7999,
    MUTATION_RATE: 64,
    POPULATION_RATIO: 0.90,
    specificClassData1,
    specificClassData2,
    specificClassData3,
    specificClassData4,
    specificClassData5,
    specificClassData6,
    specificClassData7,
};
