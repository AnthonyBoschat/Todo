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
                <i onClick={() => toggle_onWorkingTask(task._id, !task.onWorking)} className={`fa-regular fa-circle-dot onWorkingButton ${task.completed && "hidden" } ${task.onWorking && "onWork"}`}></i>
                <i onClick={() => toggle_completedTask(task._id, !task.completed)} className={`fa-solid fa-square-check confirmTaskButton ${task.completed && "taskConfirmed"}`}></i>
            </div>

            {/* Task */}
            <div ref={taskRef} className={`task_Box ${(taskEditable && taskOnEdition) && "onEdition"}`}>

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
                    {backgroundColor:"rgba(87, 255, 244, 0.296)", outline:"1px solid rgba(87, 255, 244, 0.296)"}
                    :task.onWorking ?
                    {backgroundColor:"rgba(255, 167, 20, 0.550)", outline:"1px solid rgba(255, 167, 20, 0.550)"}
                    :null
                } 
                className={`toggleCover ${(task.completed || task.onWorking) && "cover"}`}></div>


            </div>

            
        </div>
        
    )
}