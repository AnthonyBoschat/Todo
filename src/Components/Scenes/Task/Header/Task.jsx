import React from "react";
import { useSelector } from "react-redux";
import useAddTask from "./useTask";

export default function Header_Task(){

    const folderSelectedName = useSelector(store => store.folder.folderSelectedName)
    const {addTask, deleteFolder} = useAddTask()

    return(
        <div className="addTask_Display">

            <div onClick={addTask} className="addTask_Box">
                <i className="fa-solid fa-plus"></i>
                <span >Add Task</span>
            </div>

            <div className="folderIndicator_Box">
                <i onClick={deleteFolder} className="fa-solid fa-trash"></i>
                {`/ ${folderSelectedName}`}
            </div>
        </div>
    )
}