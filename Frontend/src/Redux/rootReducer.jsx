import { combineReducers } from "@reduxjs/toolkit"
import { FolderSliceReducer } from "../Components/Folder/FolderSlice"
import { ItemSliceReducer } from "../Components/Item/ItemSlice"
import { ConnectionSliceReducer } from "../Components/Connection/ConnectionSlice"
import { PopupSliceReducer } from "../Components/Popup/PopupSlice"
import { DevToolsSliceReducer } from "../Components/DevTools/DevToolsSlice"
import { UserSliceReducer } from "../Components/User/UserSlice"
import { CollectionSliceReducer } from "../Components/Collection/CollectionSlice"
import { PropertySliceReducer } from "../Components/Property/PropertySlice"

const rootReducer = combineReducers({
    folder:FolderSliceReducer,
    item:ItemSliceReducer,
    connection:ConnectionSliceReducer,
    popup:PopupSliceReducer,
    devtools:DevToolsSliceReducer,
    user:UserSliceReducer,
    collection:CollectionSliceReducer,
    property:PropertySliceReducer
})

export default rootReducer