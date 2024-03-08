import React, {} from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_taskOnCreation } from "../TaskSlice";

export default function useAddTask(){

    const folderSelectedName = useSelector(store => store.folder.folderSelectedName)
    const taskOnCreation = useSelector(store => store.task.taskOnCreation)

    const dispatch = useDispatch()

    const addTask = () => {
        // console.log("-1 => ", folderSelectedName)
        // const todoStorage = JSON.parse(localStorage.getItem("todoStorage")) // On récupère le storage todo
        // console.log("0 => ",todoStorage)
        // const folderIndex = todoStorage.foldersList.findIndex(folder => folder.name === folderSelectedName) // On trouve le dossier correspondant
        // const taskList = todoStorage.foldersList[folderIndex].tasksList
        // if(!taskList){
        //     const newTaskList = []
        //     newTaskList.push({
        //         title:"Sortir le chien",
        //     })
        //     todoStorage.foldersList[folderIndex].tasksList = newTaskList
        //     localStorage.setItem("todoStorage", JSON.stringify(todoStorage))
        // }else{
        //     todoStorage.foldersList[folderIndex].tasksList.push({
        //         title:"Promener encore le chien"
        //     })
        //     localStorage.setItem("todoStorage", JSON.stringify(todoStorage))
        // }
        dispatch(update_taskOnCreation(!taskOnCreation))
    }

    return{
        addTask
    }
}