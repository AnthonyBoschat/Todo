import React from "react";
import { Draggable } from "react-beautiful-dnd";
import useCollection_One from "./useCollection_One";
import ItemCollection_List from "../../Item/Collection/List/ItemCollection_List";

export default function List_One({collection, index}){

    const {
        collectionState, 
        handleClick,
        addItem
    } = useCollection_One()

    return(
        <Draggable draggableId={collection._id} index={index}>
            {(provided) => (
                <>
                    <div  ref={provided.innerRef} {...provided.draggableProps} className="collectionOne_Display">
                        <div onClick={handleClick} {...provided.dragHandleProps}  className="collectionOne_Box">
                            {collection.name}
                            <div className="collectionAction_Box">
                                <i onClick={addItem} className="fa-solid fa-square-plus"></i>
                            </div>
                        </div>

                        <ItemCollection_List collectionState={collectionState} collection={collection}/>
                        
                    </div>
                </>
            )}
        </Draggable>
        
    )
}