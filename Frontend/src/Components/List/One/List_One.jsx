import React from "react";
import { Draggable } from "react-beautiful-dnd";

export default function List_One({list, index}){

    return(
        <Draggable draggableId={list._id} index={index}>
            {(provided) => (
                <div ref={provided.innerRef} {...provided.draggableProps} className="listOne_Display">
                    <div  {...provided.dragHandleProps}  className="listOne_Box">
                        {list.name}
                    </div>
                </div>
            )}
        </Draggable>
        
    )
}