const mongoose = require('mongoose');

const educationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { 
        type: String
    },
    degress: { 
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

module.exports = mongoose.model('educations', educationSchema);