import {createSlice} from "@reduxjs/toolkit"

const PropertiesSlice = createSlice({
    name:"properties",
    initialState:{
        propertyOnCreation:false
    },
    reducers:{
        update_propertyOnCreation:(state,action) => {
            state.propertyOnCreation = action.payload
        }
    },
})

export const PropertiesSliceReducer = PropertiesSlice.reducer
export const {
    update_propertyOnCreation
} = PropertiesSlice.actions