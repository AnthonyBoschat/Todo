import {createSlice} from "@reduxjs/toolkit"

const CollectionSlice = createSlice({
    name:"collection",
    initialState:{
        collectionOnCreation:false,
        collectionToShow:[],
        collectionWhoWhantItems:[]
    },
    reducers:{
        update_collectionOnCreation:(state,action) => {
            state.collectionOnCreation = action.payload
        },
        update_collectionToShow:(state,action) => {
            state.collectionToShow = action.payload
        },
        update_collectionWhoWhantItems:(state, action) => {
            const {type, collection} = action.payload
            switch(type){
                case "push":
                    state.collectionWhoWhantItems.push(collection)
                    return
                case "delete":
                    const collectionIndex = state.collectionWhoWhantItems.findIndex(collec => collec._id === collection._id)
                    state.collectionWhoWhantItems.splice(collectionIndex, 1)
                    return
                default:
                    return
            }
            
        },
        update_AddItemsToCollectionWhoWhantItems:(state,action) => {
            console.log("controle")
            const {itemID, collectionID, itemContent, itemPosition} = action.payload
            const collectionIndex = state.collectionWhoWhantItems.findIndex(collection => collection._id === collectionID)
            const itemsList = state.collectionWhoWhantItems[collectionIndex].items
            if(itemsList){
                Object.entries(itemsList).map(([key,item]) => {
                    if(item.position >= itemPosition){
                        itemsList[key].position = itemsList[key].position + 1
                    }
                })
                itemsList[itemID] = {
                    name:itemContent,
                    position:itemPosition
                }
            }else{
                state.collectionWhoWhantItems[collectionIndex].items = {}
                state.collectionWhoWhantItems[collectionIndex].items[itemID] = {
                    name:itemContent,
                    position:itemPosition
                }
            }
        },
        update_deleteItemsToCollectionWhoWhantItems:(state,action) => {
            const {itemID, collectionID} = action.payload
            const collectionIndex = state.collectionWhoWhantItems.findIndex(collection => collection._id === collectionID)
            const itemsList = state.collectionWhoWhantItems[collectionIndex].items
            if(itemsList){
                delete itemsList[itemID]
            }else{
                console.error("Une erreur a été lever dans le slice Collection : update_deleteItemsToCollectionWhoWhantItems")
            }
        }
    },
})

export const CollectionSliceReducer = CollectionSlice.reducer
export const {
    update_collectionOnCreation,
    update_collectionToShow,
    update_collectionWhoWhantItems,
    update_AddItemsToCollectionWhoWhantItems,
    update_deleteItemsToCollectionWhoWhantItems
} = CollectionSlice.actions