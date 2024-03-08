import { combineReducers } from "@reduxjs/toolkit"
import { FolderSliceReducer } from "../Components/Scenes/Folder/FolderSlice"
import { TaskSliceReducer } from "../Components/Scenes/Task/TaskSlice"

const rootReducer = combineReducers({
    folder:FolderSliceReducer,
    task:TaskSliceReducer,
})

export default rootReducer