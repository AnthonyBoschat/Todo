import React from "react";
import useProperties_Save from "./useProperties_Save";

export default function Properties_Save({item, propertyState}){

    const {
        handleClick
    } = useProperties_Save(propertyState, item)

    return(
        <div className={`propertiesSave_Box ${propertyState.canBeSaved ? "active" : undefined}`}>
            <i onClick={handleClick} className="fa-solid fa-floppy-disk"></i>
        </div>
    )
}