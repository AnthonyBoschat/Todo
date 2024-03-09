import {createSlice} from "@reduxjs/toolkit"

const TaskSlice = createSlice({
    name:"task",
    initialState:{
        taskOnCreation:false,
    },
    reducers:{
        update_taskOnCreation:(state,action) => {
            state.taskOnCreation = action.payload
        }
    },
})

export const TaskSliceReducer = TaskSlice.reducer
export const {
    update_taskOnCreation
} = TaskSlice.actions