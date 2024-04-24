import React from "react";
import useItem_Creation from "./useItem_Creation";

export default function Item_Creation(){

    const { ItemCreationRef } = useItem_Creation()

    return(
        <div className="Item_Box ItemCreation">
            <div ref={ItemCreationRef} contentEditable autoFocus className="ItemName"></div>
        </div>
    )
}