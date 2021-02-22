function generateSubstitutions(date) {
  subDate = new Date(date);
  day = subDate.getDay();
  return day;
}

function getSubDateData(day, timetable) {

}

module.exports = {
  generateSubstitutions,
  getSubDateData,
};