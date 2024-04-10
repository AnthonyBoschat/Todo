import React from "react";
import { Droppable } from "react-beautiful-dnd";

export default function Trash(){

    return(
        <Droppable  droppableId="trash">
            {(provided) => (
                <>
                    <div className="trash" {...provided.droppableProps} ref={provided.innerRef}>
                        <i className="deleteTask fa-solid fa-trash"></i>
                    {provided.placeholder}
                    </div>
                </>
            )}
            
        </Droppable>
    )
}