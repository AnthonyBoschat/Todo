import React from "react";
import useList_List from "./useList_List";
import List_Creation from "../Creation/List_Creation";
import List_One from "../One/List_One";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

export default function List_List(){

    const {
        listOnCreation,
        listToShow,
    } = useList_List()

    

    return(
        <div className="List_List_Display">
                <Droppable droppableId="Lists" type="list">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="List_List_Box">
                            {listToShow.length > 0 && (listToShow.map((list, index) => (
                                <List_One index={index} key={list._id} list={list}/>
                            )))}

                            {listOnCreation && (<List_Creation/>)}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
        </div>
    )
}