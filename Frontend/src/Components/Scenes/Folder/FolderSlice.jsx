import {createSlice} from "@reduxjs/toolkit"

const todoStorage = JSON.parse(localStorage.getItem("todoStorage"))

const FolderSlice = createSlice({
    name:"folder",
    initialState:{
        folderOnCreation:false,
        folderSelectedID:null,
        folderSelectedName:null,
        foldersList:[]
    },
    reducers:{
        update_folderOnCreation:(state,action) => {
            state.folderOnCreation = action.payload
        },
        update_folderSelectedID:(state,action) => {
            state.folderSelectedID = action.payload
        },
        update_folderSelectedName:(state,action) => {
            state.folderSelectedName = action.payload
        },
        update_loadFoldersList:(state,action) => {
            state.foldersList = action.payload
        },
        update_folderRename:(state,action) => {
            state.foldersList[action.payload.folderIndex].name = action.payload.newFolderName
        }
    },
})

export const FolderSliceReducer = FolderSlice.reducer
export const {
    update_folderOnCreation,
    update_folderSelectedID,
    update_folderSelectedName,
    update_folderRename,
    update_loadFoldersList
} = FolderSlice.actions