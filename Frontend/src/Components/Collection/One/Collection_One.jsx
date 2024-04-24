import React from "react";
import { Draggable } from "react-beautiful-dnd";
import useCollection_One from "./useCollection_One";
import List_Detail from "../Detail/Collection_Detail";

export default function List_One({list, index}){

    const {
        collectionState, 
        dispatchCollectionState,
        handleClick
    } = useCollection_One()

    return(
        <Draggable draggableId={list._id} index={index}>
            {(provided) => (
                <>
                    <div  ref={provided.innerRef} {...provided.draggableProps} className="listOne_Display">
                        <div onClick={handleClick} {...provided.dragHandleProps}  className="listOne_Box">
                            {list.name}
                        </div>
                        <List_Detail collectionState={collectionState} list={list}/>
                        
                    </div>
                </>
            )}
        </Draggable>
        
    )
}