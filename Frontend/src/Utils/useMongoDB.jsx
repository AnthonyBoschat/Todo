import { useDispatch, useSelector } from "react-redux";
import { update_addFolder, update_allFoldersLoad, update_deleteFolder, update_folderRename, update_folderSelectedID, update_folderSelectedName, update_loadFoldersList } from "../Components/Folder/FolderSlice";
import { update_addTask, update_deleteTask, update_loadTasksList, update_renameTask, update_taskList, update_taskOnCreation, update_toggleTask } from "../Components/Task/TaskSlice";
import {update_closeConnection, update_connected, update_connectedUser} from "../Components/Connection/ConnectionSlice"
import useBackend from "./useBackend";
import usePopup from "../Components/Popup/usePopup";

// Toute modificaiton du localStorage passe par ce hook
export default function useMongoDB(){

    const taskList = useSelector(store => store.task.tasksList)
    const foldersList = useSelector(store => store.folder.foldersList)
    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
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
    const mongoDB_connectUser = (user) => {
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
    // Déconnecte un utilisateur
    const mongoDB_disconnectUser = () => {
        fetchRequest("GET", {
            route:"/users/disconnection",
            finalAction: (payload) => {
                dispatch(update_loadFoldersList([]))
                dispatch(update_loadTasksList([]))
                dispatch(update_allFoldersLoad(false))
                dispatch(update_folderSelectedID(null))
                dispatch(update_closeConnection())
                popup({
                    message:"You have been disconnected",
                    color:"good"
                })
            }
        })
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Reconnecte un utilisateur
    const mongoDB_reconnectUser = () => {
        
        return new Promise((resolve,reject) => {
            fetchRequest("GET", {
                route:"/users/reconnectUser",
                finalAction:(payload) => {
                    dispatch(update_connected(true))
                    dispatch(update_connectedUser({
                        name:payload.userName,
                        _id:payload._id
                        
                    }))
                    popup({
                        message:"Connection successful.",
                        color:"good"
                    })
                    resolve()
                },
                errorAction: () => resolve()
            })
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

    const mongoDB_saveNewFolder = (newFolder) => {
        fetchRequest("POST", {
            route:"/create/folder",
            body: newFolder,
            finalAction: (payload) => {
                dispatch(update_addFolder({name:payload.name, _id:payload._id}))
                dispatch(update_folderSelectedID(payload._id))
                dispatch(update_folderSelectedName(payload.name))
            }
        })
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Pour la suppression d'un dossier

    const mongoDB_deleteFolder = () => {

        fetchRequest("DELETE", {
            route:`/folders/deleteFolder/${folderSelectedID}`,
            finalAction: (payload) => {
                const folderIndex = foldersList.findIndex(folder => folder._id === payload)
                dispatch(update_deleteFolder(folderIndex))
                dispatch(update_loadTasksList([]))
                dispatch(update_folderSelectedID(null))
                popup({
                    message:"Folder deleted",
                    color:"good"
                })
            }
        })
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Pour le renommage d'un dossier

    const mongoDB_renameFolder = (newFolderName) => {
        fetchRequest("PUT", {
            route:`/folders/updateFolderName/${folderSelectedID}`,
            body:{newFolderName},
            finalAction:(payload)=>{
                const folderIndex = foldersList.findIndex(folder => folder._id === payload._id)
                const newFolderName = payload.name
                dispatch(update_folderRename({folderIndex:folderIndex, newFolderName:newFolderName}))
                dispatch(update_folderSelectedName(newFolderName))
                popup({
                    message:"Your folder have been rename.",
                    color:"good"
                })
            }
        })
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Enregistre une nouvelle tâche

    const mongoDB_saveNewTask = (newTask) => {
        const task = {
            content:newTask.content,
            completed:newTask.completed,
            folderID:folderSelectedID,
            userID:userID
        }

        fetchRequest("POST", {
            route:"/create/task",
            body:task,
            finalAction: (payload) => {
                dispatch(update_addTask(payload))
            }
        })
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Pour la suppression d'une tâche
    const mongoDB_deleteTask = (taskID) => {
        fetchRequest("DELETE", {
            route:`/tasks/deleteTask/${taskID}`,
            finalAction: (payload) => {
                const deletedTaskIndex = taskList.findIndex(task => task._id === payload._id)
                dispatch(update_deleteTask(deletedTaskIndex))
                popup({
                    message:"Task Deleted",
                    color:"good",
                })
            }
        })
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Pour le renommage d'une task
    const mongoDB_renameTask = (taskID, newTaskContent) => {
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
    const mongoDB_toggleTask = (taskID, taskCompleted) => {
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
    

    return{
        mongoDB_saveNewFolder,
        mongoDB_deleteFolder,
        mongoDB_renameFolder,
        mongoDB_toggleTask,


        mongoDB_saveNewTask,
        mongoDB_deleteTask,
        mongoDB_renameTask,

        mongoDB_saveNewUser,
        mongoDB_connectUser,
        mongoDB_disconnectUser,
        mongoDB_reconnectUser,
    }
}