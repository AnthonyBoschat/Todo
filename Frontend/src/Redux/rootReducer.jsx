import { combineReducers } from "@reduxjs/toolkit"
import { FolderSliceReducer } from "../Components/Scenes/Folder/FolderSlice"
import { TaskSliceReducer } from "../Components/Scenes/Task/TaskSlice"
import { BackendSliceReducer } from "../Utils/BackendSlice"
import { ConnectionSliceReducer } from "../Components/Scenes/Connection/ConnectionSlice"
import { PopupSliceReducer } from "../Components/Scenes/Popup/PopupSlice"

const rootReducer = combineReducers({
    folder:FolderSliceReducer,
    task:TaskSliceReducer,
    backend:BackendSliceReducer,
    connection:ConnectionSliceReducer,
    popup:PopupSliceReducer,
})

export default rootReducer