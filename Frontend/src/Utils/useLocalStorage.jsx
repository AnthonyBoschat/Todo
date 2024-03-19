import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_addFolder, update_loadFolder, update_todoStorage } from "./LocalStorageSlice";
import { update_folderSelectedID, update_folderSelectedName } from "../Components/Scenes/Folder/FolderSlice";
import { update_taskList, update_taskOnCreation } from "../Components/Scenes/Task/TaskSlice";

// Toute modificaiton du localStorage passe par ce hook
export default function useLocalStorage(){

    const todoStorage = useSelector(store => store.localStorage.todoStorage)
    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    const folderIndex = todoStorage.foldersList.findIndex(folder => folder.id === folderSelectedID)
    const dispatch = useDispatch()




    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // FONCTION
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Enregistrer un nouveau dossier

    const localStorage_saveNewFolder = (newFolder) => {
        fetch("http://localhost:4000/folders/addFolder", {
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newFolder)
        })
        .then(response => response.json())
        .then(data => {
            console.log("Dossier enregistrer :", data)
            const {name, _id} = data
            dispatch(update_addFolder({name, _id})) // On met à jour l'état redux todoStorage
            dispatch(update_folderSelectedID(_id))
        })
        .catch(error => console.error("Erreur lors de l'enregistrement du dossier : ", error))
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Pour la suppression d'un dossier

    const localStorage_deleteFolder = () => {
        fetch(`http://localhost:4000/folders/deleteFolder/${folderSelectedID}`, {method:"DELETE"})
        .then(response => {
            if(!response.ok){
                throw new Error(`Échec de la suppression du dossier ${folderSelectedID}`)
            }
            return response.json()
        })
        .then(result => {
            console.log(result.message)
            fetch(`http://localhost:4000/tasks/deleteAllTaskForThisFolder/${folderSelectedID}`, {method:"DELETE"})
            .then(response => {
                if(!response.ok){
                    throw new Error(`Echec de la suppression des task associé au dossier ${folderSelectedID}`)
                }
                return response.json()
            })
            .then(result => {
                console.log(result.message)
                dispatch(update_folderSelectedID(null))
            })
            .catch(error => console.error(error.message))
        })
        .catch(error => {console.error(`Erreur lors de la suppression du dossier :`,error)})
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Pour le renommage d'un dossier

    const localStorage_renameFolder = (newFolderName) => {
        const todoStorage = JSON.parse(localStorage.getItem("todoStorage"))
        todoStorage.foldersList[folderIndex].name = newFolderName
        dispatch(update_todoStorage(todoStorage))
        dispatch(update_folderSelectedName(newFolderName))
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Enregistrer une nouvelle tâche

    const localStorage_saveNewTask = (newTask) => {
        const todoStorage = JSON.parse(localStorage.getItem("todoStorage"))
        todoStorage.foldersList[folderIndex].taskList.push(newTask)
        dispatch(update_todoStorage(todoStorage))
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Pour la suppression d'une tâche
    const localStorage_deleteTask = (taskID) => {
        const todoStorage = JSON.parse(localStorage.getItem("todoStorage"))
        const newTaskList = todoStorage.foldersList[folderIndex].taskList.filter(task => task.id !== taskID)
        todoStorage.foldersList[folderIndex].taskList = newTaskList
        dispatch(update_todoStorage(todoStorage))
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Pour le renommage d'une task
    const localStorage_renameTask = (taskID, newTaskTitle) => {
        const todoStorage = JSON.parse(localStorage.getItem("todoStorage"))
        const taskIndex = todoStorage.foldersList[folderIndex].taskList.findIndex(task => task.id === taskID)
        todoStorage.foldersList[folderIndex].taskList[taskIndex].title = newTaskTitle
        dispatch(update_todoStorage(todoStorage))
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Pour le toggle d'une tâche
    const localStorage_toggleTask = (taskID, taskCompleted) => {
        fetch(`http://localhost:4000/tasks/toggleTask/${taskID}`, {
            method:"PUT",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({completed:taskCompleted})
        })
        .then(response => {
            if(!response.ok){
                throw new Error("erreur lors de la requête toggle")
            }
            return response.json()
        })
        .then(result => {
            console.log("Le toggle de la tâche a été modifier")
        })
        .catch(error => console.error("Erreur lors de la modification du toggle de la task : ", error))
    }

    


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // USE EFFECT
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////



    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Première récupération de la liste complète des folders dans la base de donnée
    useEffect(() => {
        fetch("http://localhost:4000/folders/getAllFolders")
        .then(response => response.json())
        .then(allFolders => {
            console.log("Tout les dossiers ont été récupérer de la base de donnée")
            dispatch(update_loadFolder(allFolders))
        })
        .catch(error => console.error("Erreur lors de la récupération des dossiers :", error));
    }, [])



    useEffect(() => {
        if(folderSelectedID){
            // On récupère les tasks correspondantes s'il y en a
            fetch(`http://localhost:4000/tasks/getTasks/${folderSelectedID}`)
            .then(response => response.json())
            .then(allTasks => {
                dispatch(update_taskList(allTasks))
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des tasks lié au folder : ", folderSelectedID)
                dispatch(update_taskList([]))
            })
        }
    }, [folderSelectedID])


    




    

    return{
        localStorage_saveNewFolder,
        localStorage_deleteFolder,
        localStorage_renameFolder,
        localStorage_toggleTask,


        localStorage_saveNewTask,
        localStorage_deleteTask,
        localStorage_renameTask
    }
}