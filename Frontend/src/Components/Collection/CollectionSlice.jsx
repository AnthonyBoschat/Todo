import {createSlice} from "@reduxjs/toolkit"

const CollectionSlice = createSlice({
    name:"collection",
    initialState:{
        collectionOnCreation:false,
        collectionToShow:[],
        collectionWhoWhantItems:[],
        tabs:{
            tabsList:["Collections", "Automations"],
            tabSelected:"Collections"
        }
    },
    reducers:{
        update_collectionOnCreation:(state,action) => {
            state.collectionOnCreation = action.payload
        },
        update_collectionToShow:(state,action) => {
            state.collectionToShow = action.payload
        },
        update_collectionWhoWhantItems:(state, action) => {
            const {type, thisCollectionID} = action.payload
            switch(type){
                case "push":
                    state.collectionWhoWhantItems.push(thisCollectionID)
                    return
                case "delete":
                    const collectionIndex = state.collectionWhoWhantItems.findIndex(collectionID => collectionID === thisCollectionID)
                    state.collectionWhoWhantItems.splice(collectionIndex, 1)
                    return
                default:
                    return
            }
            
        },
        update_tabSelectedCollection:(state,action) => {
            state.tabs.tabSelected = action.payload
        }
    },
})

export const CollectionSliceReducer = CollectionSlice.reducer
export const {
    update_collectionOnCreation,
    update_collectionToShow,
    update_collectionWhoWhantItems,
    update_tabSelectedCollection
} = CollectionSlice.actions