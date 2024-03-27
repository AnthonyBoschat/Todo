import React from "react";
import useTask_List from "./useTask";
import Creation_Task from "../Creation/Task";
import One_Task from "../Task/Task";

export default function List_Task(){

    const {
        tasksList, 
        taskOnCreation,
        displayTaskListRef,
        folderIndex,
    } = useTask_List()
    

    return(
        <>
            {tasksList && (
                <div ref={displayTaskListRef} className="listTask_Display">
                    <div className="listTask_Box">

                        {/* Si au moin une task d'enregistrer pour ce dossier, la liste de toutes les task */}
                        {tasksList.length > 0 && (tasksList.map((task, index) => (
                            <One_Task folderIndex={folderIndex} key={`task_${task._id}`} task={task}/>
                        )))}

                        {/* Si aucune Task d'enregistrer pour ce dossier */}
                        {(tasksList.length === 0 && !taskOnCreation) && (
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
            )}
        </>
        
    )
}