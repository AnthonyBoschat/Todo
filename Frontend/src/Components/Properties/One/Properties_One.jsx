import React, { useEffect, useState } from "react";
import useProperties_One from "./useProperties_One";

export default function Properties_One({property, item, propertyCanBeSaved, setPropertyCanBeSaved}){
    
    const {
        inputValueRef,
        handleChange
    } = useProperties_One(property, item, propertyCanBeSaved, setPropertyCanBeSaved)

    return(
        <div className="propertieBox">
            <span className="property">{property.name}</span>
            <span onInput={handleChange} ref={inputValueRef} contentEditable suppressContentEditableWarning={true} className="value">{property.value ? property.value : "N/A"}</span>
        </div>
    )
}