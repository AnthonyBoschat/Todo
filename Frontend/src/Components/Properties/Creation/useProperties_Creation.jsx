import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

export default function useProperties_Creation(propertyState, propertyDispatch){

    const propertyNameRef = useRef()
    
    const handleChangePropertyName = (e) => {
        propertyDispatch({type:"propertyName", payload:e.target.innerText})
    }

    const handleChangePropertyValue = (e) => {
        propertyDispatch({type:"propertyValue", payload:e.target.innerText})
    }

    useEffect(() => {
        if(propertyNameRef.current && propertyState.onCreation){
            propertyNameRef.current.focus()
        }
    }, [propertyState.onCreation])

    return{
        handleChangePropertyName,
        handleChangePropertyValue,
        propertyNameRef
    }
}