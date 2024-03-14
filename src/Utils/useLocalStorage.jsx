import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_todoStorage } from "./LocalStorageSlice";

export default function useLocalStorage(){

    const todoStorage = useSelector(store => store.localStorage.todoStorage)
    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    const folderSelectedName = useSelector(store => store.folder.folderSelectedName)
    
    const dispatch = useDispatch()





    const localStorage_saveNewFolder = (newFolder) => {
        const todoStorage = JSON.parse(localStorage.getItem("todoStorage"))
        if(todoStorage){
            todoStorage.foldersList.push(newFolder)
            localStorage.setItem("todoStorage", JSON.stringify(todoStorage))
            dispatch(update_todoStorage(todoStorage))
        }else{
            const newTodoStorage = {
                foldersList:[]
            }
            newTodoStorage.foldersList.push(newFolder)
            localStorage.setItem("todoStorage", JSON.stringify(newTodoStorage))
            dispatch(update_todoStorage(newTodoStorage))
        }
    }






    const localStorage_saveNewTask = (newTask) => {
        const todoStorage = JSON.parse(localStorage.getItem("todoStorage"))
        const folderIndex = todoStorage.foldersList.findIndex(folder => folder.name === folderSelectedID)
        todoStorage.foldersList[folderIndex].taskList.push(newTask)
        localStorage.setItem("todoStorage", JSON.stringify(todoStorage))
        dispatch(update_todoStorage(todoStorage))
    }


    




    

    return{
        localStorage_saveNewFolder,
        localStorage_saveNewTask,
    }
}