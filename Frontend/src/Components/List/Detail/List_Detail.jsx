import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";


export default function List_Detail({list, listState}){

    const  {listVisible} = listState

    return(
        <div className={`listDetail_Display ${listVisible ? "visible" : "hidden"}`}>
            {listVisible && (
                <Droppable droppableId={list._id} type="item">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="listDetail_Box">


                            {Object.entries(list.items).map((item, index) => {
                                const itemID = item[0]
                                const itemName = item[1].name
                                return(
                                    <Draggable key={index} draggableId={`itemList_${itemID}`} index={index}>
                                        {(provided) => (
                                            <div ref={provided.innerRef}  {...provided.draggableProps} {...provided.dragHandleProps}  className="listDetail_Item">
                                                {itemName}
                                            </div>
                                        )}
                                    </Draggable>
                                )
                            }
                            )}
                            {provided.placeholder}
                        </div>
                    )}
                    
                </Droppable>
            )}
        </div>
    )
}