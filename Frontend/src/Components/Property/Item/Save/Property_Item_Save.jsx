import React from "react";
import useProperty_Save from "./useProperty_Save";

export default function Properties_Save({itemPropertyState}){

    const handleClick = () => {
        console.log(itemPropertyState)
    }
    

    return(
        <div className={`propertiesSave_Box ${itemPropertyState.updateDetected ? "active" : "inactive"}`}>
            <i onClick={handleClick} className="fa-solid fa-floppy-disk"></i>
        </div>
    )
}