const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TripSchema = new Schema({
    boat: {
        type: String,
        required: true
    } ,
    destination: {
        type: String,
        required: true
    },
    departure: {
        type: String,
        required: true
    },
    start: {
        type: String,
        required: true
    },
    signin: {
        type: String,
        required: true
    },
    signout: {
        type: String,
        required: true
    },
    end: {
        type: String,
        required: true
    },
    crew: {
        type: String,
        required: true
    },
    createdby: {
        type: String,
        required: true
    },
    arrival: {
        type: String,
        required: true
    },

});


const Trip = mongoose.model('trips', TripSchema);

module.exports = Trip;


