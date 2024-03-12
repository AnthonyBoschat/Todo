import React, { useEffect } from "react";
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
        returnLineFilter,
        taskTitle
    } = useTask_One(folderIndex, task)



    return(
        <div style={(taskEditable && taskOnEdition) ? {outline:"1px solid rgb(0, 182, 227)", boxShadow:"0px 0px 10px rgb(0, 182, 227)"} : null} ref={taskRef} className="task_Box">
            <div style={(taskEditable && taskOnEdition) ? {cursor:"text"} : null} className="leftSideTask">
                {/* <i className="deploy fa-solid fa-caret-down"></i> */}
                {/* <span ref={taskNameRef} dangerouslySetInnerHTML={{__html:task.title}} contentEditable={taskEditable} className="taskName"></span> */}
                <span ref={taskNameRef} contentEditable={taskEditable} className="taskName">{taskTitle}</span>
            </div>
            <div className="rightSideTask">
                {!taskEditable && (<i onClick={toggleRenameTask} className="fa-solid fa-pen"></i>)}
                {(taskEditable && taskOnEdition) && (<i onClick={() => valideRenameTask(task.id)} className="valideTask fa-solid fa-check"></i>)}
                
                <i onClick={() => deleteTask(task.id)} className="deleteTask fa-solid fa-trash"></i>
            </div>
        </div>
    )
}