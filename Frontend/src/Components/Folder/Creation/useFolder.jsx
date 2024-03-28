import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_folderOnCreation } from "../FolderSlice";
import useMongoDB from "../../../Utils/useMongoDB";

export default function useFolder_Creation(){

    const inputRef = useRef()
    const folderOnCreation = useSelector(store => store.folder.folderOnCreation)
    const userID = useSelector(store => store.connection.connectedUser._id)
    const {mongoDB_saveNewFolder} = useMongoDB()
    const dispatch = useDispatch()

    // Check la validité du dossier qui souhaite etre enregistrer
    const saveNewFolder = () => {
        if(inputRef.current.value !== ""){ // S'il n'a pas un nom vide
            const newFolderName = inputRef.current.value
            mongoDB_saveNewFolder({name:newFolderName}) // On l'enregistre dans la base de donnée
        }
        dispatch(update_folderOnCreation(false)) // Dans tout les cas, on annule le mode creation
    }

    // Appuie sur la touche entrée
    const handleValidFolder = useCallback((event) => { if(event.key === "Enter" && inputRef.current){saveNewFolder()} }, [folderOnCreation])
    // Si l'utilisateur clique ailleurs
    const handleClickOutside = useCallback(() => { if(inputRef.current){saveNewFolder()} }, [folderOnCreation])
    
    // Quand folderOnCreation passe en true ( qu'on est en train de créé un dossier )
    useEffect(() => {
        if(inputRef.current && folderOnCreation){
            inputRef.current.addEventListener("keydown", handleValidFolder)
            setTimeout(() => {window.addEventListener("click", handleClickOutside)}, 1);
            
            return () => window.removeEventListener("click", handleClickOutside)
        }
    }, [folderOnCreation])


    return{
        inputRef
    }
}