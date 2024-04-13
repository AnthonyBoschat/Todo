import React from "react";
import { Droppable } from "react-beautiful-dnd";

export default function Trash(){
    

    return(
        <Droppable  droppableId="trash">
            {(provided, snapshot) => (
                <>
                    <div style={{
                        backgroundColor:snapshot.isDraggingOver ? "rgba(255, 104, 104, 0.894)" : null
                    }} className="trash" {...provided.droppableProps} ref={provided.innerRef}>
                        <i className="deleteTask fa-solid fa-trash"></i>
                    
                    
                    {provided.placeholder}
                    </div>
                </>
            )}
            
        </Droppable>
    )
}