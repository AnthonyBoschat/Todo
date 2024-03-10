import React from "react";
import { useSelector } from "react-redux";
import Add_Task from "../Add/Task";
import useTask_List from "./useTask";

export default function List_Task(){

    const {taskList, deleteTask} = useTask_List()



    return(
        <div className="listTask_Display">
                <div className="listTask_Box">

                    {taskList.length > 0 && (taskList.map((task, index) => (

                        <div key={`task_${index}`} className="task_Box">
                            <div className="leftSideTask">
                                <i className="deploy fa-solid fa-caret-down"></i>
                                <span className="taskName">{task.title}</span>
                            </div>
                            <div className="rightSideTask">
                                {/* <i className="valideTask fa-solid fa-check"></i> */}
                                <i onClick={() => deleteTask(task.id)} className="deleteTask fa-solid fa-trash"></i>
                            </div>
                        </div>

                    )))}


                    {taskList.length === 0 && (
                        <div className="noTask_Box">
                            <span>( No Task )</span>
                        </div>
                    )}
                </div>
        </div>
    )
}