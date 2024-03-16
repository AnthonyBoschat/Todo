import React, { useEffect, useState } from "react";
import useTask_One from "./useTask";

export default function One_Task({task, folderIndex}){

    const {
        taskRef,
        deleteTask,
        taskEditable,
        toggleRenameTask,
        taskNameRef,
        valideRenameTask,
        taskOnEdition,
        validTask
    } = useTask_One(folderIndex, task)

    const [taskTitle, setTaskTitle] = useState(task.title)

    return(
        <div className="task_Display">
            <div className="check_Box">
                <i  style={task.finish === true ? {opacity:"1"} : null} onClick={validTask} className="fa-solid fa-square-check"></i>
            </div>

            <div style={(taskEditable && taskOnEdition) ? {outline:"1px solid rgb(0, 182, 227)", boxShadow:"0px 0px 10px rgb(0, 182, 227)"} : null} ref={taskRef} className={task.finish === true ? "task_Box taskFinish" : "task_Box"}>
                <div style={(taskEditable && taskOnEdition) ? {cursor:"text"} : null} className="leftSideTask">
                    <span ref={taskNameRef} contentEditable={taskEditable} className="taskName">{taskTitle}</span>
                </div>
                <div className="rightSideTask">
                    {!taskEditable && (<i onClick={toggleRenameTask} className="fa-solid fa-pen"></i>)}
                    {(taskEditable && taskOnEdition) && (<i onClick={() => valideRenameTask(task.id)} className="valideTask fa-solid fa-pen"></i>)}
                    
                    <i onClick={() => deleteTask(task.id)} className="deleteTask fa-solid fa-trash"></i>
                </div>
            </div>
        </div>
        
    )
}