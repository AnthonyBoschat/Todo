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
        signUpSelected:false,
        recover:{
            userWantRecover:false,
            emailSend:false,
            codeValide:false
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
                },
                onDisconnection:false,
                signInSelected:true,
                signUpSelected:false,
                recover:{
                    userWantRecover:false,
                    emailSend:false,
                    codeValide:false
                }
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
                state.signInSelected = false
                state.signUpSelected = true
            }
        },
        update_userWantRecover:(state,action) => {
            state.recover.userWantRecover = action.payload
        },
        update_emailSend:(state,action) => {
            state.recover.emailSend = action.payload
        },
        update_codeValide:(state,action) => {
            state.recover.codeValide = action.payload
        }
    },
})

export const ConnectionSliceReducer = ConnectionSlice.reducer
export const {
    update_connected,
    update_connectedUser,
    update_closeConnection,
    update_onDisconnection,
    update_updateSignSelected,
    update_userWantRecover,
    update_emailSend,
    update_codeValide
} = ConnectionSlice.actions