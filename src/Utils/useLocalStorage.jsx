import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_todoStorage } from "./LocalStorageSlice";
import { update_folderSelectedID, update_folderSelectedName } from "../Components/Scenes/Folder/FolderSlice";
import { update_taskOnCreation } from "../Components/Scenes/Task/TaskSlice";

// Toute modificaiton du localStorage passe par ce hook
export default function useLocalStorage(){

    const todoStorage = useSelector(store => store.localStorage.todoStorage)
    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    const folderIndex = todoStorage.foldersList.findIndex(folder => folder.id === folderSelectedID)
    
    const dispatch = useDispatch()


    // Enregistrer un nouveau dossier
    const localStorage_saveNewFolder = (newFolder) => {
        const todoStorage = JSON.parse(localStorage.getItem("todoStorage")) // On récupère le localStorage
        todoStorage.foldersList.push(newFolder) // On push le nouveau dossier
        dispatch(update_todoStorage(todoStorage)) // On met à jour l'état redux todoStorage
        dispatch(update_folderSelectedID(newFolder.id)) // On met le focus sur le dossier créé
    }

    // Pour la suppression d'un dossier
    const localStorage_deleteFolder = () => {
        const todoStorage = JSON.parse(localStorage.getItem("todoStorage"))
        todoStorage.foldersList = todoStorage.foldersList.filter(folder => folder.id !== folderSelectedID)
        dispatch(update_todoStorage(todoStorage))
        dispatch(update_folderSelectedID(null))
    }

    // Pour le renommage d'un dossier
    const localStorage_renameFolder = (newFolderName) => {
        const todoStorage = JSON.parse(localStorage.getItem("todoStorage"))
        todoStorage.foldersList[folderIndex].name = newFolderName
        dispatch(update_todoStorage(todoStorage))
        dispatch(update_folderSelectedName(newFolderName))
    }


    // Enregistrer une nouvelle tâche
    const localStorage_saveNewTask = (newTask) => {
        const todoStorage = JSON.parse(localStorage.getItem("todoStorage"))
        todoStorage.foldersList[folderIndex].taskList.push(newTask)
        dispatch(update_todoStorage(todoStorage))
    }

    // Pour la suppression d'une tâche
    const localStorage_deleteTask = (taskID) => {
        const todoStorage = JSON.parse(localStorage.getItem("todoStorage"))
        const newTaskList = todoStorage.foldersList[folderIndex].taskList.filter(task => task.id !== taskID)
        todoStorage.foldersList[folderIndex].taskList = newTaskList
        dispatch(update_todoStorage(todoStorage))
    }

    // Pour le renommage d'une task
    const localStorage_renameTask = () => {
        
    }

    

    // Synchronise en permanence la sauvegarde dans le localStorage quand l'état rédux todoStorage change
    useEffect(() => {
        localStorage.setItem("todoStorage", JSON.stringify(todoStorage))
    }, [todoStorage])


    




    

    return{
        localStorage_saveNewFolder,
        localStorage_deleteFolder,
        localStorage_renameFolder,


        localStorage_saveNewTask,
        localStorage_deleteTask,
        localStorage_renameTask
    }
}