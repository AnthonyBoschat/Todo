import React, {} from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_todoStorage } from "../../../../Utils/LocalStorageSlice";

export default function useTask_List(){

    const foldersList = useSelector(store => store.localStorage.todoStorage.foldersList) // La liste des dossiers
    const folderSelectedName = useSelector(store => store.folder.folderSelectedName) // Le nom du dossier selectionner
    const folderIndex = foldersList.findIndex(folder => folder.name === folderSelectedName) // L'index du dossier selectionner dans la liste des dossiers
    const taskList = foldersList[folderIndex]?.taskList // Le dossier correspondant dans la liste des dossier au dossier selectionner
    const dispatch = useDispatch()


    
    const deleteTask = (taskID) => {
        const todoStorage = JSON.parse(localStorage.getItem("todoStorage"))
        const newTaskList = todoStorage.foldersList[folderIndex].taskList.filter(task => task.id !== taskID)
        todoStorage.foldersList[folderIndex].taskList = newTaskList
        dispatch(update_todoStorage(todoStorage))
    }

    return{
        taskList,
        deleteTask
    }
}