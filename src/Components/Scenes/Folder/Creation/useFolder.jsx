import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_folderOnCreation, update_folderSelectedID, update_folderSelectedName } from "../FolderSlice";
import useLocalStorage from "../../../../Utils/useLocalStorage";

export default function useFolder_Creation(){

    const inputRef = useRef()
    const folderOnCreation = useSelector(store => store.folder.folderOnCreation)
    const foldersList = useSelector(store => store.localStorage.todoStorage.foldersList) // La liste des dossiers
    const {localStorage_saveNewFolder} = useLocalStorage()
    const dispatch = useDispatch()


    const generateFolderID = () => {
        let newID
        if(foldersList.length === 0){
            newID = 1
        }else{
            const maximumID = foldersList.reduce((max, folder) => folder.id > max ? folder.id : max, foldersList[0].id)
            newID = maximumID + 1
        }
        return newID
    }


    // Quand le dossier veut etre valider
    const handleValidFolder = useCallback((event) => {
        if(event.key === "Enter" && inputRef.current){ // Si la touche Entrer
            if(inputRef.current.value != ""){ // Si un début de nom a été renseigner
                const newFolderName = event.srcElement.value
                const newFolderID = generateFolderID()
                // dispatch(update_addFolder({name:newFolderName})) // On met à jour la liste des dossiers dans redux
                dispatch(update_folderSelectedID(newFolderID)) // On met le focus sur le dossier créé
                localStorage_saveNewFolder({name:newFolderName, taskList:[], id:newFolderID}) // On sauvegarde dans le localStorage le dossier créé
            }
            dispatch(update_folderOnCreation(false)) // On annule le mode création du dossier
        }
    }, [folderOnCreation])

    // Lors de l'annulation de la création d'un dossier
    const handleClickOutside = useCallback(() => {
        if(inputRef.current){
            if(inputRef.current.value != ""){ // Si un début de nom a été renseigner
                const newFolderName = inputRef.current.value
                const newFolderID = generateFolderID()
                // dispatch(update_addFolder({name:newFolderName})) // On met à jour la liste des dossiers dans redux
                dispatch(update_folderSelectedID(newFolderID)) // On met le focus sur le dossier créé
                localStorage_saveNewFolder({name:newFolderName, taskList:[], id:newFolderID}) // On sauvegarde dans le localStorage le dossier créé
            }
            dispatch(update_folderOnCreation(false)) // On annule le mode création du dossier
        }
    }, [folderOnCreation])



    
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