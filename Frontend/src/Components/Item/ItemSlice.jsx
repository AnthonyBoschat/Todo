import {createSlice} from "@reduxjs/toolkit"

const ItemSlice = createSlice({
    name:"item",
    initialState:{
        global:{
            itemToShow:[],
            itemOnCreation:false,
            
            tabs:{
                tabsList:["Items", "Property"],
                tabSelected:"Items"
            }
        }
        
    },
    reducers:{
        update_ItemOnCreation:(state,action) => {
            state.global.itemOnCreation = action.payload
        },
        update_itemToShow:(state,action) => {
            state.global.itemToShow = action.payload
        },
        update_addItemToShow:(state,action) => {
            state.global.itemToShow.push(action.payload)
        },
        update_tabSelectedItem:(state,action) => {
            state.global.tabs.tabSelected = action.payload
        }
    },
})

export const ItemSliceReducer = ItemSlice.reducer
export const {
    update_ItemOnCreation,
    update_itemToShow,
    update_addItemToShow,
    update_itemSelectedID,
    update_tabSelectedItem
} = ItemSlice.actions