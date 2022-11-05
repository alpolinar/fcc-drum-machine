import { configureStore } from "@reduxjs/toolkit";
import drumKitReducer from './drumKitSlice'

export default configureStore({
    reducer: {
        drumKit: drumKitReducer
    }
})