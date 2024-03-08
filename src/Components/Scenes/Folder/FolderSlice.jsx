import {createSlice} from "@reduxjs/toolkit"

const todoStorage = JSON.parse(localStorage.getItem("todoStorage"))

const FolderSlice = createSlice({
    name:"folder",
    initialState:{
        list: todoStorage?.foldersList ? todoStorage.foldersList : [],
        folderOnCreation:false,
        folderSelectedName:null
    },
    reducers:{
        update_addFolder:(state,action) => {
            state.list.push(action.payload)
        },
        update_folderOnCreation:(state,action) => {
            state.folderOnCreation = action.payload
        },
        update_folderSelectedName:(state,action) => {
            state.folderSelectedName = action.payload
        },
        update_RESET_FOLDERS_SLICE:(state,action)=> {
            return state = {
                list:[],
                folderOnCreation:false
            }
        }
    },
})

export const FolderSliceReducer = FolderSlice.reducer
export const {
    update_addFolder,
    update_folderOnCreation,
    update_folderSelectedName,
    update_RESET_FOLDERS_SLICE,
} = FolderSlice.actions