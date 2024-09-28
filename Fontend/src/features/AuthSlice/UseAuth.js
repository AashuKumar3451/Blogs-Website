import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    isAuthenticated: false
}

const signinFunction = (state) => {
    state.isAuthenticated = true
}

const signupFunction = (state) => {
    state.isAuthenticated = true
}

const signoutFunction = (state) => {
    state.isAuthenticated = false
}

export const AuthSlice = createSlice({
    name: "authStatus",
    initialState,
    reducers: {
        signin: signinFunction,
        signup: signinFunction,
        signout: signoutFunction
    }
})

export const {signin, signout, signup} = AuthSlice.actions
export default AuthSlice.reducer