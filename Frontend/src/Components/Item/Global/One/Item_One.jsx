import React, { useEffect, useImperativeHandle, useState } from "react";
import useItem_One from "./useItem_One";
import { Draggable } from "react-beautiful-dnd";
import Item_Detail from "../Detail/Item_Detail";

export default function Item_One({item, index}){

    const {
        ItemRef,
        ItemNameRef,
        leftSideRef,
        propertiesVisible,
        handleClick,
        canBeManaged,
        canBeAdd,
        canBeDelete,
        addItem
    } = useItem_One(item)


    const getItemStyle = (snapshot) => {
        const {draggingOver, isDragging} = snapshot
        if(isDragging){
            let isOverCollection = false
            if(draggingOver !== null){ isOverCollection = draggingOver.startsWith("collection")}
            if(isOverCollection){
                return({
                    background:"rgba(175, 255, 250, 0.749)",
                    width:"350px",
                    height:"3rem",
                    fontSize:"4rem"
                })
            }
        }
    }

    return(
        <Draggable draggableId={item._id} index={index}>
            {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={`Item_Display`}>

                    {/* Item */}
                    <div
                        onClick={handleClick} 
                        className={`Item_Box ${snapshot.isDragging ? "dragging" : ""}`}
                        style={getItemStyle(snapshot)}
                    >
                        <div ref={leftSideRef} className="leftSideItem">
                            <span ref={ItemNameRef}  className="ItemName">{item.content}</span>
                            
                            {canBeManaged && (
                                <>
                                    <button disabled={!canBeAdd} onClick={addItem}>Add</button>
                                    <button disabled={!canBeDelete}>Delete</button>
                                </>
                            )}
                            
                        </div>
                    </div>

                    <Item_Detail
                        propertiesVisible={propertiesVisible}
                        item={item}
                    />
                    
                </div>
            )}
        </Draggable>
    )
}