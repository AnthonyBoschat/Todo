import React from "react";
import useCollection_List from "./useCollection_List";
import Collection_Creation from "../Creation/Collection_Creation";
import Collection_One from "../One/Collection_One";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

export default function Collection_List(){

    const {
        collectionOnCreation,
        collectionToShow,
        dragEndCollections
    } = useCollection_List()

    

    return(
        <div className="Collection_List_Display">
            <DragDropContext onDragEnd={dragEndCollections}>
                <Droppable droppableId="Collections" type="collection">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="Collection_List_Box">
                            {collectionToShow.length > 0 && (collectionToShow.map((collection, index) => (
                                <Collection_One index={index} key={collection._id} collection={collection}/>
                            )))}

                            {collectionOnCreation && (<Collection_Creation/>)}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}