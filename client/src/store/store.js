import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {reducer as userReducer} from "./slices/user.slice";

const reducers = combineReducers({
    user: userReducer
})


export const store = configureStore({
    reducer: reducers
})