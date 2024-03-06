import { combineReducers } from "@reduxjs/toolkit"
import { defaultSliceReducer } from "./Slices/SlicesDefault"
import { FolderSliceReducer } from "../Components/Scenes/List/Folder/FolderSlice"

const rootReducer = combineReducers({
    folder:FolderSliceReducer // Ajouter les sliceReducer voulu
})

export default rootReducer