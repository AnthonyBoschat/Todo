import React, { useRef } from "react";

export default function useProperties_Creation(){

    const propertyNameRef = useRef()
    const propertyValueRed = useRef()



    return{
        propertyNameRef,
        propertyValueRed,
    }
}