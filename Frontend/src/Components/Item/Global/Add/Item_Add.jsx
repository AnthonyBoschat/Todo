import React from "react";
import useItem_Add from "./useItem_Add";

export default function Item_Add(){

    const {addItem} = useItem_Add()

    return(
        <>
            <i onClick={addItem} className="fa-solid fa-plus addItem"></i>
            <span onClick={addItem} >New item</span>
        </>
    )
}