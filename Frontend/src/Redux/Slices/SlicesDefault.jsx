import {createSlice} from "@reduxjs/toolkit"

const defaultSlice = createSlice({
    name:"default",
    initialState:{
        default:false
    },
    reducers:{
        updateDefault:(state,action) => {
            state.default = action.payload
        }
    },
})

export const defaultSliceReducer = defaultSlice.reducer
export const {
    updateDefault
} = defaultSlice.actions