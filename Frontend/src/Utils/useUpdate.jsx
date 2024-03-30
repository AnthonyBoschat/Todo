import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_folderSelectedID, update_folderSelectedName } from "../Components/Folder/FolderSlice";
import { update_loadTasksList } from "../Components/Task/TaskSlice";
import useBackend from "../Utils/useBackend";
import useMongoDB from "./useMongoDB";


export default function useUpdate(){

    const allFoldersLoad = useSelector(store => store.folder.allFoldersLoad)
    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    const foldersList = useSelector(store => store.folder.foldersList)
    const userID = useSelector(store => store.connection.connectedUser._id)

    const dispatch = useDispatch()
    const {mongoDB_getTask, mongoDB_getFolder} = useMongoDB()

    // Après la connection, va récupérer la list de tout les dossiers de l'utilisateur connecter
    useEffect(() => {
        if(!allFoldersLoad && userID){
            mongoDB_getFolder()
        }
    }, [userID])

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