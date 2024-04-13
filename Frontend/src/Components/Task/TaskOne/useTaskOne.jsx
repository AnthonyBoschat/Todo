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


    

    

    

    

    return{
        taskEditable,
        taskRef,
        taskNameRef,
        taskOnEdition,
        toggle_completedTask,
        leftSideRef,
        toggleCoverRef,
        toggle_onWorkingTask,
        setTaskEditable
    }
}