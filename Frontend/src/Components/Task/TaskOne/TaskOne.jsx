import React, { useState } from "react";
import useTask_One from "./useTaskOne";
import { Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import Task_Option from "../Option/Task_Option";

export default function TaskOne({task, folderIndex, index}){

    const {
        taskRef,
        deleteTask,
        taskEditable,
        setTaskEditable,
        taskNameRef,
        taskOnEdition,
        toggle_completedTask,
        leftSideRef,
        toggleCoverRef,
        toggle_onWorkingTask
    } = useTask_One(task)

    const [optionsView, setOptionsView] = useState(false)

    
    return(
        <Draggable draggableId={task._id} index={index}>
            {(provided) => (
                <div ref={provided.innerRef}  {...provided.draggableProps}  className="task_Display">

                    {/* Button */}
                    {/* <div className="check_Box">
                        <i onClick={() => toggle_onWorkingTask(task._id, !task.onWorking)} className={`fa-regular fa-circle-dot onWorkingButton ${task.completed && "hidden" } ${task.onWorking && "onWork"}`}></i>
                        <i onClick={() => toggle_completedTask(task._id, !task.completed)} className={`fa-solid fa-square-check confirmTaskButton ${task.completed && "taskConfirmed"}`}></i>
                    </div> */}
                    
                    

        
                    {/* Task */}
                    <div onClick={() => setOptionsView(!optionsView)} ref={taskRef} {...provided.dragHandleProps} className={`task_Box ${(taskEditable && taskOnEdition) && "onEdition"}`}>
        
                        <div ref={leftSideRef} style={(taskEditable && taskOnEdition) ? {cursor:"text"} : null} className="leftSideTask">
                            <span ref={taskNameRef} contentEditable={taskEditable} suppressContentEditableWarning={taskEditable} className="taskName">{task.content}</span>
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
        
                    
                    <Task_Option
                        leftSideRef={leftSideRef}
                        optionsView={optionsView}
                        task={task} 
                        taskNameRef={taskNameRef} 
                        taskEditable={taskEditable}
                        setTaskEditable={setTaskEditable}
                        toggleCoverRef={toggleCoverRef}
                    />
                </div>
            )}
        </Draggable>
    )
}