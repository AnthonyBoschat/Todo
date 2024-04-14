import React from "react";

export default function Item_PropertiesOne({propertie}){

    return(
        <div className="propertieBox">
            <span className="propertie">{propertie.propertie}</span>
            <span contentEditable suppressContentEditableWarning={true} className="value">{propertie.value ? propertie.value : "N/A"}</span>
        </div>
    )
}