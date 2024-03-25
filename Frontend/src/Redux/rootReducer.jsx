import { combineReducers } from "@reduxjs/toolkit"
import { FolderSliceReducer } from "../Components/Folder/FolderSlice"
import { TaskSliceReducer } from "../Components/Task/TaskSlice"
import { ConnectionSliceReducer } from "../Components/Connection/ConnectionSlice"
import { PopupSliceReducer } from "../Components/Popup/PopupSlice"
import { DevToolsSliceReducer } from "../Components/DevTools/DevToolsSlice"

const rootReducer = combineReducers({
    folder:FolderSliceReducer,
    task:TaskSliceReducer,
    connection:ConnectionSliceReducer,
    popup:PopupSliceReducer,
    devtools:DevToolsSliceReducer,
})

export default rootReducer