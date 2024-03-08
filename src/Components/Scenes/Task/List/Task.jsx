import React from "react";
import { useSelector } from "react-redux";

export default function List_Task(){

    

    return(
        <div className="listTask_Display">
                <div className="listTask_Box">
                
                    <div className="task_Box">
                        <div className="leftSideTask">
                            <i className="deploy fa-solid fa-caret-down"></i>
                            <span className="taskName">Faire les courses</span>
                        </div>
                        <div className="rightSideTask">
                            <i className="valideTask fa-solid fa-check"></i>
                            <i className="deleteTask fa-solid fa-trash"></i>
                        </div>
                    </div>

                    <div className="task_Box">
                        <div className="leftSideTask">
                            <i className="deploy fa-solid fa-caret-down"></i>
                            <span className="taskName">Ranger la vaisselle</span>
                        </div>
                        <div className="rightSideTask">
                            <i className="valideTask fa-solid fa-check"></i>
                            <i className="deleteTask fa-solid fa-trash"></i>
                        </div>
                    </div>

                    <div className="task_Box">
                        <div className="leftSideTask">
                            <i className="deploy fa-solid fa-caret-down"></i>
                            <span className="taskName">Passer l'aspirateur dans le salon</span>
                        </div>
                        <div className="rightSideTask">
                            <i className="valideTask fa-solid fa-check"></i>
                            <i className="deleteTask fa-solid fa-trash"></i>
                        </div>
                    </div>
                </div>
        </div>
    )
}