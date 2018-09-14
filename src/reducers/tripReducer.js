import { CREATE_TRIP } from '../actions/types';
import { GET_TRIP } from '../actions/types';
import { GET_TRIP_DETAIL } from '../actions/types';
const initialState = {
    trip: {}
}

export default function(state = initialState, action ) {
    switch(action.type) {
        case CREATE_TRIP:
            return {
                ...state,
                trip: action.payload
            }
        case GET_TRIP:
            return {
                ...state,
                trip: action.payload
            }
        case GET_TRIP_DETAIL:
            return {
                ...state,
                trip_details: action.payload
            }
        default:
            return state;
    }
}