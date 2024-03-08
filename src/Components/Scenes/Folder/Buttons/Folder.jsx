import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_folderSelectedName } from "../FolderSlice";

export default function Button_Folder({folder}){
    
    const buttonFolderRef = useRef()
    const dispatch = useDispatch()
    const folderSelectedName = useSelector(store => store.folder.folderSelectedName)

    const handleClickFolder = () => {
        // Si l'utilisateur clique sur un dossier qui n'est pas encore selectionner
        if(folder?.name != folderSelectedName){
            dispatch(update_folderSelectedName(folder?.name)) // On selectionne ce dossier pour affichage
        }
        // Si l'utilisateur clique un dossier qui est déjà présenter
        else{
            dispatch(update_folderSelectedName(null)) // On déselectionne ce dossier
        }
    }

    return(
        <li>
            <button 
            className={folderSelectedName === folder?.name ? "folderSelected" : null} 
            onClick={handleClickFolder} 
            ref={buttonFolderRef}
            >
                {folder?.name}
            </button>
        </li>
    )
}