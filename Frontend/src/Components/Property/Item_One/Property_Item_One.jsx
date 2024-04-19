import React, { useEffect, useState } from "react";
import useProperties_One from "./useProperties_One";

export default function Property_Item_One({property, item}){
    


    return(
        <div className="propertieBox">
            <span className="property">{property.name}</span>
            <span contentEditable suppressContentEditableWarning={true} className="value">{property.value ? property.value : "N/A"}</span>
        </div>
    )
}