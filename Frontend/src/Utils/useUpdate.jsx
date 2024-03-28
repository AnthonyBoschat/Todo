import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_folderSelectedName } from "../Components/Folder/FolderSlice";
import { update_loadTasksList } from "../Components/Task/TaskSlice";
import useBackend from "../Utils/useBackend";
import useMongoDB from "./useMongoDB";


export default function useUpdate(){

    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    const foldersList = useSelector(store => store.folder.foldersList)

    const dispatch = useDispatch()
    const {fetchRequest} = useBackend()
    const {mongoDB_getTask} = useMongoDB()

    // Récupération automatique des tasks correspondant au dossier
    useEffect(() => {
        if(folderSelectedID){
            mongoDB_getTask()
        }
    }, [folderSelectedID])

    // Update automatique du folderSelectedName dans redux quand l'id selected change
    useEffect(() => {
        if(folderSelectedID){
            const folderIndex = foldersList.findIndex(folder => folder._id === folderSelectedID)
            const folderName = foldersList[folderIndex].name
            dispatch(update_folderSelectedName(folderName))
        }else{
            dispatch(update_folderSelectedName(null))
        }
    }, [folderSelectedID])

    return{}
}