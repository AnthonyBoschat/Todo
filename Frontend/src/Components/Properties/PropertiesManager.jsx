import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Properties_Manager(){

    const userItemsList = useSelector(store => store.user.datas.userItemsList)
    const folderSelectedID = useSelector(store => store.folder.folderSelectedID)
    const [propertyOnCreation, setPropertyOnCreation] = useState(false)
    const [propertyCanBeSaved, setPropertyCanBeSaved] = useState(false)
    const [newPropertyName, setNewPropertyName] = useState("")
    const [newPropertyValue, setNewPropertyValue] = useState("")

    useEffect(() => {

        setPropertyCanBeSaved(false)
        setPropertyOnCreation(false)
    }, [folderSelectedID, userItemsList])


    return{
        propertyCanBeSaved,
        setPropertyCanBeSaved,

        propertyOnCreation,
        setPropertyOnCreation,

        newPropertyName,
        setNewPropertyName,

        newPropertyValue,
        setNewPropertyValue
    }
}