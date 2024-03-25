import {createSlice} from "@reduxjs/toolkit"

const TaskSlice = createSlice({
    name:"task",
    initialState:{
        taskOnCreation:false,
        taskOnEdition:false,
        tasksList:[]
    },
    reducers:{
        update_taskOnCreation:(state,action) => {
            state.taskOnCreation = action.payload
        },
        update_taskOnEdition:(state,action) => {
            state.taskOnEdition = action.payload
        },
        update_addTask:(state,action) => {
            state.tasksList.push(action.payload)
        },
        update_loadTasksList:(state,action) => {
            state.tasksList = action.payload
        },
        update_deleteTask:(state,action) => {
            state.tasksList.splice(action.payload,1)
        },
        update_renameTask:(state,action) => {
            state.tasksList[action.payload.taskIndex].content = action.payload.newTaskContent
        },
        update_toggleTask:(state,action) => {
            state.tasksList[action.payload.taskIndex].completed = action.payload.newTaskToggle
        }
    },
})

export const TaskSliceReducer = TaskSlice.reducer
export const {
    update_taskOnCreation,
    update_taskOnEdition,
    update_loadTasksList,
    update_addTask,
    update_deleteTask,
    update_renameTask,
    update_toggleTask
} = TaskSlice.actions