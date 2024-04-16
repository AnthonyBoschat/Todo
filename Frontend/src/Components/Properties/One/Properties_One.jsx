import React, { useEffect, useState } from "react";
import useProperties_One from "./useProperties_One";

export default function Properties_One({propertie, item, propertyCanBeSaved, setPropertyCanBeSaved}){
    
    const {
        propertyValue,
        inputValueRef,
        handleChange
    } = useProperties_One(propertie, item, propertyCanBeSaved, setPropertyCanBeSaved)

    return(
        <div className="propertieBox">
            <span className="property">{propertie.name}</span>
            <span onInput={handleChange} ref={inputValueRef} contentEditable suppressContentEditableWarning={true} className="value">{propertyValue}</span>
        </div>
    )
}