import React from "react";
import useTask_List from "./useTask_List";
import Creation_Task from "../Creation/Task_Creation";
import One_Task from "../TaskOne/TaskOne";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

export default function Task_List(){

    const {
        taskOnCreation,
        displayTaskListRef,
        taskToShow,
    } = useTask_List()


    return(
        <>
            {taskToShow && (
                    <Droppable droppableId="tasks">
                        {(provided) => (
                            <div ref={displayTaskListRef} className="listTask_Display">
                                <div {...provided.droppableProps} ref={provided.innerRef} className="listTask_Box">

                                    {/* Si au moin une task d'enregistrer pour ce dossier, la liste de toutes les task*/}
                                    {(taskToShow.length > 0) && (taskToShow.map((task, index) => (
                                        <One_Task index={index} key={task._id} task={task}/>
                                    ) ))}

                                    {/* Si aucune Task d'enregistrer pour ce dossier */}
                                    {(taskToShow.length === 0 && !taskOnCreation ) && (
                                        <div className="noTask_Box">
                                            <span>( No Task )</span>
                                        </div>
                                    )}

                                    {/* Nouvelle task en cours de création */}
                                    {taskOnCreation && ( 
                                        <Creation_Task/>
                                    )}
                                    {provided.placeholder}
                                </div>
                            </div>
                            
                        )}
                    </Droppable>   
            )}
        </>
        
    )
}