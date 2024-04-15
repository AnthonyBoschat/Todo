import React from "react";
import useProperties_Creation from "./useProperties_Creation";

export default function Properties_Creation(){

    const {
        propertyNameRef,
        propertyValueRed,
    } = useProperties_Creation()

    return(
        <div className="propertieCreationBox">
            <span ref={propertyNameRef} autofocus contentEditable className="propertieCreationName"></span>
            <span ref={propertyValueRed} autofocus contentEditable className="propertieCreationValue"></span>
        </div>
    )
}