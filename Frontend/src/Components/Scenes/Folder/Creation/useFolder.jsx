import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_folderOnCreation, update_folderSelectedID, update_folderSelectedName } from "../FolderSlice";
import useLocalStorage from "../../../../Utils/useLocalStorage";

export default function useFolder_Creation(){

    const inputRef = useRef()
    const folderOnCreation = useSelector(store => store.folder.folderOnCreation)
    const todoStorage = useSelector(store => store.localStorage.todoStorage)
    const {localStorage_saveNewFolder} = useLocalStorage()
    const dispatch = useDispatch()


    // Génère un ID pour le dossier
    const generateFolderID = () => {
        let newID
        if(todoStorage.foldersList.length === 0){
            newID = 1
        }else{
            const maximumID = todoStorage.foldersList.reduce((max, folder) => folder.id > max ? folder.id : max, todoStorage.foldersList[0].id)
            newID = maximumID + 1
        }
        return newID
    }

    // Pour préparer la sauvegarde du nouveau dossier
    const saveNewFolder = () => {
        if(inputRef.current.value !== ""){
            const newFolderName = inputRef.current.value
            const newFolderID = generateFolderID()
            localStorage_saveNewFolder({name:newFolderName, taskList:[], id:newFolderID})
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