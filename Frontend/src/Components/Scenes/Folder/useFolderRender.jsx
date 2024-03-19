import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_folderSelectedName } from "./FolderSlice";

export default function useFolder_Render(){

    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    const foldersList = useSelector(store => store.folder.foldersList)
    const dispatch = useDispatch()

    useEffect(() => {
        if(folderSelectedID){
            const folderIndex = foldersList.findIndex(folder => folder._id === folderSelectedID)
            const folderName = foldersList[folderIndex].name
            dispatch(update_folderSelectedName(folderName))
        }
    }, [folderSelectedID])

    return{}
}