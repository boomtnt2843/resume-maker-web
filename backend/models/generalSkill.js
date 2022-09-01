const mongoose = require('mongoose');

const generalSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nameSkill: { 
        type: String
    },
    power: { 
        type: Number
    }
});

module.exports = mongoose.model('generalSKill', generalSchema);