import React from "react";
import useCollection_Add from "./useCollection_Add";

export default function Collection_Add(){

    const {handleClick} = useCollection_Add()

    return(
            <div onClick={handleClick} className="Collection_Add_Box">
                <i className="fa-solid fa-plus"></i>
                <span >New list</span>
            </div>
    )
}