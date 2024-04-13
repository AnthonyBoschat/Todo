import {createSlice} from "@reduxjs/toolkit"

const ItemSlice = createSlice({
    name:"item",
    initialState:{
        ItemOnCreation:false,
        ItemOnEdition:false,
        hoverTrash:null
    },
    reducers:{
        update_ItemOnCreation:(state,action) => {
            state.ItemOnCreation = action.payload
        },
        update_ItemOnEdition:(state,action) => {
            state.ItemOnEdition = action.payload
        },
    },
})

export const ItemSliceReducer = ItemSlice.reducer
export const {
    update_ItemOnCreation,
    update_ItemOnEdition,
} = ItemSlice.actions