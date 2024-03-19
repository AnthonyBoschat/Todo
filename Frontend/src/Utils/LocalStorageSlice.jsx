import {createSlice} from "@reduxjs/toolkit"

const LocalStorageSlice = createSlice({
    name:"localStorage",
    initialState:{
        todoStorage: {
            foldersList:[]
        }
    },
    reducers:{
        update_todoStorage:(state,action) => {
            state.todoStorage = action.payload
        },
        update_addFolder:(state,action) => {
            state.todoStorage.foldersList.push(action.payload)
        },
        update_deleteFolder:(state,action) => {
            state.todoStorage.foldersList.splice(action.payload, 1)
        },
        update_loadFolder:(state,action) => {
            state.todoStorage.foldersList = action.payload
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
    update_addFolder,
    update_deleteFolder,
    update_loadFolder,
    update_RESET_FOLDERS,
    update_RESET_TASK
} = LocalStorageSlice.actions