import { combineReducers } from "@reduxjs/toolkit"
import { FolderSliceReducer } from "../Components/Scenes/Folder/FolderSlice"
import { TaskSliceReducer } from "../Components/Scenes/Task/TaskSlice"
import { BackendSliceReducer } from "../Utils/BackendSlice"
import { ConnectionSliceReducer } from "../Components/Scenes/Connection/ConnectionSlice"

const rootReducer = combineReducers({
    folder:FolderSliceReducer,
    task:TaskSliceReducer,
    backend:BackendSliceReducer,
    connection:ConnectionSliceReducer,
})

export default rootReducer