import {createSlice} from "@reduxjs/toolkit"

const UserSlice = createSlice({
    name:"user",
    initialState:{
        datas:{
            userFoldersList:[],
            userItemsList:[],
            userCollectionsList:[],
            userPropertyList:[]
        },
        allDatasLoad:false
    },
    reducers:{
        update_loadAllDatas:(state,action) => {
            const newDatas = {
                userFoldersList:action.payload.newUserFoldersList,
                userItemsList:action.payload.newUserItemsList,
                userCollectionsList:action.payload.newUserCollectionsList,
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
                userCollectionsList:[],
                userPropertyList:[]
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
        update_addItemToCollection:(state,action) => {
            const {itemID, itemContent, itemPosition} = action.payload

            itemPosition.forEach(object => {
                const {collectionID, position} = object
                // On trouve l'index de la collection
                const collectionIndex = state.datas.userCollectionsList.findIndex(collection => collection._id === collectionID)
                // On récupère sa liste d'item
                const itemsList = state.datas.userCollectionsList[collectionIndex].items
                // S'il a une liste d'item
                if(itemsList){
                    Object.entries(itemsList).map(([key,item]) => {
                        if(item.position >= position){
                            itemsList[key].position = itemsList[key].position + 1
                        }
                    })
                    itemsList[itemID] = {
                        name:itemContent,
                        position:position
                    }
                }
                // S'il n'a pas encore d'item
                else{
                    state.datas.userCollectionsList[collectionIndex].items = {}
                    state.datas.userCollectionsList[collectionIndex].items[itemID] = {
                        name:itemContent,
                        position:position
                    }
                }
            })
        },

        update_deleteItemToCollection:(state,action) => {
            const {itemID, collectionID} = action.payload
            const collectionIndex = state.datas.userCollectionsList.findIndex(collection => collection._id === collectionID)
            const itemsList = state.datas.userCollectionsList[collectionIndex].items
            if(itemsList){
                delete itemsList[itemID]
            }else{
                console.error("Une erreur a été lever dans le slice User : update_deleteItemToCollection")
            }
        },
        update_deleteMultipleItemToCollection:(state,action) => {
            const {itemID, collectionsID} = action.payload
            collectionsID.forEach(collectionID => {
                const collectionIndex = state.datas.userCollectionsList.findIndex(collection => collection._id === collectionID)
                const itemsList = state.datas.userCollectionsList[collectionIndex].items
                if(itemsList){
                    delete itemsList[itemID]
                }else{
                    console.error("Une erreur a été lever dans le slice User : update_deleteMultipleItemToCollection")
                }
            })
        },
        update_reorderItemsToCollection:(state,action) => {
            const {collectionID, itemsCollections} = action.payload
            const collectionIndex = state.datas.userCollectionsList.findIndex(collection => collection._id === collectionID)
            for(let i = 0; i<itemsCollections.length; i++){
                const itemID = itemsCollections[i][0]
                state.datas.userCollectionsList[collectionIndex].items[itemID].position = i
            }
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

    update_addItemToCollection,
    update_deleteItemToCollection,
    update_deleteMultipleItemToCollection,


    update_reorderItemsToCollection
} = UserSlice.actions