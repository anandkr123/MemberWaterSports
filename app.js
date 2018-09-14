const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./db');

const users = require('./routes/user');

const trips = require('./routes/trip');

mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
);


//var app = require('express')();
const server = require('http').Server(express);
const io = require('socket.io')(server);

io.on("connection", socket => {
    console.log("New client connected")
    socket.on("disconnect", () => {console.log("Client disconnected")});


    let db = mongoose.connection;

    const tripDetailAdmin = db.collection('tripdetails').watch();
    const userDetail = db.collection('users').watch();
    const userTrip = db.collection('trips').watch();


    tripDetailAdmin.on('change', function(change){
        console.log('tripdetal admin has changed');
        socket.emit('changetripdetail');
    });

    userDetail.on('change', function(change){
        console.log('users  have changed');
        socket.emit('changeuser');
    });
    userTrip.on('change', function(change){
        console.log('trip of user has changed');
        socket.emit('changetrip');
    });

    },
    err => { console.log('Can not connect to the database' +err)
    });

const app = express();
app.use(passport.initialize());
require('./passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', users);
app.use('/api/trips', trips);

app.get('/', function(req, res) {
    res.send('hello');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});