import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetchRequest from "../../../../Utils/useFetchRequest";
import { update_taskOnEdition } from "../../TaskSlice";

export default function useTaskOption_Rename(taskNameRef,taskEditable,setTaskEditable,leftSideRef,task){

    const taskOnEdition = useSelector(store => store.task.taskOnEdition)
    const [optionSelected, setOptionSelected] = useState(false)
    const dispatch = useDispatch()
    const {fetchRequest} = useFetchRequest()
    

     // Click pour rendre la task editable
     const toggleRenameTask = (taskID) => {
        setOptionSelected(!optionSelected)
        if(!taskEditable){
            setTaskEditable(true)
            dispatch(update_taskOnEdition(true))
        }
        if(taskEditable && taskOnEdition){
            const newTaskContent = taskNameRef.current.innerText
            fetchRequest("PUT", `task/rename/${taskID}`, {newTaskContent})
            setTaskEditable(false)
        }
    }

    // Pour gérer la touche entrer pour la validation de task
    useEffect(() => {
        if(taskEditable && taskNameRef.current){
            const handleKeyDown = (event) => {
                if(event.key === "Enter"){
                    if(event.shiftKey){
                        return
                    }else{
                        toggleRenameTask(task._id)
                    }
                }
            }

            window.addEventListener("keydown", handleKeyDown)

            return () => window.removeEventListener("keydown", handleKeyDown)
        }
    }, [taskEditable])


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

    return{
        taskEditable,
        toggleRenameTask,
        optionSelected
    }
}