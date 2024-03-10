import React from "react";
import useTask_Creation from "./useTask";

export default function Creation_Task(){

    const {
        taskCreationDisplayRef,
        taskCreationRef,
    } = useTask_Creation()

    return(
        <div ref={taskCreationDisplayRef} className="task_Box taskCreation">
            <div ref={taskCreationRef} contentEditable autoFocus className="taskName"></div>
        </div>
    )
}