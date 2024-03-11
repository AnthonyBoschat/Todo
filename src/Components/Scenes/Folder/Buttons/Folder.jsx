import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_folderSelectedID, update_folderSelectedName } from "../FolderSlice";
import { update_taskOnEdition } from "../../Task/TaskSlice";

export default function Button_Folder({folder}){
    
    const buttonFolderRef = useRef()
    const dispatch = useDispatch()
    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)

    const handleClickFolder = () => {
        // Si l'utilisateur clique sur un dossier qui n'est pas encore selectionner
        if(folder?.id != folderSelectedID){
            dispatch(update_folderSelectedID(folder?.id))
        }
        // Si l'utilisateur clique un dossier qui est déjà présenter
        else{
            dispatch(update_folderSelectedID(null))
        }
        dispatch(update_taskOnEdition(false))
    }

    return(
        <li>
            <button 
            className={folderSelectedID === folder?.id ? "folderSelected" : null} 
            onClick={handleClickFolder} 
            ref={buttonFolderRef}
            >
                {folder?.name}
            </button>
        </li>
    )
}