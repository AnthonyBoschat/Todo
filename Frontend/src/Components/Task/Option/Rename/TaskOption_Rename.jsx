import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetchRequest from "../../../../Utils/useFetchRequest";
import { update_taskOnEdition } from "../../TaskSlice";

export default function TaskOption_Rename({task, taskNameRef, taskEditable, setTaskEditable}){

    const taskOnEdition = useSelector(store => store.task.taskOnEdition)
    const dispatch = useDispatch()
    const {fetchRequest} = useFetchRequest()
    

     // Click pour rendre la task editable
     const toggleRenameTask = (taskID) => {
        console.log(taskNameRef)
        if(!taskEditable){
            setTaskEditable(true)
            dispatch(update_taskOnEdition(true))
        }
        if(taskEditable && taskOnEdition){
            console.log("0")
            const newTaskContent = taskNameRef.current.innerText
            fetchRequest("PUT", `task/rename/${taskID}`, {newTaskContent})
            setTaskEditable(false)
        }
    }

    return(
        <div className="taskOption_Rename_Box">
            <span className={taskEditable ? "optionSelected" : undefined} onClick={() => toggleRenameTask(task._id)}>Edit</span>
        </div>
    )
}