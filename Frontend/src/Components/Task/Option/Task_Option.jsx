import React from "react";
import TaskOption_Rename from "./Rename/TaskOption_Rename";
import TaskOption_Delete from "./Delete/TaskOption_Delete";
import TaskOption_ToggleDone from "./ToggleDone/TaskOption_ToggleDone";

export default function Task_Option({
    task, 
    taskNameRef, 
    taskEditable, 
    setTaskEditable, 
    optionsView,
    leftSideRef,
    toggleCoverRef
}){

    
    return(
        <div className={`taskOption_Display ${optionsView ? "visible" : "hidden"}`} >
            {optionsView && (
                <div className="taskOption_Box">
                    <TaskOption_ToggleDone task={task} toggleCoverRef={toggleCoverRef} />
                    <TaskOption_Rename leftSideRef={leftSideRef} taskEditable={taskEditable} setTaskEditable={setTaskEditable} task={task} taskNameRef={taskNameRef}/>
                    <TaskOption_Delete task={task}/>
                </div>
            )}
        </div>
    )
}