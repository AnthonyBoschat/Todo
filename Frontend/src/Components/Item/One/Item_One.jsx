import React, { useState } from "react";
import useItem_One from "./useItem_One";
import { Draggable } from "react-beautiful-dnd";
import Properties from "../../../View/Properties/Properties";

export default function Item_One({item, folderIndex, index}){

    const {
        ItemRef,
        ItemNameRef,
        ItemOnEdition,
        leftSideRef,
        toggleCoverRef,
        propertiesVisible,
        handleClick,
    } = useItem_One(item)
    
    return(
        <Draggable draggableId={item._id} index={index}>
            {(provided) => (
                <div ref={provided.innerRef}  {...provided.draggableProps}  className="Item_Display">

                    
        
                    {/* Item */}
                    <div onClick={handleClick} ref={ItemRef} {...provided.dragHandleProps} className={`Item_Box`}>
        
                        <div ref={leftSideRef} className="leftSideItem">
                            <span ref={ItemNameRef}  className="ItemName">{item.content}</span>
                        </div>
                    </div>

                    <Properties
                        propertiesVisible={propertiesVisible}
                        item={item}
                    />
                    
                </div>
            )}
        </Draggable>
    )
}