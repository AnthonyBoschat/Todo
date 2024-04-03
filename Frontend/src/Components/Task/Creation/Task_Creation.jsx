import React from "react";
import useTask_Creation from "./useTask_Creation";

export default function Task_Creation(){

    const { taskCreationRef } = useTask_Creation()

    return(
        <div className="task_Box taskCreation">
            <div ref={taskCreationRef} contentEditable autoFocus className="taskName"></div>
        </div>
    )
}