import {createSlice} from "@reduxjs/toolkit"

const todoStorage = JSON.parse(localStorage.getItem("todoStorage"))

const FolderSlice = createSlice({
    name:"folder",
    initialState:{
        folderOnCreation:false,
        folderSelectedID:null,
        folderSelectedName:null,
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
    },
})

export const FolderSliceReducer = FolderSlice.reducer
export const {
    update_folderOnCreation,
    update_folderSelectedID,
    update_folderSelectedName
} = FolderSlice.actions