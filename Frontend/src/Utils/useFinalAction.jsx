import React, {} from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { update_addTask, update_deleteTask, update_loadTasksList, update_renameTask, update_toggleTask } from "../Components/Task/TaskSlice";
import usePopup from "../Components/Popup/usePopup";
import { update_addFolder, update_allFoldersLoad, update_deleteFolder, update_folderRename, update_folderSelectedID, update_folderSelectedName, update_loadFoldersList } from "../Components/Folder/FolderSlice";
import { update_closeConnection, update_connected, update_connectedUser } from "../Components/Connection/ConnectionSlice";

export default function useFinalAction(){

    const taskList = useSelector(store => store.task.tasksList)
    const foldersList = useSelector(store => store.folder.foldersList)
    const dispatch = useDispatch()
    const {popup} = usePopup()

    const finalAction = (route, payload) => {
        let taskIndex
        let folderIndex
        switch(route){


            case "/user/create":
                dispatch(update_connected(true))
                dispatch(update_connectedUser({
                    name:payload.userName,
                    _id:payload._id
                }))
                popup({
                    message:"Registration successful.",
                    color:"good"
                })
                break

            case "/user/connect":
                dispatch(update_connected(true))
                dispatch(update_connectedUser({
                    name:payload.userName,
                    _id:payload._id
                }))
                popup({
                    message:"Connection successful.",
                    color:"good"
                })
                break   
                
            case "/user/disconnect":
                dispatch(update_loadFoldersList([]))
                dispatch(update_loadTasksList([]))
                dispatch(update_allFoldersLoad(false))
                dispatch(update_folderSelectedID(null))
                dispatch(update_closeConnection())
                popup({
                    message:"You have been disconnected",
                    color:"good"
                })
                break
            









            case "/folder/create":
                dispatch(update_addFolder({name:payload.name, _id:payload._id}))
                dispatch(update_folderSelectedID(payload._id))
                dispatch(update_folderSelectedName(payload.name))
                break

            case "/folder/delete":
                folderIndex = foldersList.findIndex(folder => folder._id === payload)
                dispatch(update_deleteFolder(folderIndex))
                dispatch(update_loadTasksList([]))
                dispatch(update_folderSelectedID(null))
                popup({
                    message:"Folder deleted",
                    color:"good"
                })
                break

            case "/folder/rename":
                folderIndex = foldersList.findIndex(folder => folder._id === payload._id)
                const newFolderName = payload.name
                dispatch(update_folderRename({folderIndex:folderIndex, newFolderName:newFolderName}))
                dispatch(update_folderSelectedName(newFolderName))
                popup({
                    message:"Your folder have been rename.",
                    color:"good"
                })
                break










                



            case "/tasks/create":
                dispatch(update_addTask(payload))
                break

            case "/tasks/delete":
                const deletedTaskIndex = taskList.findIndex(task => task._id === payload._id)
                dispatch(update_deleteTask(deletedTaskIndex))
                popup({
                    message:"Task Deleted",
                    color:"good",
                })
                break
            
            case "/tasks/rename":
                taskIndex = taskList.findIndex(task => task._id === payload._id)
                const newTaskContent = payload.content
                dispatch(update_renameTask({taskIndex:taskIndex, newTaskContent:newTaskContent}))
                break


            case "/tasks/toggle":
                taskIndex = taskList.findIndex(task => task._id === payload._id)
                const newTaskToggle = payload.completed
                dispatch(update_toggleTask({taskIndex, newTaskToggle}))
                break

            case "/tasks/getAll":
                dispatch(update_loadTasksList(payload))
                break
            
        }
    }

    return{
        finalAction
    }
}