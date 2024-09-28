import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isAdminAvailable: false
}

const adminSignInFunction = (state) => {
    state.isAdminAvailable = true
}

const adminSignOutFunction = (state) => {
    state.isAdminAvailable = false
}

export const AdminSlice = createSlice({
    name: "adminStatus",
    initialState,
    reducers:{
        adminSignIn: adminSignInFunction,
        adminSignOut: adminSignOutFunction
    }

})

export const {adminSignIn, adminSignOut}  = AdminSlice.actions;
export default AdminSlice.reducer