import React, {} from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_taskOnCreation } from "../TaskSlice";
import { update_todoStorage } from "../../../../Utils/LocalStorageSlice";
import { update_folderSelectedID} from "../../Folder/FolderSlice";

export default function useHeaderTask(){

    const foldersList = useSelector(store => store.localStorage.todoStorage.foldersList)
    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    const taskOnCreation = useSelector(store => store.task.taskOnCreation)

    const dispatch = useDispatch()

    const addTask = () => {
        dispatch(update_taskOnCreation(!taskOnCreation))
    }

    const deleteFolder = () => {
        
        const folderSelectedName = foldersList.findIndex(folder => folder.id === folderSelectedID)
        const userValidDelete = window.confirm(`Are you sure, delete ${folderSelectedName} ?`)
        if(userValidDelete){
            const todoStorage = JSON.parse(localStorage.getItem("todoStorage"))
            todoStorage.foldersList = todoStorage.foldersList.filter(folder => folder.id !== folderSelectedID)
            dispatch(update_todoStorage(todoStorage))
            dispatch(update_folderSelectedID(null))
            localStorage.setItem("todoStorage", JSON.stringify(todoStorage))
        }
    }

    return{
        addTask,
        deleteFolder
    }
}