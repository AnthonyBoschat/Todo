import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_addFolder, update_allFoldersLoad, update_deleteFolder, update_folderRename, update_folderSelectedID, update_folderSelectedName, update_loadFoldersList } from "../Components/Scenes/Folder/FolderSlice";
import { update_addTask, update_deleteTask, update_loadTasksList, update_renameTask, update_taskList, update_taskOnCreation, update_toggleTask } from "../Components/Scenes/Task/TaskSlice";
import useBackend from "./useBackend";

// Toute modificaiton du localStorage passe par ce hook
export default function useLocalStorage(){

    const allFoldersLoad = useSelector(store => store.folder.allFoldersLoad)
    const taskList = useSelector(store => store.task.tasksList)
    const foldersList = useSelector(store => store.folder.foldersList)
    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    const folderIndex = foldersList.findIndex(folder => folder.id === folderSelectedID)
    const dispatch = useDispatch()

    const {fetchRequest} = useBackend()


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
        fetchRequest("POST", {
            route:"/folders/addFolder",
            body: newFolder,
            finalAction: (payload) => {
                dispatch(update_addFolder({name:payload.name, _id:payload._id}))
                dispatch(update_folderSelectedID(payload._id))
            }
        })
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Pour la suppression d'un dossier

    const localStorage_deleteFolder = () => {

        fetchRequest("DELETE", {
            route:`/folders/deleteFolder/${folderSelectedID}`,
            finalAction: (payload) => {
                const folderIndex = foldersList.findIndex(folder => folder._id === payload)
                dispatch(update_deleteFolder(folderIndex))
                dispatch(update_loadTasksList([]))
                dispatch(update_folderSelectedID(null))
            }
        })
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Pour le renommage d'un dossier

    const localStorage_renameFolder = (newFolderName) => {
        fetchRequest("PUT", {
            route:`/folders/updateFolderName/${folderSelectedID}`,
            body:{newFolderName},
            finalAction:(payload)=>{
                const folderIndex = foldersList.findIndex(folder => folder._id === payload._id)
                const newFolderName = payload.name
                dispatch(update_folderRename({folderIndex:folderIndex, newFolderName:newFolderName}))
            }
        })
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Enregistre une nouvelle tâche

    const localStorage_saveNewTask = (newTask) => {
        const task = {
            content:newTask.content,
            completed:newTask.completed,
            folderID:folderSelectedID
        }

        fetchRequest("POST", {
            route:"/tasks/addTask",
            body:task,
            finalAction: (payload) => {
                dispatch(update_addTask(payload))
            }
        })
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Pour la suppression d'une tâche
    const localStorage_deleteTask = (taskID) => {
        fetchRequest("DELETE", {
            route:`/tasks/deleteTask/${taskID}`,
            finalAction: (payload) => {
                const deletedTaskIndex = taskList.findIndex(task => task._id === payload._id)
                dispatch(update_deleteTask(deletedTaskIndex))
            }
        })
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Pour le renommage d'une task
    const localStorage_renameTask = (taskID, newTaskContent) => {
        fetchRequest("PUT", {
            route:`/tasks/renameTask/${taskID}`,
            body:{newTaskContent},
            finalAction:(payload) => {
                const taskIndex = taskList.findIndex(task => task._id === payload._id)
                const newTaskContent = payload.content
                dispatch(update_renameTask({taskIndex:taskIndex, newTaskContent:newTaskContent}))
            }
        })
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Pour le toggle d'une tâche
    const localStorage_toggleTask = (taskID, taskCompleted) => {
        fetchRequest("PUT", {
            route:`/tasks/toggleTask/${taskID}`,
            body:{completed:taskCompleted},
            finalAction:(payload) => {
                const taskIndex = taskList.findIndex(task => task._id === payload._id)
                const newTaskToggle = payload.completed
                dispatch(update_toggleTask({taskIndex, newTaskToggle}))
            }
        })
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
            fetchRequest("GET", {
                route:`/folders/getAllFolders`,
                finalAction:(payload) => {
                    dispatch(update_loadFoldersList(payload))
                    dispatch(update_allFoldersLoad(true))
                }
            })  
        }
    }, [])



    useEffect(() => {
        if(folderSelectedID){
            fetchRequest("GET", {
                route:`/tasks/getTasks/${folderSelectedID}`,
                finalAction:(payload) => {
                    dispatch(update_loadTasksList(payload))
                }
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