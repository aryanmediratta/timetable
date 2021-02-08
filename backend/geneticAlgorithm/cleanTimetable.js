function removeBusinessLogic(timetable) {
  timetable.forEach((period) => {
    period.forEach((per) => {
      delete per.label;
      delete per.uniqueIndex;
    });
  });
  return timetable;
}

module.exports = {
  removeBusinessLogic,
};
