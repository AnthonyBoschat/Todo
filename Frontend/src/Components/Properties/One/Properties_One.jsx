import React, { useEffect, useState } from "react";

export default function Properties_One({propertie, item}){
    const [propertyValue, setPropertyValue] = useState("N/A")

    useEffect(() => {
        propertie.values.map(property => {
            if(property.itemID === item._id){
                if(property.value !== "" ){
                    setPropertyValue(property.value)
                }
            }
        })
    }, [])

    return(
        <div className="propertieBox">
            <span className="property">{propertie.name}</span>
            <span contentEditable suppressContentEditableWarning={true} className="value">{propertyValue}</span>
        </div>
    )
}