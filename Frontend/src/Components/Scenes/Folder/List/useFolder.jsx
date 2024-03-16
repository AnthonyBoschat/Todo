import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_addFolder, update_folderOnCreation, update_folderSelectedName } from "../FolderSlice";
import useLocalStorage from "../../../../Utils/useLocalStorage";

export default function useListFolder(inputRef){

    const dispatch = useDispatch()
    const folderOnCreation = useSelector(store => store.folder.folderOnCreation)
    const {localStorage_saveNewFolder} = useLocalStorage()

    useEffect(() => {
        if(inputRef.current && folderOnCreation){

            // QUand l'utilisateur appuie sur une touche
            const handleSubmit = (event) => {
                if(event.key === "Enter"){ // Si la touche Entrer
                    if(inputRef.current.value != ""){ // Si un début de nom a été renseigner
                        const newFolderName = event.srcElement.value
                        // dispatch(update_addFolder({name:newFolderName})) // On met à jour la liste des dossiers dans redux
                        dispatch(update_folderSelectedName(newFolderName)) // On met le focus sur le dossier créé
                        localStorage_saveNewFolder({name:newFolderName, taskList:[]}) // On sauvegarde dans le localStorage le dossier créé
                    }
                    dispatch(update_folderOnCreation(false)) // On annule le mode création du dossier
                }
            }

            // QUand l'utilisateur clique quelque-part
            const handleClick = () => {
                if(inputRef.current){
                    if(inputRef.current.value != ""){ // Si un début de nom a été renseigner
                        const newFolderName = inputRef.current.value
                        // dispatch(update_addFolder({name:newFolderName})) // On met à jour la liste des dossiers dans redux
                        dispatch(update_folderSelectedName(newFolderName)) // On met le focus sur le dossier créé
                        localStorage_saveNewFolder({name:newFolderName}) // On sauvegarde dans le localStorage le dossier créé
                    }
                    dispatch(update_folderOnCreation(false)) // On annule le mode création du dossier
                }
            }

            inputRef.current.addEventListener("keydown", handleSubmit)
            setTimeout(() => {window.addEventListener("click", handleClick)}, 1);
            
            return () => window.removeEventListener("click", handleClick)
        }
    }, [folderOnCreation])


    return{
        folderOnCreation,
    }
}