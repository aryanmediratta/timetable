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
            teacherId: 2,
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
            teacherId: 1,
            periodsPerWeek: 3,
        },
        {
            teacherId: 2,
            periodsPerWeek: 4,
        },
        {
            teacherId: 3,
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
            teacherId: 4,
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
            teacherId: 8,
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
            teacherId: 2,
            periodsPerWeek: 5,
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
            teacherId: 7,
            periodsPerWeek: 3,
        },
        {
            teacherId: 8,
            periodsPerWeek: 4,
        },
    ]
};

module.exports = {
    NUM_CLASSES: 6,
    NUM_TEACHERS: 8,
    NUM_PERIODS: 30,
    NUM_CHROMOSOMES: 200,
    NUM_GENERATIONS: 1000,
    MUTATION_RATE: 40,
    specificClassData1,
    specificClassData2,
    specificClassData3,
    specificClassData4,
    specificClassData5,
    specificClassData6,
};
