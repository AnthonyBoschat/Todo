import {createSlice} from "@reduxjs/toolkit"

const PropertySlice = createSlice({
    name:"property",
    initialState:{
        propertyOnCreation:false,
    },
    reducers:{
        update_propertyOnCreation:(state,action) => {
            state.propertyOnCreation = action.payload
        }
    },
})

export const PropertySliceReducer = PropertySlice.reducer
export const {
    update_propertyOnCreation
} = PropertySlice.actions