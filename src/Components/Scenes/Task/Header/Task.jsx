import React, { useState } from "react";
import { useSelector } from "react-redux";
import useAddTask from "./useTask";

export default function Header_Task(){

    

    const {addTask, deleteFolder, folderSelectedName, handleChange} = useAddTask()


    
    return(
        <div className="addTask_Display">

            <div onClick={addTask} className="addTask_Box">
                <i className="fa-solid fa-plus"></i>
                <span >Add Task</span>
            </div>

            <div className="folderIndicator_Box">
                <i onClick={deleteFolder} className="fa-solid fa-trash"></i>
                <span>/ </span>
                <input onChange={handleChange} type="text" value={folderSelectedName} />
                {/* {`/ ${folderSelectedName}`} */}
            </div>
        </div>
    )
}