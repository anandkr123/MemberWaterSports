import axios from 'axios';
import {CREATE_TRIP, GET_ERRORS,GET_TRIP} from './types';
import setAuthToken from "../setAuthToken";
import jwt_decode from "jwt-decode";
import {setCurrentUser} from "./authentication";

export const createTrip = (trip, history) => dispatch => {
    axios.post('/api/trips/trip', trip)
        .then(res => {
            dispatch({
                type: CREATE_TRIP,
                payload: trip
            });
            history.push('/trip')
        })

        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}


export const getTrip = (history) => dispatch => {
    axios.get('/api/trips/trip')
        .then(res => {
            dispatch({
                type: GET_TRIP,
                payload: res.data
            });
            history.push('/trip')
        })

        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}

export const getTripDetail = (history) => dispatch => {
    axios.get('/api/trips/tripdetail')
        .then(res => {
            dispatch({
                type: GET_TRIP,
                payload: res.data
            });
            history.push('/trip')
        })

        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}