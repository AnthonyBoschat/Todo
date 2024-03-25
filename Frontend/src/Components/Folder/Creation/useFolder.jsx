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

    // Pour préparer la sauvegarde du nouveau dossier
    const saveNewFolder = () => {
        if(inputRef.current.value !== ""){
            const newFolderName = inputRef.current.value
            mongoDB_saveNewFolder({name:newFolderName, userID:userID})
        }
        dispatch(update_folderOnCreation(false))
    }

    // Quand le dossier veut etre valider
    const handleValidFolder = useCallback((event) => { if(event.key === "Enter" && inputRef.current){saveNewFolder()} }, [folderOnCreation])
    // Lors de l'annulation de la création d'un dossier
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