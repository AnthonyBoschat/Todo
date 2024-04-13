import {createSlice} from "@reduxjs/toolkit"

const ListSlice = createSlice({
    name:"list",
    initialState:{
        listOnCreation:false
    },
    reducers:{
        update_listOnCreation:(state,action) => {
            state.listOnCreation = action.payload
        }
    },
})

export const ListSliceReducer = ListSlice.reducer
export const {
    update_listOnCreation
} = ListSlice.actions