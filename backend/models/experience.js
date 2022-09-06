const mongoose = require('mongoose');

const experienceSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    location: { 
        type: String
    },
    position: { 
        type: String
    },
    detail:{
        type: String
    },
    startDate : {
        type: Date
    },
    endDate : {
        type: Date
    },
    ofInformation: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'information' 
    }
});

module.exports = mongoose.model('experiences', experienceSchema);