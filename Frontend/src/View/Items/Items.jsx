import React from "react";
import Task_Add from "../../Components/Task/Add/Task_Add";
import List_Task from "../../Components/Task/List/Task_List";


export default function Items(){

    

    return(
        <div className="Items_Display">
            <Task_Add/>
            
                <List_Task/>
        </div>
    )
}