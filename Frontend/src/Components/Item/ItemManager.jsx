import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_itemToShow } from "./ItemSlice";

export default function ItemsManager(){

    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    const userItemsList = useSelector(store => store.user.datas.userItemsList)
    const tabSelected = useSelector(store => store.item.tabs.tabSelected)
    const dispatch = useDispatch()


    useEffect(() => {   
        // Quand on clique sur le bouton d'un dossier, va charger dans la vu la liste des items correspondant à ce dossier
        const newItemsToShow = userItemsList.filter(item => item.folderID === folderSelectedID)
        const newItemsToShowSort = newItemsToShow.sort((a,b) => a.position - b.position)
        dispatch(update_itemToShow(newItemsToShowSort))
    }, [userItemsList, folderSelectedID])

    return{
        tabSelected
    }
}