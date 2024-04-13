import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

export default function useList_List(){

    const userListsList = useSelector(store => store.user.datas.userListsList)
    const listOnCreation = useSelector(store => store.list.listOnCreation)
    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    const listToShow = userListsList.filter(list => list?.folderID === folderSelectedID)

    return{
        listOnCreation,
        listToShow
    }
}