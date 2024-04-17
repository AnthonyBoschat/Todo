import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_itemToShow } from "./ItemSlice";

export default function ItemsManager(){

    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    const itemToShow = useSelector(store => store.item.itemToShow)
    const userItemsList = useSelector(store => store.user.datas.userItemsList)
    const dispatch = useDispatch()


    useEffect(() => {   
        const newItemsToShow = userItemsList.filter(item => item.folderID === folderSelectedID)
        const newItemsToShowSort = newItemsToShow.sort((a,b) => a.position - b.position)
        dispatch(update_itemToShow(newItemsToShowSort))
    }, [userItemsList, folderSelectedID])

    return{}
}