import {createSlice} from "@reduxjs/toolkit"

const CollectionSlice = createSlice({
    name:"collection",
    initialState:{
        collectionOnCreation:false,
        collectionToShow:[],
        collectionWhoWhantItems:[]
    },
    reducers:{
        update_collectionOnCreation:(state,action) => {
            state.collectionOnCreation = action.payload
        },
        update_collectionToShow:(state,action) => {
            state.collectionToShow = action.payload
        },
        update_collectionWhoWhantItems:(state, action) => {
            const {type, collection} = action.payload
            switch(type){
                case "push":
                    state.collectionWhoWhantItems.push(collection)
                    return
                case "delete":
                    const collectionIndex = state.collectionWhoWhantItems.findIndex(collec => collec._id === collection._id)
                    state.collectionWhoWhantItems.splice(collectionIndex, 1)
                    return
                default:
                    return
            }
            
        }
    },
})

export const CollectionSliceReducer = CollectionSlice.reducer
export const {
    update_collectionOnCreation,
    update_collectionToShow,
    update_collectionWhoWhantItems
} = CollectionSlice.actions