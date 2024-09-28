import {configureStore} from "@reduxjs/toolkit"
import AuthSlice  from "../features/AuthSlice/UseAuth.js"
import  AdminSlice  from "../features/AdminAuthSlice/UseAdminAuth.js"

export const store = configureStore({
    reducer: {
        "authStatus": AuthSlice,
        "adminStatus": AdminSlice
    }
})