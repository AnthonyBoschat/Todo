import {createSlice} from "@reduxjs/toolkit"

const ConnectionSlice = createSlice({
    name:"connection",
    initialState:{
        connected:false,
        connectedUser:{
            name:null,
            _id:null
        }
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
                }
            }
        }
    },
})

export const ConnectionSliceReducer = ConnectionSlice.reducer
export const {
    update_connected,
    update_connectedUser,
    update_closeConnection
} = ConnectionSlice.actions