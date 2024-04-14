import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_folderSelectedID, update_folderSelectedName } from "../FolderSlice";
import { update_ItemOnEdition, update_itemToShow } from "../../Item/ItemSlice";

export default function useFolder_Button(folder){

    
    const dispatch = useDispatch()
    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    const userItemsList = useSelector(store => store.user.datas.userItemsList)

    const handleClickFolder = () => {
        if(folder._id != folderSelectedID){ // Si l'utilisateur clique sur un dossier qui n'est pas encore selectionner
            dispatch(update_folderSelectedID(folder._id))
            dispatch(update_folderSelectedName(folder.name))
            const itemToShow = userItemsList.filter(item => item.folderID === folder._id)
            dispatch(update_itemToShow(itemToShow))
        }else{ // Si l'utilisateur clique un dossier qui est déjà en cours de présentation
            dispatch(update_folderSelectedID(null))
            dispatch(update_folderSelectedName(null))
        }
        dispatch(update_ItemOnEdition(false)) // Dans tout les cas, on coupe le mode edition des Items
    }

    return{
        folderSelectedID,
        handleClickFolder,
    }
}