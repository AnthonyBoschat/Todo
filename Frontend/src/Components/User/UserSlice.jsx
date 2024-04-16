import {createSlice} from "@reduxjs/toolkit"

const UserSlice = createSlice({
    name:"user",
    initialState:{
        datas:{
            userFoldersList:[],
            userItemsList:[],
            userListsList:[],
            userPropertiesList:[]
        },
        allDatasLoad:false
    },
    reducers:{
        update_loadAllDatas:(state,action) => {
            const newDatas = {
                userFoldersList:action.payload.newUserFoldersList,
                userItemsList:action.payload.newUserItemsList,
                userListsList:action.payload.newUserListsList,
                userPropertiesList:action.payload.newUserPropertiesList
            }
            state.datas = newDatas
        },
        update_dataList:(state,action) => {
            state.datas[action.payload.listName] = action.payload.newList
        },
        update_addData:(state,action) => {
            state.datas[action.payload.listName].push(action.payload.newData)
        },
        update_deleteData:(state,action) => {
            state.datas[action.payload.listName].splice(action.payload.dataIndex, 1)
        },
        update_changeData:(state,action) => {
            state.datas[action.payload.listName][action.payload.dataIndex] = action.payload.newData
        },
        update_allDatasLoad:(state,action) => {
            state.allDatasLoad = action.payload
        },
        update_reorderList:(state,action) => {
            state.datas[action.payload.listName] = action.payload.newList
        },
        update_DELETE_ALL_DATAS:(state,action) => {
            state.datas = {
                userFoldersList:[],
                userItemsList:[],
            }
        },
    },
})

export const UserSliceReducer = UserSlice.reducer
export const {
    update_loadAllDatas,
    update_allDatasLoad,
    update_dataList,
    update_addData,
    update_changeData,
    update_deleteData,
    update_reorderList,
    update_DELETE_ALL_DATAS
} = UserSlice.actions