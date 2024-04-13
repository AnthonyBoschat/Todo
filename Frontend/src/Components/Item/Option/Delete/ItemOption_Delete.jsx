import React from "react";
import useItemOption_Delete from "./useItemOption_Delete";

export default function ItemOption_Delete({Item}){

    const {handleClick} = useItemOption_Delete(Item)

    return(
        <div className="option">
            <span className="delete" onClick={handleClick}>Delete</span>
        </div>
    )
}