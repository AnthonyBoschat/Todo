import {createSlice} from "@reduxjs/toolkit"

const CollectionSlice = createSlice({
    name:"collection",
    initialState:{
        collectionOnCreation:false,
        collectionToShow:[]
    },
    reducers:{
        update_collectionOnCreation:(state,action) => {
            state.collectionOnCreation = action.payload
        },
        update_collectionToShow:(state,action) => {
            state.collectionToShow = action.payload
        }
    },
})

export const CollectionSliceReducer = CollectionSlice.reducer
export const {
    update_collectionOnCreation,
    update_collectionToShow
} = CollectionSlice.actions