import {createSlice} from "@reduxjs/toolkit"

const UserSlice = createSlice({
    name:"user",
    initialState:{
        datas:{
            userFoldersList:[],
            userItemsList:[],
            userListsList:[],
            userPropertyList:[]
        },
        allDatasLoad:false
    },
    reducers:{
        update_loadAllDatas:(state,action) => {
            const newDatas = {
                userFoldersList:action.payload.newUserFoldersList,
                userItemsList:action.payload.newUserItemsList,
                userListsList:action.payload.newUserListsList,
                userPropertyList:action.payload.newUserPropertyList
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
        update_addPropertyItem:(state,action) => {
            const newProperty = action.payload
            state.datas.userItemsList.forEach(item => {
                if (item.folderID === newProperty.folderID) {
                    if(!item.property){
                        item.property = {}
                    }
                    // Directement mettre à jour l'item sans créer une nouvelle liste
                    item.property[newProperty._id] = {
                        name: newProperty.name,
                        value: "N/A"
                    }
                }
            })
        },
        update_updatePropertyItem:(state,action) => {
            const {itemID, updateList} = action.payload
            state.datas.userItemsList.forEach(item => {
                if(item._id === itemID){
                    updateList.forEach(update => {
                        const propertyID = update[0]
                        const newValue = update[1]
                        item.property[propertyID] = {
                            ...item.property[propertyID],
                            value:newValue
                        }
                    })
                }
            })
        },
        update_deletePropertyItem:(state,action) => {
            const {folderID, propertyID} = action.payload
            state.datas.userItemsList.forEach(item => {
                if(item.folderID === folderID){
                    delete item.property[propertyID]
                }
            })
        },
        update_addItemToList:(state,action) => {
            const {itemID, listID, itemContent, itemPosition} = action.payload
            state.datas.userListsList.forEach(list => {
                if(list._id === listID){
                    Object.entries(list.items).map(([key,item], index) => {
                        if(item.position >= itemPosition){
                            list.items[key].position = list.items[key].position + 1
                        }
                    })
                    list.items[itemID] = {
                        name:itemContent,
                        position:itemPosition
                    }
                    
                }
            })
        }
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
    update_DELETE_ALL_DATAS,

    update_addPropertyItem,
    update_updatePropertyItem,
    update_deletePropertyItem,

    update_addItemToList,
} = UserSlice.actions