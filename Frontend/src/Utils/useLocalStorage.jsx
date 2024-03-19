import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_addFolder, update_allFoldersLoad, update_deleteFolder, update_folderRename, update_folderSelectedID, update_folderSelectedName, update_loadFoldersList } from "../Components/Scenes/Folder/FolderSlice";
import { update_addTask, update_deleteTask, update_loadTasksList, update_taskList, update_taskOnCreation } from "../Components/Scenes/Task/TaskSlice";

// Toute modificaiton du localStorage passe par ce hook
export default function useLocalStorage(){

    const allFoldersLoad = useSelector(store => store.folder.allFoldersLoad)
    const taskList = useSelector(store => store.task.tasksList)
    const foldersList = useSelector(store => store.folder.foldersList)
    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    const folderIndex = foldersList.findIndex(folder => folder.id === folderSelectedID)
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
        .then(folderSave => {
            console.log("Dossier enregistrer :", folderSave)
            // const {name, _id} = data
            dispatch(update_addFolder({name:folderSave.name, _id:folderSave._id})) // On met à jour l'état redux todoStorage
            dispatch(update_folderSelectedID(folderSave._id))
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
                const folderIndex = foldersList.findIndex(folder => folder._id === folderSelectedID)
                dispatch(update_deleteFolder(folderIndex))
                dispatch(update_loadTasksList([]))
                dispatch(update_folderSelectedID(null))
            })
            .catch(error => console.error(error.message))
        })
        .catch(error => {console.error(`Erreur lors de la suppression du dossier :`,error)})
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Pour le renommage d'un dossier

    const localStorage_renameFolder = (newFolderName) => {
        fetch(`http://localhost:4000/folders/updateFolderName/${folderSelectedID}`, {
            method:"PUT",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({newFolderName})
        })
        .then(response => response.json())
        .then(response => {
            console.log(response.message)
            console.log(response.updatedFolder)
            const folderIndex = foldersList.findIndex(folder => folder._id === response.updatedFolder._id)
            dispatch(update_folderRename({folderIndex:folderIndex, newFolderName:response.updatedFolder.name}))
        })
        .catch(error => console.error(`Erreur lors de la modification du nom du dossier ${folderSelectedID} ( ${newFolderName} ) ==> ${error.message}`))
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Enregistre une nouvelle tâche

    const localStorage_saveNewTask = (newTask) => {
        const taskForce = {
            content:newTask.content,
            completed:newTask.completed,
            folderID:folderSelectedID
        }
        // Envoyer la tâche à l'API
        fetch("http://localhost:4000/tasks/addTask", {
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(taskForce)
        })
        .then(response => response.json())
        .then(task => {
            console.log("Tâche rengistrée :", task)
            dispatch(update_addTask(task))
        })
        .catch(error => console.error("Erreur lors de l'enregistrement de la tâche : ", error))
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Pour la suppression d'une tâche
    const localStorage_deleteTask = (taskID) => {
        fetch(`http://localhost:4000/tasks/deleteTask/${taskID}`, {method:"DELETE"})
        .then(response => response.json())
        .then(result => {
            console.log(result.message)
            const deletedTaskIndex = taskList.findIndex(task => task._id === result.taskDeleted._id) 
            dispatch(update_deleteTask(deletedTaskIndex))
        })
        .catch(error => console.error(error.message))
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Pour le renommage d'une task
    const localStorage_renameTask = (taskID, newTaskTitle) => {
        // const todoStorage = JSON.parse(localStorage.getItem("todoStorage"))
        // const taskIndex = todoStorage.foldersList[folderIndex].taskList.findIndex(task => task.id === taskID)
        // todoStorage.foldersList[folderIndex].taskList[taskIndex].title = newTaskTitle
        // dispatch(update_todoStorage(todoStorage))
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Pour le toggle d'une tâche
    const localStorage_toggleTask = (taskID, taskCompleted) => {
        fetch(`http://localhost:4000/tasks/toggleTask/${taskID}`, {
            method:"PUT",
            headers:{"Content-Type": "application/json"},
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
        if(!allFoldersLoad){
            fetch("http://localhost:4000/folders/getAllFolders")
            .then(response => response.json())
            .then(allFolders => {
                console.log("Tout les dossiers ont été récupérer de la base de donnée")
                dispatch(update_loadFoldersList(allFolders))
                dispatch(update_allFoldersLoad(true))
            })
            .catch(error => console.error("Erreur lors de la récupération des dossiers :", error));   
        }
    }, [])



    useEffect(() => {
        if(folderSelectedID){
            // On récupère les tasks correspondantes s'il y en a
            fetch(`http://localhost:4000/tasks/getTasks/${folderSelectedID}`)
            .then(response => response.json())
            .then(allTasks => {
                dispatch(update_loadTasksList(allTasks))
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des tasks lié au folder : ", folderSelectedID)
                dispatch(update_loadTasksList([]))
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