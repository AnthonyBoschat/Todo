import {createSlice} from "@reduxjs/toolkit"

const ListSlice = createSlice({
    name:"list",
    initialState:{
        listOnCreation:false,
        listToShow:[]
    },
    reducers:{
        update_listOnCreation:(state,action) => {
            state.listOnCreation = action.payload
        },
        update_listToShow:(state,action) => {
            state.listToShow = action.payload
        }
    },
})

export const ListSliceReducer = ListSlice.reducer
export const {
    update_listOnCreation,
    update_listToShow
} = ListSlice.actions