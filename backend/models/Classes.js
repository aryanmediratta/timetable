const mongoose = require('mongoose');

const schema = mongoose.Schema({
  class: {
    type: Number,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  }}
  ,{
  timestamps: true,
  collection: 'Classes'
});

module.exports = mongoose.model('Classes', schema);
