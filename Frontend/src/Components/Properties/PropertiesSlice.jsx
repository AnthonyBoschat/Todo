import {createSlice} from "@reduxjs/toolkit"

const PropertiesSlice = createSlice({
    name:"properties",
    initialState:{
        propertiesToShow:[],
        propertiesVisible:false,
    },
    reducers:{
        update_propertiesToShow:(state,action) => {
            state.propertiesToShow = action.payload
        },
        update_propertiesVisible:(state,action) => {
            state.propertiesVisible = action.payload
        },
        update_addPropertiesToShow:(state,action) => {
            state.propertiesToShow.push(action.payload)
        },
    },
})

export const PropertiesSliceReducer = PropertiesSlice.reducer
export const {
    update_propertiesToShow,
    update_propertiesVisible,
    update_addPropertiesToShow,
} = PropertiesSlice.actions