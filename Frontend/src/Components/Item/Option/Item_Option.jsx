import React from "react";
import ItemOption_Rename from "./Rename/ItemOption_Rename";
import ItemOption_Delete from "./Delete/ItemOption_Delete";
import ItemOption_ToggleDone from "./ToggleDone/ItemOption_ToggleDone";

export default function Item_Option({
    Item, 
    ItemNameRef, 
    ItemEditable, 
    setItemEditable, 
    optionsView,
    leftSideRef,
    toggleCoverRef
}){

    
    return(
        <div className={`ItemOption_Display ${optionsView ? "visible" : "hidden"}`} >
            {optionsView && (
                <div className="ItemOption_Box">
                    <ItemOption_ToggleDone Item={Item} toggleCoverRef={toggleCoverRef} />
                    <ItemOption_Rename leftSideRef={leftSideRef} ItemEditable={ItemEditable} setItemEditable={setItemEditable} Item={Item} ItemNameRef={ItemNameRef}/>
                    <ItemOption_Delete Item={Item}/>
                </div>
            )}
        </div>
    )
}