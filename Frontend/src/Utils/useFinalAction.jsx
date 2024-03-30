import React, {} from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { update_addTask, update_deleteTask, update_loadTasksList, update_renameTask, update_toggleOnWorkingTask, update_toggleCompletedTask, update_changeOneTask } from "../Components/Task/TaskSlice";
import { update_addFolder, update_allFoldersLoad, update_deleteFolder, update_folderRename, update_folderSelectedID, update_folderSelectedName, update_loadFoldersList } from "../Components/Folder/FolderSlice";
import { update_closeConnection, update_connected, update_connectedUser } from "../Components/Connection/ConnectionSlice";

export default function useFinalAction(){

    const taskList = useSelector(store => store.task.tasksList)
    const foldersList = useSelector(store => store.folder.foldersList)
    const dispatch = useDispatch()

    const finalAction = (route, payload) => {
        let taskIndex
        let folderIndex
        let newFolderName
        let newTask
        switch(route){


            // Pour connecter un utilisateur
            case "connectUser":
                dispatch(update_connected(true))
                dispatch(update_connectedUser({
                    name:payload.userName,
                    _id:payload._id
                }))
                break
            // Pour déconnecter un utilisateur
            case "disconnectUser":
                dispatch(update_loadFoldersList([]))
                dispatch(update_loadTasksList([]))
                dispatch(update_folderSelectedID(null))
                dispatch(update_allFoldersLoad(false))
                dispatch(update_closeConnection())
                break









            case "/folder/create":
                dispatch(update_addFolder(payload))
                dispatch(update_folderSelectedID(payload._id))
                break

            case "/folder/delete":
                folderIndex = foldersList.findIndex(folder => folder._id === payload)
                dispatch(update_deleteFolder(folderIndex))
                dispatch(update_loadTasksList([]))
                dispatch(update_folderSelectedID(null))
                break

            case "/folder/rename":
                folderIndex = foldersList.findIndex(folder => folder._id === payload._id)
                newFolderName = payload.name
                dispatch(update_folderRename({folderIndex, newFolderName}))
                dispatch(update_folderSelectedName(newFolderName))
                break

            case "/folder/getAll":
                dispatch(update_loadFoldersList(payload))
                dispatch(update_allFoldersLoad(true))
                break

            case "/folder/DELETE_ALL_FOLDERS":
                dispatch(update_folderSelectedID(null))
                dispatch(update_loadFoldersList([]))
                break










                



            case "/tasks/create":
                dispatch(update_addTask(payload))
                break

            case "/tasks/delete":
                const deletedTaskIndex = taskList.findIndex(task => task._id === payload._id)
                dispatch(update_deleteTask(deletedTaskIndex))
                break
            
            case "/tasks/rename":
                taskIndex = taskList.findIndex(task => task._id === payload._id)
                const newTaskContent = payload.content
                dispatch(update_renameTask({taskIndex, newTaskContent}))
                break


            case "/tasks/toggleCompleted":
                taskIndex = taskList.findIndex(task => task._id === payload._id)
                newTask = payload
                dispatch(update_changeOneTask({taskIndex, newTask}))
                break

            case "/tasks/toggleOnWorking":
                taskIndex = taskList.findIndex(task => task._id === payload._id)
                newTask = payload
                dispatch(update_changeOneTask({taskIndex, newTask}))
                break

            case "/tasks/getAll":
                dispatch(update_loadTasksList(payload))
                break

            case "/tasks/DELETE_ALL_TASKS":
                dispatch(update_loadTasksList([]))
                break

            default:
                return
            
        }
    }

    return{
        finalAction
    }
}