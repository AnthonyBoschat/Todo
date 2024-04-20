import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_listToShow } from "../ListSlice";

export default function useList_List(){

    const dispatch = useDispatch()
    const userListsList = useSelector(store => store.user.datas.userListsList)
    const listOnCreation = useSelector(store => store.list.listOnCreation)
    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    const listToShow = useSelector(store => store.list.listToShow)

    useEffect(() => {
        if(folderSelectedID){
            const listToShow = userListsList.filter(list => list.folderID === folderSelectedID)
            dispatch(update_listToShow(listToShow))
        }else{
            dispatch(update_listToShow([]))
        }
    }, [folderSelectedID, userListsList])
    return{
        listOnCreation,
        listToShow
    }
}