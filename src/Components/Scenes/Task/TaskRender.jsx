import React from "react";
import Add_Task from "./Add/Task";
import List_Task from "./List/Task";

export default function TaskRender(){

    return(
        <div className="taskRender_Display">
            <Add_Task/>
            <List_Task/>
        </div>
    )
}