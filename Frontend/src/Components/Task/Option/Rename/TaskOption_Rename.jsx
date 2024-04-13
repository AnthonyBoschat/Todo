import React, { useEffect, useState } from "react";
import useTaskOption_Rename from "./useTaskOption_Rename";

export default function TaskOption_Rename({task, taskNameRef, taskEditable, setTaskEditable, leftSideRef}){

    
    const {toggleRenameTask, optionSelected} = useTaskOption_Rename(taskNameRef,taskEditable,setTaskEditable,leftSideRef,task)


    return(
        <div className="option">
            <span className={optionSelected ? "optionSelected" : undefined} onClick={() => toggleRenameTask(task._id)}>Edit</span>
        </div>
    )
}