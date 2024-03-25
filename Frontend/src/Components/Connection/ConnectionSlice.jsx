import {createSlice} from "@reduxjs/toolkit"

const ConnectionSlice = createSlice({
    name:"connection",
    initialState:{
        connected:false,
        connectedUser:{
            name:null,
            _id:null
        },
        onDisconnection:false
    },
    reducers:{
        update_connected:(state,action) => {
            state.connected = action.payload
        },
        update_connectedUser:(state,action) => {
            state.connectedUser = action.payload
        },
        update_closeConnection:(state,action)=>{
            return state = {
                connected:false,
                connectedUser:{
                    name:null,
                    _id:null
                },
                onDisconnection:false
            }
        },
        update_onDisconnection:(state,action) => {
            state.onDisconnection = action.payload
        }
    },
})

export const ConnectionSliceReducer = ConnectionSlice.reducer
export const {
    update_connected,
    update_connectedUser,
    update_closeConnection,
    update_onDisconnection
} = ConnectionSlice.actions