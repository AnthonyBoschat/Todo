import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_todoStorage } from "../../../../Utils/LocalStorageSlice";
import { update_taskOnEdition } from "../TaskSlice";

export default function useTask_One(folderIndex){

    const taskOnEdition = useSelector(store => store.task.taskOnEdition)
    const [taskEditable, setTaskEditable] = useState(false)
    const taskRef = useRef()
    const taskNameRef = useRef()
    const dispatch = useDispatch()

    const deleteTask = (taskID) => {
        const todoStorage = JSON.parse(localStorage.getItem("todoStorage"))
        const newTaskList = todoStorage.foldersList[folderIndex].taskList.filter(task => task.id !== taskID)
        todoStorage.foldersList[folderIndex].taskList = newTaskList
        dispatch(update_todoStorage(todoStorage))
        localStorage.setItem("todoStorage", JSON.stringify(todoStorage))
    }

    const toggleRenameTask = () => {
        setTaskEditable(true)
        dispatch(update_taskOnEdition(true))
    }

    const valideRenameTask = (taskID) => {
        const todoStorage = JSON.parse(localStorage.getItem("todoStorage"))
        const taskIndex = todoStorage.foldersList[folderIndex].taskList.findIndex(task => task.id === taskID)
        todoStorage.foldersList[folderIndex].taskList[taskIndex].title = taskNameRef.current.innerText
        dispatch(update_todoStorage(todoStorage))
        localStorage.setItem("todoStorage", JSON.stringify(todoStorage))
        setTaskEditable(false)
    }

    useEffect(() => {
        if(taskEditable && taskNameRef.current){
            taskNameRef.current.focus()

            // Placer le curseur à la fin du span
            const selection = window.getSelection()
            const range = document.createRange()
            range.selectNodeContents(taskNameRef.current)
            range.collapse(false) 
            selection.removeAllRanges()
            selection.addRange(range)
        }
    }, [taskEditable])

    useEffect(() => {
        if(!taskOnEdition){
            setTaskEditable(false)
        }
    }, [taskOnEdition])

    return{
        deleteTask, 
        taskEditable,
        taskRef,
        toggleRenameTask,
        taskNameRef,
        valideRenameTask,
        taskOnEdition
    }
}