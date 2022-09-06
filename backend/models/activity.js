const mongoose = require('mongoose');

const activitySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nameHeader: { 
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

module.exports = mongoose.model('activities', activitySchema);