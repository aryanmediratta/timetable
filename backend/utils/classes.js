function modifyClassesData(classesList) {
  const classes = [];
  const classFrequency = {};
  classesList && classesList.length > 0 && classesList.forEach((myClass) => {
    classFrequency[myClass.class] ? classFrequency[myClass.class]++ : classFrequency[myClass.class] = 1;
  });
  Object.keys(classFrequency).map((value) => {
    const obj = {};
    obj.value = value;
    obj.label = value;
    obj.numberOfSections = classFrequency[value];
    obj.disabled = true;
    classes.push(obj);
    return null;
  });
  return classes;
}

module.exports = {
  modifyClassesData,
};
