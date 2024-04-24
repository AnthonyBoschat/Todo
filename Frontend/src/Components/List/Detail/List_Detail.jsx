import React, { useEffect, useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";


export default function List_Detail({list, listState}){

    const  {listVisible} = listState
    const [itemToTheListSort, setItemToTheListSort] = useState([])

    useEffect(() => {
        if(list.items){
            const newItemToTheListSort = Object.entries(list.items).sort((a, b) => a[1].position - b[1].position)
            setItemToTheListSort(newItemToTheListSort)
        }
    }, [list])

    return(
        <div className={`listDetail_Display ${listVisible ? "visible" : "hidden"}`}>
            {(listVisible) &&(
                <Droppable droppableId={list._id} type="item">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="listDetail_Box">


                            {(itemToTheListSort.length !== 0) && (itemToTheListSort.map((item, index) => {
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
                                })
                            )}
                            {provided.placeholder}
                        </div>
                    )}
                    
                </Droppable>
            )}
        </div>
    )
}