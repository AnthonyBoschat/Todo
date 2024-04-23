import React from "react";
import { Draggable } from "react-beautiful-dnd";
import useList_One from "./useList_One";
import List_Detail from "../Detail/List_Detail";

export default function List_One({list, index}){

    const {
        listState, 
        dispatchListState,
        handleClick
    } = useList_One()

    return(
        <Draggable draggableId={list._id} index={index}>
            {(provided) => (
                <>
                    <div  ref={provided.innerRef} {...provided.draggableProps} className="listOne_Display">
                        <div onClick={handleClick} {...provided.dragHandleProps}  className="listOne_Box">
                            {list.name}
                        </div>
                        <List_Detail listState={listState} list={list}/>
                        
                    </div>
                </>
            )}
        </Draggable>
        
    )
}