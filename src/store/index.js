import { createStore } from "redux";
import reducer from "../reducers";

const initialState = {
    tle: []
}
export const store = createStore(reducer, initialState);