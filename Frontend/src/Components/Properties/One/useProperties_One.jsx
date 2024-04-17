import React, { useRef } from "react";

export default function useProperties_One(propertie, item, propertyState, propertyDispatch){

    const inputValueRef = useRef()

    const handleChange = () => {
        if(!propertyState.canBeSaved){
            propertyDispatch({type:"canBeSaved", payload:true})
        }
    }

    return{
        inputValueRef,
        handleChange
    }
}