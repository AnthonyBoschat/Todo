import React from "react";
import useTask_List from "./useTask";
import Creation_Task from "../Creation/Task";

export default function List_Task(){

    const {
        taskList, 
        deleteTask, 
        taskOnCreation,
        displayTaskListRef,
    } = useTask_List()
    

    

    return(
        <div ref={displayTaskListRef} className="listTask_Display">
                <div className="listTask_Box">

                    {/* Si au moin une task d'enregistrer pour ce dossier, la liste de toutes les task */}
                    {taskList.length > 0 && (taskList.map((task, index) => (

                        <div key={`task_${index}`} className="task_Box">
                            <div className="leftSideTask">
                                {/* <i className="deploy fa-solid fa-caret-down"></i> */}
                                <span className="taskName">{task.title}</span>
                            </div>
                            <div className="rightSideTask">
                                {/* <i className="valideTask fa-solid fa-check"></i> */}
                                <i onClick={() => deleteTask(task.id)} className="deleteTask fa-solid fa-trash"></i>
                            </div>
                        </div>

                    )))}

                    {/* Si aucune Task d'enregistrer pour ce dossier */}
                    {(taskList.length === 0 && !taskOnCreation) && (
                        <div className="noTask_Box">
                            <span>( No Task )</span>
                        </div>
                    )}

                    {/* Nouvelle task en cours de création */}
                    {taskOnCreation && ( 
                        <Creation_Task/>
                    )}
                </div>
        </div>
    )
}