import {createSlice} from "@reduxjs/toolkit"

const ConnectionSlice = createSlice({
    name:"connection",
    initialState:{
        connected:false
    },
    reducers:{
        update_connected:(state,action) => {
            state.connected = action.payload
        }
    },
})

export const ConnectionSliceReducer = ConnectionSlice.reducer
export const {
    update_connected,
} = ConnectionSlice.actions