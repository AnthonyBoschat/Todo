import { combineReducers } from "@reduxjs/toolkit"
import { FolderSliceReducer } from "../Components/Folder/FolderSlice"
import { TaskSliceReducer } from "../Components/Task/TaskSlice"
import { ConnectionSliceReducer } from "../Components/Connection/ConnectionSlice"
import { PopupSliceReducer } from "../Components/Popup/PopupSlice"
import { DevToolsSliceReducer } from "../Components/DevTools/DevToolsSlice"
import { UserSliceReducer } from "../Components/User/UserSlice"

const rootReducer = combineReducers({
    folder:FolderSliceReducer,
    task:TaskSliceReducer,
    connection:ConnectionSliceReducer,
    popup:PopupSliceReducer,
    devtools:DevToolsSliceReducer,
    user:UserSliceReducer,
})

export default rootReducer