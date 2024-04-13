import React from "react";
import useList_Add from "./useList_Add";

export default function List_Add(){

    const {handleClick} = useList_Add()

    return(
            <div onClick={handleClick} className="List_Add_Box">
                <i className="fa-solid fa-plus"></i>
                <span >New list</span>
            </div>
    )
}