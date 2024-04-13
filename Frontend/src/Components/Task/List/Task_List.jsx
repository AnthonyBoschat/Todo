import React from "react";
import useTask_List from "./useTask_List";
import Creation_Task from "../Creation/Task_Creation";
import One_Task from "../TaskOne/TaskOne";
import { Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import { update_reorderList } from "../../User/UserSlice";
import useFetchRequest from "../../../Utils/useFetchRequest";

export default function Task_List(){

    const {
        taskOnCreation,
        displayTaskListRef,
        taskToShow,
    } = useTask_List()

    const {fetchRequest} = useFetchRequest()
    const userTasksList = useSelector(store => store.user.datas.userTasksList)
    const dispatch = useDispatch()

    const handleOnDragEnd = (result) => {
        const {source, destination} = result
        if(!destination) return
        if(destination.droppableId === source.droppableId && destination.index === source.index)return
        if(destination.droppableId === "trash"){
            const confirmation = window.confirm("Delete this task ?")
            if(confirmation){
                const taskID = userTasksList[source.index]._id
                const items = Array.from(userTasksList)
                items.splice(source.index, 1)
                dispatch(update_reorderList({listName:"userTasksList", newList:items}))
                fetchRequest("DELETE", `task/delete/${taskID}`)
            }
            return
        }else{
            const items = Array.from(userTasksList)
            const [reorderedItem] = items.splice(result.source.index, 1)
            items.splice(destination.index, 0, reorderedItem)
            dispatch(update_reorderList({listName:"userTasksList", newList:items}))
            fetchRequest("POST", `task/sort`, {newTasksList:items})
        }
    }


    return(
        <>
            {taskToShow && (
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="tasks">
                        {(provided) => (
                            <div ref={displayTaskListRef} className="listTask_Display">
                                <div {...provided.droppableProps} ref={provided.innerRef} className="listTask_Box">

                                    {/* Si au moin une task d'enregistrer pour ce dossier, la liste de toutes les task*/}
                                    {(taskToShow.length > 0) && (taskToShow.map((task, index) => (
                                        <One_Task index={index} key={task._id} task={task}/>
                                    ) ))}

                                    {/* Nouvelle task en cours de création */}
                                    {taskOnCreation && ( 
                                        <Creation_Task/>
                                    )}
                                    {provided.placeholder}
                                </div>
                            </div>
                            
                        )}
                    </Droppable>   
                </DragDropContext>
            )}
        </>
        
    )
}