import React, {} from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_collectionOnCreation } from "./CollectionSlice";
import { update_addData, update_addItemToCollection, update_dataList, update_deleteItemToCollection } from "../User/UserSlice";

export default function useCollection_Action(){

    const userCollectionsList = useSelector(store => store.user.datas.userCollectionsList)
    const dispatch = useDispatch()

    const collectionAction = {
        create:(data) => {
            data.items = {}
            dispatch(update_addData({listName:"userCollectionsList", newData:data}))
            dispatch(update_collectionOnCreation(false))
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
        }
    }

    return{
        collectionAction
    }
}