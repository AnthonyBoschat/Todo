import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";


export default function List_Detail({list, listState}){

    const  {listVisible} = listState
    const listItem = [
        {name:"Anthony Boschat", id:"0"},
        {name:"Alice Roux", id:"1"},
        // {name:"Maurane Lorjou", id:"2"},
        // {name:"Thomas Delplace", id:"3"},
        // {name:"Benoit Melo", id:"4"},
        // {name:"Anthony Boschat", id:"5"},
        // {name:"Alice Roux", id:"6"},
        // {name:"Maurane Lorjou", id:"7"},
        // {name:"Thomas Delplace", id:"8"},
        // {name:"Benoit Melo", id:"9"},
    ]

    return(
        <div className={`listDetail_Display ${listVisible ? "visible" : "hidden"}`}>
            {listVisible && (
                <Droppable droppableId={list._id} type="item">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="listDetail_Box">
                           {listItem.map((item, index) => (
                            <Draggable key={index} draggableId={item.id} index={index}>
                                {(provided) => (
                                    <div ref={provided.innerRef}  {...provided.draggableProps} {...provided.dragHandleProps}  className="listDetail_Item">
                                        {item.name}
                                    </div>
                                )}
                            </Draggable>
                           ))}
                            {provided.placeholder}
                        </div>
                    )}
                    
                </Droppable>
            )}
        </div>
    )
}