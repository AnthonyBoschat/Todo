import {createSlice} from "@reduxjs/toolkit"

const todoStorage = JSON.parse(localStorage.getItem("todoStorage"))

const FolderSlice = createSlice({
    name:"folder",
    initialState:{
        allFoldersLoad:false,
        folderOnCreation:false,
        folderSelectedID:null,
        folderSelectedName:null,
        foldersList:null
    },
    reducers:{
        update_allFoldersLoad:(state,action) => {
            state.allFoldersLoad = action.payload
        },
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
        },
        update_addFolder:(state,action) => {
            state.foldersList.push(action.payload)
        },
        update_deleteFolder:(state,action) => {
            state.foldersList.splice(action.payload, 1)
        },
    },
})

export const FolderSliceReducer = FolderSlice.reducer
export const {
    update_allFoldersLoad,
    update_folderOnCreation,
    update_folderSelectedID,
    update_folderSelectedName,
    update_folderRename,
    update_loadFoldersList,
    update_addFolder,
    update_deleteFolder,
} = FolderSlice.actions