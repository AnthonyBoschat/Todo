import React, { useState } from "react";
import useItem_One from "./useItem_One";
import { Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import Item_Option from "../Option/Item_Option";
import Item_Properties from "../Properties/Item_Properties";

export default function Item_One({Item, folderIndex, index}){

    const {
        ItemRef,
        ItemEditable,
        setItemEditable,
        ItemNameRef,
        Item_Onedition,
        leftSideRef,
        toggleCoverRef,
    } = useItem_One(Item)

    const [optionsView, setOptionsView] = useState(false)

    
    return(
        <Draggable draggableId={Item._id} index={index}>
            {(provided) => (
                <div ref={provided.innerRef}  {...provided.draggableProps}  className="Item_Display">

                    
        
                    {/* Item */}
                    <div onClick={() => setOptionsView(!optionsView)} ref={ItemRef} {...provided.dragHandleProps} className={`Item_Box ${(ItemEditable && Item_Onedition) && "onEdition"}`}>
        
                        <div ref={leftSideRef} style={(ItemEditable && Item_Onedition) ? {cursor:"text"} : null} className="leftSideItem">
                            <span ref={ItemNameRef} contentEditable={ItemEditable} suppressContentEditableWarning={ItemEditable} className="ItemName">{Item.content}</span>
                        </div>
        
                        {/* Cover */}
                        <div 
                        ref={toggleCoverRef} 
                        style={
                            Item.completed ?
                            {backgroundColor:"rgba(87, 255, 244, 0.296)", outline:"1px solid rgba(87, 255, 244, 0.296)"}
                            :Item.onWorking ?
                            {backgroundColor:"rgba(255, 167, 20, 0.550)", outline:"1px solid rgba(255, 167, 20, 0.550)"}
                            :null
                        } 
                        className={`toggleCover ${(Item.completed || Item.onWorking) && "cover"}`}></div>
                    </div>
        
                    
                    <Item_Properties
                        optionsView={optionsView}
                        item={Item}
                    />
                    {/* <Item_Option
                        leftSideRef={leftSideRef}
                        optionsView={optionsView}
                        Item={Item} 
                        ItemNameRef={ItemNameRef} 
                        ItemEditable={ItemEditable}
                        setItemEditable={setItemEditable}
                        toggleCoverRef={toggleCoverRef}
                    /> */}
                </div>
            )}
        </Draggable>
    )
}