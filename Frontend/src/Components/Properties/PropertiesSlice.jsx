import {createSlice} from "@reduxjs/toolkit"

const PropertiesSlice = createSlice({
    name:"properties",
    initialState:{
        propertyOnCreation:false,
        propertiesToShow:[],
        propertiesVisible:false
    },
    reducers:{
        update_propertyOnCreation:(state,action) => {
            state.propertyOnCreation = action.payload
        },
        update_propertiesToShow:(state,action) => {
            state.propertiesToShow = action.payload
        },
        update_propertiesVisible:(state,action) => {
            state.propertiesVisible = action.payload
        },
        update_addPropertiesToShow:(state,action) => {
            state.propertiesToShow.push(action.payload)
        }
    },
})

export const PropertiesSliceReducer = PropertiesSlice.reducer
export const {
    update_propertyOnCreation,
    update_propertiesToShow,
    update_propertiesVisible,
    update_addPropertiesToShow
} = PropertiesSlice.actions