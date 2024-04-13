import React from "react";
import useTask_Add from "./useTask_Add";

export default function Task_Add(){

    const {addTask} = useTask_Add()

    return(
        <div onClick={addTask} className="addTask_Box">
            <i className="fa-solid fa-plus"></i>
            <span >New items</span>
        </div>
    )
}