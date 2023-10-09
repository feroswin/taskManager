import {createSlice} from "@reduxjs/toolkit";
import {getMe, loginUser} from "../actions/user.action";

const initialState = {
    response: null,
    user: null,
    message: null
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout(state) {
            state.response = null
            state.user = null
            window.localStorage.removeItem("accessToken")
        }
    },
    extraReducers: {


        [loginUser.fulfilled]: (state, {payload}) => {
            // console.log(payload)
            state.response = payload.response
            state.user = payload.user
            state.message = payload.message
        },

        [loginUser.rejected]: (state, {payload}) => {
            state.response = payload.response
        },

        [getMe.fulfilled]: (state, {payload}) => {
            state.response = payload.response
            state.user = payload.user || null
        },
        [getMe.rejected]: (state) => {
            state.response = null
            state.user = null
            state.message = null
        }
    }
})

export const {logout} = userSlice.actions
export const {action, reducer} = userSlice