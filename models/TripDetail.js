const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logbook = new Schema({
    boatName: {
        type: String
    },
    crewName: [{
        type: String
    }],
    destination:{
        type: String
    },
    departure:{
        type:Date
    },
    arrival:{
        type:Date
    }

},{
    collection: 'logbook'
});

const TripDetail = mongoose.model('logbook', logbook);

module.exports = TripDetail


//module.exports = mongoose.model('logbook', logbook);