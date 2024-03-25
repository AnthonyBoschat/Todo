import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_folderSelectedID, update_folderSelectedName } from "../FolderSlice";
import { update_loadTasksList, update_taskOnEdition } from "../../Task/TaskSlice";

export default function useFolder_Button(folder){

    const buttonFolderRef = useRef()
    const dispatch = useDispatch()
    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    const foldersList = useSelector(store => store.folder.foldersList)

    const handleClickFolder = () => {
        // Si l'utilisateur clique sur un dossier qui n'est pas encore selectionner
        if(folder?._id != folderSelectedID){
            dispatch(update_folderSelectedID(folder?._id))
            const folderIndex = foldersList.findIndex(folder => folder?._id === folderSelectedID)
            // dispatch(update_folderSelectedName(foldersList[folderIndex]?.name))
        }
        // Si l'utilisateur clique un dossier qui est déjà présenter
        else{
            dispatch(update_folderSelectedID(null))
            dispatch(update_loadTasksList([]))
        }
        dispatch(update_taskOnEdition(false))
    }

    return{
        buttonFolderRef,
        folderSelectedID,
        handleClickFolder,
    }
}