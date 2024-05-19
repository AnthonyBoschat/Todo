import React, {} from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_AddItemsToCollectionWhoWhantItems, update_collectionOnCreation, update_collectionWhoWhantItems, update_deleteItemsToCollectionWhoWhantItems } from "./CollectionSlice";
import { update_addData, update_addItemToCollection, update_dataList, update_deleteData, update_deleteItemToCollection, update_deleteMultipleItemToCollection } from "../User/UserSlice";

export default function useCollection_Action(){

    const userCollectionsList = useSelector(store => store.user.datas.userCollectionsList)
    const collectionWhoWhantItems = useSelector(store => store.collection.collectionWhoWhantItems)
    const dispatch = useDispatch()

    const collectionAction = {
        create:(data) => {
            data.items = {}
            dispatch(update_addData({listName:"userCollectionsList", newData:data}))
            dispatch(update_collectionOnCreation(false))
        },

        delete:(collectionID) => {
            const collectionIndex = userCollectionsList.findIndex(collection => collection._id === collectionID)
            dispatch(update_deleteData({listName:"userCollectionsList", dataIndex:collectionIndex}))
            dispatch(update_collectionWhoWhantItems({type:"delete", thisCollectionID:collectionID}))
        },

        sort:(data) => {
            const objectsDatas = data.reduce((acc, list) => {
                acc[list._id] = list.position
                return acc
            }, {})
            const updatedUserCollectionList = userCollectionsList.map(list => {
                if(objectsDatas[list._id] !== undefined){
                    return {...list, position:objectsDatas[list._id]}
                }
                return list
            })
            dispatch(update_dataList({listName:"userCollectionsList", newList:updatedUserCollectionList}))
            console.log("Requette de réorganisation des listes effectuer")
        },

        addItem:(data) => {
            dispatch(update_addItemToCollection(data))
        },

        deleteItem:(data) => {
            dispatch(update_deleteItemToCollection(data))
        },
        deleteItemGlobal:(data) => {
            dispatch(update_deleteMultipleItemToCollection(data))
        }
    }

    return{
        collectionAction
    }
}