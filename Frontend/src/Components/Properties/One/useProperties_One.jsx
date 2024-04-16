import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_propertyCanBeSaved } from "../PropertiesSlice";

export default function useProperties_One(propertie, item, propertyCanBeSaved, setPropertyCanBeSaved){

    const dispatch = useDispatch()
    const [propertyValue, setPropertyValue] = useState("N/A")
    const inputValueRef = useRef()
    

    useEffect(() => {
        propertie.values.map(property => {
            if(property.itemID === item._id){
                if(property.value !== "" ){
                    setPropertyValue(property.value)
                }
            }
        })
    }, [])

    const handleChange = (e) => {
        if(!propertyCanBeSaved){
            setPropertyCanBeSaved(true)
        }
    }

    return{
        propertyValue,
        inputValueRef,
        handleChange
    }
}