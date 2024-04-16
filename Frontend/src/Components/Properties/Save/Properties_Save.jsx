import React from "react";
import useProperties_Save from "./useProperties_Save";

export default function Properties_Save({newPropertyName, newPropertyValue, item, propertyCanBeSaved}){

    const {
        handleClick
    } = useProperties_Save(newPropertyName, newPropertyValue, item)

    return(
        <div className={`propertiesSave_Box ${propertyCanBeSaved ? "active" : undefined}`}>
            <i onClick={handleClick} className="fa-solid fa-floppy-disk"></i>
        </div>
    )
}