import React from "react";
import TaskOption_Rename from "./Rename/TaskOption_Rename";

export default function Task_Option({task, taskNameRef, taskEditable, setTaskEditable}){

    
    return(
        <div className="taskOption_Display">
            <div className="taskOption_Box">
                <TaskOption_Rename taskEditable={taskEditable} setTaskEditable={setTaskEditable} task={task} taskNameRef={taskNameRef}/>
            </div>
        </div>
    )
}