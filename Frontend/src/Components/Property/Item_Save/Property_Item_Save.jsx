import React from "react";
import useProperty_Save from "./useProperty_Save";

export default function Properties_Save({item, propertyState}){

    const {
        handleClick
    } = useProperty_Save(propertyState, item)

    return(
        <div className={`propertiesSave_Box ${propertyState.canBeSaved ? "active" : undefined}`}>
            <i onClick={handleClick} className="fa-solid fa-floppy-disk"></i>
        </div>
    )
}