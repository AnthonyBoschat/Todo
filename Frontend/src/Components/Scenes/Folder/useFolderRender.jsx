import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_folderSelectedName } from "./FolderSlice";

export default function useFolder_Render(){

    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    const todoStorage = useSelector(store => store.localStorage.todoStorage)
    const dispatch = useDispatch()

    useEffect(() => {
        if(folderSelectedID){
            const folderIndex = todoStorage.foldersList.findIndex(folder => folder._id === folderSelectedID)
            const folderName = todoStorage.foldersList[folderIndex].name
            dispatch(update_folderSelectedName(folderName))
        }
    }, [folderSelectedID])

    return{}
}