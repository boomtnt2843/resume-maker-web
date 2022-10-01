const mongoose = require('mongoose');

const informationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    format: { 
        type: Number,
        default: 1
    },
    firstName: { 
        type: String
    },
    lastName: { 
        type: String
    },
    position: { 
        type: String
    },
    age: { 
        type: Number
    },
    birthDay: { 
        type: Date
    },
    email: { 
        type: String
    },
    tel: { 
        type: String
    },
    facebook: { 
        type: String
    },
    linkedin: { 
        type: String
    },
    address: { 
        type: String
    },
    hobby: { 
        type: [String]
    },
    interest: { 
        type: [String]
    },
    owner : {
         type: mongoose.Schema.Types.ObjectId, 
         ref: 'users',
         required: true 
    }
});

module.exports = mongoose.model('information', informationSchema);