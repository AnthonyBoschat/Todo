import React, {} from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_listOnCreation } from "./ListSlice";
import { update_addData, update_addItemToList, update_dataList } from "../User/UserSlice";

export default function useList_Action(){

    const userListsList = useSelector(store => store.user.datas.userListsList)
    const dispatch = useDispatch()

    const listAction = {
        create:(data) => {
            data.items = {}
            dispatch(update_addData({listName:"userListsList", newData:data}))
            dispatch(update_listOnCreation(false))
        },

        sort:(data) => {
            const objectsDatas = data.reduce((acc, list) => {
                acc[list._id] = list.position
                return acc
            }, {})
            const updatedUserListList = userListsList.map(list => {
                if(objectsDatas[list._id] !== undefined){
                    return {...list, position:objectsDatas[list._id]}
                }
                return list
            })
            dispatch(update_dataList({listName:"userListsList", newList:updatedUserListList}))
            console.log("Requette de réorganisation des listes effectuer")
        },

        addItem:(data) => {
            dispatch(update_addItemToList(data))
        }
    }

    return{
        listAction
    }
}