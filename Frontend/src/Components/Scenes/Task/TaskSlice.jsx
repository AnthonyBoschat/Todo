import {createSlice} from "@reduxjs/toolkit"

const TaskSlice = createSlice({
    name:"task",
    initialState:{
        taskOnCreation:false,
        taskOnEdition:false,
        taskList:[]
    },
    reducers:{
        update_taskOnCreation:(state,action) => {
            state.taskOnCreation = action.payload
        },
        update_taskOnEdition:(state,action) => {
            state.taskOnEdition = action.payload
        },
        update_taskList:(state,action) => {
            state.taskList = action.payload
        }
    },
})

export const TaskSliceReducer = TaskSlice.reducer
export const {
    update_taskOnCreation,
    update_taskOnEdition,
    update_taskList
} = TaskSlice.actions