import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_folderSelectedID } from "../FolderSlice";
import { update_loadTasksList, update_taskOnEdition } from "../../Task/TaskSlice";

export default function useFolder_Button(folder){

    const buttonFolderRef = useRef()
    const dispatch = useDispatch()
    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)

    const handleClickFolder = () => {
        if(folder._id != folderSelectedID){ // Si l'utilisateur clique sur un dossier qui n'est pas encore selectionner
            dispatch(update_folderSelectedID(folder._id))
        }else{ // Si l'utilisateur clique un dossier qui est déjà en cours de présentation
            dispatch(update_folderSelectedID(null))
            dispatch(update_loadTasksList([]))
        }
        dispatch(update_taskOnEdition(false)) // Dans tout les cas, on coupe le mode edition des tasks
    }

    return{
        buttonFolderRef,
        folderSelectedID,
        handleClickFolder,
    }
}