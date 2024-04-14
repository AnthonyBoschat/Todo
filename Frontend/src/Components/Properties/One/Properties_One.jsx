import React from "react";

export default function Properties_One({propertie}){

    return(
        <div className="propertieBox">
            <span className="property">{propertie.propertie}</span>
            <span contentEditable suppressContentEditableWarning={true} className="value">{propertie.value ? propertie.value : "N/A"}</span>
        </div>
    )
}