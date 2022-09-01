const mongoose = require('mongoose');

const languageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { 
        type: String
    },
    power: { 
        type: Number
    }
});

module.exports = mongoose.model('language', languageSchema);