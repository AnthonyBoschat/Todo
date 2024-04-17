import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_propertyCanBeSaved } from "../PropertiesSlice";

export default function useProperties_One(propertie, item, propertyCanBeSaved, setPropertyCanBeSaved){

    const inputValueRef = useRef()

    const handleChange = (e) => {
        if(!propertyCanBeSaved){
            setPropertyCanBeSaved(true)
        }
    }

    return{
        // propertyValue,
        inputValueRef,
        handleChange
    }
}