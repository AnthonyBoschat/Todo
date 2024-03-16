import {createSlice} from "@reduxjs/toolkit"

const todoStorage = JSON.parse(localStorage.getItem("todoStorage"))

const LocalStorageSlice = createSlice({
    name:"localStorage",
    initialState:{
        todoStorage: todoStorage ? todoStorage : {
            foldersList:[]
        }
    },
    reducers:{
        update_todoStorage:(state,action) => {
            state.todoStorage = action.payload
        },
        update_RESET_FOLDERS:(state,action) => {
            state.todoStorage = {
                foldersList:[]
            }
        },
        update_RESET_TASK:(state,action) => {
            state.todoStorage.foldersList[action.payload].taskList = []
        }
    },
})

export const LocalStorageSliceReducer = LocalStorageSlice.reducer
export const {
    update_todoStorage,
    update_RESET_FOLDERS,
    update_RESET_TASK
} = LocalStorageSlice.actions