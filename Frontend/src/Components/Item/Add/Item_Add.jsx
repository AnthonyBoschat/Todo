import React from "react";
import useItem_Add from "./useItem_Add";

export default function Item_Add(){

    const {addItem} = useItem_Add()

    return(
        <div onClick={addItem} className="addItem_Box">
            <i className="fa-solid fa-plus addItem"></i>
            <span >New item</span>
        </div>
    )
}