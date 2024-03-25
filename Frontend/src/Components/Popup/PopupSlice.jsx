import {createSlice} from "@reduxjs/toolkit"

const PopupSlice = createSlice({
    name:"popup",
    initialState:{
        hidden:true,
        message:null,
        color:"rgb(205, 205, 205)",
    },
    reducers:{
        update_popup:(state,action) => {
            Object.keys(action.payload).forEach(key => {
                if(state.hasOwnProperty(key)) {
                    if(action.payload[key] !== undefined){
                        state[key] = action.payload[key];
                    }
                }
            });
        },
    },
})

export const PopupSliceReducer = PopupSlice.reducer
export const {
    update_popup
} = PopupSlice.actions