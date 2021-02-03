const mongoose = require('mongoose');

const schema = mongoose.Schema({
  userEmail: {
    type: String,
    required: true
  },
  numPeriods: {
    type: Number,
    required: false,
  },
  timetable: {
    type: Array,
    required: false,
  }}
  ,{
  timestamps: true,
  collection: 'Timetables'
});

module.exports = mongoose.model('Timetable', schema);
