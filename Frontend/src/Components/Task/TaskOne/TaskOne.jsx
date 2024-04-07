import React from "react";
import useTask_One from "./useTaskOne";

export default function TaskOne({task, folderIndex}){

    const {
        taskRef,
        deleteTask,
        taskEditable,
        toggleRenameTask,
        taskNameRef,
        valideRenameTask,
        taskOnEdition,
        toggle_completedTask,
        leftSideRef,
        toggleCoverRef,
        toggle_onWorkingTask
    } = useTask_One(task)

    return(
        <div className="task_Display">

            {/* Button */}
            <div className="check_Box">
                <i onClick={() => toggle_onWorkingTask(task._id, !task.onWorking)} className={task.completed ? "fa-regular fa-circle-dot onWorkingButton hidden" : task.onWorking ? "fa-regular fa-circle-dot onWorkingButton onWork" : "fa-regular fa-circle-dot onWorkingButton"}></i>
                {/* <i style={task.completed ? {visibility:"hidden"} : task.onWorking ? {opacity:"1"} : null} onClick={() => toggle_onWorkingTask(task._id, !task.onWorking)} className="fa-regular fa-circle-dot onWorkingButton"></i> */}
                <i onClick={() => toggle_completedTask(task._id, !task.completed)} className={!task.completed ? "fa-solid fa-square-check confirmTaskButton" : "fa-solid fa-square-check confirmTaskButton taskConfirmed"}></i>
            </div>

            {/* Task */}
            <div style={(taskEditable && taskOnEdition) ? {outline:"1px solid rgb(0, 182, 227)", boxShadow:"0px 0px 10px rgb(0, 182, 227)"} : null} ref={taskRef} className="task_Box">

                <div ref={leftSideRef} style={(taskEditable && taskOnEdition) ? {cursor:"text"} : null} className="leftSideTask">
                    <span ref={taskNameRef} contentEditable={taskEditable} suppressContentEditableWarning={taskEditable} className="taskName">{task.content}</span>
                </div>

                <div className="rightSideTask">
                    {!taskEditable && (<i onClick={toggleRenameTask} className="fa-solid fa-pen"></i>)}
                    {(taskEditable && taskOnEdition) && (<i onClick={() => valideRenameTask(task._id)} className="valideTask fa-solid fa-pen"></i>)}
                    
                    <i onClick={() => deleteTask(task._id)} className="deleteTask fa-solid fa-trash"></i>
                </div>




                {/* Cover */}
                <div 
                ref={toggleCoverRef} 
                style={
                    task.completed ?
                    {backgroundColor:"rgba(97, 255, 147, 0.308)", outline:"1px solid rgba(97, 255, 147, 0.308)"}
                    :task.onWorking ?
                    {backgroundColor:"rgba(255, 167, 34, 0.399)", outline:"1px solid rgba(255, 167, 34, 0.399)"}
                    :null
                } 
                className={
                    task.completed || task.onWorking ?
                     "toggleCover cover" 
                     : "toggleCover"
                }></div>


            </div>

            
        </div>
        
    )
}