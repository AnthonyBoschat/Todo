import React from "react";
import useTask_Creation from "./useCreation_Task";

export default function Creation_Task(){

    const { taskCreationRef } = useTask_Creation()

    return(
        <div className="task_Box taskCreation">
            <div ref={taskCreationRef} contentEditable autoFocus className="taskName"></div>
        </div>
    )
}