import { combineReducers } from "@reduxjs/toolkit"
import { FolderSliceReducer } from "../Components/Scenes/Folder/FolderSlice"
import { TaskSliceReducer } from "../Components/Scenes/Task/TaskSlice"
import { LocalStorageSliceReducer } from "../Utils/LocalStorageSlice"

const rootReducer = combineReducers({
    folder:FolderSliceReducer,
    task:TaskSliceReducer,
    localStorage:LocalStorageSliceReducer,
})

export default rootReducer