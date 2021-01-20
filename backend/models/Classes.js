const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let classSchema = new Schema({
        userEmail: {
            type: String,
            required: true
        },
        addClasses: {
            label: {
                type: String,
                required: true
            },
            section: {
                type: Number,
                required: true
            },
            value: {
                type: String,
                required: true
            },
        },
    }
    ,{
    timestamps: true,
    collection: 'Classes'
});

module.exports = mongoose.model('Classes', classSchema);