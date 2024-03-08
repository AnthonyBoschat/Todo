import React from "react";
import { useSelector } from "react-redux";
import useAddTask from "./useTask";

export default function Add_Task(){

    const folderSelectedName = useSelector(store => store.folder.folderSelectedName)
    const {addTask} = useAddTask()

    return(
        <div className="addTask_Display">
            <div onClick={addTask} className="addTask_Box">
                <i className="fa-solid fa-plus"></i>
                <span >Add Task</span>
            </div>
            <div className="folderIndicator_Box">
                {`/ ${folderSelectedName}`}
            </div>
        </div>
    )
}