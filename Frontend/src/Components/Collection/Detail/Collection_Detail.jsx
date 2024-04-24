import React, { useEffect, useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";


export default function Collection_Detail({list, collectionState}){

    const  {collectionVisible} = collectionState
    const [itemToTheCollectionSort, setItemToTheCollectionSort] = useState([])

    useEffect(() => {
        if(list.items){
            const newItemToTheCollectionSort = Object.entries(list.items).sort((a, b) => a[1].position - b[1].position)
            setItemToTheCollectionSort(newItemToTheCollectionSort)
        }
    }, [list])

    return(
        <div className={`listDetail_Display ${collectionVisible ? "visible" : "hidden"}`}>
            {(collectionVisible) &&(
                <Droppable droppableId={list._id} type="item">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="listDetail_Box">


                            {(itemToTheCollectionSort.length !== 0) && (itemToTheCollectionSort.map((item, index) => {
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