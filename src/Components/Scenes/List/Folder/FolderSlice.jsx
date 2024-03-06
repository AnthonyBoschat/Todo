import {createSlice} from "@reduxjs/toolkit"

const FolderSlice = createSlice({
    name:"folder",
    initialState:{
        list:[
            {name:"Dossier numéro 1", id:1},
            {name:"Dossier numéro 2", id:2},
            {name:"Dossier numéro 3", id:3},
        ],
        folderOnCreation:false
    },
    reducers:{
        update_addFolder:(state,action) => {
            state.list.push(action.payload)
        },
        update_folderOnCreation:(state,action) => {
            state.folderOnCreation = action.payload
        }
    },
})

export const FolderSliceReducer = FolderSlice.reducer
export const {
    update_addFolder,
    update_folderOnCreation
} = FolderSlice.actions