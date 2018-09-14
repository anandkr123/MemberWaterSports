import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getTripDetail} from '../actions/trip';
import {Grid,Row,Col} from "react-bootstrap"
import axios from 'axios';
import Trip from './Trip';
import {CREATE_TRIP} from "../actions/types";
import {Route} from "react-router-dom";
import Register from "./Register";
import Provider from "react-redux/es/components/Provider";
import io from 'socket.io-client';


class TripDetail extends Component {

    constructor(props) {

        super(props);

        this.state = {
            errors: {},
            trip_details: [],
            boatName: '',
            destination: '',
            departure : '',
            crewName:[],
            arrival:'',
         //   boat_pass : 'seagull',
            select: 'start',
            status : 'check'
            // this.handleOnChange = this.handleOnChange.bind(this);
        }
        //this.handleSubmitStart = this.handleSubmitStart.bind(this);
        this.handleSubmitStatus = this.handleSubmitStatus.bind(this);
       // this.onUpdate = this.onUpdate.bind(this);
        // this.ClickStart = this.ClickStart.bind(this);
        // this.ClickStatus = this.ClickStatus.bind(this);
        this.handleSubmitSelect = this.handleSubmitSelect.bind(this);
    };
    componentWillMount() {
        //const boat_pass= this.state.boat_pass;
     //   document.getElementById("htmlstatusItem").style.visibility = "hidden";

        axios.get('/api/trips/tripdetail')
            .then(res => {

                const trip_details = res.data;
                this.setState({ trip_details });

            })





        //this.props.getTrip(this.props.history);
    }
    componentDidMount(){


    }

    componentWillReceiveProps(nextProps) {

    }



//     handleSubmitStatus(key,boat){
//
//         const key1 = {
//             keyItem : key,
//             boatItem: boat
//         };
//
//
//       //  console.log(key1.boatItem);
//         axios.post('/api/trips/tripdetail/specific',key1
//     //         , {           // FETCH WITH SPECIFIC KEY
//     //     params: {
//     //         id: key
//     //     }
//     //
//     // }
//     )
//
//         .then(res => {
//
//             if(res.data[0].status === "start")
//             {
//                 window.alert("Start the trip first")
//             }
//             else {
//
//                 axios.post('/api/trips/sign', key1)
//
//             }
//         })
//
// }

    handleSubmitSelect(key,boat,destination,departure,crew,arrival) {

        if(this.props.auth.isAuthenticated){
     //
        const key1 = {
                    keyItem : key,
                    boatItem: boat,
                    crewItem: this.props.auth.user.name
                };
               console.log(key1.boatItem)
                axios.post('/api/trips/tripdetail/status',key1)      // INCLUDE PARAMS LATER
                    .then(res => {
                        console.log(res.data);
                        if(res.data.crewName.length > 1)
                            window.alert("Trip has already been started")
                        else{
                            document.getElementById("htmlselectItem").innerHTML = "started"
                            axios.post('/api/trips/tripdetail/specific',key1)      // INCLUDE PARAMS LATER
                                .then(res => {
                                    console.log(res.data);
                                });

                                            const socket = io('http://localhost:3000/trip');
                                            socket.on('changetripdetail', () =>{
                                                console.log("connected to socket");
                                                axios.get('/api/trips/tripdetail')
                                                    .then(res => {

                                                        const trip_details = res.data;
                                                        this.setState({ trip_details });

                                                    })
                                            });

                            const trip = {
                            boat : boat,
                            destination : destination,
                            departure : departure,
                            start: 'started',
                            signin: 'You have started',
                            signout: 'You can end',
                            end : 'End',
                            crew : this.props.auth.user.name,
                            createdby : this.props.auth.user.name,
                            arrival : 'Not yet arrived'
                        }

                            axios.post('/api/trips/trip', trip)


                        }
                    })

                            }
                            else

                                this.props.history.push('/login')

    }

    handleSubmitStatus(key,boat,destination,departure,crew,arrival) {

        if(this.props.auth.isAuthenticated){

            const key1 = {
                keyItem : key,
                boatItem: boat
            };
            console.log(key1.boatItem)
            axios.post('/api/trips/tripdetail/status',key1)      // INCLUDE PARAMS LATER
                .then(res => {
                    console.log(res.data);

                    if(res.data.crewName.length === 1 || (res.data.crewName[1] === this.props.auth.user.name))
                        window.alert("Either start the trip first or you have already started the trip")
                    else{
                        document.getElementById("htmlstatusItem").innerHTML = "do refresh"
                        const trip = {
                            boat : boat,
                            destination : destination,
                            departure : departure,
                            start: 'started',
                            signin: 'Sign In',
                            signout: 'Sign Out',
                            end : 'N/A',
                            crew : String.join(",", crew),
                            createdby : res.data.crewName[1],
                            arrival : 'Not yet arrived'
                        }

                        axios.post('/api/trips/trip', trip)

                    }

                })

        }
        else

            this.props.history.push('/login')

    }




