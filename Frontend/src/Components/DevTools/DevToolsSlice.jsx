import {createSlice} from "@reduxjs/toolkit"

const DevToolsSlice = createSlice({
    name:"devtools",
    initialState:{
        debugConsole:true,
        debugPopup:false,
    },
    reducers:{
        update_debugConsole:(state,action) => {
            state.debugConsole = action.payload
        },
        update_debugPopup:(state,action) => {
            state.debugPopup = action.payload
        }
    },
})

export const DevToolsSliceReducer = DevToolsSlice.reducer
export const {
    update_debugConsole,
    update_debugPopup,
} = DevToolsSlice.actions