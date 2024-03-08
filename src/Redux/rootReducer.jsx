import { combineReducers } from "@reduxjs/toolkit"
import { FolderSliceReducer } from "../Components/Scenes/Folder/FolderSlice"

const rootReducer = combineReducers({
    folder:FolderSliceReducer // Ajouter les sliceReducer voulu
})

export default rootReducer