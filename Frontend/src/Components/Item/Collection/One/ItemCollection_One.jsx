import React from "react";
import { Draggable } from "react-beautiful-dnd";
import useFetchRequest from "../../../../Utils/useFetchRequest"

export default function ItemCollection_One({item, index, collectionID}){

    const itemID = item[0]
    const itemName = item[1].name
    const {fetchRequest} = useFetchRequest()

    const deleteItem = () => {
        fetchRequest("DELETE", `collection/deleteItem/${collectionID}/${itemID}`)
    }
    return(
        <Draggable draggableId={`${itemID}`} index={index}>
            {(provided) => (
                <div className="itemCollection_One" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    {itemName}
                    <div onClick={deleteItem} className="deleteItem_Box">
                        <i className="fa-solid fa-minus"></i>
                    </div>
                </div>
            )}

        </Draggable>
    )
}