const mongoose = require('mongoose');

const technicalSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nameSkill: { 
        type: String
    },
    power: { 
        type: Number
    },
    ofInformation: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'information' 
    }
});

module.exports = mongoose.model('technicalSkill', technicalSchema);