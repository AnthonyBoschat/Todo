import {useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_taskOnEdition } from "../TaskSlice";
import useFetchRequest from "../../../Utils/useFetchRequest";

export default function useTask_One(task){

    const taskOnEdition = useSelector(store => store.task.taskOnEdition)
    const [taskEditable, setTaskEditable] = useState(false)
    const {fetchRequest} = useFetchRequest()
    
    const taskRef = useRef()
    const taskNameRef = useRef()
    const leftSideRef = useRef()
    const toggleCoverRef = useRef()
    const dispatch = useDispatch()
    

    // Click pour rendre le task editable
    const toggleRenameTask = () => {
        setTaskEditable(true)
        dispatch(update_taskOnEdition(true))
    }

    // Bouton de validation pour valider l'edit de task
    const valideRenameTask = (taskID) => {
        const newTaskContent = taskNameRef.current.innerText
        fetchRequest("PUT", `task/rename/${taskID}`, {newTaskContent})
        setTaskEditable(false)
    }

    // Pour toggle une task en finish ou unFinish
    const toggle_completedTask = (taskID, newValueTaskCompleted) => { 
        if(!newValueTaskCompleted){
            toggleCoverRef.current.classList.add("coverReturn")
            setTimeout(async() => {
                await fetchRequest("PUT", `task/toggleCompleted/${taskID}`, {completed:newValueTaskCompleted})
                toggleCoverRef.current.classList.remove("coverReturn")
            }, 100);
        }
        if(newValueTaskCompleted){
            fetchRequest("PUT", `task/toggleCompleted/${taskID}`, {completed:newValueTaskCompleted})
        }
    }


    const toggle_onWorkingTask = (taskID, newValueTaskOnWorking) => {
        if(!newValueTaskOnWorking){
            toggleCoverRef.current.classList.add("coverReturn")
            setTimeout(async() => {
                await fetchRequest("PUT", `task/toggleOnWorking/${taskID}`, {onWorking:newValueTaskOnWorking})
                toggleCoverRef.current.classList.remove("coverReturn")
            }, 250);
        }
        if(newValueTaskOnWorking){
            fetchRequest("PUT", `task/toggleOnWorking/${taskID}`, {onWorking:newValueTaskOnWorking})
        }
        
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
                        valideRenameTask(task._id)
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

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Pour placer le listener pour gérer le doubleClick pour rename
    useEffect(() => {
        if(leftSideRef.current){
            leftSideRef.current.addEventListener("dblclick", toggleRenameTask)
        }
    }, [leftSideRef])

    return{
        taskEditable,
        taskRef,
        toggleRenameTask,
        taskNameRef,
        valideRenameTask,
        taskOnEdition,
        toggle_completedTask,
        leftSideRef,
        toggleCoverRef,
        toggle_onWorkingTask
    }
}