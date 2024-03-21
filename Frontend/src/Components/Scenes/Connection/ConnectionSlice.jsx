import {createSlice} from "@reduxjs/toolkit"

const ConnectionSlice = createSlice({
    name:"connection",
    initialState:{
        connected:false,
        popup:false,
        popupMessage:"Oups ! ce nom d'utilisateur existe déjà."
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