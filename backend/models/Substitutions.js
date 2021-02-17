const mongoose = require('mongoose');

const schema = mongoose.Schema({
    subDate: {
        type: String,
        required: true
    },
    absentTeachers: {
        type: Array,
        required: false
    },
    subChart: {
        type: Array,
        required: false
    },
    userEmail: {
        type: String,
        required: true
    }}
    ,{
    timestamps: true,
    collection: 'Substitutions'
});

module.exports = mongoose.model('Substitution', schema);
