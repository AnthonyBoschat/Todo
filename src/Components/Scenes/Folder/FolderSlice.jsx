import {createSlice} from "@reduxjs/toolkit"

const todoStorage = JSON.parse(localStorage.getItem("todoStorage"))

const FolderSlice = createSlice({
    name:"folder",
    initialState:{
        folderOnCreation:false,
        folderSelectedName:null
    },
    reducers:{
        update_folderOnCreation:(state,action) => {
            state.folderOnCreation = action.payload
        },
        update_folderSelectedName:(state,action) => {
            state.folderSelectedName = action.payload
        },
    },
})

export const FolderSliceReducer = FolderSlice.reducer
export const {
    update_folderOnCreation,
    update_folderSelectedName,
} = FolderSlice.actions