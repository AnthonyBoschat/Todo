import React from "react";
import Add_Task from "./Add/Task";
import List_Task from "./List/Task";
import { useSelector } from "react-redux";
import Creation_Task from "./Creation/Task";

export default function TaskRender(){

    const taskOnCreation = useSelector(store => store.task.taskOnCreation)

    return(
        <div className="taskRender_Display">
            <Add_Task/>
            {!taskOnCreation && (<List_Task/>)}
            {taskOnCreation && (<Creation_Task/>)}
            
            
        </div>
    )
}