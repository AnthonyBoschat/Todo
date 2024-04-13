import React, { useEffect, useState } from "react";
import useItemOption_Rename from "./useItemOption_Rename";

export default function ItemOption_Rename({Item, ItemNameRef, ItemEditable, setItemEditable, leftSideRef}){

    
    const {toggleRenameItem, optionSelected} = useItemOption_Rename(ItemNameRef,ItemEditable,setItemEditable,leftSideRef,Item)


    return(
        <div className="option">
            <span className={optionSelected ? "optionSelected" : undefined} onClick={() => toggleRenameItem(Item._id)}>Edit</span>
        </div>
    )
}