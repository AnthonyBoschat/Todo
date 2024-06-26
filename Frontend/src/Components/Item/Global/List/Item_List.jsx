import React from "react";
import useItem_List from "./useItem_List";
import Creation_Item from "../Creation/Item_Creation";
import Item_One from "../One/Item_One";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

export default function Item_List(){

    const {
        ItemOnCreation,
        displayItemListRef,
        itemToShow,
        dragEndItems
    } = useItem_List()

    

    


    return(
        <DragDropContext onDragEnd={dragEndItems}>

            <Droppable droppableId="Items" type="item">
                {(provided) => (
                    <div ref={displayItemListRef} className="listItem_Display">
                        <div {...provided.droppableProps} ref={provided.innerRef} className="listItem_Box">

                            {/* Si au moin une Item d'enregistrer pour ce dossier, la liste de toutes les Item*/}
                            {(itemToShow.length > 0) && (itemToShow.map((item, index) => (
                                <Item_One index={index} key={item._id} item={item}/>
                            ) ))}

                            {/* Nouvelle Item en cours de création */}
                            {ItemOnCreation && ( 
                                <Creation_Item/>
                            )}
                            {provided.placeholder}
                        </div>
                    </div>
                    
                )}
            </Droppable> 

        </DragDropContext>
            
        
    )
}