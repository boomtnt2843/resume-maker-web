const mongoose = require('mongoose');

const technicalSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nameSkill: { 
        type: String
    },
    power: { 
        type: Number
    }
});

module.exports = mongoose.model('technicalSkill', technicalSchema);