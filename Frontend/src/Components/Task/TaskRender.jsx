import React from "react";
import List_Task from "./List/Task";
import Header_Task from "./Header/Task";

export default function TaskRender(){

    

    return(
        <div className="taskRender_Display">
            <Header_Task/>
            <List_Task/>
        </div>
    )
}