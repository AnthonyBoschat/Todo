import {createSlice} from "@reduxjs/toolkit"

const ItemSlice = createSlice({
    name:"item",
    initialState:{
        itemToShow:[],
        ItemOnCreation:false,
        ItemOnEdition:false,
        propertiesVisible:false,

    },
    reducers:{
        update_ItemOnCreation:(state,action) => {
            state.ItemOnCreation = action.payload
        },
        update_ItemOnEdition:(state,action) => {
            state.ItemOnEdition = action.payload
        },
        update_propertiesVisible:(state,action) => {
            state.propertiesVisible = action.payload
        },
        update_itemToShow:(state,action) => {
            state.itemToShow = action.payload
        },
        update_addItemToShow:(state,action) => {
            state.itemToShow.push(action.payload)
        }
    },
})

export const ItemSliceReducer = ItemSlice.reducer
export const {
    update_ItemOnCreation,
    update_ItemOnEdition,
    update_propertiesVisible,
    update_itemToShow,
    update_addItemToShow
} = ItemSlice.actions