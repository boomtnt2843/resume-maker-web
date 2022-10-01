const mongoose = require('mongoose');

const generalSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { 
        type: String
    },
    power: { 
        type: Number,
        default: 3
    },
    ofInformation: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'information' 
    }
});

module.exports = mongoose.model('generalskills', generalSchema);