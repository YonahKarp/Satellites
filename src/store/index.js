import { createStore } from "redux";
import reducer from "../reducers";

const initialState = {
    property: "value"
}
export const store = createStore(reducer, initialState);