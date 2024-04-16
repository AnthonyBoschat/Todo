import React from "react";
import useProperties_Creation from "./useProperties_Creation";

export default function Properties_Creation({setNewPropertyName, setNewPropertyValue}){

    const {
        propertyNameRef,
        propertyValueRed,
        handleChange
    } = useProperties_Creation(setNewPropertyName, setNewPropertyValue)

    return(
        <div className="propertieCreationBox">
            <span onInput={() => handleChange(propertyNameRef)} ref={propertyNameRef} contentEditable className="propertieCreationName"></span>
            <span onInput={() => handleChange(propertyValueRed)} ref={propertyValueRed} contentEditable className="propertieCreationValue"></span>
        </div>
    )
}