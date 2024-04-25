import React from "react";
import { Draggable } from "react-beautiful-dnd";

export default function ItemCollection_One({item, index}){

    const itemID = item[0]
    const itemName = item[1].name
    return(
        <Draggable draggableId={`itemCollection_${itemID}`} index={index}>
            {(provided) => (
                <div className="itemCollection_One" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    {itemName}
                </div>
            )}

        </Draggable>
    )
}