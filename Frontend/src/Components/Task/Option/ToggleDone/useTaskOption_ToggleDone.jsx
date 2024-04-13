import React, {} from "react";
import useFetchRequest from "../../../../Utils/useFetchRequest";

export default function useTaskOption_ToggleDone(task, toggleCoverRef){

    const {fetchRequest} = useFetchRequest()

    const handleClick = () => { 
        const taskID = task._id
        const doneValue = !task.completed
        if(!doneValue){
            toggleCoverRef.current.classList.add("coverReturn")
            setTimeout(async() => {
                await fetchRequest("PUT", `task/toggleCompleted/${taskID}`, {completed:doneValue})
                toggleCoverRef.current.classList.remove("coverReturn")
            }, 100);
        }
        if(doneValue){
            fetchRequest("PUT", `task/toggleCompleted/${taskID}`, {completed:doneValue})
        }
    }

    return{
        handleClick
    }
}