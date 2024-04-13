import React from "react";
import useTaskOption_Delete from "./useTaskOption_Delete";

export default function TaskOption_Delete({task}){

    const {handleClick} = useTaskOption_Delete(task)

    return(
        <div className="option">
            <span className="delete" onClick={handleClick}>Delete</span>
        </div>
    )
}