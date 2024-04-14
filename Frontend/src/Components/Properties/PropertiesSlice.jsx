import {createSlice} from "@reduxjs/toolkit"

const PropertiesSlice = createSlice({
    name:"properties",
    initialState:{
        propertiesVisible:false
    },
    reducers:{
        update_propertiesVisible:(state, action) => {
            state.propertiesVisible = action.payload
        }
    },
})

export const PropertiesSliceReducer = PropertiesSlice.reducer
export const {
    update_propertiesVisible
} = PropertiesSlice.actions