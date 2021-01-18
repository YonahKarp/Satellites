
import {SET_TLE} from "../actions";

function reducer(state, action) {
    switch(action.type){
        case SET_TLE:
            return{
                ...state,
                tle: action.payload.tle,      
            }
            
        default:
            return state;
    } 
}

export default reducer;