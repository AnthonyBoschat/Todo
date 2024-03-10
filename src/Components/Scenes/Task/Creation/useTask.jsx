import React, { useRef, useState } from "react";
import useLocalStorage from "../../../../Utils/useLocalStorage";
import { useDispatch, useSelector } from "react-redux";
import { update_taskOnCreation } from "../TaskSlice";

export default function useTask_Creation(){

    const dispatch = useDispatch()
    const {localStorage_saveNewTask} = useLocalStorage()
    const folderSelectedName = useSelector(store => store.folder.folderSelectedName)


    const [texteareDisabled, setTexteareDisabled] = useState(true)
    const textareaRef = useRef()
    const titleRef = useRef()

    const handleSubmit = (event) => {
        event.preventDefault()

        const taskTitle = titleRef.current.value // On récupère le titre de la tâche
        const taskDescription = textareaRef.current.value // On récupère la description de la tâche
        const taskID = generateID()// On génère un nouvel id pour cette task

        const newTask = {title:taskTitle, description:taskDescription, id:taskID}
        localStorage_saveNewTask(newTask)
        dispatch(update_taskOnCreation(false))
    }

    const handleRadioChange = (event) => {
        const isDisabled = event.target.value === "true"
        setTexteareDisabled(isDisabled)
        // if(isDisabled){textareaRef.current.value = ""}
    }

    const generateID = () => {
        const todoStorage = JSON.parse(localStorage.getItem("todoStorage"))
        const folderIndex = todoStorage.foldersList.findIndex(folder => folder.name === folderSelectedName)
        let newID
        if(todoStorage.foldersList[folderIndex].taskList.length === 0){
            newID = 0
        }else{
            const taskList = todoStorage.foldersList[folderIndex].taskList
            console.log(taskList)
            const maximumID = taskList.reduce((max, task) => task.id > max ? task.id : max, taskList[0].id)
            newID = maximumID + 1
        }
        return newID
    }

    return{
        textareaRef,
        titleRef,
        handleSubmit,
        handleRadioChange,
        texteareDisabled
    }
}