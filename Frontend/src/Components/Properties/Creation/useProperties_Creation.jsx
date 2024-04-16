import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

export default function useProperties_Creation(setNewPropertyName, setNewPropertyValue){

    const propertyNameRef = useRef()
    const propertyValueRed = useRef()
    const propertyOnCreation = useSelector(store => store.properties.propertyOnCreation)

    const handleChange = (ref) => {
        if(ref.current === propertyNameRef.current){
            setNewPropertyName(ref.current.innerText)
        }
        if(ref.current === propertyValueRed.current){
            setNewPropertyValue(ref.current.innerText)
        }
    }

    useEffect(() => {
        if(propertyNameRef.current && propertyOnCreation){
            propertyNameRef.current.focus()
        }
    }, [propertyOnCreation])

    return{
        propertyNameRef,
        propertyValueRed,
        handleChange,
    }
}