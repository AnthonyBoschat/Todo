import React from "react";
import useAdd_Task from "./useAdd_Task";

export default function Add_Task(){

    const {addTask} = useAdd_Task()

    return(
        <div onClick={addTask} className="addTask_Box">
            <i className="fa-solid fa-plus"></i>
            <span >Add Task</span>
        </div>
    )
}