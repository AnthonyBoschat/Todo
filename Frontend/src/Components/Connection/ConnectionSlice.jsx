import {createSlice} from "@reduxjs/toolkit"

const ConnectionSlice = createSlice({
    name:"connection",
    initialState:{
        connected:false,
        connectedUser:{
            name:null,
            _id:null
        },
        onDisconnection:false,
        signInSelected:true,
        signUpSelected:false
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
        },
        update_updateSignSelected:(state,action) => {
            if(action.payload === "signin"){
                state.signInSelected = true
                state.signUpSelected = false
            }else if(action.payload === "signup"){
                console.log("here")
                state.signInSelected = false
                state.signUpSelected = true
            }
        }
    },
})

export const ConnectionSliceReducer = ConnectionSlice.reducer
export const {
    update_connected,
    update_connectedUser,
    update_closeConnection,
    update_onDisconnection,
    update_updateSignSelected
} = ConnectionSlice.actions