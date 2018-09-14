const express = require('express');
const router = express.Router({mergeParams:true});

const Trip = require('../models/Trip');
const TripDetail = require('../models/TripDetail');

let boatpass =  "above" ;

router.post('/trip', function(req, res) {

    const newTrip = new Trip({
        boat: req.body.boat,
        destination: req.body.destination,
        departure: req.body.departure,
        start: req.body.start,
        signin: req.body.signin,
        signout: req.body.signout,
        end: req.body.end,
        crew: req.body.crew,
        createdby: req.body.createdby,
        arrival: req.body.arrival
    });


    newTrip.save()
        .then(trip => {
            res.json(trip);
                    })
        .catch(err => {
            res.status(400).send("unable to save to database" + err);
        });
});

// router.get('/trip/:boat', function(req, res, next) {
//       const boat = (req.params.boat).toString;                    // FETCH WITH THE BOAT ONE
//     Trip.find({"boat": boat}, function (err, trips){
//         if(err){
//             console.log(err);
//         }else{
//             res.json(trips);
//         }
// });
// });

// router.get('/trip', function(req, res, next) {                                 // WORKING ONE
//     //  const boat = req.param("boat");
//     Trip.findOne({"boat": "penguien"}, function (err, tripdetails) {
//
//         //console.log(tripdetails);
//         if (err) {
//             console.log(res.json);
//         } else {
//             res.json(tripdetails);
//         }
//     });
// });


router.post('/trip/boat', function(req, res, next) {                                 // WORKING ONE
    //  const boat = req.param("boat");

  // console.log(boatpass);
    Trip.findOne({"boat": boatpass}, function (err, tripdetails) {
        //console.log(tripdetails);
        if (err) {
            console.log(res.json);
        } else {
            res.json(tripdetails);
        }
    });
});
router.post('/trip/user', function(req, res, next) {
    //const id1 = req.params.id.toString();
   // console.log(req.body);
    //console.log("coming")
console.log(req.body.crew);
    Trip.updateOne({"createdby": req.body.createdby},        // change to dynamic id
        { $set:
                {
                    signin: req.body.signin,
                    signout: req.body.signout,
                    end: req.body.end,
                    crew: req.body.crew,
                    arrival: req.body.arrival
                }
        }, function (err, tripdetails) {

            //console.log(tripdetails);
            if (err) {
                console.log(res.json);
            } else {
                res.json(tripdetails);
            }
        });
});

// router.post('/sign', function(req, res, next) {
//     boatpass=req.body.boatItem;
//     // console.log(req.body);
//     //console.log("coming")
//
//     Trip.updateOne({"boat": boatpass},
//         { $set:
//                 {
//                     signin: 'Sign In',
//                     signout: 'Sign Out',
//                     end : 'N/A'
//                 }
//         }, function (err, tripdetails) {
//
//             //console.log(tripdetails);
//             if (err) {
//                 console.log(res.json);
//             } else {
//                 res.json(tripdetails);
//             }
//         });
// });
//



// router.post('/trip/:user', function(req, res, next) {
//     //  const boat = req.param("boat");
//
//     const user=req.params.user.toString();                        // for a specjfuc user
//     Trip.updateOne({"createdby": user },
//         { $set:
//                 {
//                     signin: req.body.signin,
//                     signout: req.body.signout,
//                     end: req.body.end,
//                     crew: req.body.crew,
//                     arrival: req.body.arrival
//                 }
//         })
// });


// router.get('/tripdetail/row', function(req, res, next) {
//     //const id1 = req.params.ID.toString();
//  //console.log("peace");
//     TripDetail.find({"_id" : "5b95773607a7b194e0904940"}, function (err, tripdetails) {
//
//         //console.log(tripdetails);
//         if (err) {
//             console.log(res.json);
//         } else {
//             res.json(tripdetails);
//         }
//     });
// });


router.post('/tripdetail/row', function(req, res, next) {
    //const id1 = req.params.id.toString();
   // console.log(req.params);
    TripDetail.updateOne({"_id" : req.body.keyItem},        // change to dynamic id
        { $set:
                {
                    status : "started"
                }
        }, function (err, tripdetails) {

            //console.log(tripdetails);
            if (err) {
                console.log(res.json);
            } else {
                res.json(tripdetails);
            }
        });
});

router.post('/tripdetail/specific', function(req, res, next) {
    //const id1 = req.params.id.toString();
    // console.log(req.params);
    //console.log(req.body);

    boatpass=req.body.boatItem;
console.log(req.body.crewItem);
TripDetail.updateOne(
    { _id: req.body.keyItem },
    { $addToSet: { crewName: { $each: [req.body.crewItem] } } }
, function (err, tripdetails) {
        //console.log(tripdetails);
        if (err) {
            console.log(res.json);
        } else {
            res.json(tripdetails);
        }
    })


    // //console.log(boatpass);
    // TripDetail.find({"_id" : req.body.keyItem},        // change to dynamic id
    //     function (err, tripdetails) {
    //
    //         //console.log(tripdetails);
    //         if (err) {
    //             console.log(res.json);
    //         } else {
    //             res.json(tripdetails);
    //         }
    //     });
});


router.post('/tripdetail/status', function(req, res, next) {
    //const id1 = req.params.id.toString();
    // console.log(req.params);
    //console.log(req.body);

    boatpass=req.body.boatItem;
    console.log(req.body.crewItem);
    TripDetail.findOne(
        {
            "_id": req.body.keyItem
        }
        , function (err, tripdetails) {
            //console.log(tripdetails);
            if (err) {
                console.log(res.json);
            } else {
                res.json(tripdetails);
            }
        })
});


router.post('/tripdetail/in', function(req, res, next) {
    //const id1 = req.params.id.toString();
    // console.log(req.params);
    //console.log(req.body);


    TripDetail.updateOne(
        { boatName: boatpass },
        { $addToSet: { crewName: { $each: [req.body.crewItem] } } } , function (err, tripdetails) {
            //console.log(tripdetails);
            if (err) {
                console.log(res.json);
            } else {
                res.json(tripdetails);
            }
        }
    )
});

router.post('/tripdetail/out', function(req, res, next) {
    //const id1 = req.params.id.toString();
    // console.log(req.params);
    //console.log(req.body);
console.log(req.body.arrivalItem);
    TripDetail.updateOne(

        {"boatName": boatpass},
        {
            $set:
                {
                    arrival: req.body.arrivalItem
                }
        } , function (err, tripdetails) {
            //console.log(tripdetails);
            if (err) {
                console.log(res.json);
            } else {
                res.json(tripdetails);
            }
        }
    )
});

router.get('/tripdetail', function(req, res, next) {

    TripDetail.find({}, function (err, tripdetails){
        if(err){
            console.log(err);
        }else{
            res.json(tripdetails);
        }
    });
});
module.exports = router;