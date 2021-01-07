const { NUM_CLASSES, NUM_TEACHERS } = require('./constants');
const { getMaxBits, getSeparateChunks } = require('./utils');

function costOfParent (parent, costForClasses, costForTeachers) {
    // console.log('parent', parent);
    const bits = getMaxBits();
    parent.forEach(period => {
        const allClasses = [];
        const allTeachers = [];
        period.forEach(sets => {
            const elements = getSeparateChunks(sets, 9);
            elements.forEach((el, index) => {
                if (index === 0) {
                    allTeachers.indexOf(el) > -1 ? costForTeachers++ : allTeachers.push(el);
                } else if (index === 1) {
                    allClasses.indexOf(el) > -1 ? costForClasses++ : allClasses.push(el);
                }
            });
        });
        // console.log('All Teachers   -------------------', allTeachers);
        // console.log('costForTeachers  -----------------', costForTeachers);
        
        // console.log('All Classes', allClasses);
        // console.log('costForClasses ??', costForClasses);
    });
    return {
        costForTeachers, costForClasses
    };
}


module.exports = {
    costOfParent
};
