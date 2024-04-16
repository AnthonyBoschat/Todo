import {createSlice} from "@reduxjs/toolkit"

const ItemSlice = createSlice({
    name:"item",
    initialState:{
        itemToShow:[],
        ItemOnCreation:false,
        ItemOnEdition:false,
        itemSelectionID:null
    },
    reducers:{
        update_ItemOnCreation:(state,action) => {
            state.ItemOnCreation = action.payload
        },
        update_ItemOnEdition:(state,action) => {
            state.ItemOnEdition = action.payload
        },
        update_itemToShow:(state,action) => {
            state.itemToShow = action.payload
        },
        update_addItemToShow:(state,action) => {
            state.itemToShow.push(action.payload)
        },
        update_itemSelectionID:(state,action) => {
            state.itemSelectionID = action.payload
        }
    },
})

export const ItemSliceReducer = ItemSlice.reducer
export const {
    update_ItemOnCreation,
    update_ItemOnEdition,
    update_itemToShow,
    update_addItemToShow,
    update_itemSelectionID
} = ItemSlice.actions