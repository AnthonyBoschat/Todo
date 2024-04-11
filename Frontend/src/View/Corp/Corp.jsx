import React from "react";
import { useSelector, useDispatch } from "react-redux";
import List_Task from "../../Components/Task/List/Task_List";
import Header from "../Header/Header";
import { DragDropContext } from "react-beautiful-dnd";
import { update_reorderList } from "../../Components/User/UserSlice";
import useFetchRequest from "../../Utils/useFetchRequest";


export default function Corp(){

    const userTasksList = useSelector(store => store.user.datas.userTasksList)
    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    const onDisconnection = useSelector(store => store.connection.onDisconnection)
    const dispatch = useDispatch()
    const {customFetchRequest} = useFetchRequest()

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
                customFetchRequest("DELETE", `task/delete/${taskID}`)
            }
            return
        }else{
            const items = Array.from(userTasksList)
            const [reorderedItem] = items.splice(result.source.index, 1)
            items.splice(destination.index, 0, reorderedItem)
            dispatch(update_reorderList({listName:"userTasksList", newList:items}))
            customFetchRequest("PUT", `task/sort`, items)
        }
        
    }
    
    return(
        // <div className={!onDisconnection ? "renderDisplay apparition" : "renderDisplay disparition"}>
        <div className={`renderDisplay ${onDisconnection ? "disparition" : "apparition"}`}>

            {!folderSelectedID && (<i className="logo fa-solid fa-layer-group"></i>)}

            {folderSelectedID && (
                <div className="taskRender_Display">
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Header/>
                        <List_Task/>
                    </DragDropContext>
                </div>
            )}
            
        </div>
    )
}