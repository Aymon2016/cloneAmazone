import { getProductsReducers } from "./reducer";

import {combineReducers} from "redux";

const rootreducers = combineReducers({
    getproductsdata : getProductsReducers
});

export default rootreducers;