    handleSubmitStart(key,boat,destination,departure,crew,arrival) {
        //  event.preventDefault();
        //let trip_detailsCopy = JSON.parse(JSON.stringify(this.state.trip_details));
       //console.log(key);

        // if(status === 'start'){
        //
        //     document.getElementById("htmlstatusItem").innerHTML = "started";
        //
        // }
        // else {
        //     window.alert("Already Started");
        //
        // }


    // const key1 = {
    //         keyItem : key,
    //         boatItem: boat
    //     };
    //    console.log(key1.boatItem)
    //     axios.post('/api/trips/tripdetail/specific',key1)      // INCLUDE PARAMS LATER
    //         .then(res => {
    //            //console.log(res.data[0].status);
    //            //  if(res.data[0].status === "start")
    //            //  {
    //            //      console.log("on  to  start");
    //            //      axios.post('/api/trips/tripdetail/row',key1
    //            //      //     ,{
    //            //      //
    //            //      //     params:{
    //            //      //         ID : key
    //            //      //     }
    //            //      //
    //            //      // }
    //            //      )
    //
    //                 // const socket = io('http://localhost:3000');
    //                 // socket.on('changetripdetail', () =>{
    //                 //     console.log("connected to socket");
    //                 //     axios.get('/api/trips/tripdetail')
    //                 //         .then(res => {
    //                 //
    //                 //             const trip_details = res.data;
    //                 //             this.setState({ trip_details });
    //                 //
    //                 //         })
    //                 // });
    //
    //                 const trip = {
    //                     boat : boat,
    //                     destination : destination,
    //                     departure : departure,
    //                     start: 'started',
    //                     signin: 'You have started',
    //                     signout: 'You can end',
    //                     end : 'End',
    //                     crew : this.props.auth.user.name,
    //                     createdby : this.props.auth.user.name,
    //                     arrival : 'Not yet arrived'
    //                 }
    //
    //                 if(this.props.auth.isAuthenticated) {
    //                     axios.post('/api/trips/trip', trip)
    //                 }
    //                 else
    //
    //                     this.props.history.push('/login')
    //
    //
    //             // else {
    //             //     window.alert("Already Started");
    //             //
    //             // }
    //         })



    }



    render() {

       // const {user} = this.props.auth;
        const tripdata = this.state.trip_details.map(function (arr,index) {
            return(
                    <tr key={index}>
                        <td align="center"  id= "boatItem">{arr.boatName}</td>
                        <td align="center"  id= "destinationItem">{arr.destination}</td>
                        <td align="center"  id= "departureItem"> {arr.departure}</td>
                        <td align="center"  id= "crewnameItem"> {arr.crewName}</td>
                        <td align="center"  id= "arrivalItem"> {arr.arrival}</td>
                       {/* <td align="center"  id= "dbstatusItem"><button type="submit" onClick={ () => this.handleSubmitStart(arr._id,arr.boat,arr.destination,arr.departure,arr.status) } className="btn btn-primary">
                            start
                        </button></td>*/}
                        <td align="center"  id= "htmlselectItem"><button type="submit" onClick={ () => this.handleSubmitSelect(arr._id,arr.boatName,arr.destination,arr.departure, arr.crewName, arr.arrival) } className="btn btn-primary">
                            start
                        </button></td>
                        <td align="center" id= "htmlstatusItem"><button type="submit" onClick={ () => this.handleSubmitStatus(arr._id,arr.boatName,arr.destination,arr.departure, arr.crewName, arr.arrival) } className="btn btn-primary">
                            status</button></td>
                    </tr>
            )
        }.bind(this))


        return (
            <div>


                <div style={{marginTop:'15px'}}>
                    <Grid>
                        <Row style ={{marginTop:'15px'}}>
                            <Col xs={12} sm={12} md={8} mdOffset={2} >
                                <div className="table-responsive">
                                    <table className="table-sm  table-bordered"  id="dataTable" width="100%" cellSpacing="0" border="10" bgcolor="#fff8dc">
                                        <thead>
                                        <tr>
                                            <th align="center">Boat</th>
                                            <th align="center">Destination</th>
                                            <th align="center">Departure</th>

                                            <th align="center">Crew</th>
                                            <th align="center">Arrival</th>
                                            <th align="center">Select the boat</th>
                                            <th align="center">Check status</th>
                                        </tr>
                                        </thead>
                                        <tbody id="tablebody">
                                        {tripdata}
                                        </tbody>
                                    </table>

                                </div>
                            </Col>
                        </Row>
                        <br></br>
                    </Grid>
                </div>

<Trip  />
             </div>
        );
    }
}

TripDetail.propTypes = {
    getTripDetail: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    trip_details: state.trip_details

})

export default connect(mapStateToProps, { getTripDetail })(TripDetail);