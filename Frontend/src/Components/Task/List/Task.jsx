import React from "react";
import useTask_List from "./useTask";
import Creation_Task from "../Creation/Task";
import One_Task from "../Task/Task";

export default function List_Task(){

    const {
        userTasksList, 
        taskOnCreation,
        displayTaskListRef,
        atLeastOneTask,
        folderSelectedID
    } = useTask_List()
    

    return(
        <>
            {userTasksList && (
                <div ref={displayTaskListRef} className="listTask_Display">
                    <div className="listTask_Box">

                        {/* Si au moin une task d'enregistrer pour ce dossier, la liste de toutes les task*/}
                        {atLeastOneTask && (userTasksList.map(task => {
                            if(task.folderID === folderSelectedID){
                                return(<One_Task key={`task_${task._id}`} task={task}/>)
                            }
                        }))}

                        {/* Si aucune Task d'enregistrer pour ce dossier */}
                        {(!taskOnCreation && !atLeastOneTask) && (
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