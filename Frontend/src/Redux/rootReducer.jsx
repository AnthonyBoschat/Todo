import { combineReducers } from "@reduxjs/toolkit"
import { FolderSliceReducer } from "../Components/Scenes/Folder/FolderSlice"
import { TaskSliceReducer } from "../Components/Scenes/Task/TaskSlice"
import { ConnectionSliceReducer } from "../Components/Scenes/Connection/ConnectionSlice"
import { PopupSliceReducer } from "../Components/Scenes/Popup/PopupSlice"
import { DevToolsSliceReducer } from "../Components/Scenes/DevTools/DevToolsSlice"

const rootReducer = combineReducers({
    folder:FolderSliceReducer,
    task:TaskSliceReducer,
    connection:ConnectionSliceReducer,
    popup:PopupSliceReducer,
    devtools:DevToolsSliceReducer,
})

export default rootReducer