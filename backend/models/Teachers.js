const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let teacherSchema = new Schema({
  teacherName: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  teacherSubject: {
    type: String,
    required: true
  },
  classesTaught : [{
    label: {
      type: String,
      required: true
    },
    periodsPerWeek: {
      type: Number,
      required: true
    },
    _id: {
      type: String,
      required: true
    },
  }],
  }
  ,{
  timestamps: true,
  collection: 'Teachers'
});

module.exports = mongoose.model('Teacher', teacherSchema);
