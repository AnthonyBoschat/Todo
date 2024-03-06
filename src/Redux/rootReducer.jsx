import { combineReducers } from "@reduxjs/toolkit"
import { defaultSliceReducer } from "./Slices/SlicesDefault"

const rootReducer = combineReducers({
    defaultName:defaultSliceReducer // Ajouter les sliceReducer voulu
})

export default rootReducer