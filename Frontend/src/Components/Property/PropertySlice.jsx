import {createSlice} from "@reduxjs/toolkit"

const PropertySlice = createSlice({
    name:"property",
    initialState:{
        propertyOnCreation:false,
        propertyToShow:[]
    },
    reducers:{
        update_propertyOnCreation:(state,action) => {
            state.propertyOnCreation = action.payload
        },
        update_propertyToShow:(state,action) => {
            state.propertyToShow = action.payload
        }
    },
})

export const PropertySliceReducer = PropertySlice.reducer
export const {
    update_propertyOnCreation,
    update_propertyToShow
} = PropertySlice.actions