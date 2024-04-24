import React from "react";
import useCollection_List from "./useCollection_List";
import Collection_Creation from "../Creation/Collection_Creation";
import Collection_One from "../One/Collection_One";
import { Droppable } from "react-beautiful-dnd";

export default function Collection_List(){

    const {
        collectionOnCreation,
        collectionToShow,
    } = useCollection_List()

    

    return(
        <div className="Collection_List_Display">
                <Droppable droppableId="Lists" type="list">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="Collection_List_Box">
                            {collectionToShow.length > 0 && (collectionToShow.map((list, index) => (
                                <Collection_One index={index} key={list._id} list={list}/>
                            )))}

                            {collectionOnCreation && (<Collection_Creation/>)}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
        </div>
    )
}