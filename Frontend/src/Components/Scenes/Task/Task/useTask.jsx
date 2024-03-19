import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_todoStorage } from "../../../../Utils/LocalStorageSlice";
import { update_taskOnEdition } from "../TaskSlice";
import useLocalStorage from "../../../../Utils/useLocalStorage";

export default function useTask_One(folderIndex, task){

    const taskOnEdition = useSelector(store => store.task.taskOnEdition)
    const todoStorage = useSelector(store => store.localStorage.todoStorage)
    const tasksList = useSelector(store => store.task.tasksList)
    const [taskEditable, setTaskEditable] = useState(false)
    const [taskFinish, setTaskFinish] = useState(task.completed)
    const {localStorage_deleteTask, localStorage_renameTask, localStorage_toggleTask} = useLocalStorage()
    
    const taskRef = useRef()
    const taskNameRef = useRef()
    const dispatch = useDispatch()

    // Pour supprimer cette task
    const deleteTask = (taskID) => {localStorage_deleteTask(taskID)}

    // Click pour rendre le task editable
    const toggleRenameTask = () => {
        setTaskEditable(true)
        dispatch(update_taskOnEdition(true))
    }

    // Bouton de validation pour valider l'edit de task
    const valideRenameTask = (taskID) => {
        const newTaskTitle = taskNameRef.current.innerText
        localStorage_renameTask(taskID, newTaskTitle)
        setTaskEditable(false)
    }

    // Pour toggle une task en finish ou unFinish
    const validTask = () => { setTaskFinish(!taskFinish) }

    useEffect(() => {
        localStorage_toggleTask(task._id, taskFinish)
    }, [taskFinish])

    // Afin de placer le focus et le curseur sur la task qu'on souhaite modifier
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

    // Pour gérer la touche entrer pour la validation de task
    useEffect(() => {
        if(taskEditable && taskNameRef.current){
            const handleKeyDown = (event) => {
                if(event.key === "Enter"){
                    if(event.shiftKey){
                        return
                    }else{
                        valideRenameTask(task.id)
                    }
                }
            }

            window.addEventListener("keydown", handleKeyDown)

            return () => window.removeEventListener("keydown", handleKeyDown)
        }
    }, [taskEditable])

    // Quand l'utilisateur par exemple clique sur un autre folder, les task editable deviennent non editable
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
        taskOnEdition,
        validTask,
        taskFinish
    }
}