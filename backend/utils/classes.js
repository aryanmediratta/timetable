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

function addTeachersToClasses(classesList, teachersList) {
  const allClasses = [];
  classesList.forEach((obj) => {
    allClasses.push({ _id: obj._id.toString(), label: obj.label, periodsPerWeek: 0, class: obj.class, teachersList: [] });
  });
  allClasses.forEach((parentClass) => {
    teachersList && teachersList.forEach((teacher) => {
      teacher.classesTaught.forEach((classObject) => {
        if (parentClass._id === classObject._id.toString()) {
          parentClass.periodsPerWeek = parentClass.periodsPerWeek + classObject.periodsPerWeek;
          parentClass.teachersList = [
            ...parentClass.teachersList,
            {
              teacherId: teacher._id,
              teacherName: teacher.teacherName,
              subject: teacher.teacherSubject,
              periodsPerWeek: classObject.periodsPerWeek,
            }
          ];
        }
      });
    });
  });
  return allClasses;
}

module.exports = {
  modifyClassesData,
  addTeachersToClasses,
};
