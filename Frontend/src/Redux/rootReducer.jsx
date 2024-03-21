import { combineReducers } from "@reduxjs/toolkit"
import { FolderSliceReducer } from "../Components/Scenes/Folder/FolderSlice"
import { TaskSliceReducer } from "../Components/Scenes/Task/TaskSlice"
import { BackendSliceReducer } from "../Utils/BackendSlice"

const rootReducer = combineReducers({
    folder:FolderSliceReducer,
    task:TaskSliceReducer,
    backend:BackendSliceReducer,
})

export default rootReducer