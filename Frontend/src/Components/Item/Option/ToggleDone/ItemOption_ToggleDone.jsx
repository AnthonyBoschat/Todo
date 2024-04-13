import React from "react";
import useItemOption_ToggleDone from "./useItemOption_ToggleDone";

export default function ItemOption_ToggleDone({Item, toggleCoverRef}){

    const {handleClick} = useItemOption_ToggleDone(Item, toggleCoverRef)

    return(
        <div className="option">
            <span className={Item.completed ? "done" : "undone"} onClick={handleClick}>Done</span>
        </div>
    )
}