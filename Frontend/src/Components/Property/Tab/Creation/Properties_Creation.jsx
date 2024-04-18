import React from "react";
import useProperties_Creation from "./useProperties_Creation";

export default function Properties_Creation({propertyState, propertyDispatch}){

    const {
        propertyNameRef,
        handleChangePropertyName,
        handleChangePropertyValue
    } = useProperties_Creation(propertyState, propertyDispatch)

    return(
        <div className="propertieCreationBox">
            <span onInput={handleChangePropertyName} ref={propertyNameRef} contentEditable className="propertieCreationName"></span>
            <span onInput={handleChangePropertyValue} contentEditable className="propertieCreationValue"></span>
        </div>
    )
}