import {createSlice} from "@reduxjs/toolkit"

const ItemSlice = createSlice({
    name:"item",
    initialState:{
        ItemOnCreation:false,
        Item_Onedition:false,
        hoverTrash:null
    },
    reducers:{
        update_ItemOnCreation:(state,action) => {
            state.ItemOnCreation = action.payload
        },
        update_Item_Onedition:(state,action) => {
            state.Item_Onedition = action.payload
        },
    },
})

export const ItemSliceReducer = ItemSlice.reducer
export const {
    update_ItemOnCreation,
    update_Item_Onedition,
} = ItemSlice.actions