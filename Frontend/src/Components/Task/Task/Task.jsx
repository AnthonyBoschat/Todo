import React from "react";
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
        toggleTask,
        leftSideRef,
        toggleCoverRef
    } = useTask_One(folderIndex, task)

    return(
        <div className="task_Display">
            <div className="check_Box">
                <i class="fa-regular fa-hourglass-half"></i>
                <i  style={task.completed === true ? {opacity:"1"} : null} onClick={() => toggleTask(task._id, !task.completed)} className="fa-solid fa-square-check"></i>
            </div>

            <div style={(taskEditable && taskOnEdition) ? {outline:"1px solid rgb(0, 182, 227)", boxShadow:"0px 0px 10px rgb(0, 182, 227)"} : null} ref={taskRef} className="task_Box">

                <div ref={leftSideRef} style={(taskEditable && taskOnEdition) ? {cursor:"text"} : null} className="leftSideTask">
                    <span ref={taskNameRef} contentEditable={taskEditable} suppressContentEditableWarning={taskEditable} className="taskName">{task.content}</span>
                </div>

                <div className="rightSideTask">
                    {!taskEditable && (<i onClick={toggleRenameTask} className="fa-solid fa-pen"></i>)}
                    {(taskEditable && taskOnEdition) && (<i onClick={() => valideRenameTask(task._id)} className="valideTask fa-solid fa-pen"></i>)}
                    
                    <i onClick={() => deleteTask(task._id)} className="deleteTask fa-solid fa-trash"></i>
                </div>

                <div ref={toggleCoverRef} className={task.completed === true ? "toggleCover cover" : "toggleCover"}></div>
            </div>

            
        </div>
        
    )
}