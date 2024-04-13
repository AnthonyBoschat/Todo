import React, { useState } from "react";
import useItem_One from "./useItemOne";
import { Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import Item_Option from "../Option/Item_Option";

export default function ItemOne({Item, folderIndex, index}){

    const {
        ItemRef,
        deleteItem,
        ItemEditable,
        setItemEditable,
        ItemNameRef,
        ItemOnEdition,
        toggle_completedItem,
        leftSideRef,
        toggleCoverRef,
        toggle_onWorkingItem
    } = useItem_One(Item)

    const [optionsView, setOptionsView] = useState(false)

    
    return(
        <Draggable draggableId={Item._id} index={index}>
            {(provided) => (
                <div ref={provided.innerRef}  {...provided.draggableProps}  className="Item_Display">

                    {/* Button */}
                    {/* <div className="check_Box">
                        <i onClick={() => toggle_onWorkingItem(Item._id, !Item.onWorking)} className={`fa-regular fa-circle-dot onWorkingButton ${Item.completed && "hidden" } ${Item.onWorking && "onWork"}`}></i>
                        <i onClick={() => toggle_completedItem(Item._id, !Item.completed)} className={`fa-solid fa-square-check confirmItemButton ${Item.completed && "ItemConfirmed"}`}></i>
                    </div> */}
                    
                    

        
                    {/* Item */}
                    <div onClick={() => setOptionsView(!optionsView)} ref={ItemRef} {...provided.dragHandleProps} className={`Item_Box ${(ItemEditable && ItemOnEdition) && "onEdition"}`}>
        
                        <div ref={leftSideRef} style={(ItemEditable && ItemOnEdition) ? {cursor:"text"} : null} className="leftSideItem">
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
        
                    
                    <Item_Option
                        leftSideRef={leftSideRef}
                        optionsView={optionsView}
                        Item={Item} 
                        ItemNameRef={ItemNameRef} 
                        ItemEditable={ItemEditable}
                        setItemEditable={setItemEditable}
                        toggleCoverRef={toggleCoverRef}
                    />
                </div>
            )}
        </Draggable>
    )
}