import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {createTrip,getTrip} from '../actions/trip';
import TripDetail from './TripDetail';
import {Row, Col, Grid} from "react-bootstrap"
import axios from "axios";



 class Trip extends Component {

    constructor(props) {

        super(props);

        this.state = {
            trip_user: [],
            boat:"none",
            destination: "none",
            departure: "none",
            start: 'none',
            signin: 'none',
            signout: 'none',
            end: 'none',
            crew: 'None',
            createdby: 'None',
            arrival: 'N/A',
            pass_boat : '',
            errors: {}
        };
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeSignIn = this.handleChangeSignIn.bind(this);
        this.handleChangeSignOut = this.handleChangeSignOut.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
       // this.onUpdate = this.onUpdate.bind(this);
        //this.state.boat_pass = this.props.boat_pass;
          }

     componentWillMount() {
        console.log("at mountine time ==>")

        //console.log(this.props.boat_pass);
       // console.log(this.props.boatItem);
         // axios.get('/api/trips/trip')
         //     .then(res => {
         //         const trip_user = res.data;
         //         this.setState({ trip_user });
         //         this.setState({boat: res.data.boat});
         //         this.setState({destination: res.data.destination});
         //         this.setState({departure: res.data.departure});
         //         this.setState({start: res.data.start});
         //         this.setState({signin : res.data.signin});
         //         this.setState({signout : res.data.signout});
         //         this.setState({end: res.data.end});
         //         this.setState({createdby: res.data.createdby});
         //         this.setState({crew: res.data.crew});
         //         this.setState({arrval:res.data.arrival});
         //
         //     })
         const boat1 = {
             boatItem : 'seagull'
         };

         axios.post('/api/trips/trip/boat',boat1
         //     , {
         //
         //     params:{                                             // FETCH WITH THE RESPECTIVE BOAT
         //         boat : this.props.boat_pass
         //     }
         //
         // }
         )
             .then(res => {
               //  console.log(res.data)
                 if(res.data.end === 'Ended')
                 {
                     this.setState({signin: 'N/A'})
                     this.setState({signout: 'N/A'});
                     this.setState({end: 'Ended'});
                 }
                 if(res.data.createdby === this.props.auth.user.name)
                 {
                     this.setState({signin : 'You have Started'});
                     this.setState({signout : 'You can end'});
                     this.setState({end: 'End'});
                 }
                 else
                 {
                     if(res.data.signin === 'OnWay') {
                         this.setState({signin: 'OnWay'})
                         this.setState({signout: 'N/A'});
                         this.setState({end: 'N/A'});
                     }
                     else if(res.data.end === 'Ended')
                     {
                         this.setState({signin : 'N/A'});
                         this.setState({signout : 'N/A'});
                         this.setState({end: 'Ended'});
                     }
                     else if(res.data.boat === 'above')
                     {
                         this.setState({signin : res.data.signin});
                         this.setState({signout : res.data.signout});
                         this.setState({end: res.data.end});
                     }

                     else
                     {
                         this.setState({signin : 'Sign In'});
                         this.setState({signout : 'Sign Out'});
                         this.setState({end: 'N/A'});
                     }
                 }

                 const trip_user = res.data;
                 this.setState({ trip_user });
                 this.setState({boat: res.data.boat});
                 this.setState({destination: res.data.destination});
                 this.setState({departure: res.data.departure});
                 this.setState({start: res.data.start});
                 this.setState({createdby: res.data.createdby});
                 this.setState({crew: res.data.crew});
                 this.setState({arrival:res.data.arrival});

             })



      }

      componentDidMount(){
        // console.log("hllo dfgfgf");
        //   axios.post('/api/trips/trip')
        //
        //       .then(res => {
        //           debugger
        //           console.log(res.data);
        //           const trip_user = res.data;
        //           //this.setState({ trip_user });
        //           this.setState({start: res.data.start})
        //       })
         // this.props.onUpdate(boat);


      }

     componentWillReceiveProps(nextProps) {
         }

     handleSubmit(e) {
         e.preventDefault();

     }



    handleChangeStart(event) {
 event.preventDefault();


    }


     handleChangeSignIn(event) {

console.log("presses sign in");
        // console.log(this.props.boat_pass);
        // console.log(this.props.boatItem);



         const boat1 = {
             boatItem : 'seagull'
         };
         axios.post('/api/trips/trip/boat',boat1

         //     , {
         //
         //     params:{
         //         boat : 'seagull'                   // query using boat
         //     }
         //
         // }
         )
             .then(res => {
                 if(this.props.auth.isAuthenticated) {

                     if (res.data.signin === 'OnWay' || res.data.crew.includes(this.props.auth.user.name) || (res.data.arrival !== 'Not yet arrived' )) {
                         window.alert("Can't sign in , either already signed Or some  people have already signed out.\n \t \t\t\t\tCheck out other trips");
                     }
                     else {

                         const key1 = {
                             crewItem: this.props.auth.user.name
                         };
                         console.log(key1.crewItem)
                         axios.post('/api/trips/tripdetail/in',key1)      // INCLUDE PARAMS LATER
                             .then(res => {
                                 console.log(res.data);
                             })


                         let use = this.props.auth.user.name;
                     let new_crew = use + " ," + this.state.crew;
                     const trip_user = res.data;
                     this.setState({trip_user});
                     this.setState({boat: res.data.boat});
                     this.setState({destination: res.data.destination});
                     this.setState({departure: res.data.departure});
                     this.setState({start: res.data.start});
                     this.setState({signin: 'Signed In'});
                     this.setState({signout: 'Sign Out'});
                     this.setState({end: 'N/A'});
                     this.setState({createdby: res.data.createdby});
                     this.setState({crew: new_crew});
                     this.setState({arrival: res.data.arrival});
                     const trip1 = {
                         createdby: res.data.createdby,
                         signin: 'Sign In',
                         signout: 'Sign Out',
                         end: 'End',
                         crew: this.state.crew,
                         arrival: this.state.arrival
                     }


                     //this.props.createTrip(trip, this.props.history);
                     axios.post('/api/trips/trip/user', trip1
                         //     ,{
                         //
                         //     params:{                                    // query uSING USER
                         //         user : use
                         //     }
                         //
                         // }
                     )
                 }
                 }
                 else

                     this.props.history.push('/login')

             })

     }
     handleChangeSignOut(event) {

         const boat1 = {
             boatItem : 'seagull'
         };



         axios.post('/api/trips/trip/boat',boat1
         //     , {
         //
         //     params:{
         //         boat : this.props.boat_pass
         //     }
         //
         // }
         )
             .then(res => {
                 if(this.props.auth.isAuthenticated) {
                     let use = this.props.auth.user.name;

                     if (res.data.signin === 'OnWay' || (res.data.arrival !== 'Not yet arrived')   || res.data.signin === 'You have started' ) {
                         window.alert("Can't sign out . Please follow what's written");
                     }
                     else{

                         const key1 = {
                             arrivalItem: new Date()
                         };


                             console.log(key1.arrivalItem)
                             axios.post('/api/trips/tripdetail/out', key1)      // INCLUDE PARAMS LATER
                                 .then(res => {
                                     console.log(res.data);
                                 })




                         const trip_user = res.data;
                     this.setState({trip_user});
                     this.setState({boat: res.data.boat});
                     this.setState({destination: res.data.destination});
                     this.setState({departure: res.data.departure});
                     this.setState({start: res.data.start});
                     this.setState({signin: 'Signed In'});
                     this.setState({signout: 'Signed Out'});
                     this.setState({end: 'N/A'});
                     this.setState({createdby: res.data.createdby});
                     this.setState({crew: res.data.crew});
                     this.setState({arrival: new Date().toLocaleString()});

                     const trip1 = {
                         createdby: res.data.createdby,
                         signin: 'OnWay',
                         signout: 'Sign Out',
                         end: 'End',
                         crew: this.state.crew,
                         arrival: this.state.arrival
                     }
                     //this.props.createTrip(trip, this.props.history);
                     axios.post('/api/trips/trip/user', trip1
                         //     , trip,{
                         //
                         //     params:{
                         //         user : use
                         //     }
                         //
                         // }
                     )
                 }
                 }

                 else {
                     window.alert("Login first")
                     this.props.history.push('/login')
                 }
             })

     }

     handleChangeEnd(event) {
         const boat1 = {
             boatItem : 'seagull'
         };





         axios.post('/api/trips/trip/boat',boat1
         //     , {
         //
         //     params:{
         //         boat : this.props.boat_pass
         //     }
         //
         // }
         )
             .then(res => {
                 if (this.props.auth.isAuthenticated) {
                 let use = this.props.auth.user.name;
                 if(use === res.data.createdby || res.data.end === 'Ended') {

                     const key1 = {
                         arrivalItem: new Date()
                     };
                     console.log("hello");
                         console.log(key1.arrivalItem)
                         axios.post('/api/trips/tripdetail/out', key1)      // INCLUDE PARAMS LATER
                             .then(res => {

                                 console.log(res.data);
                             })



                     const trip_user = res.data;
                     this.setState({trip_user});
                     this.setState({boat: res.data.boat});
                     this.setState({destination: res.data.destination});
                     this.setState({departure: res.data.departure});
                     this.setState({start: res.data.start});
                     this.setState({signin: 'N/A'});
                     this.setState({signout: 'N/A'});
                     this.setState({end: 'Ended'});
                     this.setState({createdby: res.data.createdby});
                     this.setState({crew: res.data.crew});
                     this.setState({arrival: new Date().toLocaleString()});

                     const trip1 = {
                         createdby: this.props.auth.user.name,
                         signin: 'N/A',
                         signout: 'N/A',
                         end: 'Ended',
                         crew: res.data.crew,
                         arrival: this.state.arrival
                     }


                         //this.props.createTrip(trip, this.props.history);
                         axios.post('/api/trips/trip/user' , trip1
                         //     , trip, {
                         //
                         //     params: {
                         //         user: use
                         //     }
                         //
                         // }
                         )
                     }
                     else {
                     window.alert("You can't end -> you didn't started")
                 }
                 }
                 else
                 {
                     window.alert("Login first")
                     this.props.history.push('/login')
                 }
             })


     }

     render() {
         const {user} = this.props.auth;

         return (
             <div>

                 <div style={{marginTop:'15px'}}>
                     <Grid>
                         <Row style ={{marginTop:'15px'}}>
                             <Col xs={12} sm={12} md={8} mdOffset={2} >
                                 <div className="table-responsive">
                                     <table className="table-sm  table-bordered"  id="dataTable" width="100%" cellSpacing="0" border= "1" bgcolor="#fff8dc" >
                                         <thead>
                                         <tr>
                                             <th align="center">Boat</th>
                                             <th align="center">Destination</th>
                                             <th align="center">Departure</th>
                                             <th align="center">Start</th>
                                             <th align="center">Sign In/Signed In</th>
                                             <th align="center">Sign Out/Signed Out</th>
                                             <th align="center">End/Ended</th>
                                             <th align="center">Boat Crew</th>
                                             <th align="center">Started By</th>
                                             <th align="center">Arrival At</th>

                                         </tr>
                                         </thead>
                                         <tbody id="tablebody">
                                         {/*{tripdata}*/}
                                         <th>{this.state.boat}</th>
                                         <th>{this.state.destination}</th>
                                         <th>{this.state.departure}</th>
                                         <th>{this.state.start}</th>
                                         <th><button type="submit" className="btn btn-primary" onClick={this.handleChangeSignIn} >{this.state.signin}
                                         </button></th>
                                         <th><button type="submit" className="btn btn-primary"  onClick={this.handleChangeSignOut}  >{this.state.signout}
                                         </button></th>
                                     <th><button type="submit" className="btn btn-primary"  onClick={this.handleChangeEnd} >{this.state.end}
                                     </button></th>
                                 <th>{this.state.crew}</th>
                                 <th>{this.state.createdby}</th>
                                 <th>{this.state.arrival}</th>


                                       </tbody>
                                     </table>

                                 </div>
                             </Col>
                         </Row>
                         <br></br>


                     </Grid>
                 </div>

             </div>
         );

     }
}

Trip.propTypes = {
    createTrip: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,

    boatItem: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    trip: state.trip,

    boatItem: state.boatItem
})

export  default connect(mapStateToProps, { createTrip })(Trip);