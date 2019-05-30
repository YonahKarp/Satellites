
import {SET_PROPERTY} from "../actions";

function reducer(state, action) {
    switch(action.type){
        case SET_PROPERTY:
            return{
                ...state,
                property: action.payload.property,      
            }
            
        default:
            return state;
    } 
}

export default reducer;