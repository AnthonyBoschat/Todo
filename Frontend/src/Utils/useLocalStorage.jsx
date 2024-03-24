import { useDispatch, useSelector } from "react-redux";
import { update_addFolder, update_allFoldersLoad, update_deleteFolder, update_folderRename, update_folderSelectedID, update_folderSelectedName, update_loadFoldersList } from "../Components/Scenes/Folder/FolderSlice";
import { update_addTask, update_deleteTask, update_loadTasksList, update_renameTask, update_taskList, update_taskOnCreation, update_toggleTask } from "../Components/Scenes/Task/TaskSlice";
import {update_connected, update_connectedUser} from "../Components/Scenes/Connection/ConnectionSlice"
import useBackend from "./useBackend";
import usePopup from "../Components/Scenes/Popup/usePopup";
import { useEffect } from "react";

// Toute modificaiton du localStorage passe par ce hook
export default function useLocalStorage(){

    const taskList = useSelector(store => store.task.tasksList)
    const foldersList = useSelector(store => store.folder.foldersList)
    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    const allFoldersLoad = useSelector(store => store.folder.allFoldersLoad)
    const userID = useSelector(store => store.connection.connectedUser._id)
    const dispatch = useDispatch()

    const {fetchRequest} = useBackend()
    const {popup} = usePopup()


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // FONCTION
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Connecte un utilisateur
    const mongDB_connectUser = (user) => {
        fetchRequest("POST", {
            route:`/users/connectUser`,
            body:user,
            finalAction: (payload) => {
                dispatch(update_connected(true))
                dispatch(update_connectedUser({
                    name:payload.userName,
                    _id:payload._id
                }))
                popup({
                    message:"Connection successful.",
                    color:"good"
                })
            },
            errorAction:() => {
                popup({
                    message:"userName or Password incorrect",
                    color:"bad"
                })
            }
        })
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Enregistre un utilisateur
    const mongoDB_saveNewUser = (newUser) => {
        fetchRequest("POST", {
            route:"/users/addUser",
            body:newUser,
            finalAction: (payload) => {
                dispatch(update_connected(true))
                dispatch(update_connectedUser({
                    name:payload.userName,
                    _id:payload._id
                }))
                popup({
                    message:"Registration successful.",
                    color:"good"
                })
            },
            errorAction: () => {
                popup({
                    message:"This username is already used. Please try with another username.",
                    color:"bad"
                })
            }
        })
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Enregistrer un nouveau dossier

    const localStorage_saveNewFolder = (newFolder) => {
        fetchRequest("POST", {
            route:"/folders/addFolder",
            body: newFolder,
            finalAction: (payload) => {
                dispatch(update_addFolder({name:payload.name, _id:payload._id}))
                dispatch(update_folderSelectedID(payload._id))
                console.log("1 => ", payload.name)
                dispatch(update_folderSelectedName(payload.name))
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
                dispatch(update_folderSelectedName(newFolderName))
            }
        })
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Enregistre une nouvelle tâche

    const localStorage_saveNewTask = (newTask) => {
        const task = {
            content:newTask.content,
            completed:newTask.completed,
            folderID:folderSelectedID,
            userID:userID
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
    useEffect(() => {
        if(!allFoldersLoad && userID){
            console.log("récupération")
            fetchRequest("GET", {
                route:`/folders/getAllFolders/${userID}`,
                finalAction:(payload) => {
                    dispatch(update_loadFoldersList(payload))
                    dispatch(update_allFoldersLoad(true))
                }
            })  
        }
    }, [userID])


    
    


    




    

    return{
        localStorage_saveNewFolder,
        localStorage_deleteFolder,
        localStorage_renameFolder,
        localStorage_toggleTask,


        localStorage_saveNewTask,
        localStorage_deleteTask,
        localStorage_renameTask,

        mongoDB_saveNewUser,
        mongDB_connectUser,
    }
}