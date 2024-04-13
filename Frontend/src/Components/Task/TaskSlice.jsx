import {createSlice} from "@reduxjs/toolkit"

const TaskSlice = createSlice({
    name:"task",
    initialState:{
        taskOnCreation:false,
        taskOnEdition:false,
        hoverTrash:null
    },
    reducers:{
        update_taskOnCreation:(state,action) => {
            state.taskOnCreation = action.payload
        },
        update_taskOnEdition:(state,action) => {
            state.taskOnEdition = action.payload
        },
        update_hoverTrash:(state,action) => {
            state.hoverTrash = action.payload
        }
    },
})

export const TaskSliceReducer = TaskSlice.reducer
export const {
    update_taskOnCreation,
    update_taskOnEdition,
    update_hoverTrash
} = TaskSlice.actions