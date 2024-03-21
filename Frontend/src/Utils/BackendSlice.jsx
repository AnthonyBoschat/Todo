import {createSlice} from "@reduxjs/toolkit"

const BackendSlice = createSlice({
    name:"backend",
    initialState:{
        fetchConsoleMessage:true,
    },
    reducers:{
        update_fetchConsoleMessage:(state,action) => {
            state.fetchConsoleMessage = action.payload
        }
    },
})

export const BackendSliceReducer = BackendSlice.reducer
export const {
    update_fetchConsoleMessage
} = BackendSlice.actions