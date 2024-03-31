import {createSlice} from "@reduxjs/toolkit"

const TaskSlice = createSlice({
    name:"task",
    initialState:{
        taskOnCreation:false,
        taskOnEdition:false,
    },
    reducers:{
        update_taskOnCreation:(state,action) => {
            state.taskOnCreation = action.payload
        },
        update_taskOnEdition:(state,action) => {
            state.taskOnEdition = action.payload
        },
    },
})

export const TaskSliceReducer = TaskSlice.reducer
export const {
    update_taskOnCreation,
    update_taskOnEdition,
} = TaskSlice.actions