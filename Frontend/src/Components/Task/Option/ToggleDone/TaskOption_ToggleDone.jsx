import React from "react";
import useTaskOption_ToggleDone from "./useTaskOption_ToggleDone";

export default function TaskOption_ToggleDone({task, toggleCoverRef}){

    const {handleClick} = useTaskOption_ToggleDone(task, toggleCoverRef)

    return(
        <div className="option">
            <span className={task.completed ? "done" : "undone"} onClick={handleClick}>Done</span>
        </div>
    )
}