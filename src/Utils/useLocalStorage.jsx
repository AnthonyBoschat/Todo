import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_todoStorage } from "./LocalStorageSlice";
import { update_folderSelectedID } from "../Components/Scenes/Folder/FolderSlice";

export default function useLocalStorage(){

    const todoStorage = useSelector(store => store.localStorage.todoStorage)
    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    const folderSelectedName = useSelector(store => store.folder.folderSelectedName)
    
    const dispatch = useDispatch()


    // Enregistrer un nouveau dossier
    const localStorage_saveNewFolder = (newFolder) => {
        const todoStorage = JSON.parse(localStorage.getItem("todoStorage")) // On récupère le localStorage
        todoStorage.foldersList.push(newFolder) // On push le nouveau dossier
        dispatch(update_todoStorage(todoStorage)) // On met à jour l'état redux todoStorage
        dispatch(update_folderSelectedID(newFolder.id)) // On met le focus sur le dossier créé
    }

    // Enregistrer une nouvelle tâche
    const localStorage_saveNewTask = (newTask) => {
        const todoStorage = JSON.parse(localStorage.getItem("todoStorage"))
        const folderIndex = todoStorage.foldersList.findIndex(folder => folder.id === folderSelectedID)
        todoStorage.foldersList[folderIndex].taskList.push(newTask)
        dispatch(update_todoStorage(todoStorage))
    }

    const localStorage_renameFolder = () => {

    }

    // Synchronise en permanence la sauvegarde dans le localStorage quand l'état rédux todoStorage change
    useEffect(() => {
        localStorage.setItem("todoStorage", JSON.stringify(todoStorage))
    }, [todoStorage])


    




    

    return{
        localStorage_saveNewFolder,
        localStorage_saveNewTask,
    }
}