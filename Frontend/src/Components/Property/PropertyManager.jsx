import React, { useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";

export default function Property_Manager(){

    const userItemsList = useSelector(store => store.user.datas.userItemsList)
    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)

    const initialPropertyState = {
        onCreation:false,
        canBeSaved:false,
        propertyName:"",
        propertyValue:""

    }

    const propertyReducer = (state,action) => {
        switch(action.type){
            case "onCreation":
                return {...state, onCreation:action.payload}
            case "canBeSaved":
                return{...state, canBeSaved:action.payload}
            case "propertyName":
                return{...state, propertyName:action.payload}
            case "propertyValue":
                return{...state, propertyValue:action.payload}
            default:
                return
        }
    }

    const [propertyState, propertyDispatch] = useReducer(propertyReducer, initialPropertyState)

    const [propertyOnCreation, setPropertyOnCreation] = useState(false)
    const [propertyCanBeSaved, setPropertyCanBeSaved] = useState(false)
    const [newPropertyName, setNewPropertyName] = useState("")
    const [newPropertyValue, setNewPropertyValue] = useState("")



    useEffect(() => {
        propertyDispatch({type:"canBeSaved", payload:false})
        propertyDispatch({type:"onCreation", payload:false})
    }, [folderSelectedID, userItemsList])


    return{
        propertyCanBeSaved,
        setPropertyCanBeSaved,

        propertyOnCreation,
        setPropertyOnCreation,

        newPropertyName,
        setNewPropertyName,

        newPropertyValue,
        setNewPropertyValue,

        propertyState,
        propertyDispatch
    }
}