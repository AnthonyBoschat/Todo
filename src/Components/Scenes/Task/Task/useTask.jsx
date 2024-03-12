import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_todoStorage } from "../../../../Utils/LocalStorageSlice";
import { update_taskOnEdition } from "../TaskSlice";

export default function useTask_One(folderIndex, task){

    const taskOnEdition = useSelector(store => store.task.taskOnEdition)
    const [taskEditable, setTaskEditable] = useState(false)
    
    const taskRef = useRef()
    const taskNameRef = useRef()
    const dispatch = useDispatch()

    // Filtrage du contenu de la task pour permettre les saut à la ligne
    const returnLineFilter = (taskTitle) => {
        const splitSentence = taskTitle.split('<br>')
        return splitSentence.flatMap((text, index) => index !== splitSentence.length - 1 ? [text, <br key={index} />] : text);
    }

    const [taskTitle, setTaskTitle] = useState(returnLineFilter(task.title))

    // Pour supprimer cette task
    const deleteTask = (taskID) => {
        const todoStorage = JSON.parse(localStorage.getItem("todoStorage"))
        const newTaskList = todoStorage.foldersList[folderIndex].taskList.filter(task => task.id !== taskID)
        todoStorage.foldersList[folderIndex].taskList = newTaskList
        dispatch(update_todoStorage(todoStorage))
        localStorage.setItem("todoStorage", JSON.stringify(todoStorage))
    }

    // Click pour rendre le task editable
    const toggleRenameTask = () => {
        setTaskEditable(true)
        dispatch(update_taskOnEdition(true))
    }

    // Bouton de validation pour valider l'edit de task
    const valideRenameTask = (taskID) => {
        const todoStorage = JSON.parse(localStorage.getItem("todoStorage"))
        const taskIndex = todoStorage.foldersList[folderIndex].taskList.findIndex(task => task.id === taskID)
        todoStorage.foldersList[folderIndex].taskList[taskIndex].title = taskNameRef.current.innerHTML
        dispatch(update_todoStorage(todoStorage))
        localStorage.setItem("todoStorage", JSON.stringify(todoStorage))
        setTaskEditable(false)
    }


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
        taskTitle
    }
}