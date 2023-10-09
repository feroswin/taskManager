import instanceAxios from "../../axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {redirect} from "react-router-dom";

export const loginUser = createAsyncThunk(
    "auth/login",
    async ({username, password}) => {
        try {
            const {data} =  await instanceAxios.post("/auth/login", {
                username,
                password
            })
            if (data.response) {
                localStorage.setItem("accessToken", data.user.accessToken)
                return {
                    response: data.response,
                    user: {
                        id: data.user.id,
                        username: data.user.username
                    }
                }
            }
            return {
                response: false,
                message: data.message
            }
        }
        catch (e) {
            console.log(e)
        }

    }
)

export const getMe = createAsyncThunk(
    "auth/me",
    async () => {
        try {
            const {data} = await instanceAxios.get("auth/me")
            console.log(data)
            return data
        }
        catch (e) {

        }
    }
)